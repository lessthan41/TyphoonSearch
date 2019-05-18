/**
* Init Map Component
* Map Marker Functions
*/
class MapComponent {
  constructor () {
    this.map = null;
    this.mousePositionControl = null;
    this.coorContainer = new Array();
    this.bufferRadius = 50 * 1000; // default 50 km
    this.fixRadiusContainer = new Array(); // for fixed radius
    this.pointLayer = new ol.layer.Vector({});
    this.lineLayer = new ol.layer.Vector({});
    this.fixBufferLayer = new ol.layer.Vector({});
    this.bufferLayer = new ol.layer.Vector({});
    this.pointDataLayer = new Array(); // for data points
    this.lineDataLayer = new Array(); // for data lines
    this.pointDataLayerCount = 0; // Data Points Layers Count
    this.lineDataLayerCount = 0; // Data Line Layers Count
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
    this.lineStyle1 = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 2
        })
      })
    ];
    this.lineStyle2 = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#9386f488',
          width: 3
        })
      })
    ];
    this.bufferStyle = [
      new ol.style.Style({
          stroke: new ol.style.Stroke({
              color: '#8181f4',
              width: 3
          }),
          fill: new ol.style.Fill({
              color: 'rgba(0, 0, 255, 0.1)'
          })
      })
    ]
  }

  render () {
    this.init();
  }

  init () {
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
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          this.pointLayer, // Empty Layer for addMarker
          this.lineLayer,  // Empty Layer for addLine
          this.bufferLayer, // Empty Layer for addBuffer
          this.fixBufferLayer // Empty Layer for FixedBuffer
        ],
        view: new ol.View({ // setView
          center: ol.proj.fromLonLat([125.9, 22.5]),
          zoom: 7
        })
      });
  }

  // Add Pointer
  addMarker () {
    setTimeout( () => { // set time out for smartphone version (no instant mousePosition)
      this.coorContainer.push( this.getMousePosition() );
      this.addPoint(this.coorContainer);
      this.addLine(this.coorContainer);
      this.addBuffer(this.coorContainer);
      this.addFixBuffer(this.coorContainer);
    }, 10);
  }

  // Clear Pointer and Line
  removeMarker () {
    this.coorContainer = [];
    this.fixRadiusContainer = [];
    this.addPoint(this.coorContainer);
    this.addLine(this.coorContainer);
    this.addBuffer(this.coorContainer);
    this.addFixBuffer(this.coorContainer);
    this.addDataLine(this.coorContainer);
  }

  // Get Coordinate and Return [x, y](m)
  getMousePosition () {
    let currentPosition = $('#mouse-position').text();
    let x = parseFloat(currentPosition.substring(0, 15));
    let y = parseFloat(currentPosition.substring(15));
    return [x, y];
  }

  // Add Point
  addPoint (coor) {
    let featurePoints = new Array();
    let source;

    for(var i=0; i<coor.length; i++) { // for i in coor add Feature and set style
      featurePoints[i] = new ol.Feature({ geometry: new ol.geom.Point(coor[i]) });
      featurePoints[i].setStyle(this.pointStyle1);
    }

    source = new ol.source.Vector ({ features: featurePoints });
    this.pointLayer = new ol.layer.Vector ({ source: source });
    this.map.getLayers().getArray().splice(1,1,this.pointLayer); // replace the previous one
    this.map.render();
  }

  // Add History Data Points
  addDataPoint (coor) {

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

  // Add Line
  addLine (coor) {
    let source, feature;

    feature = new ol.Feature({ geometry: new ol.geom.LineString(coor) });
    feature.setStyle(this.lineStyle1); // set style
    source = new ol.source.Vector({ features: [feature] });
    this.lineLayer = new ol.layer.Vector({ source: source });
    this.map.getLayers().getArray().splice(2,1,this.lineLayer); // replace the previous one
    this.map.render();
  }

  // Add History Data Line
  addDataLine (coor) {
    let source, feature, layer, dataLength;
    this.lineDataLayer = [];
    this.map.getLayers().getArray().splice(5,this.lineDataLayerCount); // Clear Layers
    for(var i in coor) {
        feature = new ol.Feature({ geometry: new ol.geom.LineString(coor[i]) });
        feature.setStyle(this.lineStyle2); // set style
        source = new ol.source.Vector({ features: [feature] });
        layer = new ol.layer.Vector({ source: source });
        this.lineDataLayer.push( layer );
    }

    dataLength = Object.keys(coor).length;
    this.lineDataLayerCount = dataLength;
    for(var i=0; i<dataLength; i++) {
      this.map.getLayers().getArray().splice(5,0,this.lineDataLayer[i]); // Add Layer at the last of the layer
    }

    this.map.render();
  }

  // Add Changable Buffer
  addBuffer (coor) {
    let coorLength = coor.length;
    let center = coorLength == 0 ? [] : coor[coorLength-1]; // Prevent error
    let radius = this.radiusCorrection(center, this.bufferRadius); // Radius Correction
    let buffer = new ol.Feature({ geometry: new ol.geom.Circle(center, radius) }); // the newest point
    let sourceBuffer;

    buffer.setStyle(this.bufferStyle);
    sourceBuffer = new ol.source.Vector({ features: [buffer] });
    this.bufferLayer = new ol.layer.Vector({ source: sourceBuffer });
    this.map.getLayers().getArray().splice(3,1,this.bufferLayer); // replace the previous one
    this.map.render();
  }

  // Add Fixed Buffer
  addFixBuffer (coor) {
    let coorLength = coor.length;
    let center = coor.slice();
    let fixBufferArray = new Array();
    let sourceBuffer;
    center.pop(); // pop the newest point

    if(coorLength >= 2){ // setting feature is needed only when points >= 2
      this.fixRadiusContainer.push(this.bufferRadius);
      for(var i=0; i<coorLength-1; i++){
        let radius = this.radiusCorrection(center[i], this.fixRadiusContainer[i]); // Radius Correction
        fixBufferArray[i] = new ol.Feature({ geometry: new ol.geom.Circle(center[i], radius) });
        fixBufferArray[i].setStyle(this.bufferStyle);
      }
    }

    sourceBuffer = new ol.source.Vector({ features: fixBufferArray });
    this.fixBufferLayer = new ol.layer.Vector({ source: sourceBuffer });
    this.map.getLayers().getArray().splice(4,1,this.fixBufferLayer); // replace the previous one
    this.map.render();
  }

  // Change radius
  radiusController (radius) {
    this.bufferRadius = radius * 1000; // km to m
    this.addBuffer(this.coorContainer);
  }

  // Convert Radius Wanted(m) into value to input
  radiusCorrection (center, radius) {
    let edgeCoordinate = [center[0] + radius, center[1]];
    let wgs84Sphere = new ol.Sphere(6378137);
    let groundRadius = wgs84Sphere.haversineDistance(
        ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326'),
        ol.proj.transform(edgeCoordinate, 'EPSG:3857', 'EPSG:4326')
    );

    return radius/groundRadius * radius; // Ratio * radius
  }

  plotData () {
    let coor = new Array();
    let data = {
      "1": {
        "id": "0706",
        "name": "PABUK",
        "points": [
          {
            "latitude": 18.4,
            "longitude": 137.5
          },
          {
            "latitude": 18.9,
            "longitude": 136.6
          },
          {
            "latitude": 19.6,
            "longitude": 135.6
          },
          {
            "latitude": 20.2,
            "longitude": 134.1
          },
          {
            "latitude": 20.6,
            "longitude": 133.0
          },
          {
            "latitude": 21.1,
            "longitude": 131.6
          },
          {
            "latitude": 21.4,
            "longitude": 130.4
          },
          {
            "latitude": 21.7,
            "longitude": 128.6
          },
          {
            "latitude": 21.5,
            "longitude": 126.7
          },
          {
            "latitude": 21.6,
            "longitude": 125.7
          },
          {
            "latitude": 21.8,
            "longitude": 124.8
          },
          {
            "latitude": 22.1,
            "longitude": 124.1
          },
          {
            "latitude": 22.2,
            "longitude": 123.3
          },
          {
            "latitude": 22.1,
            "longitude": 122.7
          },
          {
            "latitude": 21.9,
            "longitude": 122.1
          },
          {
            "latitude": 22.1,
            "longitude": 120.3
          },
          {
            "latitude": 22.3,
            "longitude": 118.6
          },
          {
            "latitude": 22.4,
            "longitude": 117.4
          },
          {
            "latitude": 22.1,
            "longitude": 116.0
          },
          {
            "latitude": 22.1,
            "longitude": 114.8
          },
          {
            "latitude": 22.0,
            "longitude": 113.7
          },
          {
            "latitude": 21.6,
            "longitude": 112.9
          },
          {
            "latitude": 21.0,
            "longitude": 112.8
          },
          {
            "latitude": 21.2,
            "longitude": 113.1
          },
          {
            "latitude": 21.7,
            "longitude": 113.4
          },
          {
            "latitude": 22.3,
            "longitude": 114.0
          },
          {
            "latitude": 22.5,
            "longitude": 113.6
          },
          {
            "latitude": 22.5,
            "longitude": 113.2
          },
          {
            "latitude": 22.6,
            "longitude": 113.7
          },
          {
            "latitude": 23.0,
            "longitude": 114.1
          },
          {
            "latitude": 23.3,
            "longitude": 115.0
          },
          {
            "latitude": 24.5,
            "longitude": 115.9
          },
          {
            "latitude": 25.3,
            "longitude": 117.0
          },
          {
            "latitude": 25.9,
            "longitude": 118.8
          },
          {
            "latitude": 28.0,
            "longitude": 121.3
          },
          {
            "latitude": 29.8,
            "longitude": 122.7
          },
          {
            "latitude": 30.7,
            "longitude": 123.3
          },
          {
            "latitude": 31.7,
            "longitude": 123.7
          },
          {
            "latitude": 32.8,
            "longitude": 124.8
          },
          {
            "latitude": 34.3,
            "longitude": 125.6
          },
          {
            "latitude": 35.7,
            "longitude": 125.9
          },
          {
            "latitude": 37.6,
            "longitude": 125.9
          },
          {
            "latitude": 39.8,
            "longitude": 126.4
          },
          {
            "latitude": 40.9,
            "longitude": 128.8
          },
          {
            "latitude": 42.9,
            "longitude": 131.9
          },
          {
            "latitude": 44.4,
            "longitude": 133.6
          }
        ]
      },
      "2": {
        "id": "6013",
        "name": "AGNES",
        "points": [
          {
            "latitude": 21.0,
            "longitude": 126.0
          },
          {
            "latitude": 22.0,
            "longitude": 126.0
          },
          {
            "latitude": 21.7,
            "longitude": 128.0
          },
          {
            "latitude": 21.0,
            "longitude": 130.0
          },
          {
            "latitude": 20.0,
            "longitude": 131.0
          },
          {
            "latitude": 20.1,
            "longitude": 132.0
          },
          {
            "latitude": 20.4,
            "longitude": 132.2
          },
          {
            "latitude": 20.6,
            "longitude": 132.2
          },
          {
            "latitude": 21.0,
            "longitude": 132.0
          },
          {
            "latitude": 21.5,
            "longitude": 131.7
          },
          {
            "latitude": 22.1,
            "longitude": 131.0
          },
          {
            "latitude": 22.8,
            "longitude": 130.1
          },
          {
            "latitude": 23.0,
            "longitude": 129.4
          },
          {
            "latitude": 23.3,
            "longitude": 128.5
          },
          {
            "latitude": 23.9,
            "longitude": 127.1
          },
          {
            "latitude": 24.3,
            "longitude": 125.0
          },
          {
            "latitude": 24.3,
            "longitude": 123.5
          },
          {
            "latitude": 24.1,
            "longitude": 121.9
          },
          {
            "latitude": 23.6,
            "longitude": 120.1
          },
          {
            "latitude": 23.0,
            "longitude": 119.0
          },
          {
            "latitude": 22.6,
            "longitude": 118.0
          },
          {
            "latitude": 22.1,
            "longitude": 117.5
          },
          {
            "latitude": 21.6,
            "longitude": 116.7
          },
          {
            "latitude": 21.4,
            "longitude": 116.0
          },
          {
            "latitude": 21.0,
            "longitude": 115.0
          },
          {
            "latitude": 20.0,
            "longitude": 112.0
          },
          {
            "latitude": 20.2,
            "longitude": 110.3
          },
          {
            "latitude": 20.0,
            "longitude": 109.0
          },
          {
            "latitude": 20.0,
            "longitude": 108.0
          },
          {
            "latitude": 20.0,
            "longitude": 107.5
          },
          {
            "latitude": 20.0,
            "longitude": 107.3
          },
          {
            "latitude": 20.0,
            "longitude": 107.0
          },
          {
            "latitude": 19.5,
            "longitude": 106.5
          }
        ]
      },
      "3": {
        "id": "1521",
        "name": "DUJUAN",
        "points": [
          {
            "latitude": 13.5,
            "longitude": 148.1
          },
          {
            "latitude": 13.8,
            "longitude": 148.0
          },
          {
            "latitude": 14.4,
            "longitude": 147.3
          },
          {
            "latitude": 14.7,
            "longitude": 146.3
          },
          {
            "latitude": 15.0,
            "longitude": 145.5
          },
          {
            "latitude": 15.1,
            "longitude": 144.7
          },
          {
            "latitude": 15.4,
            "longitude": 143.2
          },
          {
            "latitude": 15.2,
            "longitude": 141.5
          },
          {
            "latitude": 15.6,
            "longitude": 140.2
          },
          {
            "latitude": 15.8,
            "longitude": 138.8
          },
          {
            "latitude": 15.9,
            "longitude": 138.1
          },
          {
            "latitude": 16.2,
            "longitude": 137.5
          },
          {
            "latitude": 16.8,
            "longitude": 136.5
          },
          {
            "latitude": 17.5,
            "longitude": 135.4
          },
          {
            "latitude": 17.5,
            "longitude": 134.5
          },
          {
            "latitude": 17.8,
            "longitude": 133.8
          },
          {
            "latitude": 17.9,
            "longitude": 133.5
          },
          {
            "latitude": 18.2,
            "longitude": 133.1
          },
          {
            "latitude": 18.6,
            "longitude": 132.6
          },
          {
            "latitude": 18.7,
            "longitude": 132.4
          },
          {
            "latitude": 18.9,
            "longitude": 132.3
          },
          {
            "latitude": 19.1,
            "longitude": 132.1
          },
          {
            "latitude": 19.4,
            "longitude": 131.7
          },
          {
            "latitude": 19.7,
            "longitude": 131.3
          },
          {
            "latitude": 20.3,
            "longitude": 131.0
          },
          {
            "latitude": 20.9,
            "longitude": 130.3
          },
          {
            "latitude": 21.6,
            "longitude": 129.7
          },
          {
            "latitude": 21.9,
            "longitude": 128.9
          },
          {
            "latitude": 22.2,
            "longitude": 128.1
          },
          {
            "latitude": 22.3,
            "longitude": 127.5
          },
          {
            "latitude": 22.3,
            "longitude": 127.1
          },
          {
            "latitude": 22.5,
            "longitude": 126.8
          },
          {
            "latitude": 22.6,
            "longitude": 126.4
          },
          {
            "latitude": 22.7,
            "longitude": 125.9
          },
          {
            "latitude": 22.8,
            "longitude": 125.4
          },
          {
            "latitude": 23.0,
            "longitude": 124.9
          },
          {
            "latitude": 23.1,
            "longitude": 124.4
          },
          {
            "latitude": 23.3,
            "longitude": 123.9
          },
          {
            "latitude": 23.6,
            "longitude": 123.4
          },
          {
            "latitude": 24.1,
            "longitude": 122.9
          },
          {
            "latitude": 24.4,
            "longitude": 122.0
          },
          {
            "latitude": 24.3,
            "longitude": 121.0
          },
          {
            "latitude": 24.3,
            "longitude": 120.0
          },
          {
            "latitude": 24.9,
            "longitude": 118.9
          },
          {
            "latitude": 25.6,
            "longitude": 117.8
          },
          {
            "latitude": 26.4,
            "longitude": 116.4
          },
          {
            "latitude": 27.4,
            "longitude": 115.9
          },
          {
            "latitude": 27.9,
            "longitude": 116.1
          },
          {
            "latitude": 28.7,
            "longitude": 116.7
          }
        ]
      },
      "4": {
        "id": "0712",
        "name": "WIPHA",
        "points": [
          {
            "latitude": 19.4,
            "longitude": 133.6
          },
          {
            "latitude": 19.5,
            "longitude": 132.8
          },
          {
            "latitude": 19.6,
            "longitude": 132.3
          },
          {
            "latitude": 19.9,
            "longitude": 131.7
          },
          {
            "latitude": 20.1,
            "longitude": 131.5
          },
          {
            "latitude": 20.6,
            "longitude": 130.6
          },
          {
            "latitude": 21.3,
            "longitude": 130.0
          },
          {
            "latitude": 22.0,
            "longitude": 128.7
          },
          {
            "latitude": 22.4,
            "longitude": 127.8
          },
          {
            "latitude": 22.7,
            "longitude": 127.1
          },
          {
            "latitude": 22.9,
            "longitude": 126.8
          },
          {
            "latitude": 23.2,
            "longitude": 126.3
          },
          {
            "latitude": 23.4,
            "longitude": 125.7
          },
          {
            "latitude": 23.6,
            "longitude": 125.1
          },
          {
            "latitude": 23.9,
            "longitude": 124.6
          },
          {
            "latitude": 24.1,
            "longitude": 124.1
          },
          {
            "latitude": 24.2,
            "longitude": 123.9
          },
          {
            "latitude": 24.4,
            "longitude": 123.7
          },
          {
            "latitude": 25.0,
            "longitude": 123.2
          },
          {
            "latitude": 25.7,
            "longitude": 122.6
          },
          {
            "latitude": 25.9,
            "longitude": 121.9
          },
          {
            "latitude": 26.2,
            "longitude": 121.4
          },
          {
            "latitude": 27.1,
            "longitude": 120.8
          },
          {
            "latitude": 27.8,
            "longitude": 119.5
          },
          {
            "latitude": 29.0,
            "longitude": 119.0
          },
          {
            "latitude": 30.4,
            "longitude": 118.9
          },
          {
            "latitude": 32.2,
            "longitude": 119.4
          },
          {
            "latitude": 35.1,
            "longitude": 120.4
          },
          {
            "latitude": 36.3,
            "longitude": 121.8
          },
          {
            "latitude": 37.9,
            "longitude": 123.9
          }
        ]
      },
      "5": {
        "id": "0513",
        "name": "TALIM",
        "points": [
          {
            "latitude": 12.5,
            "longitude": 144.6
          },
          {
            "latitude": 12.6,
            "longitude": 144.0
          },
          {
            "latitude": 12.7,
            "longitude": 143.5
          },
          {
            "latitude": 12.8,
            "longitude": 143.0
          },
          {
            "latitude": 13.2,
            "longitude": 142.6
          },
          {
            "latitude": 14.1,
            "longitude": 142.3
          },
          {
            "latitude": 15.7,
            "longitude": 141.7
          },
          {
            "latitude": 16.7,
            "longitude": 141.2
          },
          {
            "latitude": 17.5,
            "longitude": 139.9
          },
          {
            "latitude": 18.3,
            "longitude": 138.8
          },
          {
            "latitude": 19.5,
            "longitude": 137.8
          },
          {
            "latitude": 19.9,
            "longitude": 136.8
          },
          {
            "latitude": 20.6,
            "longitude": 135.6
          },
          {
            "latitude": 20.9,
            "longitude": 134.1
          },
          {
            "latitude": 21.0,
            "longitude": 132.9
          },
          {
            "latitude": 20.9,
            "longitude": 131.8
          },
          {
            "latitude": 21.2,
            "longitude": 130.6
          },
          {
            "latitude": 21.4,
            "longitude": 129.7
          },
          {
            "latitude": 21.7,
            "longitude": 128.5
          },
          {
            "latitude": 22.0,
            "longitude": 127.3
          },
          {
            "latitude": 22.1,
            "longitude": 126.8
          },
          {
            "latitude": 22.2,
            "longitude": 126.4
          },
          {
            "latitude": 22.6,
            "longitude": 125.7
          },
          {
            "latitude": 22.7,
            "longitude": 125.2
          },
          {
            "latitude": 22.9,
            "longitude": 124.7
          },
          {
            "latitude": 23.4,
            "longitude": 124.0
          },
          {
            "latitude": 23.5,
            "longitude": 123.5
          },
          {
            "latitude": 23.8,
            "longitude": 122.8
          },
          {
            "latitude": 24.0,
            "longitude": 122.1
          },
          {
            "latitude": 23.8,
            "longitude": 121.4
          },
          {
            "latitude": 23.6,
            "longitude": 120.9
          },
          {
            "latitude": 24.2,
            "longitude": 120.3
          },
          {
            "latitude": 25.0,
            "longitude": 119.7
          },
          {
            "latitude": 25.4,
            "longitude": 119.5
          },
          {
            "latitude": 25.6,
            "longitude": 118.2
          },
          {
            "latitude": 25.9,
            "longitude": 116.9
          },
          {
            "latitude": 26.6,
            "longitude": 115.5
          },
          {
            "latitude": 27.5,
            "longitude": 114.8
          },
          {
            "latitude": 28.0,
            "longitude": 114.5
          },
          {
            "latitude": 28.5,
            "longitude": 114.4
          }
        ]
      },
      "6": {
        "id": "7512",
        "name": "BETTY",
        "points": [
          {
            "latitude": 16.0,
            "longitude": 143.0
          },
          {
            "latitude": 16.6,
            "longitude": 142.0
          },
          {
            "latitude": 16.6,
            "longitude": 140.8
          },
          {
            "latitude": 16.8,
            "longitude": 139.2
          },
          {
            "latitude": 17.0,
            "longitude": 138.0
          },
          {
            "latitude": 16.9,
            "longitude": 137.5
          },
          {
            "latitude": 16.6,
            "longitude": 137.2
          },
          {
            "latitude": 16.5,
            "longitude": 136.3
          },
          {
            "latitude": 16.7,
            "longitude": 135.6
          },
          {
            "latitude": 17.4,
            "longitude": 135.6
          },
          {
            "latitude": 18.3,
            "longitude": 135.6
          },
          {
            "latitude": 19.2,
            "longitude": 134.7
          },
          {
            "latitude": 19.8,
            "longitude": 133.5
          },
          {
            "latitude": 20.7,
            "longitude": 132.0
          },
          {
            "latitude": 21.3,
            "longitude": 130.6
          },
          {
            "latitude": 21.9,
            "longitude": 129.4
          },
          {
            "latitude": 22.5,
            "longitude": 127.7
          },
          {
            "latitude": 22.6,
            "longitude": 126.2
          },
          {
            "latitude": 22.7,
            "longitude": 124.8
          },
          {
            "latitude": 22.5,
            "longitude": 123.4
          },
          {
            "latitude": 22.6,
            "longitude": 122.0
          },
          {
            "latitude": 22.6,
            "longitude": 120.7
          },
          {
            "latitude": 22.7,
            "longitude": 119.8
          },
          {
            "latitude": 22.7,
            "longitude": 119.0
          },
          {
            "latitude": 23.2,
            "longitude": 118.0
          },
          {
            "latitude": 23.7,
            "longitude": 117.0
          },
          {
            "latitude": 23.5,
            "longitude": 115.5
          },
          {
            "latitude": 24.0,
            "longitude": 115.0
          }
        ]
      },
      "7": {
        "id": "7127",
        "name": "AGNES",
        "points": [
          {
            "latitude": 20.3,
            "longitude": 128.5
          },
          {
            "latitude": 20.5,
            "longitude": 129.2
          },
          {
            "latitude": 21.0,
            "longitude": 130.0
          },
          {
            "latitude": 21.6,
            "longitude": 129.8
          },
          {
            "latitude": 21.3,
            "longitude": 129.7
          },
          {
            "latitude": 21.4,
            "longitude": 130.4
          },
          {
            "latitude": 21.4,
            "longitude": 130.8
          },
          {
            "latitude": 21.4,
            "longitude": 131.4
          },
          {
            "latitude": 21.0,
            "longitude": 131.7
          },
          {
            "latitude": 20.7,
            "longitude": 131.8
          },
          {
            "latitude": 20.3,
            "longitude": 131.7
          },
          {
            "latitude": 20.0,
            "longitude": 131.5
          },
          {
            "latitude": 19.7,
            "longitude": 131.3
          },
          {
            "latitude": 19.6,
            "longitude": 130.7
          },
          {
            "latitude": 19.5,
            "longitude": 130.3
          },
          {
            "latitude": 19.4,
            "longitude": 129.6
          },
          {
            "latitude": 19.2,
            "longitude": 129.0
          },
          {
            "latitude": 19.0,
            "longitude": 128.3
          },
          {
            "latitude": 18.7,
            "longitude": 127.7
          },
          {
            "latitude": 18.6,
            "longitude": 127.0
          },
          {
            "latitude": 18.6,
            "longitude": 126.5
          },
          {
            "latitude": 18.8,
            "longitude": 126.2
          },
          {
            "latitude": 19.3,
            "longitude": 125.8
          },
          {
            "latitude": 19.5,
            "longitude": 125.8
          },
          {
            "latitude": 19.8,
            "longitude": 125.9
          },
          {
            "latitude": 20.1,
            "longitude": 125.9
          },
          {
            "latitude": 20.4,
            "longitude": 125.7
          },
          {
            "latitude": 21.0,
            "longitude": 125.4
          },
          {
            "latitude": 21.5,
            "longitude": 125.0
          },
          {
            "latitude": 22.5,
            "longitude": 124.5
          },
          {
            "latitude": 22.8,
            "longitude": 123.8
          },
          {
            "latitude": 23.0,
            "longitude": 123.3
          },
          {
            "latitude": 23.6,
            "longitude": 122.7
          },
          {
            "latitude": 23.5,
            "longitude": 121.4
          },
          {
            "latitude": 24.0,
            "longitude": 121.0
          },
          {
            "latitude": 24.5,
            "longitude": 120.5
          },
          {
            "latitude": 24.8,
            "longitude": 119.5
          },
          {
            "latitude": 25.0,
            "longitude": 118.5
          }
        ]
      },
      "8": {
        "id": "8604",
        "name": "MAC",
        "points": [
          {
            "latitude": 16.5,
            "longitude": 112.5
          },
          {
            "latitude": 15.8,
            "longitude": 112.0
          },
          {
            "latitude": 15.3,
            "longitude": 111.5
          },
          {
            "latitude": 15.2,
            "longitude": 110.9
          },
          {
            "latitude": 15.4,
            "longitude": 110.3
          },
          {
            "latitude": 15.7,
            "longitude": 109.9
          },
          {
            "latitude": 16.3,
            "longitude": 109.6
          },
          {
            "latitude": 16.9,
            "longitude": 109.5
          },
          {
            "latitude": 17.4,
            "longitude": 109.4
          },
          {
            "latitude": 18.0,
            "longitude": 109.4
          },
          {
            "latitude": 18.6,
            "longitude": 109.4
          },
          {
            "latitude": 19.2,
            "longitude": 109.6
          },
          {
            "latitude": 19.8,
            "longitude": 109.9
          },
          {
            "latitude": 20.2,
            "longitude": 110.4
          },
          {
            "latitude": 20.4,
            "longitude": 111.0
          },
          {
            "latitude": 20.5,
            "longitude": 111.6
          },
          {
            "latitude": 20.5,
            "longitude": 112.0
          },
          {
            "latitude": 20.5,
            "longitude": 112.2
          },
          {
            "latitude": 20.5,
            "longitude": 112.4
          },
          {
            "latitude": 20.4,
            "longitude": 112.6
          },
          {
            "latitude": 20.4,
            "longitude": 112.8
          },
          {
            "latitude": 20.2,
            "longitude": 113.1
          },
          {
            "latitude": 20.0,
            "longitude": 113.4
          },
          {
            "latitude": 19.7,
            "longitude": 114.0
          },
          {
            "latitude": 19.6,
            "longitude": 114.6
          },
          {
            "latitude": 19.5,
            "longitude": 115.1
          },
          {
            "latitude": 19.6,
            "longitude": 115.5
          },
          {
            "latitude": 19.8,
            "longitude": 116.0
          },
          {
            "latitude": 20.0,
            "longitude": 116.5
          },
          {
            "latitude": 20.1,
            "longitude": 117.1
          },
          {
            "latitude": 20.2,
            "longitude": 117.8
          },
          {
            "latitude": 20.1,
            "longitude": 118.4
          },
          {
            "latitude": 20.0,
            "longitude": 119.0
          },
          {
            "latitude": 19.8,
            "longitude": 119.6
          },
          {
            "latitude": 19.8,
            "longitude": 120.2
          },
          {
            "latitude": 20.2,
            "longitude": 120.7
          },
          {
            "latitude": 20.7,
            "longitude": 121.1
          },
          {
            "latitude": 21.3,
            "longitude": 121.5
          },
          {
            "latitude": 21.9,
            "longitude": 121.9
          },
          {
            "latitude": 22.6,
            "longitude": 122.6
          },
          {
            "latitude": 23.0,
            "longitude": 123.0
          },
          {
            "latitude": 23.3,
            "longitude": 123.0
          },
          {
            "latitude": 23.6,
            "longitude": 122.9
          },
          {
            "latitude": 23.5,
            "longitude": 122.8
          },
          {
            "latitude": 23.5,
            "longitude": 123.5
          },
          {
            "latitude": 23.5,
            "longitude": 124.0
          },
          {
            "latitude": 23.4,
            "longitude": 124.9
          },
          {
            "latitude": 23.7,
            "longitude": 126.1
          },
          {
            "latitude": 24.1,
            "longitude": 127.5
          },
          {
            "latitude": 24.6,
            "longitude": 129.0
          },
          {
            "latitude": 25.1,
            "longitude": 130.6
          },
          {
            "latitude": 26.0,
            "longitude": 133.2
          },
          {
            "latitude": 27.0,
            "longitude": 135.8
          },
          {
            "latitude": 29.2,
            "longitude": 138.8
          }
        ]
      },
      "9": {
        "id": "1406",
        "name": "MITAG",
        "points": [
          {
            "latitude": 21.0,
            "longitude": 120.0
          },
          {
            "latitude": 21.0,
            "longitude": 120.7
          },
          {
            "latitude": 21.1,
            "longitude": 121.1
          },
          {
            "latitude": 21.1,
            "longitude": 121.6
          },
          {
            "latitude": 21.4,
            "longitude": 122.0
          },
          {
            "latitude": 22.0,
            "longitude": 122.6
          },
          {
            "latitude": 22.4,
            "longitude": 123.7
          },
          {
            "latitude": 23.1,
            "longitude": 124.8
          },
          {
            "latitude": 23.4,
            "longitude": 125.9
          },
          {
            "latitude": 24.0,
            "longitude": 128.1
          },
          {
            "latitude": 25.6,
            "longitude": 130.1
          },
          {
            "latitude": 27.2,
            "longitude": 132.5
          },
          {
            "latitude": 28.8,
            "longitude": 135.9
          }
        ]
      },
      "10": {
        "id": "0305",
        "name": "NANGKA",
        "points": [
          {
            "latitude": 16.8,
            "longitude": 118.8
          },
          {
            "latitude": 16.7,
            "longitude": 118.5
          },
          {
            "latitude": 16.6,
            "longitude": 118.0
          },
          {
            "latitude": 16.5,
            "longitude": 117.6
          },
          {
            "latitude": 16.7,
            "longitude": 117.2
          },
          {
            "latitude": 16.8,
            "longitude": 117.0
          },
          {
            "latitude": 16.9,
            "longitude": 116.7
          },
          {
            "latitude": 17.1,
            "longitude": 116.5
          },
          {
            "latitude": 17.4,
            "longitude": 117.6
          },
          {
            "latitude": 17.8,
            "longitude": 117.9
          },
          {
            "latitude": 18.4,
            "longitude": 118.2
          },
          {
            "latitude": 19.5,
            "longitude": 118.7
          },
          {
            "latitude": 20.5,
            "longitude": 119.2
          },
          {
            "latitude": 20.7,
            "longitude": 119.8
          },
          {
            "latitude": 21.3,
            "longitude": 121.6
          },
          {
            "latitude": 22.3,
            "longitude": 123.3
          },
          {
            "latitude": 22.7,
            "longitude": 124.9
          },
          {
            "latitude": 23.7,
            "longitude": 127.5
          },
          {
            "latitude": 25.7,
            "longitude": 130.4
          },
          {
            "latitude": 27.6,
            "longitude": 132.5
          },
          {
            "latitude": 29.1,
            "longitude": 135.5
          },
          {
            "latitude": 30.3,
            "longitude": 136.9
          },
          {
            "latitude": 31.5,
            "longitude": 139.4
          },
          {
            "latitude": 33.1,
            "longitude": 141.8
          },
          {
            "latitude": 35.3,
            "longitude": 144.9
          },
          {
            "latitude": 36.2,
            "longitude": 146.2
          },
          {
            "latitude": 37.8,
            "longitude": 149.0
          },
          {
            "latitude": 38.4,
            "longitude": 151.2
          },
          {
            "latitude": 39.5,
            "longitude": 152.9
          },
          {
            "latitude": 39.9,
            "longitude": 154.2
          },
          {
            "latitude": 40.3,
            "longitude": 155.9
          },
          {
            "latitude": 40.3,
            "longitude": 157.0
          },
          {
            "latitude": 40.2,
            "longitude": 158.4
          },
          {
            "latitude": 40.1,
            "longitude": 159.9
          },
          {
            "latitude": 40.3,
            "longitude": 162.6
          }
        ]
      }
    };
    let coorContainer = new Object();

    for(var i in data){
      coorContainer[i] = new Array();
      for (var j in data[i]['points']) {
        coor = [data[i]['points'][j]['longitude'], data[i]['points'][j]['latitude']];
        coor = ol.proj.fromLonLat(coor);
        coorContainer[i].push(coor);
      };
    };

    this.addDataLine(coorContainer); // addDataLine First because of layer order
    // this.addDataPoint(coorContainer);

  }

}
