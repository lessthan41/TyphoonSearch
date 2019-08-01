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
    this.resultHoverEvent = null;
  }

  init() {
    this.mapInit();
    this.cardInit();
    this.latlonOnChange();
    this.addRowBtnOnClick();
    this.cutRowBtnOnClick();
    this.clearBtnOnClick();
    this.slideBarOnInput();
    this.mapOnClick();
    this.queryOnClick();
    this.switchOnClick();
  }

  /* init */
  mapInit() {
    this.map.init();
  }

  cardInit() {
    this.card.init();
  }

  /* ClearBtn Onclick */
  clearBtnOnClick() {
    let initial = 50;
    $('#clearBtn').on('click', () => {
      this.mapHaveClicked = false;
      this.map.removeMarker();
      this.card.removeRecord(initial);
      this.latlonOnChange();
      this.map.radiusController(initial);
      this.card.hideResultCard();
    })
  }

  /* Slidebar Oninput */
  slideBarOnInput() {
    $('#slidebar').on('input', () => {
      let currentValue;
      let lastLat = $('#tBody tr:last .latlonInput:first').val();
      let lastLon = $('#tBody tr:last .latlonInput:last').val();
      currentValue = $('#slidebar').val();

      if(lastLat.match(/^[0-9]+.[0-9]+$/) | lastLat.match(/^[0-9]+$/)) {
        this.map.radiusController(currentValue);
      }
      this.card.trRadiusControl(currentValue); // change slidebar display value
    });
  }

  /* latlon OnChange */
  latlonOnChange() {
    $('.latlonInput').each((i, v) => { // Order, this
      let elem = $(v);
      elem.on('change', () => {

        if(!elem.val().match(/^\d+\.?\d+$/)) { // if it's not a number
          this.card.latlonInputError(elem);
          return;
        } else {
          this.card.latlonInputOK(elem);
        }

        let lat = $(elem).closest('tr').find('.latlonInput:first');
        let lon = $(elem).closest('tr').find('.latlonInput:last');
        let order = parseInt($(elem).closest('tr').find('td:first').text());
        let latboolean = true, lonboolean = true;
        let coor;

        // Lat Check
        // Check no Empty Value
        if (!lat.val().match(/^[0-9]+.[0-9]+$/) && !lat.val().match(/^[0-9]+$/)){
          this.card.latlonInputError(lat);
          latboolean = false;
        } else {
          this.card.latlonInputOK(lat);
        }

        // Lon Check
        if (!lon.val().match(/^[0-9]+.[0-9]+$/) && !lon.val().match(/^[0-9]+$/)) {
          this.card.latlonInputError(lon);
          lonboolean = false;
        } else {
          this.card.latlonInputOK(lon);
        }

        // If no problem
        if (latboolean && lonboolean){
          console.log('Draw!!');
          coor = this.map.LatLontoTM2([parseFloat(lon.val()), parseFloat(lat.val())]);
          this.map.coorContainer[order-1] = coor; // Replace the old coor
          this.map.addMarker();
        }
      });
    });
  }

  /* Map Onclick */
  mapOnClick() {
    let coor;
    this.map.map.on('click', (evt) => {
      setTimeout(() => { // set time out for smartphone version (no instant mousePosition)
        if (evt.dragging) {
          return;
        } // Dragging event Return
        coor = this.map.getMousePosition();
        if (isNaN(coor[0])) { // Prevent Error
          return;
        }
        if (this.card.tableRowCount >= 7) { // Max Points Show Warning and Return
          this.card.showWarning();
          return;
        };
        this.map.coorContainer.push( this.map.getMousePosition() );
        this.map.addMarker();
        coor = this.map.TM2toLatLon(coor); // coor transform
        this.card.addTr(coor);
        this.latlonOnChange(); // Add Onchange Event
        this.card.slidebarMinValueControl(this.mapHaveClicked, $('#slidebar').val());
        this.mapHaveClicked = true;
      }, 10);
    });
  }

  /* Addrow Btn Onclick */
  addRowBtnOnClick() {
    $('#addRowBtn').on('click', () => {
      this.card.addTr(['','']);
      this.latlonOnChange();
      if(this.card.tableRowCount > 1){
        this.card.slidebarMinValueControl(true, $('#slidebar').val());
      }
    });
  }

  /* Cutrow Btn Onclick */
  cutRowBtnOnClick() {
    $('#cutRowBtn').on('click', () => {
      let lastLat = $('#tBody tr:last .latlonInput:first').val();
      let lastLon = $('#tBody tr:last .latlonInput:last').val();
      this.card.rmTr();
      this.card.hideWarning();

      // if both match number then delete from this.map.coorContainer
      if (lastLat.match(/^[0-9]+.[0-9]+$/) | lastLat.match(/^[0-9]+$/)){
        if(lastLon.match(/^[0-9]+.[0-9]+$/) | lastLon.match(/^[0-9]+$/)) {
          let radius = parseInt($('#tBody td:last').text()) * 1000; // Unit: m

          // console.log('delete coor from map');
          this.map.coorContainer.pop();
          this.map.bufferRadius = radius; // Replace newest point radius
          this.map.fixRadiusContainer.splice(this.card.tableRowCount-1); // Rm fixRadius
          this.map.addMarker();

          // console.log(this.map.bufferRadius);
          // console.log(this.map.fixRadiusContainer);

          // console.log('adjust slidebar');
          if(this.card.tableRowCount <= 2) {
            this.card.slidebarMinValueControl(true, 0);
          } else {
            this.card.slidebarMinValueControl(true, parseInt($('#tBody tr:nth-last-of-type(2) td:last').text()));
          }
          this.card.trRadiusControl(parseInt($('#tBody td:last').text()));

        }
      }
    });
  }

  /* Query Btn Onclick */
  queryOnClick() {
    let toPOST, coor, radius, toGET, data;
    $('#queryBtn').on('click', () => {
      if (this.map.coorContainer.length == 0) { // Null Coordinate Return
        return;
      };
      if (this.query.postCheck()) {
        this.card.onload();
        coor = this.map.coorContainer;
        radius = this.map.fixRadiusContainer.slice(); // Reference Problem
        radius.push(this.map.bufferRadius);
        toPOST = this.query.wrap(coor, radius);
        toPOST = JSON.stringify(toPOST);

        console.log(toPOST);

        this.query.get('/route_sorting', toPOST)
          .done((get) => { // GET Success
            console.log('GET success');
            console.log(this.query.getData);
            this.map.plotData(this.query.getData);
            setTimeout(() => {
              this.card.disOnload();
              this.card.showResultCard(this.query.getData);
              this.resultOnHover(this.switchCondition);
            }, 1000);
            return;
          })
          .fail(() => { // GET Failed
            setTimeout(() => {
              console.log('GET failed');
              alert('Query Abort, Please Try Again');
              this.card.disOnload();
            }, 100);
          });
      }
    });
  }

  /* Switch Btn Onclick */
  switchOnClick() {
    $('#switchBtn').on('click', () => {
      if (this.switchCondition == 'Sun') {
        this.card.SunMoon('Moon');
        this.map.tileSwitch('Moon');
        this.resultOnHover('Moon');
        this.switchCondition = 'Moon';
      } else if (this.switchCondition == 'Moon') {
        this.card.SunMoon('Sun');
        this.map.tileSwitch('Sun');
        this.resultOnHover('Sun');
        this.switchCondition = 'Sun';
      };
    });
  }

  /* Result Card Onhover */
  resultOnHover(switchCondition) {
    let resultHoverEvent;
    let hoverColor = switchCondition == 'Sun' ? '#e1f4de' : '#8c8c8c';
    let returnColor = switchCondition == 'Sun' ? 'white' : '#4c4c4c';

    /* Control CSS & Store Data */
    $('#resultTbody tr').hover(function() {
      $(this).css('background-color', hoverColor);
      resultHoverEvent = $(this).closest('tr').find('td:first').text();
    }, function() {
      $('#resultTbody tr').css('background-color', returnColor);
    });

    /* Pass Data */
    $('#resultTbody tr').on('mouseover', () => {
      this.map.dataLineShine(resultHoverEvent);
    });

    /* Restore Color */
    $('#resultTbody tr').on('mouseout', () => {
      this.map.addDataLine(this.map.lineDataCoor);
    });

  }

}
