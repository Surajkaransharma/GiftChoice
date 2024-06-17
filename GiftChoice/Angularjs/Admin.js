var app = angular.module("AdminApp", ['lr.upload', 'ngTagsInput']);
app.controller("AdminController", ['$scope', 'upload', '$http', '$sce', function ($scope, upload, $http, $sce) {


    //$scope.loadTags = function (query) {
    //    return $http.get("/GiftDashBoard/GetKeywordData");
    //};
    //$scope.tags = [
    //    { text: 'Tag1' },
    //    { text: 'Tag2' },
    //    { text: 'Tag3' }
    //];

    //$scope.tagsj = [
    //    { "text": "Tag1" },
    //    { "text": "Tag2" },
    //    { "text": "Tag3" },
    //    { "text": "Tag4" },
    //    { "text": "Tag5" },
    //    { "text": "Tag6" },
    //    { "text": "Tag7" },
    //    { "text": "Tag8" },
    //    { "text": "Tag9" },
    //    { "text": "Tag10" }
    //];

    ////// duplicateProduct

    $scope.duplicateProduct = function (index) {
        debugger
        $('#btn').css('display', 'inline');
        $('#edbtn').css('display', 'none');

        $scope.Product = $scope.ProductData[index];
        $scope.duplicateproductbool = true;


        //if ($scope.Product.ProductType == "Common") {
        //    $("#Common").attr('checked', true).trigger("click");
        //    $scope.Product.Common = true;
        //} else {
        //    $scope.Product.Common = false;

        //}
        $scope.productDataArray = [];
        if ($scope.Product.productDataArray.length > 0) {

            $scope.productDataArray = $scope.Product.productDataArray;
        } else {
            $scope.AddProductDetails();
        }

        const previews = document.querySelectorAll('.preview');
        const removeButtons = document.querySelectorAll('.remove-image');

        for (var k = 0; k < $scope.Product.ProductImage.length; k++) {

            previews[k].style.display = 'block';
            removeButtons[k].disabled = false;
            previews[k].setAttribute("src", "/images/ProductImg/" + $scope.Product.ProductImage[k]);
        }

        if ($scope.Product.FilterKeyword.length > 0) {
            $scope.FilterTag = $scope.Product.FilterKeyword;
        }
        if ($scope.Product.ProductFilterWord.length > 0) {

            for (var i = 0; i < $scope.Product.ProductFilterWord.length; i++) {
                var vallc = $scope.Product.ProductFilterWord[i].PFilterId;
                $scope.Filterobj = $scope.FilterDataList.find(item => item.PFilterId === vallc);
                $scope.Filterobj.Selected = true;
                //   $('#filter_' + vallc).prop('checked', true);
            }
        }
        //     $scope.GetBannerToQuery($scope.Product.BannerCateId);

        //if ($scope.GetBannerToQueryData != undefined) {

        //    for (var s = 0; s < $scope.GetBannerToQueryData.length; s++) {
        //        var vallc1s = $scope.GetBannerToQueryData[s].QId;
        //        $('#Keyword_' + vallc1s).prop('checked', false);

        //    }
        //}



        /*        CKEDITOR.instances.ckeditor.setData($scope.Product.PDesc);*/
        //CKEDITOR.instances.ckeditor.setData($scope.Product.PDesc1);

        CKEDITOR.instances.ckeditor.setData($scope.Product.TableDesc);

        //const previewImage = document.querySelector('#previewImage');
        //$('#previewImage').css('display', 'block');
        //previewImage.setAttribute("src", "/images/MainCate/" + $scope.MainCate.MImage);

        //if ($scope.Product.Submenu.length > 0) {

        //    for (var i = 0; i < $scope.Product.Submenu.length; i++) {
        //        var vallc = $scope.Product.Submenu[i].QueryId;
        //        $('#Keyword_' + vallc).prop('checked', true);
        //    }
        //}
        //if ($scope.Product.PSizeList.length > 0) {

        //    for (var i = 0; i < $scope.Product.PSizeList.length; i++) {
        //        var vallc = $scope.Product.PSizeList[i].SizeId;
        //        $('#Size_' + vallc).prop('checked', true);
        //    }
        //}
        if ($scope.Product.VideoTitle) {

            setTimeout(() => {
                var videoElement = document.getElementById('pVideo');
                if (videoElement) {
                    videoElement.src = '/images/ProductVideo/' + $scope.Product.VideoTitle.Video;
                }

            }, 100);
        }

        $('html, body').animate({ scrollTop: 0 }, '300');


    };

    var BannerCateProductArr = [];
    $scope.SubmitBannerCateProduct = function () {
        if ($("#BannerCateSelect option:selected").val() == "-1" || $("#BannerCateSelect option:selected").val() == "") {
            toastr["error"]("Select Banner Category");
            return;
        }

        $.each($(".checkbox-input:checked"), function () {
            BannerCateProductArr.push({ 'ProductId': $(this).val() });
        });

        $http({
            url: '/GiftDashBoard/SubmitBannerCateProduct',
            method: 'post',
            data: {
                BannerCateId: $scope.Banner.BannerCateId,
                BannerCateProductArrData: BannerCateProductArr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category save successfully");
                window.location.href = '/GiftDashBoard/AddBannerCateProduct';

            } else if ($scope.result.res === "2") {
                toastr["error"]("Banner Category already exist");
            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.GetBannerCateProductByid = function () {
        $scope.BannerCateId = $("#BannerCateSelect option:selected").val();
        for (var i = 0; i < $scope.ProductData.length; i++) {
            var vallc = $scope.ProductData[i].ProductId;
            $('#ProductId_' + vallc).prop('checked', false);


        }
        if ($scope.BannerCateId != "-1") {
            $http.get("/GiftDashBoard/GetBannerCateProductByid?id=" + $scope.BannerCateId).then(function (d) {
                $scope.result = d.data;

                for (var i = 0; i < $scope.result.length; i++) {
                    var vallc = $scope.result[i].ProductId;
                    $('#ProductId_' + vallc).prop('checked', true);


                }
            }, function (error) {
                alert(error.data);
            });
        }

    };
    //--------------SubmitBannerCateProduct Start->------------->---------------------->---------------------------->------->------------>---------->---
    var BKeywordarr = [];
    $scope.SubmitBannerCate = function () {
        if ($("#BTitle").val() === "") {
            toastr["error"]("Please Enter Banner Category");
            return;
        }
        for (var i = 0; i < $scope.KeywordList.length; i++) {
            if ($scope.KeywordList[i].Selected) {
                BKeywordarr.push($scope.KeywordList[i]);
            }
        }

        $http({
            url: '/GiftDashBoard/SubmitBannerCate',
            method: 'post',
            data: {
                BTitle: $scope.BannerCate.BTitle,
                Priority: $scope.BannerCate.Priority,
                keywordsTbl: BKeywordarr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category save successfully");

                window.location.href = '/GiftDashBoard/AddBannerMateCate';
            } else if ($scope.result.res === "2") {
                toastr["error"]("Banner Category already exist");
            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.GetBannerCatebyid = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');

        for (var s = 0; s < $scope.KeywordList.length; s++) {
            var vallc1s = $scope.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', false);

        }

        $scope.BannerCate = $scope.BannerCateData[index];

        for (var i = 0; i < $scope.BannerCate.Submenu.length; i++) {
            var vallc = $scope.BannerCate.Submenu[i].KeywordId;
            $('#Keyword_' + vallc).prop('checked', true);


        }
    };

    $scope.RessetBannerCate = function () {
        $('#btn').css('display', 'inline');
        $('#edbtn').css('display', 'none');
        $scope.BannerCate = null;
    };

    $scope.UpdateBannerCate = function () {

        if ($("#BTitle").val() === "") {
            toastr["error"]("Please Enter Banner Category");

            return;
        }

        $.each($(".checkbox-input:checked"), function () {
            BKeywordarr.push({ 'KeywordId': $(this).val() });
        });
        $http({
            url: '/GiftDashBoard/UpdateBannerCate',
            method: 'post',
            data: {
                BannerCateId: $scope.BannerCate.BannerCateId,
                BTitle: $scope.BannerCate.BTitle,
                Priority: $scope.BannerCate.Priority,
                keywordsTbl: BKeywordarr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category Update successfully");
                window.location.href = '/GiftDashBoard/AddBannerMateCate';
                //$scope.BannerCate = null;
                //$scope.RessetBannerCate();
                //$scope.GetBannerCate();
                //for (var s = 0; s < $scope.KeywordList.length; s++) {
                //    var vallc1s = $scope.KeywordList[s].KeywordId;
                //    $('#Keyword_' + vallc1s).prop('checked', false);

                //}
            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.BannerActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/BannerActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetBannerCate();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetBannerCate = function () {
        $http.get("/GiftDashBoard/GetBannerCate").then(function (d) {
            $scope.BannerCateData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };

    //--------------SubmitBannerCateProduct End->------------->---------------------->---------------------------->------->------------>---------->---




    ///////  Add Product Start 

    $scope.MainCateKeyword = function (MainCateId) {
        ;
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

    $scope.previewImage1 = function (index) {
        debugger

        var input = document.getElementsByClassName('image-input')[index];
        var preview = document.getElementById('image-preview-' + index);
        debugger
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }

    };

    $scope.GetProductbyid = function (index) {
        debugger
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');


        for (var s = 0; s < $scope.KeywordList.length; s++) {
            var vallc1s = $scope.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', false);

        }


        $scope.Product = $scope.ProductData[index];
        $scope.productDataArray = [];

        if ($scope.Product.productDataArray.length > 0) {

            $scope.productDataArray = $scope.Product.productDataArray;
        } else {
            $scope.AddProductDetails();
        }

        CKEDITOR.instances.ckeditor.setData($scope.Product.TableDesc);

        const previews = document.querySelectorAll('.preview');
        const removeButtons = document.querySelectorAll('.remove-image');

        for (var k = 0; k < $scope.Product.ProductImage.length; k++) {

            previews[k].style.display = 'block';
            removeButtons[k].disabled = false;
            previews[k].setAttribute("src", "/images/ProductImg/" + $scope.Product.ProductImage[k]);
        }


        if ($scope.Product.Submenu.length > 0) {

            for (var i = 0; i < $scope.Product.Submenu.length; i++) {
                var vallc = $scope.Product.Submenu[i].KeywordId;
                $('#Keyword_' + vallc).prop('checked', true);
            }
        }
        if ($scope.Product.PSizeList.length > 0) {

            for (var i = 0; i < $scope.Product.PSizeList.length; i++) {
                var vallc = $scope.Product.PSizeList[i].SizeId;
                $('#Size_' + vallc).prop('checked', true);
            }

        }

        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);



        $('html, body').animate({ scrollTop: 0 }, '300');
    };


    $scope.GetProduct = function (id) {

        if (id != "-1" && id != undefined) {

            $http.get("/GiftDashBoard/GetProduct?id=" + id).then(function (d) {
                $scope.ProductData = d.data;
            }, function (error) {
                alert(error.data);
            });
        }
    };

    $scope.GetAllProduct = function () {
        $http.get("/GiftDashBoard/GetAllProduct").then(function (d) {
            $scope.ProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetOrder = function () {
        $http.get("/GiftDashBoard/GetOrder").then(function (d) {
            $scope.OrderData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };


    $scope.OrderDetails = function (index) {

        $scope.OrderDetailsData = $scope.OrderData[index];
        $("#OrderDetailsModel").modal("toggle");
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

    $scope.ProductOrderCompelete = function (id) {
        $http.get("/GiftDashBoard/ProductOrderCompelete?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"](" Complete Successful");
                $scope.GetProduct();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };

    $scope.productDataArray = [];

    $scope.AddProductDetails = function () {

        $scope.productDataArray.push({
            'SizeId': -1,
            //   'Color_Id': -1,
            //  'Quantity': 0,
            'Price': 0,
            // 'Discount': 0
            //'Priority': 0

        });
    };
    $scope.removeproductDataArraydata = function (index) {
        $scope.productDataArray.splice(index, 1)
    }
    $scope.GetProductSizeList = function (index) {

        $http.get("/GiftDashBoard/GetSizeData").then(function (d) {


            // $scope.SizeListData = d.data;
            $scope.productDataArray[index].SizeList = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    var PSizeArr = [];
    $scope.SubmitProduct = function () {
        debugger
        var editorText = CKEDITOR.instances.ckeditor.getData();
        $scope.Description = editorText;


        //var files1 = document.getElementById('image1').files;
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.Product.Image1 = imageInputs[0].files[0];
        $scope.Product.Image2 = imageInputs[1].files[0];
        $scope.Product.Image3 = imageInputs[2].files[0];
        $scope.Product.Image4 = imageInputs[3].files[0];
        $scope.Product.Image5 = imageInputs[4].files[0];



        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        Keywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        $.each($(".checkbox-input:checked"), function () {
            Keywordarr.push({ 'KeywordId': $(this).val() });
        });
        //for (var i = 0; i < $scope.SizeList.length; i++) {
        //    if ($scope.SizeList[i].Selected) {
        //        PSizeArr.push($scope.SizeList[i]);
        //    }
        //}


        upload({
            url: '/GiftDashBoard/SubmitProduct',
            method: 'post',
            data: $scope.Product
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

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
        ;
        $http({
            url: '/GiftDashBoard/ProductArrayData',
            method: 'post',
            data: {
                ProductId: id,
                TableDesc: $scope.Description,
                KeywordTbls: Keywordarr,
                SizeTbls: PSizeArr,
                ProductDataArray: $scope.productDataArray
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


    $scope.UpdateProductData = function () {
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.Product.Image1 = imageInputs[0].files[0];
        $scope.Product.Image2 = imageInputs[1].files[0];
        $scope.Product.Image3 = imageInputs[2].files[0];
        $scope.Product.Image4 = imageInputs[3].files[0];
        $scope.Product.Image5 = imageInputs[4].files[0];
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

        ;
        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        Keywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        $.each($(".checkbox-input:checked"), function () {
            Keywordarr.push({ 'KeywordId': $(this).val() });
        });
        $.each($(".checkbox-Size:checked"), function () {
            PSizeArr.push({ 'SizeId': $(this).val() });
        });

        if ($scope.Product.TableDesc != undefined) {

            delete $scope.Product.TableDesc;
        }
        $scope.PDescval = $scope.Product.PDesc;
        delete $scope.Product.PDesc;

        ;
        upload({
            url: '/GiftDashBoard/UpdateProductData',
            method: 'post',
            data: $scope.Product
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

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

    $scope.UpdateProductArrayData = function (id) {
        ;
        $http({
            url: '/GiftDashBoard/UpdateProductArrayData',
            method: 'post',
            data: {
                ProductId: id,
                TableDesc: $scope.Description,
                PDesc: $scope.PDescval,
                KeywordTbls: Keywordarr,
                SizeTbls: PSizeArr,
                ProductDataArray: $scope.productDataArray


            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

                toastr["success"]("Product Update successfully");
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
    ///   Add Product End

    ///// Main Category


    $scope.UpdateMainCateType = function () {


        $http({
            url: '/GiftDashBoard/UpdateMainCateType',
            method: 'post',
            data: { MainCateTblModel: $scope.MainCateData }
        }).then(function (d) {
            $scope.result = d.data;
            toastr["success"]("Update successfully");

        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });

    };

    $scope.GetMainCate = function () {
        $http.get("/GiftDashBoard/GetMainCate").then(function (d) {
            $scope.MainCateData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    var Keywordarr = [];

    $scope.SubmitMainCate = function () {

        debugger
        for (var i = 0; i < $scope.KeywordList.length; i++) {
            if ($scope.KeywordList[i].Selected) {
                Keywordarr.push($scope.KeywordList[i]);
            }
        }
        if ($("#MTitle").val() == "") {
            toastr["error"]("Enter Main Category Title");
            return;
        }

        if ($("#Priority").val() == "") {
            toastr["error"]("Enter Main Category Priority");
            return;
        }

        $scope.MainCate.CateType = $("#CateType").val();

        const imageInputs = document.querySelectorAll('.image-input');
        $scope.MainCate.Image = imageInputs[0].files[0];





        upload({
            url: '/GiftDashBoard/SubmitMainCate',
            method: 'post',
            data: $scope.MainCate
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                if (Keywordarr != null) {

                    $scope.KeywordArrayData($scope.result.MainCateId);
                }
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



    $scope.KeywordArrayData = function (id) {

        $http({
            url: '/GiftDashBoard/KeywordArrayData',
            method: 'post',
            data: {
                MainCateId: id,
                keywordTbls: Keywordarr,
            }
        }).then(function (d) {

            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Main Category save successfully");
                $scope.MainCate = null;
                $scope.GetMainCate();
                location.href = '/GiftDashBoard/AddMainCate';
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


        for (var s = 0; s < $scope.KeywordList.length; s++) {
            var vallc1s = $scope.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', false);
            //$('#Menu_' + vallc1s).removeAttr('checked', false).trigger("click");
            //$('#MenuFilter_' + vallc1s).removeAttr('checked', false).trigger("click");
            //$('#Fliter_' + vallc1s).removeAttr('checked', false).trigger("click");

        }


        $scope.MainCate = $scope.MainCateData[index];
        //const previewImage = document.querySelector('#previewImage');
        //const loadingText = document.querySelector('#loadingText');
        //const dropZoon = document.querySelector('#dropZoon');
        //dropZoon.classList.add('drop-zoon--Uploaded');
        //loadingText.style.display = "none";
        //$('#previewImage').css('display', 'block');

        const previews = document.querySelectorAll('.preview');
        const removeButtons = document.querySelectorAll('.remove-image');


        previews[0].style.display = 'block';
        removeButtons[0].disabled = false;
        previews[0].setAttribute("src", "/images/MainCate/" + $scope.MainCate.MImage);


        for (var i = 0; i < $scope.MainCate.Submenu.length; i++) {
            var vallc = $scope.MainCate.Submenu[i].KeywordId;
            $('#Keyword_' + vallc).prop('checked', true);
            if ($scope.MainCate.Submenu[i].MenuFilter == 1) {

                $('#MenuFilter_' + vallc).attr('checked', true).trigger("click");
            } else if ($scope.MainCate.Submenu[i].Menu == 1) {
                $('#Menu_' + vallc).attr('checked', true).trigger("click");

            }
            else if ($scope.MainCate.Submenu[i].Fliter == 1) {
                $('#Fliter_' + vallc).attr('checked', true).trigger("click");

            }

        }



        // CKEDITOR.instances.ckeditor.setData($scope.Product.Description);
        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);



        $('html, body').animate({ scrollTop: 0 }, '300');
    };


    $scope.UpdateMainCate = function () {
        debugger
        var maincate = angular.element(document.getElementById("MTitle"));
        if (maincate.val() === "") {
            toastr["error"]("Please Enter Main Category");
            maincate.focus();
            return;
        }
        if ($("#Priority").val() == "") {
            toastr["error"]("Enter Main Category Priority");
            return;
        }

        //$.each($(".checkbox-input:checked"), function () {
        //    Keywordarr.push({ 'KeywordId': $(this).val() });
        //});
        for (var i = 0; i < $scope.KeywordList.length; i++) {
            var vallc = $scope.KeywordList[i].KeywordId;
            var isChecked = $('#Keyword_' + vallc).prop('checked');
            if (isChecked) {
                Keywordarr.push($scope.KeywordList[i]);
            }
        }
        $scope.MainCate.CateType = $("#CateType").val();
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.MainCate.Image = imageInputs[0].files[0];

        upload({
            url: '/GiftDashBoard/UpdateMainCate',
            method: 'post',
            data: $scope.MainCate
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                if (Keywordarr !== null) {

                    $scope.UpdateKeywordArrayData($scope.result.MainCateId);
                }
                $scope.MainCate = null;
                $scope.GetMainCate();
            }
            else {
                toastr["error"]("Main Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.UpdateKeywordArrayData = function (id) {
        ;
        $http({
            url: '/GiftDashBoard/UpdateKeywordArrayData',
            method: 'post',
            data: {
                MainCateId: id,
                keywordTbls: Keywordarr,
            }
        }).then(function (d) {

            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Main Category Update successfully");
                $scope.MainCate = null;
                $scope.GetMainCate();

                /*                $scope.GetKeywordData();*/
                //$('#edbtn').css('display', 'none');
                //$('#btn').css('display', 'inline');
                location.href = '/GiftDashBoard/AddMainCate';
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

    $scope.GetSizeData = function () {
        $http.get("/GiftDashBoard/GetSizeData").then(function (d) {
            $scope.SizeList = d.data;
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

    $scope.GetBannerCategoryData = function () {
        $http.get("/GiftDashBoard/GetBannerCategoryData").then(function (d) {
            $scope.BannerCateData = d.data;
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

        const imageInputs = document.querySelectorAll('.image-input');
        $scope.Slider.Image = imageInputs[0].files[0];

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

        $http.get("/GiftDashBoard/SliderList").then(function (d) {


            $scope.SliderListData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetSliderDetail = function (index) {
        $('#edbtn').css('display', 'block');
        $('#btn').css('display', 'none');

        $scope.Slider = $scope.SliderListData[index];

        const previews = document.querySelectorAll('.preview');
        const removeButtons = document.querySelectorAll('.remove-image');


        previews[0].style.display = 'block';
        removeButtons[0].disabled = false;
        previews[0].setAttribute("src", "/images/SliderImg/" + $scope.Slider.SliderImage);
        //const previewImage = document.querySelector('#previewImage');
        //const loadingText = document.querySelector('#loadingText');
        //const dropZoon = document.querySelector('#dropZoon');
        //dropZoon.classList.add('drop-zoon--Uploaded');
        //loadingText.style.display = "none";
        //$('#previewImage').css('display', 'block');
        //previewImage.setAttribute("src", "/images/SliderImg/" + $scope.Slider.SliderImage);

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

        const imageInputs = document.querySelectorAll('.image-input');
        $scope.Slider.Image = imageInputs[0].files[0];
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


        $http.get("/GiftDashBoard/ADAcDcShortPage?id=" + id).then(function (d) {

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

    //--------------Banner->------------->---------------------->---------------------------->------->------------>---------->---
    $scope.SubmitBanner = function () {


        if ($("#MainCateSelect option:selected").val() == "-1" || $("#MainCateSelect option:selected").val() == "") {
            toastr["error"]("Select Main Category");
            return;
        }

        if ($("#Priority").val() == "") {
            toastr["error"]("Enter Banner Priority");
            return;
        }



        upload({
            url: '/GiftDashBoard/SubmitBanner',
            method: 'post',
            data: $scope.Banner
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"]("Slider Saved Successfully");
                $scope.Banner = null;
                $scope.BannerList();


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

    $scope.BannerList = function () {

        $http.get("/GiftDashBoard/BannerList").then(function (d) {


            $scope.BannerListData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetBannerDetail = function (index) {
        $('#edbtn').css('display', 'block');
        $('#btn').css('display', 'none');

        $scope.Banner = $scope.BannerListData[index];
        const previewImage = document.querySelector('#previewImage');
        const loadingText = document.querySelector('#loadingText');
        const dropZoon = document.querySelector('#dropZoon');
        dropZoon.classList.add('drop-zoon--Uploaded');
        loadingText.style.display = "none";
        $('#previewImage').css('display', 'block');
        previewImage.setAttribute("src", "/images/BannerImage/" + $scope.Banner.BannerImage);

    };
    $scope.UpdateBanner = function () {

        if ($("#MainCateSelect option:selected").val() == "-1" || $("#MainCateSelect option:selected").val() == "") {
            toastr["error"]("Select Main Category");
            return;
        }
        if ($("#Priority").val() == "") {
            toastr["error"]("Enter Banner Priority");
            return;
        }


        upload({
            url: '/GiftDashBoard/UpdateBanner',
            method: 'post',
            data: $scope.Banner
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"]("Banner Update Successfully");
                $scope.Banner = null;
                $('#update').css('display', 'none');
                $('#submit').css('display', 'block');
                $scope.BannerList();
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
    $scope.ADBanner = function (id) {


        $http.get("/GiftDashBoard/ADBanner?id=" + id).then(function (d) {

            $scope.rees = d.data;


            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.BannerList();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };

    //--------------Size->------------->---------------------->---------------------------->------->------------>---------->---

    ///// Size Code
    $scope.SubmitSize = function () {
        if ($("#SizeTitle").val() === "") {
            toastr["error"]("Please Enter Size");
            return;
        }

        $http({
            url: '/GiftDashBoard/SubmitSize',
            method: 'post',
            data: $scope.Size
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Size save successfully");
                $scope.Size = null;
                $scope.GetSize();

            } else if ($scope.result.res === "2") {
                toastr["error"]("Size already exist");
            }
            else {
                toastr["error"]("Size not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.GetSizebyid = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');
        $scope.Size = $scope.SizeData[index];
    };

    $scope.RessetMain = function () {
        $('#btn').css('display', 'inline');
        $('#edbtn').css('display', 'none');
        $scope.Size = null;
    };

    $scope.UpadateSize = function () {

        if ($("#SizeTitle").val() === "") {
            toastr["error"]("Please Enter Size");

            return;
        }
        $http({
            url: '/GiftDashBoard/UpadateSize',
            method: 'post',
            data: $scope.Size
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Size Update successfully");
                $scope.Size = null;
                $scope.RessetSize();
                $scope.GetSize();
            }
            else {
                toastr["error"]("Size not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.SizeActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/SizeActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetSize();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetSize = function () {
        $http.get("/GiftDashBoard/GetSize").then(function (d) {
            $scope.SizeData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    //--------------Size End->------------->---------------------->---------------------------->------->------------>---------->---

    $scope.isDragging = false;
    $scope.imageDataUrl = '';

    $scope.dragOver = function (event) {
        event.preventDefault();
        $scope.isDragging = true;
    };

    $scope.dragLeave = function (event) {
        event.preventDefault();
        $scope.isDragging = false;
    };

    $scope.drop = function (event) {
        event.preventDefault();
        $scope.isDragging = false;
        var file = event.dataTransfer.files[0];
        if (file) {
            $scope.selectedFile = file;
            $scope.previewImage();
        }
    };

    $scope.previewImage = function () {
        if ($scope.selectedFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.imageDataUrl = e.target.result;
                });
            };
            reader.readAsDataURL($scope.selectedFile);
        }
    };

    //--------------Banner Product->------------->---------------------->---------------------------->------->------------>---------->---

    $scope.GetBannerProdcutT = function () {
        $http.get("/GiftDashBoard/GetBannerProdcutT").then(function (d) {

            $scope.GetBannerProdcutTData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    var BPKeywordarr = [];

    $scope.SubmitBannerProdcutT = function () {

        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        BPKeywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        if ($("#MTitle").val() == "") {
            toastr["error"]("Enter Banner Title");
            return;
        }

        if ($("#Priority").val() == "") {
            toastr["error"]("Enter Banner Priority");
            return;
        }


        const imageInputs = document.querySelectorAll('.image-input');
        $scope.BannerProdcutT.Image = imageInputs[0].files[0];


        upload({
            url: '/GiftDashBoard/SubmitBannerProdcutT',
            method: 'post',
            data: $scope.BannerProdcutT
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Save Successfully");
                //if (Keywordarr != null) {

                //    $scope.BannerProdcutTKeywordArray($scope.result.MainCateId);
                //}
                //$scope.BannerProdcutT = null;
                //$scope.GetBannerProdcutT();

            } else if ($scope.result.res === "2") {
                toastr["error"]("Already Exist Position");
            }
            else {
                toastr["error"]("Banner not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };



    $scope.BannerProdcutTKeywordArray = function (id) {

        $http({
            url: '/GiftDashBoard/BannerProdcutTKeywordArray',
            method: 'post',
            data: {
                MainCateId: id,
                keywordTbls: BPKeywordarr,
            }
        }).then(function (d) {

            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner save successfully");
                $scope.MainCate = null;

                location.href = '/GiftDashBoard/AddPBanner';
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };


    $scope.GetBannerProdcutTid = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');


        //for (var s = 0; s < $scope.KeywordList.length; s++) {
        //    var vallc1s = $scope.KeywordList[s].KeywordId;
        //    $('#Keyword_' + vallc1s).prop('checked', false);
        //    //$('#Menu_' + vallc1s).removeAttr('checked', false).trigger("click");
        //    //$('#MenuFilter_' + vallc1s).removeAttr('checked', false).trigger("click");
        //    //$('#Fliter_' + vallc1s).removeAttr('checked', false).trigger("click");

        //}


        $scope.BannerProdcutT = $scope.GetBannerProdcutTData[index];
        previews[0].style.display = 'block';
        removeButtons[0].disabled = false;
        previews[0].setAttribute("src", "/images/MainCate/" + $scope.BannerProdcutT.MImage);
        //const previewImage = document.querySelector('#previewImage');
        //const loadingText = document.querySelector('#loadingText');
        //const dropZoon = document.querySelector('#dropZoon');
        //dropZoon.classList.add('drop-zoon--Uploaded');
        //loadingText.style.display = "none";
        //$('#previewImage').css('display', 'block');
        //previewImage.setAttribute("src", "/images/BannerPTImage/" + $scope.BannerProdcutT.MImage);

        //for (var i = 0; i < $scope.BannerProdcutT.Submenu.length; i++) {
        //    var vallc = $scope.BannerProdcutT.Submenu[i].KeywordId;
        //    $('#Keyword_' + vallc).prop('checked', true);


        //}



        // CKEDITOR.instances.ckeditor.setData($scope.Product.Description);
        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);



        $('html, body').animate({ scrollTop: 0 }, '300');
    };


    $scope.UpdateBannerProdcutT = function () {

        var maincate = angular.element(document.getElementById("MTitle"));
        if (maincate.val() === "") {
            toastr["error"]("Please Enter Banner Title");
            maincate.focus();
            return;
        }
        if ($("#Priority").val() == "") {
            toastr["error"]("Enter Banner Priority");
            return;
        }

        //$.each($(".checkbox-input:checked"), function () {
        //    Keywordarr.push({ 'KeywordId': $(this).val() });
        //});
        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    var vallc = $scope.KeywordList[i].KeywordId;
        //    var isChecked = $('#Keyword_' + vallc).prop('checked');
        //    if (isChecked) {
        //        BPKeywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.BannerProdcutT.Image = imageInputs[0].files[0];

        upload({
            url: '/GiftDashBoard/UpdateBannerProdcutT',
            method: 'post',
            data: $scope.BannerProdcutT
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Update successfully");

                //if (Keywordarr !== null) {

                //    $scope.UpdateBannerProdcutTKeywordArray($scope.result.MainCateId);
                //}
                //$scope.BannerProdcutT = null;
                //$scope.GetBannerProdcutT();
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.UpdateBannerProdcutTKeywordArray = function (id) {
        ;
        $http({
            url: '/GiftDashBoard/UpdateBannerProdcutTKeywordArray',
            method: 'post',
            data: {
                MainCateId: id,
                keywordTbls: BPKeywordarr,
            }
        }).then(function (d) {

            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Update successfully");
                //$scope.BannerProdcutT = null;
                //$scope.GetBannerProdcutT();

                /*                $scope.GetKeywordData();*/
                //$('#edbtn').css('display', 'none');
                //$('#btn').css('display', 'inline');
                location.href = '/GiftDashBoard/AddPBanner';
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };
    $scope.BannerProdcutTActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/BannerProdcutTActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetBannerProdcutT();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });

    };
    //--------------Banner Product end->------------->---------------------->---------------------------->------->------------>---------->---

    //-------------- add Banner in Product ->------------->---------------------->---------------------------->------->------------>---------->---

    $scope.GetBannerInProduct = function () {

        $http.get("/GiftDashBoard/GetBannerInProduct").then(function (d) {

            $scope.GetBannerInProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };


    $scope.GetBannerInProductFilter = function () {

        $http.get("/GiftDashBoard/GetBannerInProductFilter").then(function (d) {

            $scope.GetBannerInProductFilterData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetSubTitleList = function (id) {

        if (id != "-1" && id != "") {

            $http.get("/GiftDashBoard/GetSubTitleList?id=" + id).then(function (d) {

                $scope.GetSubTitleListData = d.data;
            }, function (error) {
                alert(error.data);
            });
        }
    };




    $scope.GetQueryKeywordlist = function (BSubId) {
        ;

        for (var s = 0; s < $scope.KeywordList.length; s++) {
            var vallc1s = $scope.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', false);

        }
        var id = parseInt(BSubId);
        var dataArray = [];
        dataArray = $scope.GetSubTitleListData;
        var dataArray2 = dataArray.filter(item => item.BSubDId === id);

        if (dataArray2.length > 0) {
            var submenu = dataArray2[0].Keywordlist;

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


    $scope.FilterDataList = [
        { 'PFilterId': 1, 'PFilterTilte': 'Gifts under 499' },
        { 'PFilterId': 2, 'PFilterTilte': 'Gifts under 999' },
        { 'PFilterId': 3, 'PFilterTilte': 'Friends gifts best sellers' },

    ];

    var PSizeArr = [];
    $scope.SubmitBannerProduct = function () {

        debugger

        var editorText = CKEDITOR.instances.ckeditor.getData();
        $scope.Description = editorText;

        //var editorText2 = CKEDITOR.instances.editor1.getData();
        //$scope.Description2 = editorText2;


        ;
        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        Keywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        //  var Keywordarr = [];
        //var PSizeArr = [];
        $scope.keywordTbls = [];

        $scope.keywordTbls = $scope.FilterTag;

        //$.each($(".checkbox-input:checked"), function () {
        //    Keywordarr.push({ 'QueryId': $(this).val() });
        //});
        //$.each($(".checkbox-Size:checked"), function () {
        //    ProductFilterWordTbl.push({ 'FilterId': $(this).val() });
        //});
        $scope.ProductFilterWordTbl = [];
        for (var i = 0; i < $scope.FilterDataList.length; i++) {
            if ($scope.FilterDataList[i].Selected) {
                $scope.ProductFilterWordTbl.push($scope.FilterDataList[i]);
            }
        }
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.Product.Image1 = imageInputs[0].files[0];
        $scope.Product.Image2 = imageInputs[1].files[0];
        $scope.Product.Image3 = imageInputs[2].files[0];
        $scope.Product.Image4 = imageInputs[3].files[0];
        $scope.Product.Image5 = imageInputs[4].files[0];


        upload({
            url: '/GiftDashBoard/SubmitBannerProduct',
            method: 'post',
            data: $scope.Product
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

                $scope.BannerProductArrayData($scope.result.ProductId);
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

    $scope.BannerProductArrayData = function (id) {
        debugger
        $http({
            url: '/GiftDashBoard/BannerProductArrayData',
            method: 'post',
            data: {
                ProductId: id,
                PDesc1: $scope.Description,
                KeywordTbls: $scope.keywordTbls,
                ProductFilterWordTbl: $scope.ProductFilterWordTbl,
                ProductDataArray: $scope.productDataArray
            }
        }).then(function (d) {
            $scope.result = d.data;
            location.href = '/GiftDashBoard/AddBannerInProduct';
            if ($scope.result.res === "1") {

                toastr["success"]("Product save successfully");
                Keywordarr = [];
                //$('#MainCate').val("-1").trigger('change');
                //$scope.Product.ProductTitle = null;
                //$scope.Product.PLabel = null;
                //$scope.Product.Price = null;
                //$scope.Product.VideoUrl = null;
                //$scope.Product.SameDay = false;
                //$scope.Product.PDesc = null;
                //$scope.Product.Image1 = null;
                //$scope.Product.Image2 = null;
                //$scope.Product.Image3 = null;
                //$scope.Product.Image4 = null;
                //$scope.Product.Image5 = null;
                //document.getElementById('image1').value = '';
                //document.getElementById('image2').value = '';
                //document.getElementById('image3').value = '';
                //document.getElementById('image4').value = '';
                //document.getElementById('image5').value = '';

                //CKEDITOR.instances.ckeditor.setData('');



                //$scope.GetSizeData();
                /* $scope.GetKeywordData();*/

                //    $scope.GetProduct();
            } else if ($scope.result.res === "2") {
                toastr["error"]("Product already exist");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };


    $scope.BannerUpdateProductData = function () {

        var editorText = CKEDITOR.instances.ckeditor.getData();
        $scope.Description = editorText;

        //var editorText2 = CKEDITOR.instances.editor1.getData();
        //$scope.Description2 = editorText2;



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

        ;
        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        Keywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        //$.each($(".checkbox-input:checked"), function () {
        //    Keywordarr.push({ 'QueryId': $(this).val() });
        //});
        //$.each($(".checkbox-Size:checked"), function () {
        //    PSizeArr.push({ 'SizeId': $(this).val() });
        //});
        $scope.keywordTbls = [];

        $scope.keywordTbls = $scope.FilterTag;

        $scope.ProductFilterWordTbl = [];
        for (var i = 0; i < $scope.FilterDataList.length; i++) {
            if ($scope.FilterDataList[i].Selected) {
                $scope.ProductFilterWordTbl.push($scope.FilterDataList[i]);
            }
        }
        delete $scope.Product.PDesc1;
        delete $scope.Product.TableDesc;
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.Product.Image1 = imageInputs[0].files[0];
        $scope.Product.Image2 = imageInputs[1].files[0];
        $scope.Product.Image3 = imageInputs[2].files[0];
        $scope.Product.Image4 = imageInputs[3].files[0];
        $scope.Product.Image5 = imageInputs[4].files[0];


        upload({
            url: '/GiftDashBoard/BannerUpdateProductData',
            method: 'post',
            data: $scope.Product
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

                $scope.BannerUpdateProductArrayData($scope.result.ProductId);
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

    $scope.BannerUpdateProductArrayData = function (id) {

        $http({
            url: '/GiftDashBoard/BannerUpdateProductArrayData',
            method: 'post',
            data: {
                ProductId: id,
                PDesc1: $scope.Description,
                KeywordTbls: $scope.keywordTbls,
                ProductFilterWordTbl: $scope.ProductFilterWordTbl,
                ProductDataArray: $scope.productDataArray

            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

                toastr["success"]("Product Update successfully");
                $('#MainCate').val("-1").trigger('change');
                location.href = '/GiftDashBoard/AddBannerInProduct';
                $scope.Product = null;
                //    $scope.GetProduct();
            } else if ($scope.result.res === "2") {
                toastr["error"]("Product already exist");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.BannerProductActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/BannerProductActiveDeActive?id=" + id).then(function (d) {
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

    $scope.GetBannerProduct = function () {
        $http({
            url: '/GiftDashBoard/GetBannerProduct',
            method: 'post',
            data: {
                MainCateId: $("#FMainCate option:selected").val(),
                BannerCateId: $("#FBannerCate option:selected").val(),
                VideoId: $("#FVideoTitle option:selected").val()
            }
        }).then(function (d) {
            $scope.ProductData = d.data;

        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
        //if (id != "-1" && id != undefined) {

        //    $http.get("/GiftDashBoard/GetBannerProduct?id=" + id).then(function (d) {
        //        $scope.ProductData = d.data;
        //    }, function (error) {
        //        alert(error.data);
        //    });
        //}
    };
    $scope.DeleteProductVideo = function (id) {

        $http.get("/GiftDashBoard/DeleteProductVideo?id=" + id).then(function (d) {


            window.location.reload();
        }, function (error) {
            toastr.error(error.data);
        });
    };
    $scope.DeleteProductImage = function (id, pid) {

        $http.get("/GiftDashBoard/DeleteProductImage?id=" + id + "&pid=" + pid).then(function (d) {


            window.location.reload();
        }, function (error) {
            toastr.error(error.data);
        });
    };

    $scope.GetBannerProductbyid = function (index) {
        debugger
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');


        $scope.Product = $scope.ProductData[index];

        //if ($scope.Product.ProductType == "Common") {
        //    $("#Common").attr('checked', true).trigger("click");
        //    $scope.Product.Common = true;
        //} else {
        //    $scope.Product.Common = false;

        //}

        $scope.duplicateproductbool = false;
        $scope.productDataArray = [];
        if ($scope.Product.productDataArray.length > 0) {

            $scope.productDataArray = $scope.Product.productDataArray;
        } else {
            $scope.AddProductDetails();
        }



        const previews = document.querySelectorAll('.preview');
        const removeButtons = document.querySelectorAll('.remove-image');

        for (var k = 0; k < $scope.Product.ProductImage.length; k++) {

            previews[k].style.display = 'block';
            removeButtons[k].disabled = false;
            previews[k].setAttribute("src", "/images/ProductImg/" + $scope.Product.ProductImage[k]);
        }
        if ($scope.Product.FilterKeyword.length > 0) {
            $scope.FilterTag = $scope.Product.FilterKeyword;
        }
        if ($scope.Product.ProductFilterWord.length > 0) {

            for (var i = 0; i < $scope.Product.ProductFilterWord.length; i++) {
                var vallc = $scope.Product.ProductFilterWord[i].PFilterId;

                $scope.Filterobj = $scope.FilterDataList.find(item => item.PFilterId === vallc);
                $scope.Filterobj.Selected = true;
                //    $('#filter_' + vallc).prop('checked', true);
            }
        }


        CKEDITOR.instances.ckeditor.setData($scope.Product.TableDesc);


        if ($scope.Product.VideoTitle) {
            setTimeout(() => {
                var videoElement = document.getElementById('pVideo');
                if (videoElement) {
                    videoElement.src = '/images/ProductVideo/' + $scope.Product.VideoTitle.Video;
                }

            }, 100);
        }

        $('html, body').animate({ scrollTop: 0 }, '300');

        //const previewImage = document.querySelector('#previewImage');
        //$('#previewImage').css('display', 'block');
        //previewImage.setAttribute("src", "/images/MainCate/" + $scope.MainCate.MImage);

        //if ($scope.Product.Submenu.length > 0) {

        //    for (var i = 0; i < $scope.Product.Submenu.length; i++) {
        //        var vallc = $scope.Product.Submenu[i].QueryId;
        //        $('#Keyword_' + vallc).prop('checked', true);
        //    }
        //}
        //if ($scope.Product.PSizeList.length > 0) {

        //    for (var i = 0; i < $scope.Product.PSizeList.length; i++) {
        //        var vallc = $scope.Product.PSizeList[i].SizeId;
        //        $('#Size_' + vallc).prop('checked', true);
        //    }
        //}

        //      $scope.GetBannerToQuery($scope.Product.BannerCateId);

        //if ($scope.GetBannerToQueryData != undefined) {

        //    for (var s = 0; s < $scope.GetBannerToQueryData.length; s++) {
        //        var vallc1s = $scope.GetBannerToQueryData[s].QId;
        //        $('#Keyword_' + vallc1s).prop('checked', false);

        //    }
        //}



        /*        CKEDITOR.instances.ckeditor.setData($scope.Product.PDesc);*/
        //CKEDITOR.instances.ckeditor.setData($scope.Product.PDesc1);

        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);



    };

    //-------------- add Banner in Product End ->------------->---------------------->---------------------------->------->------------>---------->---

    //-------------- Submit Banner Sub Cate Title Start ->------------->---------------------->---------------------------->------->------------>---------->---

    $scope.SubTitleArr = [];
    $scope.AddMoreSubTitle = function () {
        $scope.SubTitleArr.push({
            'SubTitle': ''
        });
    }
    $scope.SubTitleRemove = function (index) {
        $scope.SubTitleArr.splice(index, 1);
    }


    $scope.GetBannerProdcutT = function () {
        $http.get("/GiftDashBoard/GetBannerProdcutT").then(function (d) {

            $scope.GetBannerProdcutTData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetBannerToQuery = function (id) {

        if (id != "-1" && id != "") {

            $http.get("/GiftDashBoard/GetBannerToQuery?id=" + id).then(function (d) {

                $scope.GetBannerToQueryData = d.data;
            }, function (error) {
                alert(error.data);
            });
        }
    };
    //var BPKeywordarr = [];

    $scope.SubmitBannerSubCateTitle = function () {

        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        BPKeywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        //if ($("#SubTitle").val() == "") {
        //    toastr["error"]("Enter Sub Title");
        //    return;
        //}

        //if ($("#Priority").val() == "") {
        //    toastr["error"]("Enter Sub Priority");
        //    return;
        //}

        if ($("#AskQues2").val() === "") {
            toastr["error"]("Please Enter Ask Question ?");
            return;
        }
        if ($("#KeywordTitle").val() === "") {
            toastr["error"]("Please Enter Keyword Title");
            return;
        }
        if ($("#MainCate").val() == "" || $("#MainCate").val() == "-1") {
            toastr["error"]("Enter Banner Title");
            return;
        }


        $http({
            url: '/GiftDashBoard/SubmitBannerSubCateTitle',
            method: 'post',
            data: $scope.BSubTitleTbl
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                //if (Keywordarr != null) {

                //    $scope.BannerProdcutTKeywordArray($scope.result.MainCateId);
                //}
                toastr["success"]("Banner Save Successfully");
                $scope.BSubTitleTbl = null;
                $scope.GetBannerSubCateTitle();

            } else if ($scope.result.res === "2") {
                toastr["error"]("Already Exist Position");
            }
            else {
                toastr["error"]("Banner not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };



    //$scope.BannerProdcutTKeywordArray = function (id) {
    //    ;
    //    $http({
    //        url: '/GiftDashBoard/BannerProdcutTKeywordArray',
    //        method: 'post',
    //        data: {
    //            MainCateId: id,
    //            keywordTbls: BPKeywordarr,
    //        }
    //    }).then(function (d) {
    //        
    //        $scope.result = d.data;
    //        if ($scope.result.res === "1") {
    //            toastr["success"]("Banner save successfully");
    //            $scope.MainCate = null;

    //            location.href = '/GiftDashBoard/AddPBanner';
    //        }
    //    }, function (error) {
    //        toastr["error"]("Something Went Wrong");
    //    });
    //};


    $scope.GetBannerSubCateTitleById = function (index) {


        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');

        $scope.BSubTitleTbl = $scope.GetBannerSubCateTitleData[index];


        //for (var s = 0; s < $scope.KeywordList.length; s++) {
        //    var vallc1s = $scope.KeywordList[s].KeywordId;
        //    $('#Keyword_' + vallc1s).prop('checked', false);
        //

        //}




        //for (var i = 0; i < $scope.BannerProdcutT.Submenu.length; i++) {
        //    var vallc = $scope.BannerProdcutT.Submenu[i].KeywordId;
        //    $('#Keyword_' + vallc).prop('checked', true);


        //}



        // CKEDITOR.instances.ckeditor.setData($scope.Product.Description);
        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);



        $('html, body').animate({ scrollTop: 0 }, '300');
    };


    $scope.UpdateBannerSubCateTitle = function () {

        if ($("#AskQues2").val() === "") {
            toastr["error"]("Please Enter Ask Question ?");
            return;
        }
        if ($("#KeywordTitle").val() === "") {
            toastr["error"]("Please Enter Keyword Title");
            return;
        }
        if ($("#MainCate").val() == "" || $("#MainCate").val() == "-1") {
            toastr["error"]("Enter Banner Title");
            return;
        }

        //var maincate = angular.element(document.getElementById("SubTitle"));
        //if (maincate.val() === "") {
        //    toastr["error"]("Please Enter Sub Title");
        //    maincate.focus();
        //    return;
        //}
        //if ($("#Priority").val() == "") {
        //    toastr["error"]("Enter Sub Title Priority");
        //    return;
        //}

        //$.each($(".checkbox-input:checked"), function () {
        //    Keywordarr.push({ 'KeywordId': $(this).val() });
        //});
        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    var vallc = $scope.KeywordList[i].KeywordId;
        //    var isChecked = $('#Keyword_' + vallc).prop('checked');
        //    if (isChecked) {
        //        BPKeywordarr.push($scope.KeywordList[i]);
        //    }
        //}


        $http({
            url: '/GiftDashBoard/UpdateBannerSubCateTitle',
            method: 'post',
            data: $scope.BSubTitleTbl
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Sub Title Update successfully");
                //if (Keywordarr !== null) {

                //    $scope.UpdateBannerProdcutTKeywordArray($scope.result.MainCateId);
                //}
                $scope.BSubTitleTbl = null;
                $scope.GetBannerSubCateTitle();
                $('#edbtn').css('display', 'none');
                $('#btn').css('display', 'inline');
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    //$scope.UpdateBannerProdcutTKeywordArray = function (id) {
    //    ;
    //    $http({
    //        url: '/GiftDashBoard/UpdateBannerProdcutTKeywordArray',
    //        method: 'post',
    //        data: {
    //            MainCateId: id,
    //            keywordTbls: BPKeywordarr,
    //        }
    //    }).then(function (d) {
    //        
    //        $scope.result = d.data;
    //        if ($scope.result.res === "1") {
    //            toastr["success"]("Banner Update successfully");
    //            //$scope.BannerProdcutT = null;
    //            //$scope.GetBannerProdcutT();

    //            /*                $scope.GetKeywordData();*/
    //            //$('#edbtn').css('display', 'none');
    //            //$('#btn').css('display', 'inline');
    //            location.href = '/GiftDashBoard/AddPBanner';
    //        }
    //    }, function (error) {
    //        toastr["error"]("Something Went Wrong");
    //    });
    //};

    $scope.BannerSubTitleActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/BannerSubTitleActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetBannerSubCateTitle();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });

    };

    $scope.GetBannerSubCateTitle = function () {
        $http.get("/GiftDashBoard/GetBannerSubCateTitle").then(function (d) {

            $scope.GetBannerSubCateTitleData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };
    //-------------- Submit Banner Sub Cate Title End ->------------->---------------------->---------------------------->------->------------>---------->---


    //-------------- Submit Query model Start ->------------->---------------------->---------------------------->------->------------>---------->---

    $scope.AnswerArr = [];
    $scope.AddMoreAnswer = function () {
        $scope.AnswerArr.push({
            'Answer': ''
        });
    };
    $scope.AnswerRemove = function (index) {
        $scope.AnswerArr.splice(index, 1);
    };


    $scope.SubmitQuerymodel = function () {
        if ($("#AskQues1").val() === "") {
            toastr["error"]("Please Enter Ask Question ?");
            return;
        }
        if ($("#MainCate").val() == "" || $("#MainCate").val() == "-1") {
            toastr["error"]("Enter Banner Title");
            return;
        }


        //  $scope.Querymodel.push({'AnswerArr': $scope.AnswerArr });


        $http({
            url: '/GiftDashBoard/SubmitQuerymodel',
            method: 'post',
            data: {
                query: $scope.Querymodel,
                answerArrs: $scope.AnswerArr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category save successfully");
                $scope.GetQuerymodel();
                $scope.Querymodel = null;
                $scope.AnswerArr = [];
            } else if ($scope.result.res === "2") {
                toastr["error"]("Banner Category already exist");
            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.GetQuerymodelById = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');

        //for (var s = 0; s < $scope.KeywordList.length; s++) {
        //    var vallc1s = $scope.KeywordList[s].KeywordId;
        //    $('#Keyword_' + vallc1s).prop('checked', false);

        //}


        $scope.Querymodeldata = $scope.GetQuerymodelData.filter(item => item.MainCateId === index);
        $scope.Querymodel = {};
        $scope.Querymodel.AskQues1 = $scope.Querymodeldata[0].AskQues1;
        $scope.Querymodel.ModelQuery2 = $scope.Querymodeldata[0].ModelQuery2;

        $scope.AnswerArr = $scope.Querymodeldata;



        //$scope.Querymodel = $scope.GetQuerymodelData.filter(item => filterArray.includes(item.MainCateId));




    };

    $scope.RessetBannerCate = function () {
        $('#btn').css('display', 'inline');
        $('#edbtn').css('display', 'none');
        $scope.BannerCate = null;
    };

    $scope.UpdateQuerymodel = function () {

        //if ($("#BTitle").val() === "") {
        //    toastr["error"]("Please Enter Banner Category");

        //    return;
        //}
        if ($("#AskQues1").val() === "") {
            toastr["error"]("Please Enter Ask Question ?");
            return;
        }
        if ($("#MainCate").val() == "" || $("#MainCate").val() == "-1") {
            toastr["error"]("Enter Banner Title");
            return;
        }


        $http({
            url: '/GiftDashBoard/UpdateQuerymodel',
            method: 'post',
            data: {
                query: $scope.Querymodel,
                answerArrs: $scope.AnswerArr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category Update successfully");
                $scope.GetQuerymodel();
                $scope.Querymodel = null;
                $scope.AnswerArr = [];

            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.BannerActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/BannerActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetBannerCate();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetQuerymodel = function () {
        $http.get("/GiftDashBoard/GetQuerymodel").then(function (d) {
            $scope.GetQuerymodelData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };




    //-------------- Submit Query model End ->------------->---------------------->---------------------------->------->------------>---------->---



    //-------------- Submit Query keyword model Start ->------------->---------------------->---------------------------->------->------------>---------->---

    $scope.GetQueryToKeyword = function (id) {

        if (id != "-1" && id != "") {

            $http.get("/GiftDashBoard/GetQueryToKeyword?id=" + id).then(function (d) {

                $scope.GetQueryToKeywordData = d.data;
            }, function (error) {
                alert(error.data);
            });
        }
    };


    $scope.GetKeywordToAskQuestion = function (id) {

        if (id != "-1" && id != "") {

            $http.get("/GiftDashBoard/GetKeywordToAskQuestion?id=" + id).then(function (d) {

                $scope.GetKeywordToAskQuestionData = d.data;
            }, function (error) {
                alert(error.data);
            });
        }
    };

    $scope.GetQueryAnswerKeyword = function (id) {



        $http.get("/GiftDashBoard/GetQueryAnswerKeyword?id=" + id).then(function (d) {

            $scope.GetQueryAnswerKeywordData = d.data;
        }, function (error) {
            alert(error.data);
        });

    };

    $scope.SubmitQueryAnswerKeyword = function () {
        //if ($("#AskQues1").val() === "") {
        //    toastr["error"]("Please Enter Ask Question ?");
        //    return;
        //}


        //  $scope.Querymodel.push({'AnswerArr': $scope.AnswerArr });
        var BPKeywordarr = [];
        for (var i = 0; i < $scope.KeywordList.length; i++) {
            if ($scope.KeywordList[i].Selected) {
                BPKeywordarr.push($scope.KeywordList[i]);
            }
        }

        $http({
            url: '/GiftDashBoard/SubmitQueryAnswerKeyword',
            method: 'post',
            data: {
                model: $scope.BSubTitleTbl,
                keywordsTbl: BPKeywordarr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category save successfully");
                $scope.GetQueryAnswerKeyword();
                $scope.Querymodel = null;
                $scope.AnswerArr = [];
                $scope.GetKeywordData();
            } else if ($scope.result.res === "2") {
                toastr["error"]("Banner Category already exist");
            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };



    $scope.GetQueryAnswerKeywordById = function (index) {


        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');

        $scope.BSubTitleTbl = $scope.GetQueryAnswerKeywordData[index];


        for (var s = 0; s < $scope.BSubTitleTbl.KeywordList.length; s++) {
            var vallc1s = $scope.BSubTitleTbl.KeywordList[s].KeywordId;
            $('#Keyword_' + vallc1s).prop('checked', true);


        }


        $("#Position").val($scope.BSubTitleTbl.bMainTitle.Position);

        // $scope.GetBannerInProduct($scope.BSubTitleTbl.bMainTitle.Position);
        $("#MainCate").val($scope.BSubTitleTbl.MainCateId);


        //for (var i = 0; i < $scope.BannerProdcutT.Submenu.length; i++) {
        //    var vallc = $scope.BannerProdcutT.Submenu[i].KeywordId;
        //    $('#Keyword_' + vallc).prop('checked', true);


        //}



        // CKEDITOR.instances.ckeditor.setData($scope.Product.Description);
        //ckeditor.replace('postBody');
        // $("#ckeditor").val($scope.Product.Description);



        //    $('html, body').animate({ scrollTop: 0 }, '300');


    };

    $scope.UpdateQueryAnswerKeyword = function () {

        //var maincate = angular.element(document.getElementById("MTitle"));
        //if (maincate.val() === "") {
        //    toastr["error"]("Please Enter Banner Title");
        //    maincate.focus();
        //    return;
        //}
        //if ($("#Priority").val() == "") {
        //    toastr["error"]("Enter Banner Priority");
        //    return;
        //}

        var BPKeywordarr = [];
        //for (var i = 0; i < $scope.KeywordList.length; i++) {
        //    if ($scope.KeywordList[i].Selected) {
        //        BPKeywordarr.push($scope.KeywordList[i]);
        //    }
        //}
        $.each($(".checkbox-input:checked"), function () {
            BPKeywordarr.push({ 'KeywordId': $(this).val() });
        });


        $http({
            url: '/GiftDashBoard/UpdateQueryAnswerKeyword',
            method: 'post',
            data: {
                model: $scope.BSubTitleTbl,
                keywordsTbl: BPKeywordarr
            }
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                $scope.GetQueryAnswerKeyword();

            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    //-------------- Submit Query keyword model End ->------------->---------------------->---------------------------->------->------------>---------->---


    //-------------- Submit Festival Banner Start ->------------->---------------------->---------------------------->------->------------>---------->---



    $scope.SubmitFestivalBanner = function () {

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
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.FestivalBanner.Image = imageInputs[0].files[0];

        upload({
            url: '/GiftDashBoard/SubmitFestivalBanner',
            method: 'post',
            data: $scope.FestivalBanner
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"]("Festival Banner Saved Successfully");
                $scope.FestivalBanner = null;
                $scope.GetFestivalBanner();


            }
            else if ($scope.result.res === "-1") {
                toastr["error"]("Already Exist");
            }
            else {
                toastr["error"]("Something Went Worng");
            }
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetFestivalBanner = function () {

        $http.get("/GiftDashBoard/GetFestivalBanner").then(function (d) {


            $scope.GetFestivalBannerData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetFestivalBannerByid = function (index) {
        $('#edbtn').css('display', 'block');
        $('#btn').css('display', 'none');

        $scope.FestivalBanner = $scope.GetFestivalBannerData[index];

        const previews = document.querySelectorAll('.preview');
        const removeButtons = document.querySelectorAll('.remove-image');


        previews[0].style.display = 'block';
        removeButtons[0].disabled = false;
        previews[0].setAttribute("src", "/images/FestivalBanner/" + $scope.FestivalBanner.FBImage);
        //const previewImage = document.querySelector('#previewImage');
        //const loadingText = document.querySelector('#loadingText');
        //const dropZoon = document.querySelector('#dropZoon');
        //dropZoon.classList.add('drop-zoon--Uploaded');
        //loadingText.style.display = "none";
        //$('#previewImage').css('display', 'block');
        //previewImage.setAttribute("src", "/images/FestivalBanner/" + $scope.FestivalBanner.FBImage);

    };
    $scope.UpdateFestivalBanner = function () {
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
        const imageInputs = document.querySelectorAll('.image-input');
        $scope.FestivalBanner.Image = imageInputs[0].files[0];

        upload({
            url: '/GiftDashBoard/UpdateFestivalBanner',
            method: 'post',
            data: $scope.FestivalBanner
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"]("Festival Banner Update Successfully");
                $scope.FestivalBanner = null;
                $('#update').css('display', 'none');
                $('#submit').css('display', 'block');
                $scope.GetFestivalBanner();
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
    $scope.FestivalBannerActiveDeActive = function (id) {


        $http.get("/GiftDashBoard/FestivalBannerActiveDeActive?id=" + id).then(function (d) {

            $scope.rees = d.data;


            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetFestivalBanner();
            }
            else {
                toastr["error"]("something went wrong   ");
            }


        }, function (error) {
            alert(error.data);
        });
    };


    //-------------- Submit Festival Banner End ->------------->---------------------->---------------------------->------->------------>---------->---




    //-------------- Submit  Label Product  Start ->------------->---------------------->---------------------------->------->------------>---------->---



    $scope.SubmitLabelProduct = function () {

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


        $http({
            url: '/GiftDashBoard/SubmitLabelProduct',
            method: 'post',
            data: $scope.LabelProduct
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"]("Label Product Saved Successfully");
                $scope.LabelProduct = null;
                $scope.GetLabelProduct();


            }
            else if ($scope.result.res === "-1") {
                toastr["error"]("Already Exist");
            }
            else {
                toastr["error"]("Something Went Worng");
            }
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetLabelProduct = function () {

        $http.get("/GiftDashBoard/GetLabelProduct").then(function (d) {


            $scope.LabelProductData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetLabelProductByid = function (index) {

        $('#edbtn').css('display', 'block');
        $('#btn').css('display', 'none');

        $scope.LabelProduct = $scope.LabelProductData[index];

    };
    $scope.UpdateLabelProduct = function () {
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


        $http({
            url: '/GiftDashBoard/UpdateLabelProduct',
            method: 'post',
            data: $scope.LabelProduct
        }).then(function (d) {
            $scope.result = d.data;

            if ($scope.result.res === "1") {
                toastr["success"](" Label Product  Update Successfully");
                $scope.LabelProduct = null;
                $('#edbtn').css('display', 'none');
                $('#btn').css('display', 'block');
                $scope.GetLabelProduct();
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
    $scope.LabelProductActiveDeActive = function (id) {


        $http.get("/GiftDashBoard/LabelProductActiveDeActive?id=" + id).then(function (d) {

            $scope.rees = d.data;


            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetLabelProduct();
            }
            else {
                toastr["error"]("something went wrong");
            }


        }, function (error) {
            alert(error.data);
        });
    };


    //-------------- Submit Label Product End ->------------->---------------------->---------------------------->------->------------>---------->---


    //-------------- Submit Filter Keyword Start ->------------->---------------------->---------------------------->------->------------>---------->---
    $scope.FilterTag = [];
    $scope.SubmitFilterKeyword = function () {
        if ($("#MainCate").val() == "" || $("#MainCate").val() == "-1") {
            toastr["error"]("Enter Banner Title");
            return;
        }

        debugger
        $scope.Filter.keywordTbls = $scope.FilterTag;


        $http({
            url: '/GiftDashBoard/SubmitFilterKeyword',
            method: 'post',
            data: $scope.Filter
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category save successfully");
                $scope.GetFilterData();
                $scope.Filter = null;
                $scope.FilterTag = [];
            } else if ($scope.result.res === "2") {
                toastr["error"]("Banner Category already exist");
            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };


    $scope.UpdateFilterKeyword = function () {
        if ($("#MainCate").val() == "" || $("#MainCate").val() == "-1") {
            toastr["error"]("Enter Banner Title");
            return;
        }

        debugger
        $scope.Filter.keywordTbls = $scope.FilterTag;


        $http({
            url: '/GiftDashBoard/UpdateFilterKeyword',
            method: 'post',
            data: $scope.Filter
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                toastr["success"]("Banner Category save successfully");
                $scope.GetFilterData();
                $scope.Filter = null;
                $scope.FilterTag = [];
            } else if ($scope.result.res === "2") {
                toastr["error"]("Banner Category already exist");
            }
            else {
                toastr["error"]("Banner Category not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };
    $scope.GetFilterData = function () {
        $http.get("/GiftDashBoard/GetFilterData").then(function (d) {
            $scope.FilterData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetBannerCateFilterKeyword = function (id) {
        $http.get("/GiftDashBoard/GetBannerCateFilterKeyword?id=" + id).then(function (d) {
            $scope.FilterTag = d.data;
            debugger
        }, function (error) {
            alert(error.data);
        });
    };


    $scope.GetBannerCateFilterById = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');

        debugger
        $scope.Filter = $scope.FilterData.find(item => item.MainCateId === index);

        $scope.FilterTag = $scope.Filter.Submenu;
    };




    //-------------- Submit Festival Banner End ->------------->---------------------->---------------------------->------->------------>---------->---


    //-------------- Submit Video Start->------------->---------------------->---------------------------->------->------------>---------->---

    $scope.GetVideoData = function (id) {
        $http.get("/GiftDashBoard/GetVideoData?id=" + id).then(function (d) {
            $scope.VideoDataList = d.data;

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.quickview = function (id) {
        debugger

        id = parseInt(id);
        $scope.VideoData = $scope.VideoDataList.find(item => item.VId === id);


        setTimeout(() => {
            var videoElement = document.getElementById('pVideo');
            if (videoElement) {
                videoElement.src = '/images/ProductVideo/' + $scope.VideoData.Video;
            }

        }, 100);


    };
    $scope.SubmitVideo = function () {

        debugger

        if ($("#VideoTitle").val() == "") {
            toastr["error"]("Enter Video Title");
            return;
        }
        upload({
            url: '/GiftDashBoard/SubmitVideo',
            method: 'post',
            data: $scope.Video
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {

                toastr["success"]("Video save successfully");
                $scope.Video = null;
                $scope.GetVideoData();

            } else if ($scope.result.res === "2") {
                toastr["error"]("Video Title already exist");
            }
            else {
                toastr["error"]("Video not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.GetVideoById = function (index) {
        $('#btn').css('display', 'none');
        $('#edbtn').css('display', 'inline');


        $scope.Video = $scope.VideoDataList[index];


        $('html, body').animate({ scrollTop: 0 }, '300');
    };


    $scope.UpdateVideo = function () {
        debugger
        var maincate = angular.element(document.getElementById("VideoTitle"));
        if (maincate.val() === "") {
            toastr["error"]("Enter Video Title");
            maincate.focus();
            return;
        }

        upload({
            url: '/GiftDashBoard/UpdateVideo',
            method: 'post',
            data: $scope.Video
        }).then(function (d) {
            $scope.result = d.data;
            if ($scope.result.res === "1") {
                $scope.Video = null;
                $scope.GetVideoData();
            }
            else {
                toastr["error"]("Video not save");
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

    $scope.VideoActiveDeActive = function (id) {
        $http.get("/GiftDashBoard/VideoActiveDeActive?id=" + id).then(function (d) {
            $scope.rees = d.data;
            if ($scope.rees.res === "1") {
                toastr["success"]("successful");
                $scope.GetVideoData();
            }
            else {
                toastr["error"]("something went wrong");
            }


        }, function (error) {
            alert(error.data);
        });
    };

    //-------------- Submit Video End->------------->---------------------->---------------------------->------->------------>---------->---





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

