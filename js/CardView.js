/**
* Deal with Card Component
*
*/
class CardView {
  constructor () {
    this.tableRowCount = 1;
  }

  trRadiusControl (value) {
    $('#slidebarvalue').html(value);
    if( $('#tBody tr').length != 0){ // if table have row
      $('#tBody td:last').html(value + 'km'); // changing last td(newest radius)
    }
  }

  slidebarMinValueControl (mapHaveClicked) {
    if(!mapHaveClicked){ return; } // Map on First Click no need to Function
    $('#slidebar').attr('min', $('#slidebar').val());
  }

  addTr (coor, rowCount) {
    coor = ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');
    coor[0] = Math.round(coor[0]*1000)/1000;
    coor[1] = Math.round(coor[1]*1000)/1000;
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

  removeRecord (initial) {
    this.tableRowCount = 1;
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
  }

  // Tr warning
  showWarning () {
    $('#maxpoints').css('visibility', 'visible');
  }

  hideWarning () {
    $('#maxpoints').css('visibility', 'hidden');
  }

  // Query Onclick Show Result Card
  showResultCard () {
    $('#card2').css('transition', '.3s ease-in-out');
    $('#card2').css('visibility', 'visible');
    $('#card2').css('width', '330px');
    setTimeout( function() { $('#card2').css('height', '300px'); }, 300);
  }

  // Clear Onclick Hide Result Card
  hideResultCard () {
    $('#card2').css('height', '10px');
    setTimeout( function() { $('#card2').css('width', '0px'); }, 300);
    setTimeout( function() { $('#card2').css('visibility', 'hidden'); }, 600);
  }


}
