var app = angular.module("app", []);
app.controller("appController", function ($scope, $http) {
    
    $scope.login = function () {
        debugger
        $http({
            url: '/GiftChoiceWelcome/Login',
            method: 'post',
            data: $scope.Userdata
        }).then(function (d) {
            $scope.result = d.data;
            debugger
            if ($scope.result.res === "1") {
                window.location.href = $scope.result.redirectUrl;
            }
            else {
                alert($scope.result.res);
            }
        }, function (error) {
            alert(error.data);
        });
    };
});
