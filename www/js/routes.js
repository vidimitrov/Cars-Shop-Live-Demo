angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('app', {
      url: '/app',
      abstract:true,
      templateUrl: 'templates/menu.html',
      controller: 'sidemenuCtrl as ctrl'
    })
      
    .state('app.offers', {
      url: '/offers',
      views: {
        'app': {
          templateUrl: 'templates/myOffers.html',
          controller: 'myOffersCtrl as ctrl'
        }
      }
    })

    .state('app.create-offer', {
      url: '/create-offer',
      views: {
        'app': {
          templateUrl: 'templates/create-offer.html',
          controller: 'createOfferCtrl as ctrl'
        }
      }
    })
         
    .state('app.login', {
      url: '/login',
      views: {
        'app': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl as ctrl'
        }
      }
    })
        
    .state('app.signup', {
      url: '/signup',
      views: {
        'app': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        }
      }
    })
        
    .state('app.search', {
      url: '/search',
      views: {
        'app': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl as ctrl'
        }
      }
    })
        
    .state('app.results', {
      url: '/results',
      views: {
        'app': {
          templateUrl: 'templates/results.html',
          controller: 'resultsCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');

});