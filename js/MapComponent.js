/**
 * Init Map Component
 * Map Marker Functions
 */
class MapComponent {
  constructor() {
    this.map = null;
    this.mousePositionControl = null;
    this.coorContainer = new Array();
    this.activeRadiusContainer = 50 * 1000; // default 50 km
    this.fixRadiusContainer = new Array(); // for fixed radius
    this.pointLayer = new ol.layer.Vector({});
    this.lineLayer = new ol.layer.Vector({});
    this.fixBufferLayer = new ol.layer.Vector({});
    this.bufferLayer = new ol.layer.Vector({});
    // this.pointDataLayer = new Array(); // for data points
    // this.pointDataLayerCount = 0; // Data Points Layers Count
    this.lineDataCoor = new Object(); // for data lines
    this.lineDataStyle = new Array(); // for data lines style
    this.lineDataLayerCount = 0; // Data Line Layers Count
    this.switchCondition = 'Sun'
    this.mapTile = new ol.layer.Tile({
      source: new ol.source.OSM({
        'url': 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      })
    });
    this.pointStyle1 = [
      new ol.style.Style({
        image: new ol.style.Icon(({
          scale: 0.3,
          rotateWithView: false,
          anchor: [0.5, 0.9],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          opacity: 1,
          src: 'https://lessthan41.github.io/TyphoonSearch/img/pointer1.png'
        }))
      })
    ];
    this.pointStyle2 = [
      new ol.style.Style({
        image: new ol.style.Icon(({
          scale: 0.3,
          rotateWithView: false,
          anchor: [0.5, 0.9],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          opacity: 1,
          src: 'https://lessthan41.github.io/TyphoonSearch/img/pointer2.png'
        }))
      })
    ];
    this.lineStyle1 = [ // User Input
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'black',
          width: 2
        })
      })
    ];
    this.lineStyle2 = [ // User Input
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 2
        })
      })
    ];
    this.bufferStyle1 = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#595959',
          width: 1
        }),
        fill: new ol.style.Fill({
          color: 'rgba(61, 60, 60, 0.3)'
        })
      })
    ];
    this.bufferStyle2 = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 1
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.3)'
        })
      })
    ];
  }

  init() {
    this.mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });
    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({ // MousePosition
        attributionOptions: {
          collapsible: false
        }
      }).extend([this.mousePositionControl]),
      layers: [ // OSM
        this.mapTile,
        this.pointLayer, // Empty Layer for addMarker
        this.lineLayer, // Empty Layer for addLine
        this.bufferLayer, // Empty Layer for addBuffer
        this.fixBufferLayer // Empty Layer for FixedBuffer
      ],
      view: new ol.View({ // setView
        center: ol.proj.fromLonLat([125.9, 22.5]),
        zoom: 6
      })
    });
  }

  /* Add Pointer */
  addMarker(justForPlot = false) {
    setTimeout(() => { // set time out for smartphone version (no instant mousePosition)
      this.addPoint(this.coorContainer);
      this.addLine(this.coorContainer);
      this.addBuffer(this.coorContainer);
      this.addFixBuffer(this.coorContainer);
      if (justForPlot) { // if Dont need to add fix buffer (just plot) then pop()
        this.fixRadiusContainer.pop();
      }
    }, 10);
  }

  /* Clear Pointer and Line */
  removeMarker() {
    this.coorContainer = [];
    this.fixRadiusContainer = [];
    this.addPoint(this.coorContainer);
    this.addLine(this.coorContainer);
    this.addBuffer(this.coorContainer);
    this.addFixBuffer(this.coorContainer);
    this.addDataLine(this.coorContainer);
  }

  /* Get Coordinate and Return [x, y](m) */
  getMousePosition() {
    let currentPosition = $('#mouse-position').text();
    let commaPosition = currentPosition.indexOf(',');
    let x = parseFloat(currentPosition.substring(0, commaPosition));
    let y = parseFloat(currentPosition.substring(commaPosition + 1));
    return [x, y];
  }

  /* coor from EPSG:3857 to 4326 (latlon to TM2) */
  LonLattoTM2(coor) {
    return ol.proj.transform(coor, 'EPSG:4326', 'EPSG:3857');
  }

  /* coor from EPSG:4326 to 3857 (TM2 to latlon) */
  TM2toLonLat(coor) {
    return ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');
  }

  /* Add Point [Lon, Lat] */
  addPoint(coor) {
    let featurePoints = new Array();
    let style = this.switchCondition == 'Sun' ? this.pointStyle1 : this.pointStyle2;
    let source;

    for (var i = 0; i < coor.length; i++) { // for i in coor add Feature and set style
      featurePoints[i] = new ol.Feature({
        geometry: new ol.geom.Point(coor[i])
      });
      featurePoints[i].setStyle(style);
    }

    source = new ol.source.Vector({
      features: featurePoints
    });
    this.pointLayer = new ol.layer.Vector({
      source: source
    });
    this.map.getLayers().getArray().splice(1, 1, this.pointLayer); // replace the previous one
    this.map.render();
  }

  /* Add History Data Points */
  addDataPoint(coor) {

    // this.pointDataLayer = [];
    // let featurePoints = new Array();
    // let source, layer, dataLength;
    //
    //
    // for(var i in coor) {
    //   featurePoints = [];
    //   for(var j=0; j<coor[i].length; j++){
    //     featurePoints.push( new ol.Feature({ geometry: new ol.geom.Point(coor[i][j])} ));
    //     featurePoints[j].setStyle(this.pointStyle2);
    //   }
    //   source = new ol.source.Vector ({ features: featurePoints });
    //   layer = new ol.layer.Vector ({ source: source });
    //   this.pointDataLayer.push(layer);
    // }
    //
    // dataLength = Object.keys(coor).length;
    // this.pointDataLayerCount = dataLength;
    //
    // for(var i=0; i<dataLength; i++) {
    //   this.map.getLayers().getArray().splice(4,0,this.pointDataLayer[i]); // Add Layer
    // }

  }

  /* Add Line */
  addLine(coor) {
    let source, feature;
    let style = this.switchCondition == 'Sun' ? this.lineStyle1 : this.lineStyle2;

    feature = new ol.Feature({
      geometry: new ol.geom.LineString(coor)
    });
    feature.setStyle(style); // set style
    source = new ol.source.Vector({
      features: [feature]
    });
    this.lineLayer = new ol.layer.Vector({
      source: source
    });
    this.map.getLayers().getArray().splice(2, 1, this.lineLayer); // replace the previous one
    this.map.render();
  }

  /* Add History Data Line */
  addDataLine(coor) {
    let source, feature, layer, opacity, split, self, currentColor;
    let count = 0;
    let style = new Array();
    this.lineDataStyle = []; // Clear Style Array
    this.map.getLayers().getArray().splice(5, this.lineDataLayerCount); // Clear Layers
    this.lineDataLayerCount = Object.keys(coor).length;

    for (var i = 0; i < this.lineDataLayerCount; i++) {
      self = Object.keys(coor)[i];
      feature = new ol.Feature({
        geometry: new ol.geom.LineString(coor[self])
      });
      opacity = Math.round((1 - count / this.lineDataLayerCount) * 10) / 10;
      this.setIndepStyle(feature, opacity);
      source = new ol.source.Vector({
        features: [feature]
      });
      layer = new ol.layer.Vector({
        source: source
      });
      this.map.getLayers().getArray().splice(5, 0, layer);
      count++;
    }

    this.map.render();
  }

  /* Set Independent Data Style */
  setIndepStyle(feature, opacity) {
    let lineColor = this.switchCondition == 'Sun' ? 'rgba(12, 96, 39, ' : 'rgba(34, 165, 1, ';
    let lineStyle =
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: lineColor + opacity + ')',
          width: 3
        })
      });

    this.lineDataStyle.push(lineStyle);
    feature.setStyle(lineStyle); // set style
  }

  /* Add Changable Buffer */
  addBuffer(coor) {
    let coorLength = coor.length;
    let center = coorLength == 0 ? [] : coor[coorLength - 1]; // Prevent error
    let radius = this.radiusCorrection(center, this.activeRadiusContainer); // Radius Correction
    let buffer = new ol.Feature({
      geometry: new ol.geom.Circle(center, radius)
    }); // the newest point
    let style = this.switchCondition == 'Sun' ? this.bufferStyle1 : this.bufferStyle2;
    let sourceBuffer;

    buffer.setStyle(style);
    sourceBuffer = new ol.source.Vector({
      features: [buffer]
    });
    this.bufferLayer = new ol.layer.Vector({
      source: sourceBuffer
    });
    this.map.getLayers().getArray().splice(3, 1, this.bufferLayer); // replace the previous one
    this.map.render();
  }

  /* Add Fixed Buffer */
  addFixBuffer(coor) {

    let coorLength = coor.length;
    let center = coor.slice();
    let fixBufferArray = new Array();
    let sourceBuffer;
    let style = this.switchCondition == 'Sun' ? this.bufferStyle1 : this.bufferStyle2;
    center.pop(); // pop the newest point

    if (coorLength >= 2) { // setting feature is needed only when points >= 2
      this.fixRadiusContainer.push(this.activeRadiusContainer);
      for (var i = 0; i < coorLength - 1; i++) {
        let radius = this.radiusCorrection(center[i], this.fixRadiusContainer[i]); // Radius Correction
        fixBufferArray[i] = new ol.Feature({
          geometry: new ol.geom.Circle(center[i], radius)
        });
        fixBufferArray[i].setStyle(style);
      }
    }

    sourceBuffer = new ol.source.Vector({
      features: fixBufferArray
    });
    this.fixBufferLayer = new ol.layer.Vector({
      source: sourceBuffer
    });
    this.map.getLayers().getArray().splice(4, 1, this.fixBufferLayer); // replace the previous one
    this.map.render();
  }

  /* Change radius */
  radiusController(radius) {
    this.activeRadiusContainer = radius * 1000; // km to m
    this.addBuffer(this.coorContainer);
  }

  /* Convert Radius Wanted(m) into value to input */
  radiusCorrection(center, radius) {
    let edgeCoordinate = [center[0] + radius, center[1]];
    let wgs84Sphere = new ol.Sphere(6378137);
    let groundRadius = wgs84Sphere.haversineDistance(
      ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326'),
      ol.proj.transform(edgeCoordinate, 'EPSG:3857', 'EPSG:4326')
    );

    return radius / groundRadius * radius; // Ratio * radius
  }

  /* After GET history data plot data */
  plotData(data) {

    let coor = new Array();
    this.lineDataCoor = new Object();

    for (var i in data) {
      this.lineDataCoor[i] = new Array();
      for (var j in data[i]['points']) {
        coor = [data[i]['points'][j]['longitude'], data[i]['points'][j]['latitude']];
        coor = ol.proj.fromLonLat(coor);
        this.lineDataCoor[i].push(coor);
      };
    };

    this.addDataLine(this.lineDataCoor);
  }

  /* Switch Tile */
  tileSwitch(btncase) {
    this.switchCondition = btncase;
    switch (btncase) {
      case 'Sun':
        this.mapTile = new ol.layer.Tile({
          source: new ol.source.OSM({
            'url': 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
          })
        });

        this.map.getLayers().getArray().splice(0, 1, this.mapTile); // Change Tile

        break;

      case 'Moon':
        this.mapTile = new ol.layer.Tile({
          source: new ol.source.OSM({
            'url': 'http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          })
        });
        this.map.getLayers().getArray().splice(0, 1, this.mapTile); // Change Tile

        break;
    };

    let pointStyle = this.switchCondition == 'Sun' ? this.pointStyle1 : this.pointStyle2;
    let lineStyle = this.switchCondition == 'Sun' ? this.lineStyle1 : this.lineStyle2;
    let bufferStyle = this.switchCondition == 'Sun' ? this.bufferStyle1 : this.bufferStyle2;

    if (this.coorContainer.length >= 1) {
      this.addDataLine(this.lineDataCoor); // Change Data Line
      this.map.getLayers().getArray()[2].getSource().getFeatures()[0].setStyle(lineStyle); // Change User Line
      this.map.getLayers().getArray()[3].getSource().getFeatures()[0].setStyle(bufferStyle); // Change Buffer Style
      for (var i = 0; i < this.coorContainer.length; i++) {
        this.map.getLayers().getArray()[1].getSource().getFeatures()[i].setStyle(pointStyle); // Change Pointer Style
      };
    };
    if (this.coorContainer.length >= 2) {
      for (var i = 0; i < this.coorContainer.length - 1; i++) {
        this.map.getLayers().getArray()[4].getSource().getFeatures()[i].setStyle(bufferStyle);
      };
    };

    this.map.render();
  }

  /* Result Tr Hover */
  dataLineShine(indx) {
    let lineColor = this.switchCondition == 'Sun' ? 'rgba(12, 96, 39, 0.1)' : 'rgba(34, 165, 1, 0.1)';
    let targetLineColor = this.switchCondition == 'Sun' ? 'rgba(12, 96, 39, 1)' : 'rgba(34, 165, 1, 1)';
    let layerCount = this.map.getLayers().getArray().length;
    let target = this.map.getLayers().getArray()[layerCount - indx];
    let self;

    /* set Every Data Line Color */
    for (var i = 5; i < layerCount; i++) { // start from 5, 4 is the layer length of basic map
      self = this.map.getLayers().getArray()[i];
      self.getSource().getFeatures()[0].getStyle().getStroke()['a'] = lineColor;
      self.getSource().changed();
    }

    /* set Target Line color */
    target.getSource().getFeatures()[0].getStyle().getStroke()['a'] = targetLineColor;
    target.getSource().changed();

    this.map.renderSync();
  }

}
