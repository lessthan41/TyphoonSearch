class CardView {
  constructor (data) {
    this.data = data;
    this.tableRowCount = 1;
  }

  render () {
    this.init();
  }

  init () {

  }

  slidebarValue (value) {
    $('#slidebarvalue').html(value);
    if( $('#tBody tr').length != 0){ // if table have row
      $('#tBody td:last').html(value + 'km'); // changing last td namely radius
    }
  }

  showPointsOnCard (coor, rowCount) {

    coor[0] = Math.round(coor[0]*100)/100;
    coor[1] = Math.round(coor[1]*100)/100;
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

  removeTr () {
    this.tableRowCount = 1;
    $('#tBody tr').remove();
  }
}
