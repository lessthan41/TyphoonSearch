/**
 * Deal with Card Component
 *
 */
class CardView {
  constructor() {
    this.slideBarValue = 50; // radius slidebar start from 50km
    this.tableRowCount = 1;
    this.resultTableExist = false;
    this.switchCondition = 'Sun';
    this.hoverEvent = null;
    this.navOpen = false;
    this.navClose = false;
  }

  init() {
    this.initTr();
    this.initNav();
  }

  trRadiusControl(value) {
    $('#slidebarvalue').html(value);

    if ($('#tBody tr').length != 0) { // if table have row
      // $('#tBody tr').find('td:last').html(value + 'km')
      $('#slidebar').val(value);
      $('#tBody td:last div').html(value + 'km'); // changing last td(newest radius)
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
    $('#tBody tr').remove();
    $('#tBody')
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
    let lastLat = $('#tBody tr:last .latlonInput:first').val();
    let lastLon = $('#tBody tr:last .latlonInput:last').val();

    if(lastLon == '' | lastLat == '') { // if Last tr is blank
      this.tableRowCount--;
      if(coor[0] == '' && coor[1] == '') { // if Add Row Return
        return;
      } else { // if mapOnClick add
        $('#tBody tr:last').remove();
      }
    }

    coor[0] = Math.round(coor[0] * 1000) / 1000;
    coor[1] = Math.round(coor[1] * 1000) / 1000;

    if(coor[0] == 0 && coor[1] == 0) {
      coor[0] = '';
      coor[1] = '';
    }

    $('#tBody')
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
    if(this.tableRowCount == 1) {
      $('#tBody tr:last .latlonInput:first').val('');
      $('#tBody tr:last .latlonInput:last').val('');
      return;
    }

    this.tableRowCount--;
    $('#tBody tr:last').remove();
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
    $('#card1').css('max-height', '430px');

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

    let tableColor = this.switchCondition == 'Sun' ?
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
    console.log(123);

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
    this.switchCondition = sunOrMoon;
    let onloadColor = sunOrMoon == 'Sun' ? '#fcfcfca1' : '#00000098';
    let cardColor = sunOrMoon == 'Sun' ? 'white' : '#4c4c4c';
    let spinColor = sunOrMoon == 'Sun' ? 'black' : 'white';
    let fontColor = sunOrMoon == 'Sun' ? 'black' : '#ece6f8';
    let boxShadow = sunOrMoon == 'Sun' ? '1px 1px 5px #728e97' : '1px 1px 5px #6e6e6e';
    let inputColor = sunOrMoon == 'Sun' ? '#FFF' : '#f6f1f1';
    let addcutRowFontColor = sunOrMoon == 'Sun' ? '#6c757d' : '#d8d8d8';
    let addcutRowFontHover = '#ffffff';
    let addcutRowBorderColor = sunOrMoon == 'Sun' ? '#848f98' : '#d8d8d8';
    let navIcon = sunOrMoon == 'Sun' ? '#003c8880' : '#ffffff99';
    let sidenav = sunOrMoon == 'Sun' ? '#eaeaea' : '#bbbbbb';
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
    $('.btn-outline-secondary').css('color', addcutRowFontColor);
    $('.btn-outline-secondary').css('border-color', addcutRowBorderColor);
    $('.btn-outline-secondary').mouseover(function() {
      $(this).css('color', addcutRowFontHover);
    }).mouseout(function() {
      $(this).css('color', addcutRowFontColor);
    });
    $('#navicon').css('color', navIcon);
    $('.sidenav').css('background-color', sidenav);
  }

  /* Side Nav */
  initNav() {
    $('#navicon').on( "mouseover", () => {
      setTimeout(() => { this.openNav(); }, 150);
    });

    $('#mySidenav').on( "mouseleave", () => {
      setTimeout(() => { this.closeNav(); }, 150);
    });
  }

  openNav() {
    if(this.navClose == true){
      return;
    }
    this.navOpen = true;
    document.getElementById('mySidenav').style.width = '250px';
    setTimeout(() => {this.navOpen = false;}, 200);
  }

  closeNav() {
    if(this.navOpen == true){
      return;
    }
    this.navClose = true;
    document.getElementById('mySidenav').style.width = '0px';
    setTimeout(() => {this.navClose = false;}, 200);
  }

}
