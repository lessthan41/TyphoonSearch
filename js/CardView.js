/**
 * Deal with Card Component
 *
 */
class CardView {
  constructor() {
    this.tableRowCount = 1;
    this.resultTableExist = false;
    this.switchCondition = 'Sun';
    this.hoverEvent = null;
  }

  trRadiusControl(value) {
    $('#slidebarvalue').html(value);
    if ($('#tBody tr').length != 0) { // if table have row
      $('#tBody td:last').html(value + 'km'); // changing last td(newest radius)
    }
  }

  slidebarMinValueControl(mapHaveClicked) {
    if (!mapHaveClicked) {
      return;
    } // Map on First Click no need to Function
    $('#slidebar').attr('min', $('#slidebar').val());
  }

  addTr(coor, rowCount) {
    coor = ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');
    coor[0] = Math.round(coor[0] * 1000) / 1000;
    coor[1] = Math.round(coor[1] * 1000) / 1000;
    $('#tBody')
      .append($('<tr>')
        .append($('<td>')
          .html(this.tableRowCount))
        .append($('<td>')
          .html(coor[1]))
        .append($('<td>')
          .html(coor[0]))
        .append($('<td>')
          .html($('#slidebarvalue').text() + 'km')));
    this.tableRowCount++;
  }

  removeRecord(initial) {
    this.tableRowCount = 1;
    // $('#card1').css('max-height', '358.2px');
    // setTimeout(() => {
    $('#tBody tr').remove();
    $('#slidebar').attr('min', 1);
    $('#slidebar').val(initial);
    $('#slidebarvalue').html(initial);
    $('#wInput').val('');
    $('#nInput').val('');
    $('#mInput').val('');
    $('#wSmall').css('visibility', 'hidden');
    $('#nSmall').css('visibility', 'hidden');
    $('#mSmall').css('visibility', 'hidden');
    $('#card1').css('max-height', '400px');

    this.hideWarning();

    // }, 300);
  }

  // Tr warning
  showWarning() {
    $('#maxpoints').css('visibility', 'visible');
  }

  hideWarning() {
    $('#maxpoints').css('visibility', 'hidden');
  }

  // Query Onclick Show Result Card
  showResultCard(data) {

    let name, ret;
    let tableColor = this.switchCondition == 'Sun' ?
      $('<table>').attr('class', 'table').attr('id', 'resultTable') :
      $('<table>').attr('class', 'table').attr('id', 'resultTable').css('color', 'white');
    this.expandResultCard();

    if(!this.resultTableExist) { // thead does not Exist
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

    for(var i in data){
      $('#resultTbody')
        .append($('<tr>')
          .append($('<td>').html(i))
          .append($('<td>').html(data[i]['name']))
          .append($('<td>').html(data[i]['id'])));
    };

    $('#resultTbody tr').css('transition', '.3s ease-in-out');
  }

  // Clear Onclick Hide Result Card
  hideResultCard() {

    if(this.resultTableExist) { // thead does not Exist
      $('#resultTable').remove();
      this.resultTableExist = false;
    };
    $('#card2').css('overflow-y', 'hidden');
    this.shrimpResultCard();
  }

  // Expand Result Card
  expandResultCard () {
    $('#card2').css('visibility', 'visible');
    $('#card2').css('width', '400px');
    setTimeout(function() {
      $('#card2').css('height', '280px');
    }, 300);
  }

  // Shrimp Result Card
  shrimpResultCard () {
    $('#card2').css('height', '10px');
    setTimeout(function() {
      $('#card2').css('width', '0px');
      $('#card2').css('visibility', 'hidden');
    }, 300);
  }

  // History Route Onload
  onload() {
    $('#drawBgcolor').css('display', 'unset');
    $('.spinner-grow').css('display', 'unset');
    $('#drawBgcolor').css('opacity', '1');
  }

  // Stop Onload
  disOnload() {
    $('#drawBgcolor').css('opacity', '0');
    $('.spinner-grow').css('opacity', '0');
    setTimeout( () => {
      $('#drawBgcolor').css('display', 'none');
      $('.spinner-grow').css('display', 'none');
    }, 800);
  }

  // Sun or Moon Btn
  btnSwitch (btncase) {
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

  // CSS View Change between Sun and Moon
  SunMoon (sunOrMoon) {
    this.switchCondition = sunOrMoon;
    let onloadColor = sunOrMoon == 'Sun' ? '#fcfcfca1' : '#00000098';
    let cardColor = sunOrMoon == 'Sun' ? 'white' : '#4c4c4c';
    let spinColor = sunOrMoon == 'Sun' ? 'black' : 'white';
    let fontColor = sunOrMoon == 'Sun' ? 'black' : '#ece6f8';
    let boxShadow = sunOrMoon == 'Sun' ? '1px 1px 5px #728e97' : '1px 1px 5px #6e6e6e';
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
  }

}
