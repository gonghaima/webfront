(function (angular) {
    'use strict';
    angular.module('ngRouteExample', ['ngRoute'])
        .controller('AlbumsController', function ($scope, $route, $routeParams, $location, $http) { 
            $http({
                method: 'GET',
                url: 'http://jsonplaceholder.typicode.com/albums'
            }).then(function successCallback(response) {
                $scope.albums = response.data;
            }, function errorCallback(response) {
            });
        })

     .controller('PhotosController', function ($scope, $routeParams, $http) {
         
         $scope.params = $routeParams;
         $http({
             method: 'GET',
             url: 'http://jsonplaceholder.typicode.com/photos?albumId=' + $scope.params.albumId
         }).then(function successCallback(response) {
             // this callback will be called asynchronously
             // when the response is available
             $scope.photos = response.data;
         }, function errorCallback(response) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
         });
     })

     .controller('PhotosDetailsController', function ($scope, $routeParams, $http) {
         $scope.name = "ChapterController";
         $scope.params = $routeParams;
         var compositeUrl = 'http://jsonplaceholder.typicode.com/photos?id=' + $scope.params.photoId;
         $http({
             method: 'GET',
             url: compositeUrl
         }).then(function successCallback(response) {
             // this callback will be called asynchronously
             // when the response is available
             $scope.photosDetails = response.data;
         }, function errorCallback(response) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
         });
     })
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'albums.html',
                    controller: 'AlbumsController'
                })
                .when('/Photos/:albumId', {
                    templateUrl: 'photos.html',
                    controller: 'PhotosController'
                })
            .when('/Photos/Details/:photoId', {
                templateUrl: 'photosDetails.html',
                controller: 'PhotosDetailsController'
            })
            $locationProvider.html5Mode(true);
        });
})(window.angular);