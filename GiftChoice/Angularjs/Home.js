var app = angular.module("HomeApp", []);
app.controller("HomeController", ['$scope',  '$http', '$sce', function ($scope,  $http, $sce) {
   
        $http.get("/Home/GetNavbarMenu").then(function (d) {
            $scope.NavbarMenuList = d.data;
        }, function (error) {
            alert(error.data);
        });
    $scope.GetProduct = function () {
        debugger
        $http.get("/GiftDashBoard/GetProduct").then(function (d) {
            debugger
            $scope.ProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };
}]);