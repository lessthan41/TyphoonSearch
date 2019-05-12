class DashboardComponent {
  constructor (data) {
    this.data = data;
    this.map = new MapComponent(this.data);
    this.card = new CardView(this.data);
  }

  init () {
    this.mapInit();
    this.cardInit();
    this.clearBtn();
    this.slideBar();
    this.showPointsOnCard();
  }

  // Map init
  mapInit () {
    this.map.render();
  }
  cardInit () {
    this.card.render()
  }

  // ClearBtn Onclick
  clearBtn () {
    $('#clearBtn').on('click', () => {
      this.map.removeMarker();
      this.card.removeTr();
    })
  }

  // Slidebar On input
  slideBar () {
    let currentValue;
    $('#slidebar').on('input', () => {
      currentValue = $('#slidebar').val();
      this.map.radiusController(currentValue);
      this.card.slidebarValue(currentValue); // change slidebar display value
    });
  }

  // Link Map with Table
  showPointsOnCard () {
    let coor;
    let rowCount;
    this.map.map.on('click', (evt) => {
      if(evt.dragging){
        return;
      }
      coor = this.map.getMousePosition();
      rowCount = this.map.coorContainer.length;
      this.card.showPointsOnCard(coor, rowCount);
    });
  }

}
