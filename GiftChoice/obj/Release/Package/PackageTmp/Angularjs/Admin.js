var app = angular.module("AdminApp", ['lr.upload']);
app.controller("AdminController", ['$scope', 'upload', '$http', '$sce', function ($scope, upload, $http, $sce) {
    $scope.SubmitMainCate = function () {
        debugger
        $scope.MainCate.MImage = $("#imgcode").val();
        debugger
        $http({
            url: '/GiftDashBoard/SubmitMainCate',
            method: 'post',
            data: $scope.MainCate
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Main Category save successfully");
                $scope.Main = null;
                $scope.GetMain();

            } else if ($scope.result.res === "2") {
                toastr["error"]("Main Category already exist");
            }
            else {
                toastr["error"]("Main Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };
    $scope.generateImageElement = function (base64Data) {
        const img = new Image();
        img.src = 'data:image/jpeg;base64,' + base64Data;
        return $sce.trustAsHtml(img.outerHTML);
    };
    $scope.GetMainCate = function () {
        $http.get("/GiftDashBoard/GetMainCate").then(function (d) {
            $scope.MainCateData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };
}]).directive('uploadFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var file_uploaded = $parse(attrs.uploadFile);

            element.bind('change', function () {
                scope.$apply(function () {
                    file_uploaded.assign(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

