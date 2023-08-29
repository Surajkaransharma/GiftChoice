var app = angular.module("AdminApp", ['lr.upload']);
app.controller("AdminController", ['$scope', 'upload', '$http', '$sce', function ($scope, upload, $http, $sce) {
    $scope.SubmitMainCate = function () {
        var formData = new FormData();
        formData.append('Image', $scope.image);
        debugger
        $http({
            url: '/GiftDashBoard/SubmitMainCate',
            method: 'post',
            data: formData
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Main Category save successfully");
                $scope.MainCate = null;
                $scope.GetMainCate();

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
    $scope.SubmitKeyword = function () {

        debugger
        upload({
            url: '/GiftDashBoard/SubmitKeyword',
            method: 'post',
            data: $scope.Keyword
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Keyword save successfully");
                $scope.Keyword = null;
                $scope.GetKeyword();

            } else if ($scope.result.res === "2") {
                toastr["error"]("Keyword already exist");
            }
            else {
                toastr["error"]("Keyword not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };
    //$scope.generateImageElement = function (base64Data) {
    //    const img = new Image();
    //    img.src = 'data:image/jpeg;base64,' + base64Data;
    //    return $sce.trustAsHtml(img.outerHTML);
    //};
    $scope.GetMainCate = function () {
        $http.get("/GiftDashBoard/GetMainCate").then(function (d) {
            $scope.MainCateData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetKeyword = function () {
        $http.get("/GiftDashBoard/GetKeyword").then(function (d) {
            $scope.KeywordData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetKeywordData = function () {
        $http.get("/GiftDashBoard/GetKeywordData").then(function (d) {
            $scope.KeywordList = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetMenu = function () {
        $http.get("/GiftDashBoard/GetMenu").then(function (d) {
            $scope.GetMenuData = d.data;
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

