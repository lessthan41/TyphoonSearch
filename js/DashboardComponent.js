/**
* Init Dashboard Component
* Dashboard Component Event Handler
*/
class DashboardComponent {
  constructor () {
    this.map = new MapComponent();
    this.card = new CardView();
    this.query = new Request();
    this.mapHaveClicked = false; // for control Slidebar min
  }

  init () {
    this.mapInit();
    this.clearBtnOnClick();
    this.slideBarOnInput();
    this.mapOnClick();
    this.queryOnClick();
  }

  // init
  mapInit () {
    this.map.render();
  }

  // ClearBtn Onclick
  clearBtnOnClick () {
    $('#clearBtn').on('click', () => {
      let initial = 50;
      this.mapHaveClicked = false;
      this.map.removeMarker();
      this.card.removeRecord(initial);
      this.map.radiusController(initial);
    })
  }

  // Slidebar Oninput
  slideBarOnInput () {
    let currentValue;
    $('#slidebar').on('input', () => {
      currentValue = $('#slidebar').val();
      this.map.radiusController(currentValue);
      this.card.trRadiusControl(currentValue); // change slidebar display value
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
        this.card.addTr(coor, rowCount);
        this.map.addMarker();
        this.card.slidebarMinValueControl(this.mapHaveClicked);
        this.mapHaveClicked = true;
      }, 10);
    });
  }

  queryOnClick () {
    $('#queryBtn').on('click', () => {
      console.log('Start Query');



    });
  }

}
