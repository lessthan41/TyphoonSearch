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

  trRadiusControl (value) {
    $('#slidebarvalue').html(value);
    if( $('#tBody tr').length != 0){ // if table have row
      $('#tBody td:last').html(value + 'km'); // changing last td namely radius
    }
  }

  slidebarMinValueControl (mapHaveClicked) {
    if(!mapHaveClicked){ // Map on First Click no need to Function
      return;
    }
    $('#slidebar').attr('min', $('#slidebar').val());
    // console.log('NotFirstClick');
  }

  addTr (coor, rowCount) {

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

  removeRecord (initial) {
    this.tableRowCount = 1;
    $('#tBody tr').remove();
    $('#slidebar').attr('min', 0);
    $('#slidebar').val(initial);
    $('#slidebarvalue').html(initial);
  }
}
