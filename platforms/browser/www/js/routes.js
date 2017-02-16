app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "loginCtrl"
    })

    .state('signup', {
      url: "/signup",
      templateUrl: "views/signup.html",
      controller: "signupCtrl"
    })
    
    .state('createCharacter', {
      url: "/createCharacter",
      templateUrl: "views/createCharacter.html",
      controller: "createCharacterCtrl"
    })

    .state('currentZone', {
      url: "/currentZone",
      templateUrl: "views/currentZone.html",
      controller: "currentZoneCtrl"
    })

  $urlRouterProvider.otherwise('/login');

});