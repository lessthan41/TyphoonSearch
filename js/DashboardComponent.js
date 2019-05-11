class DashboardComponent {
  constructor (data) {
    this.data = data;
    this.map = new MapComponent(this.data);
    // console.log(data);
  }

  init () {
    this.mapInit();
  }

  // Map init
  mapInit () {
    this.map.render();
  }
  // ClearBtn Onclick
  clearBtn () {
    this.map.removeMarker();
  }
  // Radius Slidebar
  slideBar () {
    let currentValue = $('#slidebar').val();
    this.map.radiusController(currentValue);
  }

}
