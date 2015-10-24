App.config(function ($routeProvider) {
  $routeProvider
    .when('/', 
      {
        controller: 'GameCtrl',
        templateUrl: 'app/templates/index.html'
      }
    )
    .when('/setLineup', 
      {
        controller: 'GameCtrl',
        templateUrl: 'app/templates/setLineup.html'
      }
    )
    .when('/playGame', 
      {
        controller: 'GameCtrl',
        templateUrl: 'app/templates/playGame.html'
      }
    )
    .otherwise( { redirectTo: '/' } );
});