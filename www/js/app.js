// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('AugWar', ['ionic','LocalStorageModule', 'ui.router']);


app.run(function($ionicPlatform, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs).
        // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
        // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
        // useful especially with forms, though we would prefer giving the user a little more room
        // to interact with the app.
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // Set the statusbar to use the default style, tweak this to
            // remove the status bar on iOS or change it to use white instead of dark colors.
            StatusBar.styleDefault();
        }

        AWS.config.region = 'us-east-1';  //us-west-2 is Oregon
        AWS.config.update({accessKeyId: 'AKIAILLFJKSF7LFEUNUQ', secretAccessKey: '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'});
        AWS.config.update({region: 'us-east-1'});

        var dd = new AWS.DynamoDB();
        var s3 = new AWS.S3();
                         
        $state.go('login');
    });
});
