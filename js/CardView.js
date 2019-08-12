/**
 * Deal with Card Component
 *
 */
class CardView {
  constructor() {
    this.slideBarValue = 50; // radius slidebar start from 50km
    this.tableRowCount = 1;
    this.resultTableExist = false;
    this.sunOrMoon = 'Sun';
    this.centerData = new Object();
    this.typhoonInfo = new Array();
  }

  init(get) {

    for (let i in get) {
      this.typhoonInfo.push(get[i]['info']);
      delete get[i]['info'];

      for (let center in get[i]) {
        get[i][center]['parameter']['n'] = 10;
      }
    }

    this.centerData = get;

    this.initTr();
    this.initCenterBtn();
    this.initCenterTr();
  }

  /* Init Center Btn Div */
  initCenterBtn () {
    let i, indx = Object.keys(this.centerData)[0];

    for(i in this.centerData[indx]){
      $('#CenterBtnDiv')
        .append($('<button>')
          .attr('class', 'btn btn-outline-primary')
          .html(i)
        )
    }

    $('#CenterBtnDiv button:first').addClass('active');

    $('#CenterBtnDiv button').on('click', function () {
      $('#CenterBtnDiv button').removeClass('active');
      $(this).addClass('active');
    });
  }

  /* Everything in Center tab */
  initCenterTr () {

    $('#tBodyCenter tr').remove();

    for (let i in this.typhoonInfo) {
      $('#tBodyCenter')
      .append($('<tr>').attr('onclick',
      'dashboard.centerTrOnClick(this); dashboard.centerBtnPlot();')
        .append($('<td>')
          .html(this.typhoonInfo[i]['code'])
        )
        .append($('<td>')
          .css('padding', '0.55rem')
          .append($('<a>')
            .attr('href', this.typhoonInfo[i]['links'])
            .attr('target', '_blank')
            .html(this.typhoonInfo[i]['zh'])
          )
        )
        .append($('<td>')
          .css('width', '38%')
          .html(this.typhoonInfo[i]['en'])
        )
      );
    }

    $('#tBodyCenter a').css('color', '#3936a9');
    $('#tBodyCenter tr:first')
      .attr('id', 'selected')
      .css('background-color', '#f0f0f0');
  }

  /* Everything for Radius in position */
  trRadiusControl(value) {
    $('#slidebarvalue').html(value);
    if ($('#tBodyManual tr').length != 0) { // if table have row
      $('#slidebar').val(value);
      $('#tBodyManual td:last div').html(value + 'km'); // changing last td(newest radius)
    }
  }

  slidebarMinValueControl(mapHaveClicked, toSetValue) {
    if (!mapHaveClicked) {
      return;
    } // Map on First Click no need to Function
    $('#slidebar').attr('min', toSetValue);
  }

  /* for Clear Btn */
  initTr() {
    $('#tBodyManual tr').remove();
    $('#tBodyManual')
      .append($('<tr>')
        .append($('<td>')
          .html(this.tableRowCount)
        )
        .append($('<td>').attr('class', 'inputTd')
          .append($('<div>').attr('class', 'latlonCenterDiv')
            .append($('<input>')
              .attr('class', 'form-control latlonInput')
              .attr('placeholder', 'Lat')
              .css('width', '83px')
              .css('height', '30px')
            )
          )
        )
        .append($('<td>').attr('class', 'inputTd')
          .append($('<div>').attr('class', 'latlonCenterDiv')
            .append($('<input>')
              .attr('class', 'form-control latlonInput')
              .attr('placeholder', 'Lon')
              .css('width', '83px')
              .css('height', '30px')
            )
          )
        )
        .append($('<td>')
          .append($('<div>').attr('class', 'radiusTdDiv')
            .html($('#slidebarvalue').text() + 'km')
          )
        )
      );
  }

  /* Transform coor from TM2(m) to latlon and addTr */
  addTr(coor) {

    if (this.tableRowCount >= 7) { // Max Points Show Warning and Return
      this.showWarning();
      return;
    };

    this.tableRowCount++;
    let lastLat = $('#tBodyManual tr:last .latlonInput:first').val();
    let lastLon = $('#tBodyManual tr:last .latlonInput:last').val();

    if (lastLon == '' | lastLat == '') { // if Last tr is blank
      this.tableRowCount--;
      if (coor[0] == '' && coor[1] == '') { // if Add Row Return
        return;
      } else { // if mapOnClick add
        $('#tBodyManual tr:last').remove();
      }
    }

    coor[0] = Math.round(coor[0] * 1000) / 1000;
    coor[1] = Math.round(coor[1] * 1000) / 1000;

    if (coor[0] == 0 && coor[1] == 0) {
      coor[0] = '';
      coor[1] = '';
    }

    $('#tBodyManual')
      .append($('<tr>')
        .append($('<td>')
          .html(this.tableRowCount)
        )
        .append($('<td>').attr('class', 'inputTd')
          .append($('<div>').attr('class', 'latlonCenterDiv')
            .append($('<input>')
              .attr('class', 'form-control latlonInput')
              .attr('placeholder', 'Lat')
              .attr('value', coor[1])
              .css('width', '83px')
              .css('height', '30px')
            )
          )
        )
        .append($('<td>').attr('class', 'inputTd')
          .append($('<div>').attr('class', 'latlonCenterDiv')
            .append($('<input>')
              .attr('class', 'form-control latlonInput')
              .attr('placeholder', 'Lon')
              .attr('value', coor[0])
              .css('width', '83px')
              .css('height', '30px')
            )
          )
        )
        .append($('<td>')
          .append($('<div>').attr('class', 'radiusTdDiv')
            .html($('#slidebarvalue').text() + 'km')
          )
        )
      );
  }

  rmTr() {
    if (this.tableRowCount == 1) {
      $('#tBodyManual tr:last .latlonInput:first').val('');
      $('#tBodyManual tr:last .latlonInput:last').val('');
      return;
    }

    this.tableRowCount--;
    $('#tBodyManual tr:last').remove();
  }

  /* Check if input format is good */
  checkLatLonInput(lat, lon) {

    let latboolean = true;
    let lonboolean = true;
    let latValue = lat.val();
    let lonValue = lon.val();

    // Lat Check
    if (!latValue.match(/^-?[0-9]+.[0-9]+$/) && !latValue.match(/^-?[0-9]+$/)) {
      this.latlonInputError(lat);
      latboolean = false;
    } else if (parseFloat(latValue) > 90 | parseFloat(latValue) < -90) {
      this.latlonInputError(lat);
      latboolean = false;
    } else {
      this.latlonInputOK(lat);
    }

    // Lon Check
    if (!lonValue.match(/^-?[0-9]+.[0-9]+$/) && !lonValue.match(/^-?[0-9]+$/)) {
      this.latlonInputError(lon);
      lonboolean = false;
    } else if (parseFloat(lonValue) > 180 | parseFloat(lonValue) < -180) {
      this.latlonInputError(lon);
      lonboolean = false;
    } else {
      this.latlonInputOK(lon);
    }

    if (latboolean && lonboolean) {
      return true;
    } else {
      return false;
    }

  }

  /* Change latlon input bgcolor */
  latlonInputError(elem) {
    elem.css('background-color', 'rgb(232, 226, 228)')
  }

  latlonInputOK(elem) {
    elem.css('background-color', '#fff')
  }

  removeRecord(initial) {
    this.tableRowCount = 1;
    this.initTr();
    $('#slidebar').attr('min', 1);
    $('#slidebar').val(initial);
    $('#slidebarvalue').html(initial);
    $('#wInput').val('');
    $('#nInput').val('');
    $('#mInput').val('');
    $('#wSmall').css('visibility', 'hidden');
    $('#nSmall').css('visibility', 'hidden');
    $('#mSmall').css('visibility', 'hidden');
    $('#card1').css('max-height', '380px');

    this.trRadiusControl(50);
    this.hideWarning();

  }

  /* Tr warning */
  showWarning() {
    $('#maxpointstext').css('visibility', 'visible');
  }

  hideWarning() {
    $('#maxpointstext').css('visibility', 'hidden');
  }

  /* Query Onclick Show Result Card */
  showResultCard(data) {

    let tableColor = this.sunOrMoon == 'Sun' ?
      $('<table>').attr('class', 'table').attr('id', 'resultTable') :
      $('<table>').attr('class', 'table').attr('id', 'resultTable').css('color', 'white');
    this.expandResultCard();

    if (!this.resultTableExist) { // thead does not Exist
      $('#card2body').append(tableColor
        .append($('<thead>')
          .append($('<tr>')
            .append($('<th>').attr('scope', 'col').html('Order'))
            .append($('<th>').attr('scope', 'col').html('Name'))
            .append($('<th>').attr('scope', 'col').html('ID'))))
        .append($('<tbody>').attr('id', 'resultTbody')));
      this.resultTableExist = true;
    };

    $('#card2').css('overflow-y', 'scroll');
    $('#resultTbody tr').remove(); // Clear Table

    for (var i in data) {
      $('#resultTbody')
        .append($('<tr>')
          .append($('<td>').html(i))
          .append($('<td>')
            .append($('<a>')
              .attr('href', data[i]['links'])
              .attr('target', '_blank')
              .html(data[i]['name'])
            )
          )
          .append($('<td>').html(data[i]['id'])));
    };

    $('#resultTbody tr').css('transition', '.3s ease-in-out');
  }

  /* Clear Onclick Hide Result Card */
  hideResultCard() {

    if (this.resultTableExist) { // thead does not Exist
      $('#resultTable').remove();
      this.resultTableExist = false;
    };
    $('#card2').css('overflow-y', 'hidden');
    this.shrimpResultCard();
  }

  /* Expand Result Card */
  expandResultCard() {
    $('#card2').css('visibility', 'visible');
    $('#card2').css('width', '400px');
    setTimeout(function() {
      $('#card2').css('height', '280px');
    }, 300);
  }

  /* Shrimp Result Card */
  shrimpResultCard() {
    $('#card2').css('height', '10px');
    setTimeout(function() {
      $('#card2').css('width', '0px');
      $('#card2').css('visibility', 'hidden');
    }, 300);
  }

  /* History Route Onload */
  onload() {
    $('#drawBgcolor').css('display', 'unset');
    $('.spinner-grow').css('display', 'unset');
    $('#drawBgcolor').css('opacity', '1');
  }

  /* Stop Onload */
  disOnload() {
    $('#drawBgcolor').css('opacity', '0');
    $('.spinner-grow').css('opacity', '0');
    setTimeout(() => {
      $('#drawBgcolor').css('display', 'none');
      $('.spinner-grow').css('display', 'none');
      $('#loadingWord').css('display', 'none');
    }, 800);
  }

  /* Sun or Moon Btn */
  btnSwitch(btncase) {
    switch (btncase) {
      case 'Moon':
        $('.fa-sun').css('display', 'unset');
        $('.fa-moon').css('display', 'none');
        break;

      case 'Sun':
        $('.fa-moon').css('display', 'unset');
        $('.fa-sun').css('display', 'none');
        break;
    };
  }

  /* CSS View Change between Sun and Moon */
  SunMoon(sunOrMoon) {
    this.sunOrMoon = sunOrMoon;
    let onloadColor = sunOrMoon == 'Sun' ? '#fcfcfca1' : '#00000098';
    let cardColor = sunOrMoon == 'Sun' ? 'white' : '#4c4c4c';
    let spinColor = sunOrMoon == 'Sun' ? 'black' : 'white';
    let fontColor = sunOrMoon == 'Sun' ? 'black' : '#ece6f8';
    let boxShadow = sunOrMoon == 'Sun' ? '1px 1px 5px #728e97' : '1px 1px 5px #6e6e6e';
    let inputColor = sunOrMoon == 'Sun' ? '#FFF' : '#f6f1f1';
    let addcutRowFontColor = sunOrMoon == 'Sun' ? '#6c757d' : '#d8d8d8';
    let addcutRowFontHover = '#ffffff';
    let addcutRowBorderColor = sunOrMoon == 'Sun' ? '#848f98' : '#d8d8d8';
    let aTagColor = sunOrMoon == 'Sun' ? '#3936a9' : '#70e075';
    let navLinkColor = sunOrMoon == 'Sun' ? 'white !important' : '#afb9af !important';
    let centerBtnToRemove = sunOrMoon == 'Sun' ? 'btn-outline-light' : 'btn-outline-primary';
    let centerBtnToAdd = sunOrMoon == 'Sun' ? 'btn-outline-primary' : 'btn-outline-light';
    let centerTr = sunOrMoon == 'Sun' ? 'white' : '#4c4c4c';
    let selectedTr = sunOrMoon == 'Sun' ? '#f0f0f0' : '#696969';
    let centerTrHover = sunOrMoon == 'Sun' ? '#e4e4e4' : '#777777';

    this.btnSwitch(sunOrMoon);
    $('.card').css('background-color', cardColor);
    $('.spinner-grow').css('color', spinColor);
    $('#detail').css('color', fontColor);
    $('#mouse-position').css('color', fontColor);
    $('.card').css('color', fontColor);
    $('.table').css('color', fontColor);
    $('.card').css('box-shadow', boxShadow);
    $('#drawBgcolor').css('background-color', onloadColor);
    $('#resultTbody tr').css('background-color', cardColor);
    $('.form-control').css('background-color', inputColor);
    $('.table a').css('color', aTagColor);

    $('.btn-outline-secondary').css('color', addcutRowFontColor);
    $('.btn-outline-secondary').css('border-color', addcutRowBorderColor);
    $('.btn-outline-secondary').hover(function() {
      $(this).css('color', addcutRowFontHover);
    }, function() {
      $(this).css('color', addcutRowFontColor);
    });

    $('#CenterBtnDiv button').removeClass(centerBtnToRemove);
    $('#CenterBtnDiv button').addClass(centerBtnToAdd);
    $('.nav-tabs > li > a').css('background-color', navLinkColor);

    $('#tBodyCenter tr').css('background-color', centerTr);
    $('#tBodyCenter tr').hover( function() {
      $(this).css('background-color', centerTrHover);
    }, function () {
      $(this).css('background-color', centerTr);
    });

    $('#tBodyCenter #selected').css('background-color', selectedTr);
    $('#tBodyCenter #selected').hover( function() {
      $(this).css('background-color', centerTrHover);
    }, function () {
      $(this).css('background-color', selectedTr);
    });


  }

}
