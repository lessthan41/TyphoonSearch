class MapComponent {
  constructor (data) {
    this.data = data;
    this.coorContainer = new Array();
    this.mousePositionControl = null;
    this.map = null;
    this.pointStyle = [
      new ol.style.Style({
          image: new ol.style.Circle({
              radius: 3,
              stroke: new ol.style.Stroke({
                  color: '#e1dee6'
              })
          })
      }),
      new ol.style.Style({
          image: new ol.style.Icon(({
              scale: 0.1,
              rotateWithView: false,
              anchor: [0.5, 1],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              opacity: 1,
              src: 'https://lessthan41.github.io/OL_Practice/map_addMarker/image/pointer.png'
          })),
          zIndex: 5
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
          new ol.layer.Vector({}), // Empty Layer for addLine
          new ol.layer.Vector({})  // Empty Layer for addMarker
        ],
        view: new ol.View({ // setView
          center: ol.proj.fromLonLat([125.9, 22.5]),
          zoom: 7
        })
      });
      // Onclick add Marker
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
    this.relocate(); // line first then points
    if(this.coorContainer.length > 1){ // point numbers > 1 draw line
      this.addLine();
    }
  }

  // Add Line
  addLine () {
    let featureLine = new ol.Feature({ geometry: new ol.geom.LineString(this.coorContainer) });
    featureLine.setStyle(this.lineStyle); // set style
    let sourceLine = new ol.source.Vector({ features: [featureLine] });
    let vectorLayer = new ol.layer.Vector({ source: sourceLine });

    this.map.getLayers().getArray().splice(1,1,vectorLayer); // replace the previous one
  }

  // Clear Pointer and Line
  removeMarker () {
    this.coorContainer = [];
    this.relocate();
    this.addLine();
  }

  // Get Coordinate and Return
  getMousePosition () {
    let currentPosition = $('#mouse-position').text();
    let lng = parseFloat(currentPosition.substring(0, 8));
    let lat = parseFloat(currentPosition.substring(10));
    return (ol.proj.fromLonLat([lng, lat]));
  }

  // Relocate marker
  relocate () {
    let feature = this.coorContainer.slice();
    let coorCount = 0;
    for(var i=0; i<feature.length; i++) { // for i in coorCintainer add Feature and set style
      feature[i] = new ol.Feature(new ol.geom.Point(this.coorContainer[coorCount]));
      feature[i].setStyle(this.pointStyle);
      coorCount++;
    }
    let source = new ol.source.Vector ({ features: feature });
    let pointLayer = new ol.layer.Vector ({ source: source });
    // this.map.getLayers().pop();
    // this.map.addLayer(pointLayer);
    this.map.getLayers().getArray().splice(2,1,pointLayer); // replace the previous one
    this.map.render();
  }
}
