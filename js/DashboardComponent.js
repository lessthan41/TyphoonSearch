
/**
* Init Dashboard Component
* Component Event Handler
*/

class DashboardComponent {
  constructor (data) {
    this.data = data;
    this.map = new MapComponent(this.data);
    this.card = new CardView(this.data);
  }

  init () {
    this.mapInit();
    this.cardInit();
    this.clearBtnOnClick();
    this.slideBarOnInput();
    this.mapOnClick();
  }

  // init
  mapInit () {
    this.map.render();
  }
  cardInit () {
    this.card.render()
  }

  // ClearBtn Onclick
  clearBtnOnClick () {
    $('#clearBtn').on('click', () => {
      this.map.removeMarker();
      this.card.removeTr();
    })
  }

  // Slidebar Oninput
  slideBarOnInput () {
    let currentValue;
    $('#slidebar').on('input', () => {
      currentValue = $('#slidebar').val();
      this.map.radiusController(currentValue);
      this.card.slidebarValue(currentValue); // change slidebar display value
    });
  }

  // Map Onclick
  mapOnClick () {
    let coor;
    let rowCount;
    this.map.map.on('click', (evt) => {
      setTimeout( () => { // set time out for smartphone version (no instant mousePosition)
        if(evt.dragging){
          return;
        }
        coor = this.map.getMousePosition();
        rowCount = this.map.coorContainer.length;
        this.card.showPointsOnCard(coor, rowCount);
        this.map.addMarker();
      }, 10);
    });
  }

}
