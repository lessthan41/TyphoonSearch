/**
* Init Dashboard Component
* Component Event Handler
*/
class Request {
  constructor () {
  }

  // load data via ajax
  get(url) {
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json',
      success: function(get) {
        console.log(get);
      }
    });
  }

  // post data via ajax
  post(toPOST, url) {
    $.ajax({
      method: 'POST',
      url: url,
      data: JSON.stringify(toPOST),
      dataType: 'json',
      contentType: "application/json; charset=utf-8"
    })
    .done(function(data) {
          // do stuff here
          console.log('success');
      })
      .fail(function(err) {
          // do stuff here
          console.log('failed');
      });
  }

  // LonLat to LatLon, to JSON
  wrap (coor, radius) {
    let ret = { points: {}, parameter: {}};
    let coorContainer = new Array();
    let w = $('#wInput').val();
    let month = $('#mInput').val();
    let n = $('#nInput').val();

    for(var i in coor) { // From xy to LonLat
      coorContainer.push(ol.proj.toLonLat(coor[i]));
    };

    // console.log(coorContainer);
    // console.log(radius);

    for(var i=0; i<coorContainer.length; i++){ // Points
      ret['points']['point'+ (i+1)] = {
        longtitude: coorContainer[i][0],
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
