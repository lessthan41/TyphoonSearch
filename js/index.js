var dashboard;

// Document Ready
$(function() {
  dashboard = new DashboardComponent();

  // dashboard init
  dashboard.init();

});

$('#center').on('click', function(){
//   dashboard.query.get().done((get) => {
//     toPOST = get['CWB']
//     console.log(toPOST);
//
//     dashboard.query.get('/route_sorting', JSON.stringify(toPOST))
//       .done((get) => { // GET Success
//         console.log('GET success');
//         console.log(this.query.getData);
//         dashboard.map.plotData(this.query.getData);
//         setTimeout(() => {
//           dashboard.card.disOnload();
//           dashboard.card.showResultCard(this.query.getData);
//           dashboard.resultOnHover(this.switchCondition);
//         }, 1000);
//         return;
//       })
//       .fail(() => { // GET Failed
//         setTimeout(() => {
//           console.log('GET failed');
//           alert('Query Abort, Please Try Again');
//           dashboard.card.disOnload();
//         }, 100);
//       });
//
//     // dashboard.map.();
//   });
});
