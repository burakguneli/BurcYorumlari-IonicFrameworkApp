.controller('MyCtrl', ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams{

  var config = {
    headers : {
    'Content-Type': 'application/json'
    }
  }

  $http.get("http://ruyaveburcyorumlari.com/burclar/app/detay.php?name=" + $stateParams.name, config)
  .success(function(response){

    $scope.hurriyet = response.0;
    $scope.mynet = response.1;
    $scope.mahmure = response.2;
    $scope.elle = response.3;
    $scope.milliyet = response.4;
    $scope.sabah = response.5;

    $scope.groups = [hurriyet, mynet, mahmure, elle, milliyet, sabah];

    $scope.groups[0] = {
      name: "Hürriyet Yorumu",
      tarih: hurriyet.tarih,
      show: false
    };
    $scope.groups[1] = {
      name: "Mynet Yorumu",
      show: false
    };
    $scope.groups[2] = {
      name: "Mahmure Yorumu",
      show: false
    };
    $scope.groups[3] = {
      name: "Elle Yorumu",
      show: false
    };
    $scope.groups[4] = {
      name: "Milliyet Yorumu",
      show: false
    };
    $scope.groups[5] = {
      name: "Sabah Yorumu",
      show: false
    };
  });


  
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };


  var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                interstitial: 'ca-app-pub-3940256099942544/1033173712'
            };
        } else {
            admobid = { // for Windows Phone
                interstitial: 'ca-app-pub-3940256099942544/1033173712'
            };
        }

    if(window.AdMob) AdMob.prepareInterstitial({
            adId:admobid.interstitial,
            isTesting:false,
            autoShow:true
          });
  
});