// window.fbAsyncInit = function () {
//     FB.init({
//       appId: '282642712156492',
//       xfbml: true,
//       version: 'v2.8'
//     })
//   FB.AppEvents.logPageView()
// };
//
// (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));
//
// FB.getLoginStatus(function(response) {
//   if (response.status === 'connected') {
//     console.log('Logged in.');
//   }
//   else {
//     FB.login();
//   }
// });



// window.fbAsyncInit = function () {
//     FB.init({ appId: '282642712156492', cookie: true, xfbml: true, oauth: true });
//
//     // *** here is my code ***
//     if (typeof facebookInit == 'function') {
//         facebookInit();
//     }
// };
//
// (function(d){
//     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
//     js = d.createElement('script'); js.id = id; js.async = true;
//     js.src = "//connect.facebook.net/en_US/all.js";
//     d.getElementsByTagName('head')[0].appendChild(js);
// }(document));
//
// function facebookInit() {
//   FB.getLoginStatus(function(response) {
//     if (response.status === 'connected') {
//       console.log('Logged in.');
//     }
//     else {
//       FB.login();
//     }
//   });
// }


function fbInit (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=282642712156492";
  fjs.parentNode.insertBefore(js, fjs);
}
fbInit(document, 'script', 'facebook-jssdk');
