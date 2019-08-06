var dashboard;

$('#loadingWord').css('opacity', '1');
$('#loadingWord').css('margin-top', '40vh');

// Document Ready
$(function() {

  dashboard = new DashboardComponent();
  dashboard.init();

});
