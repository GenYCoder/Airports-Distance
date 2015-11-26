//dependencies
angular = require("angular");
require("angucomplete-alt");
require("angular-google-maps");
require('angular-simple-logger');
window._ = require('lodash');


angular.module("airportApp", ["angucomplete-alt", "uiGmapgoogle-maps"])
    .config(["uiGmapGoogleMapApiProvider", function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDTwePGZxkNewWjdfu29-iYrhq4cR2sNRo',
            v: '3.20',
            libraries: 'geometry, visualization'
        });
    }])
    .controller("airportApp.controller", ["$scope", "$http", "uiGmapGoogleMapApi", function($scope, $http, uiGmapGoogleMapApi) {

        $scope.distanceResult = null;
        $scope.polylines = [];
        $scope.map = {};


        //watches if user selected a airport point
        $scope.$watchGroup(['airportA', 'airportB'], function(newValues, oldValues, scope) {
            //checks if scope exist and calculate the distance
            if (!angular.isUndefined(scope.airportA) && !angular.isUndefined(scope.airportB)) {

                var airportALatitude = scope.airportA.originalObject.latitutde,
                    airportALongitude = scope.airportA.originalObject.longitude,
                    airportBLatitude = scope.airportB.originalObject.latitutde,
                    airportBLongitude = scope.airportB.originalObject.longitude;

                //return the results
                $scope.distanceResult = haversine(airportALatitude, airportALongitude, airportBLatitude, airportBLongitude);

                //initialize the map
                $scope.map = {
                    center: {
                        latitude: (airportALatitude + airportBLatitude) / 2,
                        longitude: (airportALongitude + airportBLongitude) / 2
                    },
                    zoom: 4
                };


                //plotting the line between the two airports
                uiGmapGoogleMapApi.then(function() {

                    
                    $scope.polylines = [{
                        id: 1,
                        path: [{
                            latitude: airportALatitude,
                            longitude: airportALongitude
                        }, {
                            latitude: airportBLatitude,
                            longitude: airportBLongitude
                        }],
                        stroke: {
                            color: '#FF0000',
                            weight: 3
                        },
                        fit: true,
                        geodesic: true,
                        visible: true,
                        static: true,
                        icons: [{
                            icon: {
                                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                            },
                            offset: '25px',
                            repeat: '50px'
                        }]
                    }];


                });

            }

        });


        //find the distance of two points by coordinates
        var haversine = function() {
            var radians = Array.prototype.map.call(arguments, function(deg) {
                return deg / 180.0 * Math.PI;
            });

            var lat1 = radians[0],
                lon1 = radians[1],
                lat2 = radians[2],
                lon2 = radians[3];
            var R = 6372.8; // km
            var dLat = lat2 - lat1;
            var dLon = lon2 - lon1;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.asin(Math.sqrt(a));
            return Math.round((R * c) * 0.53996); //to nm
        };


    }]);
