// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //ionic.Platform.fullScreen();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var admobid = {};
        // select the right Ad Id according to platform
      if( /(android)/i.test(navigator.userAgent) ) { 
          admobid = { // for Android
            banner: 'ca-app-pub-8927374835696568/6972473134',
          };
      }
      else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-8927374835696568/6972473134',
        };
      }

    if(window.AdMob) AdMob.createBanner({
      adId:admobid.banner, 
      position:AdMob.AD_POSITION.BOTTOM_CENTER,
      "adSize" : AdMob.AD_SIZE.BANNER, 
      autoShow:true
    });

    $cordovaGoogleAnalytics.debugMode();
    $cordovaGoogleAnalytics.startTrackerWithId('UA-73539335-4');

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats/:name',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.controller("ChatsCtrl", ["$scope", "$stateParams", function($scope, $stateParams){
  $scope.burc = $stateParams.name; 
}])

.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
          });
      }
  };
})

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})

.controller('MyCtrl', ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams){

  var config = {
    headers : {
    'Content-Type': 'application/json'
    }
  }
  $http.get("http://ruyaveburcyorumlari.com/burclar/app/detay.php?name=" + $stateParams.name, config)
  .success(function(response){

    $scope.data = response.burc_isim;
    $scope.replaced = $scope.data;

    $scope.groups = [];

    $scope.groups[0] = {
      name: "Hürriyet Yorumu",
      tarih: response[0].tarih,
      yorum: response[0].yorum,
      show: false
    };
    $scope.groups[1] = {
      name: "Mynet Yorumu",
      tarih: response[1].tarih,
      yorum: response[1].yorum,
      show: false
    };
    $scope.groups[2] = {
      name: "Mahmure Yorumu",
      tarih: response[2].tarih,
      yorum: response[2].yorum,
      show: false
    };
    $scope.groups[3] = {
      name: "Elle Yorumu",
      tarih: response[3].tarih,
      yorum: response[3].yorum,
      show: false
    };
    $scope.groups[4] = {
      name: "Milliyet Yorumu",
      tarih: response[4].tarih,
      yorum: response[4].yorum,
      show: false
    };
    $scope.groups[5] = {
      name: "Sabah Yorumu",
      tarih: response[5].tarih,
      yorum: response[5].yorum,
      show: false
    };
  });
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  


  var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                interstitial: 'ca-app-pub-8927374835696568/1767188731'
            };
        } else {
            admobid = { // for Windows Phone
                interstitial: 'ca-app-pub-8927374835696568/1767188731'
            };
        }

    if(window.AdMob) AdMob.prepareInterstitial({
            adId:admobid.interstitial,
            autoShow:true
          });
  
}]);