var app = angular.module("HomeApp", []);
app.controller("HomeController", ['$scope',  '$http', '$sce', function ($scope,  $http, $sce) {
   
        $http.get("/Home/GetNavbarMenu").then(function (d) {
            $scope.NavbarMenuList = d.data;
        }, function (error) {
            alert(error.data);
        });
  
}]);