/**
 * Init Dashboard Component
 * Dashboard Component Event Handler
 */
class DashboardComponent {
  constructor() {
    this.map = new MapComponent();
    this.card = new CardView();
    this.query = new Request();
    this.mapHaveClicked = false; // for control Slidebar min
    this.switchCondition = 'Sun';
  }

  init() {
    this.mapInit();
    this.clearBtnOnClick();
    this.slideBarOnInput();
    this.mapOnClick();
    this.queryOnClick();
    this.switchOnClick();
  }

  // init
  mapInit() {
    this.map.render();
  }

  // ClearBtn Onclick
  clearBtnOnClick() {
    let initial = 50;
    $('#clearBtn').on('click', () => {
      this.mapHaveClicked = false;
      this.map.removeMarker();
      this.card.removeRecord(initial);
      this.map.radiusController(initial);
      this.card.hideResultCard();
    })
  }

  // Slidebar Oninput
  slideBarOnInput() {
    let currentValue;
    $('#slidebar').on('input', () => {
      currentValue = $('#slidebar').val();
      this.map.radiusController(currentValue);
      this.card.trRadiusControl(currentValue); // change slidebar display value
    });
  }

  // Map Onclick
  mapOnClick() {
    let coor;
    let rowCount;
    this.map.map.on('click', (evt) => {
      setTimeout(() => { // set time out for smartphone version (no instant mousePosition)
        if (evt.dragging) {
          return;
        } // Dragging event Return
        coor = this.map.getMousePosition();
        if (isNaN(coor[0])) {
          return;
        } // Prevent Error
        rowCount = this.map.coorContainer.length;
        if (rowCount >= 7) { // Max Points Show Warning and Return
          this.card.showWarning();
          return;
        };
        this.map.addMarker();
        this.card.addTr(coor, rowCount);
        this.card.slidebarMinValueControl(this.mapHaveClicked);
        this.mapHaveClicked = true;
      }, 10);
    });
  }

  // QueryBtn Onclick
  queryOnClick() {
    let toPOST, coor, radius, toGET, data;
    $('#queryBtn').on('click', () => {
      if (this.map.coorContainer.length == 0) {
        return;
      }; // Null Coordinate Return
      if (this.query.postCheck()) {
        this.card.onload();
        coor = this.map.coorContainer;
        radius = this.map.fixRadiusContainer.slice(); // Reference Problem
        radius.push(this.map.bufferRadius);
        toPOST = this.query.wrap(coor, radius);
        toPOST = JSON.stringify(toPOST);
        this.query.post(toPOST, 'http://localhost:5000/route_sorting'); // POST
        this.query.get('http://localhost:5000/route_sorting') // GET
          .done((get) => {
            console.log('GET success');
            console.log(this.query.getData);
            this.map.plotData(this.query.getData);
            setTimeout( () => {
              this.card.disOnload();
              this.card.showResultCard();
            }, 1000)
          });
      }
    });
  }

  switchOnClick () {
    $('#switchBtn').on('click', () => {
      if (this.switchCondition == 'Sun') {
        this.card.btnSwitch('Moon');
        this.map.tileSwitch('Moon');
        this.switchCondition = 'Moon';
      } else if (this.switchCondition == 'Moon') {
        this.card.btnSwitch('Sun');
        this.map.tileSwitch('Sun');
        this.switchCondition = 'Sun';
      };
    });
  }

}
