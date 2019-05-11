
$(function () {
  var data = 123;
  var dashboard = new DashboardComponent(data);

  // dashboard init
  dashboard.init();

  // clearBtn onclick
  $('#clearBtn').on('click', function () {
    dashboard.clearBtn();
  })

});
