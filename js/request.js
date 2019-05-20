/**
* Init Dashboard Component
* Component Event Handler
*/
class Request {
  constructor () {
    this.getData = null;
  }

  // load data via ajax
  get(url) {
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json'
    })
      .done( (get) => {
        console.log('GET success');
        this.getData = get;
      });
  }

  // post data via ajax
  post(toPOST, url) {
    $.ajax({
      method: 'POST',
      url: url,
      data: JSON.stringify(toPOST), // You have to Stringify TWICE
      dataType: 'json',
      contentType: "application/json; charset=utf-8"
    })
      .done(() => {
          console.log('POST success');
      })
      .fail((err) => {
          console.log('POST failed');
          console.log(err);
      });
  }

  // LonLat to LatLon, to JSON
  wrap (coor, radius) {
    let ret = { points: {}, parameter: {}};
    let coorContainer = new Array();
    let w = $('#wInput').val() == '' ? '' : parseFloat($('#wInput').val());
    let month = $('#mInput').val() == '' ? 0 : parseInt($('#mInput').val());
    let n = $('#nInput').val() == '' ? 10 : parseInt($('#nInput').val());

    for(var i in coor) { // From xy to LonLat
      coorContainer.push(ol.proj.toLonLat(coor[i]));
    };

    // console.log(coorContainer);
    // console.log(radius);

    for(var i=0; i<coorContainer.length; i++){ // Points
      ret['points']['point'+ (i+1)] = {
        longitude: coorContainer[i][0],
        latitude: coorContainer[i][1],
        radius: radius[i]
      };
    };


    ret['parameter']['w'] = w;
    ret['parameter']['month'] = month;
    ret['parameter']['n'] = n;


    // console.log(ret);
    return ret;
  }

  postCheck () {
    let wboolean = true;
    let nboolean = true;
    let mboolean = true;
    let w = $('#wInput').val();
    let n = $('#nInput').val();
    let month = $('#mInput').val();

    $('#wSmall').css('visibility', 'hidden');
    $('#nSmall').css('visibility', 'hidden');
    $('#mSmall').css('visibility', 'hidden');

    if(w != '') { // Examine w
      w = parseFloat(w);
      if(isNaN(w)) {
        $('#wSmall').css('visibility', 'visible');
        wboolean = false;
      };
    };

    if(n != '') { // Examine n
      n = parseFloat(n);
      if(isNaN(n) || !Number.isInteger(n)) {
        $('#nSmall').css('visibility', 'visible');
        nboolean = false;
      };
    };

    if(month != '') { // Examine n
      month = parseFloat(month);
      if(isNaN(month) || !Number.isInteger(month)) {
        $('#mSmall').css('visibility', 'visible');
        mboolean = false;
      };
      if(month <= 0 || month >= 13){
        $('#mSmall').css('visibility', 'visible');
        mboolean = false;
      }
    };

    if(wboolean && nboolean && mboolean){
      return true;
    }
    return false;
  }

}
