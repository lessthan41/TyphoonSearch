/**
* Init Dashboard Component
* Component Event Handler
*/
class Request {
  constructor () {
  }

  get(url) { //load data via ajax
    $.ajax({
      method: 'GET',
      url: url,
      dataType: "json",
      success: function(get) {
        console.log(get);
      }
    });
  }

  post(url) { //load data via ajax
    $.ajax({
      method: 'POST',
      url: url,
      dataType: "json",
      success: function(post) {
        console.log(success);
      }
    });
  }

}
