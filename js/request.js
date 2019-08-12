/**
 * Request Functions
 *
 */
class Request {
  constructor() {
    this.getData = null;
    // this.GET_request = null;
  }

  /* get data via ajax */
  get(url = '/typhoon_forecast', toPOST = '') {

    if (toPOST != '') {
      url = url + '?toPOST=' + toPOST
    }

    // this.GET_request =

    return $.ajax({ // return to use done
        method: "GET",
        url: url
      })
      .done((get) => {
        this.getData = get;
      });
     // this.GET_request;

  }

  /* LonLat to LatLon, to JSON */
  wrap(coor, radius) {
    let ret = {
      points: {},
      parameter: {}
    };
    let coorContainer = new Array();
    let w = $('#wInput').val() == '' ? '' : parseFloat($('#wInput').val());
    let month = $('#mInput').val() == '' ? 0 : parseInt($('#mInput').val());
    let n = $('#nInput').val() == '' ? 10 : parseInt($('#nInput').val());

    for (var i in coor) { // From xy to LonLat
      coorContainer.push(ol.proj.toLonLat(coor[i]));
    };

    // console.log(coorContainer);
    // console.log(radius);

    for (var i = 0; i < coorContainer.length; i++) { // Points
      ret['points']['point' + (i + 1)] = {
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

  /* Check if input no wrong */
  postCheck() {
    let wboolean = true;
    let nboolean = true;
    let mboolean = true;
    let latlonboolean = true;
    let w = $('#wInput').val();
    let n = $('#nInput').val();
    let month = $('#mInput').val();

    $('#wSmall').css('visibility', 'hidden');
    $('#nSmall').css('visibility', 'hidden');
    $('#mSmall').css('visibility', 'hidden');

    $('.latlonInput').each((i, v) => { // Examine lat lon input
      let elem = $(v);
      if (!elem.val().match(/^\d+\.?\d*$/)) {
        latlonboolean = false;
        return;
      }
    });

    if (w != '') { // Examine w
      w = parseFloat(w);
      if (isNaN(w)) {
        $('#wSmall').css('visibility', 'visible');
        wboolean = false;
      };
    };

    if (n != '') { // Examine n
      n = parseFloat(n);
      if (isNaN(n) || !Number.isInteger(n)) {
        $('#nSmall').css('visibility', 'visible');
        nboolean = false;
      };
    };

    if (month != '') { // Examine n
      month = parseFloat(month);
      if (isNaN(month) || !Number.isInteger(month)) {
        $('#mSmall').css('visibility', 'visible');
        mboolean = false;
      };
      if (month <= 0 || month >= 13) {
        $('#mSmall').css('visibility', 'visible');
        mboolean = false;
      }
    };

    if (wboolean && nboolean && mboolean && latlonboolean) {
      return true;
    }
    alert('Input format wrong, please correct.')
    return false;
  }

}
