class MapComponent {
  constructor (data) {
    this.data = data;
    this.coorContainer = new Array();
    this.mousePositionControl = null;
    this.map = null;
    this.bufferRadius = 50 * 1000; // default 50 km
    this.pointLayer = new ol.layer.Vector({});
    this.lineLayer = new ol.layer.Vector({});
    this.bufferLayer = new ol.layer.Vector({});
    this.pointStyle = [
      new ol.style.Style({
          image: new ol.style.Icon(({
              scale: 0.1,
              rotateWithView: false,
              anchor: [0.5, 1],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              opacity: 1,
              src: 'https://lessthan41.github.io/OL_Practice/map_addMarker/image/pointer.png'
          }))
      })
    ];
    this.lineStyle = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#edeff7',
          width: 2
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
      projection: 'EPSG:4326',
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
          this.bufferLayer // Enpty Layer for addBuffer
        ],
        view: new ol.View({ // setView
          projection: 'EPSG:3857',
          center: ol.proj.fromLonLat([125.9, 22.5]),
          zoom: 7
        })
      });
      // Map Onclick add Marker
      this.map.on('click', (evt) => { // due to callback problem need arrow function
        if (evt.dragging) {
          return;
        }
        this.addMarker();
      });
  }

  // Add pointer
  addMarker () {
    this.coorContainer.push(this.getMousePosition());
    this.addBuffer();
    this.addLine();
    this.addPoint();
  }

  // Clear Pointer and Line
  removeMarker () {
    this.coorContainer = [];
    this.addBuffer();
    this.addLine();
    this.addPoint();
  }

  // Get Coordinate and Return
  getMousePosition () {
    let currentPosition = $('#mouse-position').text();
    let lng = parseFloat(currentPosition.substring(0, 8));
    let lat = parseFloat(currentPosition.substring(10));
    return (ol.proj.fromLonLat([lng, lat]));
  }

  // Add Point
  addPoint () {
    let featureArray = new Array();
    for(var i=0; i<this.coorContainer.length; i++) { // for i in coorContainer add Feature and set style
      featureArray[i] = new ol.Feature({ geometry: new ol.geom.Point(this.coorContainer[i]) });
      featureArray[i].setStyle(this.pointStyle);
    }
    let source = new ol.source.Vector ({ features: featureArray });
    this.pointLayer = new ol.layer.Vector ({ source: source });
    this.map.getLayers().getArray().splice(1,1,this.pointLayer); // replace the previous one
    this.map.render();
  }

  // Add Line
  addLine () {
    let featureLine = new ol.Feature({ geometry: new ol.geom.LineString(this.coorContainer) });
    featureLine.setStyle(this.lineStyle); // set style
    let sourceLine = new ol.source.Vector({ features: [featureLine] });
    this.lineLayer = new ol.layer.Vector({ source: sourceLine });
    this.map.getLayers().getArray().splice(2,1,this.lineLayer); // replace the previous one
    this.map.render();
  }

  // Add Buffer
  addBuffer () { // km
    let bufferArray = new Array();
    for(var i=0; i<this.coorContainer.length; i++){
      bufferArray[i] = new ol.Feature({ geometry: new ol.geom.Circle(this.coorContainer[i], this.bufferRadius ) });
      bufferArray[i].setStyle(this.bufferStyle);
    }
    let sourceBuffer = new ol.source.Vector({ features: bufferArray });
    this.bufferLayer = new ol.layer.Vector({ source: sourceBuffer });
    this.map.getLayers().getArray().splice(3,1,this.bufferLayer); // replace the previous one
    this.map.render();
  }

  // Change radius
  radiusController (radius) {
    this.bufferRadius = radius * 1000; // km
    this.addBuffer();
  }
}
