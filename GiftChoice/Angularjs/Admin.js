var app = angular.module("AdminApp", ['lr.upload']);
app.controller("AdminController", ['$scope', 'upload', '$http', '$sce', function ($scope, upload, $http, $sce) {

    ///////  Add Product Start 

    $scope.MainCateKeyword = function (MainCateId) {
        debugger;
        for (var s = 0; s < $scope.KeywordList.length; s++) {
            var vallc1s = $scope.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', false);

        }
        var id = parseInt(MainCateId);
        var dataArray = [];
        dataArray = $scope.MainCateData;
        var dataArray2 = dataArray.filter(item => item.MainCateId === id);

        if (dataArray2.length > 0) {
            var submenu = dataArray2[0].Submenu;

            if (submenu && submenu.length > 0) {
                for (var i = 0; i < submenu.length; i++) {
                    for (var k = 0; k < $scope.KeywordList.length; k++) {
                        if ($scope.KeywordList[k].KeywordId == submenu[i].KeywordId) {
                            var vallc = submenu[i].KeywordId;
                            $('#Keyword_' + vallc).prop('checked', true);
                        }
                    }
                }
            }
        }
    };


    $scope.GetProductbyid = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');
        debugger

        for (var s = 0; s < $scope.KeywordList.length; s++) {
            var vallc1s = $scope.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', false);

        }


        $scope.Product = $scope.ProductData[index];

        CKEDITOR.instances.ckeditor.setData($scope.Product.PDesc);
        //const previewImage = document.querySelector('#previewImage');
        //$('#previewImage').css('display', 'block');
        //previewImage.setAttribute("src", "/images/MainCate/" + $scope.MainCate.MImage);
        debugger
        for (var i = 0; i < $scope.Product.Submenu.length; i++) {
            var vallc = $scope.Product.Submenu[i].KeywordId;
            $('#Keyword_' + vallc).prop('checked', true);
        }


        debugger

        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);


        debugger
        $('html, body').animate({ scrollTop: 0 }, '300');
    };


    $scope.GetProduct = function () {
        $http.get("/GiftDashBoard/GetProduct").then(function (d) {
            $scope.ProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.ProductActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/ProductActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetProduct();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };

    $scope.SubmitProduct = function () {
        debugger
        var editorText = CKEDITOR.instances.ckeditor.getData();
        $scope.Description = editorText;



        //if (MainCate.val() === "-1" || MainCate.val() === "") {
        //    toastr["error"]("Please Select Main Category");
        //    MainCate.focus();
        //    return;
        //}

        //var Producttitle = angular.element(document.getElementById("Producttitle"));
        //if (Producttitle.val() === "") {
        //    toastr["error"]("Please Enter Product Name");
        //    Producttitle.focus();
        //    return;
        //}
        //$scope.image1 = $('#image1').val();
        //if ($scope.image1 == "" || $scope.image1 == undefined) {
        //    toastr["error"]("Please Select Image");
        //    $('#image1').focus;
        //    return;
        //}

        debugger;
        for (var i = 0; i < $scope.KeywordList.length; i++) {
            if ($scope.KeywordList[i].Selected) {
                Keywordarr.push($scope.KeywordList[i]);
            }
        }

        debugger;
        upload({
            url: '/GiftDashBoard/SubmitProduct',
            method: 'post',
            data: $scope.Product
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                debugger
                $scope.ProductArrayData($scope.result.ProductId);
                //toastr["success"]("Product save successfully");
                //$scope.Product = null;
                //$scope.GetProduct();

            } else if ($scope.result.res === "-1") {
                toastr["error"]("Product already exist");
            }
            else {
                toastr["error"]("Product not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.ProductArrayData = function (id) {
        debugger;
        $http({
            url: '/GiftDashBoard/ProductArrayData',
            method: 'post',
            data: {
                ProductId: id,
                PDesc: $scope.Description,
                KeywordTbls: Keywordarr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

                toastr["success"]("Product save successfully");
                $('#MainCate').val("-1").trigger('change');
                location.href = '/GiftDashBoard/AddProduct';
                $scope.Product = null;
                //    $scope.GetProduct();
            } else if ($scope.result.res === "2") {
                toastr["error"]("Product already exist");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };


    $scope.UpdateProduct = function () {
        debugger
        var editorText = CKEDITOR.instances.ckeditor.getData();
        $scope.Description = editorText;



        //if (MainCate.val() === "-1" || MainCate.val() === "") {
        //    toastr["error"]("Please Select Main Category");
        //    MainCate.focus();
        //    return;
        //}

        //var Producttitle = angular.element(document.getElementById("Producttitle"));
        //if (Producttitle.val() === "") {
        //    toastr["error"]("Please Enter Product Name");
        //    Producttitle.focus();
        //    return;
        //}
        //$scope.image1 = $('#image1').val();
        //if ($scope.image1 == "" || $scope.image1 == undefined) {
        //    toastr["error"]("Please Select Image");
        //    $('#image1').focus;
        //    return;
        //}

        debugger;
        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        Keywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        //$.each($(".checkbox-input:checked"), function () {
        //    Keywordarr.push({ 'KeywordId': $(this).val() });
        //});

        debugger;
        upload({
            url: '/GiftDashBoard/UpdateProduct',
            method: 'post',
            data: $scope.Product
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                debugger
                $scope.UpdateProductArrayData($scope.result.ProductId);
                //toastr["success"]("Product save successfully");
                //$scope.Product = null;
                //$scope.GetProduct();

            } else if ($scope.result.res === "-1") {
                toastr["error"]("Product already exist");
            }
            else {
                toastr["error"]("Product not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    ///   Add Product End

    ///// Main Category
    $scope.GetMainCate = function () {
        $http.get("/GiftDashBoard/GetMainCate").then(function (d) {
            $scope.MainCateData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

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


    $scope.GetMainCatebyid = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');
        debugger

        for (var s = 0; s < $scope.KeywordList.length; s++) {
            var vallc1s = $scope.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', false);

        }


        $scope.MainCate = $scope.MainCateData[index];
        const previewImage = document.querySelector('#previewImage');
        $('#previewImage').css('display', 'block');
        previewImage.setAttribute("src", "/images/MainCate/" + $scope.MainCate.MImage);
        debugger
        for (var i = 0; i < $scope.MainCate.Submenu.length; i++) {
            var vallc = $scope.MainCate.Submenu[i].KeywordId;
            $('#Keyword_' + vallc).prop('checked', true);
        }


        debugger
        CKEDITOR.instances.ckeditor.setData($scope.Product.Description);
        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);


        debugger
        $('html, body').animate({ scrollTop: 0 }, '300');
    };


    $scope.UpdateMainCate = function () {
        var maincate = angular.element(document.getElementById("title"));
        if (maincate.val() === "") {
            toastr["error"]("Please Enter Main Category");
            maincate.focus();
            return;
        }
        $.each($(".checkbox-input:checked"), function () {
            Keywordarr.push({ 'KeywordId': $(this).val() });
        });
        $http({
            url: '/GiftDashBoard/UpdateMainCate',
            method: 'post',
            data: $scope.MainCate
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                $scope.UpdateKeywordArrayData($scope.result.MainCateId);
            }
            else {
                toastr["error"]("Main Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.UpdateKeywordArrayData = function (id) {
        debugger;
        $http({
            url: '/GiftDashBoard/UpdateKeywordArrayData',
            method: 'post',
            data: {
                MainCateId: id,
                keywordTbls: Keywordarr,
            }
        }).then(function (d) {
            debugger
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Main Category Update successfully");

            } else if ($scope.result.res === "2") {
                toastr["error"]("Product already exist");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
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

    /// Main Category End 

    ///// Keyword Code 
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

    $scope.GetKeywords = function () {
        $http.get("/GiftDashBoard/GetKeywords").then(function (d) {
            $scope.KeywordsData = d.data;
            debugger
        }, function (error) {
            alert(error.data);
        });
    };

    ///// Keyword Code  end


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


    //--------------Slider->------------->---------------------->---------------------------->------->------------>---------->---
    $scope.SubmitSlider = function () {
        debugger
        //$scope.slideimg = $('#input-file-now').val();
        //if ($scope.slideimg == "" || $scope.slideimg == undefined) {
        //    toastr["error"]("Please Select Image");
        //    $('#input-file-now').focus;
        //    return;
        //}
        //if ($('#priority').val() == "") {
        //    toastr["error"]("Please Enter Priority");
        //    $('#priority').focus;
        //    return;
        //}

        debugger
        upload({
            url: '/GiftDashBoard/SubmitSlider',
            method: 'post',
            data: $scope.Slider
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"]("Slider Saved Successfully");
                $scope.slider = null;
                $scope.SliderList();


            }
            else if ($scope.result.res === "-1") {
                toastr["error"]("Priority is Already Exist");
            }
            else {
                toastr["error"]("Something Went Worng");
            }
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.SliderList = function () {
        debugger
        $http.get("/GiftDashBoard/SliderList").then(function (d) {

            debugger
            $scope.SliderListData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetSliderDetail = function (index) {
        $('#edbtn').css('display', 'block');
        $('#btn').css('display', 'none');
        debugger
        $scope.Slider = $scope.SliderListData[index];
        const previewImage = document.querySelector('#previewImage');
        $('#previewImage').css('display', 'block');
        previewImage.setAttribute("src", "/images/SliderImg/" + $scope.Slider.SliderImage);

    };
    $scope.UpdateSlider = function () {
        //$scope.slideimg = $('#input-file-now').val();
        //if ($scope.slideimg == "" || $scope.slideimg == undefined) {
        //    toastr["error"]("Please Select Image");
        //    $('#input-file-now').focus;
        //    return;
        //}
        //if ($('#priority').val() == "") {
        //    toastr["error"]("Please Enter Priority");
        //    $('#priority').focus;
        //    return;
        //}

        debugger
        upload({
            url: '/GiftDashBoard/UpdateSlider',
            method: 'post',
            data: $scope.Slider
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"]("Slider Update Successfully");
                $scope.slider = null;
                $('#update').css('display', 'none');
                $('#submit').css('display', 'block');
                $scope.SliderList();
            }
            else if ($scope.result.res === "-1") {
                toastr["error"]("Priority is Already Exist");
            }
            else {
                toastr["error"]("Something Went Worng");
            }
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.ADAcDcShortPage = function (id) {

        debugger
        $http.get("/GiftDashBoard/ADAcDcShortPage?id=" + id).then(function (d) {
            debugger
            $scope.rees = d.data;


            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.SliderList();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


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

