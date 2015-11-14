// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic', 'ngCordova']);

example.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

example.controller("ExampleController", function($scope, $cordovaFileTransfer, $cordovaCamera) {

    $scope.pictureUrl = 'http://placehold.it/300x300'

    //take picture
    $scope.takePicture = function() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.NATIVE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options)
        .then(function(imageData) {
            console.log('camera data: ' + angular.toJson(imageData));
            $scope.pictureUrl = imageData;
           // $scope.pictureUrl = "data:image/jpeg;base64," + imageData;;
        }, function(err) {
            console.log('camera error: ' + angular.toJson(imageData));
        });
    };

    //upload from photo library
    $scope.openPhotoLibrary = function() {
      var options = {
        quality: 100,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options)
        .then(function(imageData) {
            console.log('camera data: ' + angular.toJson(imageData));
            $scope.pictureUrl = imageData;

             var server = "http://192.168.1.75:1688/upload"
                filePath = imageData;

            var date = new Date();

            var options = {
                fileKey: "file",
                fileName: imageData.substr(imageData.lastIndexOf('/') + 1),
                chunkedMode: false,
                mimeType: "image/jpg"
            };

            $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                console.log('Result_' + result.response[0] + '_ending');
                alert("success");
                alert(JSON.stringify(result.response));

            }, function(err) {
                console.log("ERROR: " + JSON.stringify(err));
                //alert(JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
            });

        }, function(err) {
            console.log('camera error: ' + angular.toJson(imageData));
        });
    };

    //upload with image data
    $scope.uploadPicture = function(data) {
         var options = {
                fileKey: "file",
                fileName: data.substr(data.lastIndexOf('/') + 1),
                chunkedMode: false,
                mimeType: "image/jpg"
            };
        $cordovaFileTransfer.upload("http://192.168.1.73:1688/upload", data, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
        });
    };
 
    //upload from asset
    $scope.upload = function() {
        var options = {
            fileKey: "avatar",
            fileName: "image.jpg",
            chunkedMode: false,
            mimeType: "image/png"
        };
        $cordovaFileTransfer.upload("http://192.168.1.73:1688/upload", "/android_asset/www/img/image.jpg", options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
        });
    }
});