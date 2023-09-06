var app = angular.module("HomeApp", []);
app.controller("HomeController", ['$scope',  '$http', '$sce', function ($scope,  $http, $sce) {
   
        $http.get("/Home/GetNavbarMenu").then(function (d) {
            $scope.NavbarMenuList = d.data;
            debugger
        }, function (error) {
            alert(error.data);
        });
    $scope.GetProduct = function () {
        debugger
        $http.get("/Home/GetProduct").then(function (d) {
            debugger
            $scope.ProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetProductByid = function (id) {
        debugger 
        $http.get("/Home/GetProductByid?id=" + id).then(function (d) {
            debugger
            $scope.Product = d.data;
            $('#desc').html($scope.Product.PDesc);
        }, function (error) {
            alert(error.data);
        });
    };
}]);