angular = require("angular");
require("angucomplete-alt");

angular.module("airportApp", ["angucomplete-alt"])
    .controller("airportApp.controller", ["$scope", "$http", "$filter", function($scope, $http, $filter) {

        $scope.distanceResult = null;

        //watches if user selected a airport point
        $scope.$watchGroup(['airportA', 'airportB'], function(newValues, oldValues, scope) {
            //checks if scope exist and calculate the distance
            if (!angular.isUndefined(scope.airportA) && !angular.isUndefined(scope.airportB)) {

                var airportALatitude = scope.airportA.originalObject.latitutde,
                    airportALongitude = scope.airportA.originalObject.longitude,
                    airportBlatitutde = scope.airportB.originalObject.latitutde,
                    airportBLongitude = scope.airportB.originalObject.longitude;

                //return the results
                $scope.distanceResult = haversine(airportALatitude, airportALongitude, airportBlatitutde, airportBLongitude);
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
        }
    }])
