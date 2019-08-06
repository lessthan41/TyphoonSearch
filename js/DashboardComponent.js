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
    this.sunOrMoon = 'Sun';
    this.centerOrMaual = 'Center';
    this.resultHoverEvent = null;
    this.rowsHavePointOnMap = new Array(); // Remember which rows' lonlat have point on Map for delete
  }

  init() {
    this.mapInit();
    this.query.get()
      .done((get) => {
        this.getReady();
        this.cardInit(get);
        this.latlonOnChange();
        this.addRowBtnOnClick();
        this.cutRowBtnOnClick();
        this.clearBtnOnClick();
        this.slideBarOnInput();
        this.mapOnClick();
        this.queryOnClick();
        this.switchOnClick();
        this.switchManaulCenter();
        this.centerBtnOnClick();
        this.centerBtnPlot();
      });
  }

  /* DisOnload */
  getReady () {
    setTimeout(() => {
      $('#loadingWord').css('opacity', '0');
      $('#loadingWord').css('margin-top', '39vh');
      this.card.disOnload();
    }, 1000);
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
    $('#clearBtn').on('click', () => {
      this.removeRecord();
      if(this.centerOrMaual == 'Center') {
        this.centerBtnPlot();
      }
    })
  }

  /* Remove Record */
  removeRecord() {
    let initial = 50;
    this.mapHaveClicked = false;
    this.rowsHavePointOnMap = [];
    this.map.removeMarker();
    this.card.removeRecord(initial);
    this.latlonOnChange();
    this.map.radiusController(initial);
    this.card.hideResultCard();
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
        coor = this.map.LonLattoTM2([parseFloat(lon.val()), parseFloat(lat.val())]);

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

        if (this.centerOrMaual == 'Center') {
          return;
        }
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
        coor = this.map.TM2toLonLat(coor); // coor transform
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

    $('#queryBtn').on('click', () => {
      let toPOST;
      if(this.centerOrMaual == 'Center') {
        let indx = $('#CenterBtnDiv .active').text();
        let points = new Object();
        let data = new Object();

        Object.assign(data, this.card.centerData[indx]);

        for (var i in data['points']) {
          points[i] = {
            'longitude': data['points'][i]['longitude'],
            'latitude': data['points'][i]['latitude'],
            'radius': data['points'][i]['radius']
          };
        }

        let parameter = {
          'w': data['parameter']['w'],
          'month': data['parameter']['month'],
          'n': data['parameter']['n']
        };
        toPOST = {points, parameter};
        this.card.onload();

      } else {
        if (this.map.coorContainer.length == 0) { // Null Coordinate Return
          return;
        }
        if (this.query.postCheck()) {
          this.card.onload();
          let coor, radius, toGET, data;
          coor = this.map.coorContainer;
          radius = this.map.fixRadiusContainer.slice(); // Reference Problem
          radius.push(this.map.activeRadiusContainer);
          toPOST = this.query.wrap(coor, radius);
        }
      }
      toPOST = JSON.stringify(toPOST);
      console.log(toPOST);
      this.query.get('/route_sorting', toPOST)
        .done(() => { // GET Success
          console.log('GET success');
          console.log(this.query.getData);
          this.map.plotData(this.query.getData);
          setTimeout(() => {
            this.card.disOnload();
            this.card.showResultCard(this.query.getData);
            this.resultOnHover(this.sunOrMoon);
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
    });
  }

  /* Switch Btn Onclick */
  switchOnClick() {
    $('#switchBtn').on('click', () => {
      if (this.sunOrMoon == 'Sun') {
        this.card.SunMoon('Moon');
        this.map.tileSwitch('Moon');
        this.resultOnHover('Moon');
        this.sunOrMoon = 'Moon';
      } else if (this.sunOrMoon == 'Moon') {
        this.card.SunMoon('Sun');
        this.map.tileSwitch('Sun');
        this.resultOnHover('Sun');
        this.sunOrMoon = 'Sun';
      };
    });
  }

  /* Result Card Onhover */
  resultOnHover(sunOrMoon) {
    let resultHoverEvent;
    let hoverColor = sunOrMoon == 'Sun' ? '#e1f4de' : '#8c8c8c';
    let returnColor = sunOrMoon == 'Sun' ? 'white' : '#4c4c4c';

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

  /* For Switch Manual & Center */
  switchManaulCenter() {
    $('#Center-tab').on('click', () => {
      setTimeout(() => {
        $('#forMoveDiv').insertAfter('#typhoonTableDiv');
        this.removeRecord();
        this.centerOrMaual = 'Center';
        this.centerBtnPlot();
      }, 100);
    });
    $('#Manual-tab').on('click', () => {
      setTimeout(() => {
        $('#forMoveDiv').insertAfter('#undertable');
        this.removeRecord();
        this.centerOrMaual = 'Manual';
        this.map.removeMarker();
      }, 100);
    });
  }

  /* Center Btn Onclick Plot on Map */
  centerBtnOnClick () {

    $('#CenterBtnDiv button').on('click', () => {
      this.centerBtnPlot();
    });

  }

  /* Center Btn Plot Function */
  centerBtnPlot () {
    let radius, justForPlot = true;
    let fixRadius = new Array();
    let coor = new Array();
    let data = new Object();
    let i, j;

    Object.assign(data, this.card.centerData[$('#CenterBtnDiv .active').text()]['points']);

    for (i=1; i<=Object.keys(data).length; i++) {
      for (j in data) {
        if (parseInt(j.substring(5)) == i) {
          coor.push(this.map.LonLattoTM2([data[j]['longitude'], data[j]['latitude']]));
          fixRadius.push(data[j]['radius']);
        }
      }
    }

    radius = fixRadius.pop();

    this.map.coorContainer = coor.slice();
    this.map.activeRadiusContainer = radius;
    this.map.fixRadiusContainer = fixRadius.slice();

    this.map.addMarker(justForPlot);
  }
}
