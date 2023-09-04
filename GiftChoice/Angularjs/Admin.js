var app = angular.module("AdminApp", ['lr.upload']);
app.controller("AdminController", ['$scope', 'upload', '$http', '$sce', function ($scope, upload, $http, $sce) {
    var Keywordarr = [];
    $scope.SubmitMainCate = function () {
        for (var i = 0; i < $scope.KeywordList.length; i++) {
            if ($scope.KeywordList[i].Selected) {
                Keywordarr.push($scope.KeywordList[i]);
            }
        }
        debugger
        upload({
            url: '/GiftDashBoard/SubmitMainCate',
            method: 'post',
            data: $scope.MainCate
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                $scope.KeywordArrayData($scope.result.MainCateId);
                //toastr["success"]("Main Category save successfully");
                //$scope.MainCate = null;
                //$scope.GetMainCate();

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

    $scope.KeywordArrayData = function (id) {
        debugger;
        $http({
            url: '/GiftDashBoard/KeywordArrayData',
            method: 'post',
            data: {
                MainCateId: id,
                keywordTbls: Keywordarr,
            }
        }).then(function (d) {
            debugger
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Main Category save successfully");

            } else if ($scope.result.res === "2") {
                toastr["error"]("Product already exist");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.SubmitKeyword = function () {
        if ($("#Keyword").val() === "") {
            toastr["error"]("Please Enter Keyword Category");

            return;
        }
        debugger
        $http({
            url: '/GiftDashBoard/SubmitKeyword',
            method: 'post',
            data: $scope.Keyword
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Keyword save successfully");
                $scope.Keyword = null;
                $scope.GetKeywords();

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

    $scope.GetKeywordbyid = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');
        $scope.Keyword = $scope.KeywordsData[index];
    };
    $scope.RessetMain = function () {
        $('#btn').css('display', 'inline');
        $('#edbtn').css('display', 'none');
        $scope.Keyword = null;
    };
    $scope.UpadateKeyword = function () {

        if ($("#Keyword").val() === "") {
            toastr["error"]("Please Enter Keyword");

            return;
        }
        $http({
            url: '/GiftDashBoard/UpadateKeyword',
            method: 'post',
            data: $scope.Keyword
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Keyword Update successfully");
                $scope.Keyword = null;
                $scope.RessetMain();
                $scope.GetKeywords();
            }
            else {
                toastr["error"]("Keyword not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };
    $scope.KeywordActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/KeywordActiveDeActive?id=" + id).then(function (d) {            
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetKeywords();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };
    $scope.MainCateActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/MainCateActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetMainCate();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
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
    $scope.GetKeywords = function () {
        $http.get("/GiftDashBoard/GetKeywords").then(function (d) {
            $scope.KeywordsData = d.data;
            debugger
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
    $scope.GetMainCateData = function () {
        $http.get("/GiftDashBoard/GetMainCateData").then(function (d) {
            $scope.MainCateData = d.data;
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

