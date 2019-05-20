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

  plotData (data) {
    console.log('IM iN');
    let coor = new Array();
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
    console.log('IM DONE');
  }

}
