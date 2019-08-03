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
    this.rowsHavePointOnMap = new Array(); // Remember which rows' lonlat have point on Map for delete
  }

  init() {
    this.query.get()
      .done((get) => {
        this.mapInit();
        this.cardInit(get);
        this.latlonOnChange();
        this.addRowBtnOnClick();
        this.cutRowBtnOnClick();
        this.clearBtnOnClick();
        this.slideBarOnInput();
        this.mapOnClick();
        this.queryOnClick();
        this.switchOnClick();
      });
  }

  /* init */
  mapInit() {
    this.map.init();
  }

  cardInit(get) {
    this.card.init(get);
  }

  /* ClearBtn Onclick */
  clearBtnOnClick() {
    let initial = 50;
    $('#clearBtn').on('click', () => {
      this.mapHaveClicked = false;
      this.rowsHavePointOnMap = [];
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
      let lastLat = $('#tBodyManual tr:last .latlonInput:first').val();
      let lastLon = $('#tBodyManual tr:last .latlonInput:last').val();
      currentValue = $('#slidebar').val();

      if (lastLat.match(/^[0-9]+.[0-9]+$/) | lastLat.match(/^[0-9]+$/)) {
        if (lastLon.match(/^[0-9]+.[0-9]+$/) | lastLon.match(/^[0-9]+$/)) {
          this.map.radiusController(currentValue);
        }
      }
      this.card.trRadiusControl(currentValue); // change slidebar display value
    });
  }

  /* latlon OnChange */
  latlonOnChange() {

    let elem = $('#tBodyManual tr:last');

    elem.on('change', () => {

      let lat = $(elem).closest('tr').find('.latlonInput:first');
      let lon = $(elem).closest('tr').find('.latlonInput:last');
      let order = parseInt($(elem).closest('tr').find('td:first').text());
      let radius = parseInt($(elem).closest('tr').find('td:last').text()) * 1000;
      let coor, justForPlot = true;

      // If input format no problem
      if (this.card.checkLatLonInput(lat, lon)) {

        console.log('Draw!!');
        coor = this.map.LatLontoTM2([parseFloat(lon.val()), parseFloat(lat.val())]);

        if ($.inArray(order, this.rowsHavePointOnMap) == -1) { // New Point
          this.rowsHavePointOnMap.splice(order - 1, 0, order); // Add
          this.map.coorContainer.splice(order - 1, 0, coor); // Add coor

          // Deal with Radius
          if (order == this.card.tableRowCount) { // Last Tr
            this.map.activeRadiusContainer = radius;
            this.map.fixRadiusContainer.push(parseInt($('#tBodyManual tr:nth-last-of-type(2) td:last').text()) * 1000);
          } else {
            this.map.fixRadiusContainer.splice(order - 1, 0, radius)
          }

        } else {
          this.rowsHavePointOnMap.splice(order - 1, 1, order); // Replace
          this.map.coorContainer.splice(order - 1, 1, coor); // Replace coor
        }

        this.map.addMarker(justForPlot);

      } else {

        // console.log('Delete Point from Map!!');
        if($.inArray(order, this.rowsHavePointOnMap) != -1) {
          this.map.coorContainer.splice(this.rowsHavePointOnMap.indexOf(order), 1); // Rm
          this.rowsHavePointOnMap.splice(this.rowsHavePointOnMap.indexOf(order), 1); // Rm

          if (order == this.card.tableRowCount) { // Last Tr
            this.map.activeRadiusContainer = this.map.fixRadiusContainer.pop();
          } else {
            this.map.fixRadiusContainer.splice(order - 1, 1);
          }

          this.map.addMarker(justForPlot);
        }
      }
    });
  }

  /* Map Onclick */
  mapOnClick() {
    let coor;
    this.map.map.on('click', (evt) => {
      setTimeout(() => { // set time out for smartphone version (no instant mousePosition)

        coor = this.map.getMousePosition();

        if (evt.dragging) { // Dragging event Return
          return;
        }
        if (isNaN(coor[0])) { // Prevent Error
          return;
        }
        if (this.card.tableRowCount >= 7) { // Max Points Show Warning and Return
          this.card.showWarning();
          return;
        };
        if(this.rowsHavePointOnMap.length != this.card.tableRowCount){ // All latloninput OK then Add
          if($('#tBodyManual tr:last .latlonInput:first').val() != '' | $('#tBodyManual tr:last .latlonInput:last').val() != '') {
              return;
          }
        }

        this.map.coorContainer.push(this.map.getMousePosition());

        // Cant find this row Point on Map then ADD
        if ($.inArray(this.map.coorContainer.length, this.rowsHavePointOnMap) == -1) {
          this.rowsHavePointOnMap.push(this.map.coorContainer.length);
        }

        this.map.activeRadiusContainer = parseInt($('#slidebarvalue').text()) * 1000;
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
      if(this.rowsHavePointOnMap.length != this.card.tableRowCount){ // All latloninput OK then Add
        return;
      }
      this.card.addTr(['', '']);
      this.latlonOnChange();
      if (this.card.tableRowCount > 1) {
        this.card.slidebarMinValueControl(true, $('#slidebar').val());
      }
    });
  }

  /* Cutrow Btn Onclick */
  cutRowBtnOnClick() {
    $('#cutRowBtn').on('click', () => {
      let lastLat = $('#tBodyManual tr:last .latlonInput:first').val();
      let lastLon = $('#tBodyManual tr:last .latlonInput:last').val();
      this.mapHaveClicked = this.card.tableRowCount == 1 ? false : true;

      this.card.rmTr();
      this.card.hideWarning();

      // console.log('adjust slidebar');
      if (this.card.tableRowCount == 1) {
        this.card.slidebarMinValueControl(true, 1);
      } else {
        this.card.slidebarMinValueControl(true, parseInt($('#tBodyManual tr:nth-last-of-type(2) td:last').text()));
      }
      this.card.trRadiusControl(parseInt($('#tBodyManual td:last').text()));

      // if both match number then delete from this.map.coorContainer & this.rowsHavePointOnMap
      if (lastLat.match(/^[0-9]+.[0-9]+$/) | lastLat.match(/^[0-9]+$/)) {
        if (lastLon.match(/^[0-9]+.[0-9]+$/) | lastLon.match(/^[0-9]+$/)) {
          let radius = this.map.fixRadiusContainer[this.rowsHavePointOnMap.length - 2]; // Unit: m
          let justForPlot = true;

          this.map.coorContainer.pop();
          this.map.activeRadiusContainer = radius; // Replace newest point radius
          this.map.fixRadiusContainer.splice(this.card.tableRowCount - 1); // Rm fixRadius
          this.map.addMarker(justForPlot);

          this.rowsHavePointOnMap.splice($.inArray(this.card.tableRowCount, this.rowsHavePointOnMap)+1, 1);

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
        radius.push(this.map.activeRadiusContainer);
        toPOST = this.query.wrap(coor, radius);
        toPOST = JSON.stringify(toPOST);

        this.query.get('/route_sorting', toPOST)
          .done(() => { // GET Success
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
