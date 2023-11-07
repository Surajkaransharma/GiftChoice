﻿var app = angular.module("HomeApp", []);
app.controller("HomeController", ['$scope', '$http', '$sce', 'orderByFilter', function ($scope, $http, $sce, orderBy) {



    $http.get("/Home/GetNavbarMenu").then(function (d) {
        $scope.NavbarMenuList = d.data.NavbarMenuList;
        $scope.ScondNavbarMenuList = d.data.ScondNavbarMenuList;

        debugger
    }, function (error) {
        alert(error.data);
    });
    $scope.RecentViewGifts = [];
    $scope.RecentViewData = function (index) {
        debugger

        var selectedProduct = $scope.ProductData[index];
        var productId = selectedProduct.ProductId;


        var productInCart = $scope.RecentViewGifts.find(function (item) {
            return item.ProductId === productId;
        });

        if (!productInCart) {
            // If the product is not in the cart, add it
            $scope.RecentViewGifts.push(selectedProduct);
            localStorage.setItem('RecentViewGifts', JSON.stringify($scope.RecentViewGifts));
            $scope.GetRecentViewGifts();

        }

    };
    $scope.GetRecentViewGifts = function () {
        debugger


        $scope.RecentViewGifts = JSON.parse(localStorage.getItem('RecentViewGifts')) || [];


    };
    $scope.cart = [];
    //$scope.CartItem = JSON.parse(localStorage.getItem('cart'));
    $scope.GetCart = function () {
        debugger
        var cartlist = [];

        $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

        if ($scope.cart != null) {
            $scope.TotalAmount = 0;
            for (var i = 0; i < $scope.cart.length; i++) {
                $scope.TotalAmount += $scope.cart[i].Price * $scope.cart[i].Qty;
            }
        }
    };
    $scope.addItemToCart = function (index) {
        debugger
        debugger;

        var selectedProduct = $scope.ProductData[index];
        var productId = selectedProduct.ProductId;

        // Check if the product with the same productId is already in the cart
        var productInCart = $scope.cart.find(function (item) {
            return item.ProductId === productId;
        });

        if (!productInCart) {
            // If the product is not in the cart, add it
            $scope.cart.push(selectedProduct);
            localStorage.setItem('cart', JSON.stringify($scope.cart));
            $scope.GetCart();
            toastr["success"]("Product successfully added to the cart.");
        } else {
            // If the product is already in the cart, you can handle this case as needed.
            // For example, you can display a message to the user.

            toastr["error"]('This product is already in your cart.');
            return;
        }
        //$scope.cart.push($scope.ProductData[index]);
        ////$scope.cart =    $scope.ProductData[index];
        ////$scope.cart.push({
        ////    'name': $scope.name,
        ////    'price': $scope.price
        ////});
        //localStorage.setItem('cart', JSON.stringify($scope.cart));
        //$scope.GetCart();
    };


    $scope.GiftsaddItemToCart = function (index) {
        debugger
        debugger;

        var selectedProduct = $scope.ProductData[index];
        var productId = selectedProduct.ProductDetails.ProductId;

        // Check if the product with the same productId is already in the cart
        var productInCart = $scope.cart.find(function (item) {
            return item.ProductId === productId;
        });

        if (!productInCart) {
            // If the product is not in the cart, add it
            $scope.cart.push(selectedProduct.ProductDetails);
            localStorage.setItem('cart', JSON.stringify($scope.cart));
            $scope.GetCart();
            toastr["success"]("Product successfully added to the cart.");
        } else {
            // If the product is already in the cart, you can handle this case as needed.
            // For example, you can display a message to the user.

            toastr["error"]('This product is already in your cart.');
            return;
        }
        //$scope.cart.push($scope.ProductData[index]);
        ////$scope.cart =    $scope.ProductData[index];
        ////$scope.cart.push({
        ////    'name': $scope.name,
        ////    'price': $scope.price
        ////});
        //localStorage.setItem('cart', JSON.stringify($scope.cart));
        //$scope.GetCart();
    };

    // Function to remove an item from the cart.
    $scope.removeItemFromCart = function (index) {
        $scope.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    };

    // Function to clear the entire cart.
    $scope.clearCart = function () {
        $scope.cart = [];
        localStorage.removeItem('cart');
    };
    $scope.Qty = 1;
    $scope.AddQty = function (id, index) {
        debugger

        if (id == 1) {

            $scope.Qty += 1;

            $scope.cart[index].Qty = $scope.Qty;
        }
        if (id == 0) {
            $scope.Qty -= 1;
            $scope.cart[index].Qty = $scope.Qty;
        }

        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }
    $scope.GetKeywordData = null;
    $scope.SelectedKeyword = null;
    var post2 = $http({
        method: "POST",
        url: "/Home/GetKeyword",
        dataType: 'json',
        data: {},
        headers: { "Content-Type": "application/json" }
    });

    post2.success(function (data, status) {

        $scope.GetKeywordData = data.Keywordlist;
    });

    post2.error(function (data, status) {
        $window.alert(data.Message);
    });


    $scope.GetRandomKeyword = function () {

        $("#Keyword").addClass('ui-autocomplete-loader-center');
        $http.get("/Home/GetRandomKeyword?id=" + $scope.Keyword).then(function (d) {

            $("#Keyword").removeClass('ui-autocomplete-loader-center');

            $("#Keyword").autocomplete({
                source: d.data.KeyWordList,
                select: function (event, ui) {
                    var label = ui.item.label;
                    var value = ui.item.value;

                    //for (var i = 0; i < d.data.KeyWordList.length; i++) {
                    //    if (label === d.data.KeyWordList[i].label) {
                    //        //   window.location.href = '/Home/Shop?Keyword=' + d.data.KeyWordList[i].KUrl;
                    //        $scope.KeyWords = d.data.KeyWordList[i].KUrl;
                    $scope.SearchDataShop();
                    //    }
                    //}

                    event.preventDefault();
                    $(this).val('');

                },
                focus: function (event, ui) {
                    this.value = ui.item.label;
                    event.preventDefault();
                    $(this).val(ui.item.label);
                }
            });
        }, function (error) {
            alert(error.data);
        });

    };
    $scope.SearchDataShop = function () {
        debugger
        var id = $("#Keyword").val();
        $http({
            url: '/Home/SearchDataShop',
            method: 'POST',
            data: {
                Keyword: id

            }
        }).then(function (d) {
            debugger
            $scope.result = d.data.Keywords;
            debugger

            location.href = '/Home/Shop?Keyword=' + $scope.result;
        }, function (error) {
            alert(error.data);
        });

    };
    $scope.GetRandomKeywordMobile = function () {
        debugger
        $("#MKeyword").addClass('ui-autocomplete-loader-center');
        $http.get("/Home/GetRandomKeyword?id=" + $scope.Keyword).then(function (d) {

            $("#MKeyword").removeClass('ui-autocomplete-loader-center');

            $("#MKeyword").autocomplete({
                source: d.data.KeyWordList,
                select: function (event, ui) {
                    var label = ui.item.label;
                    var value = ui.item.value;

                    //for (var i = 0; i < d.data.KeyWordList.length; i++) {
                    //    if (label === d.data.KeyWordList[i].label) {
                    //        location.href = '/Home/Shop?Keyword=' + d.data.KeyWordList[i].KUrl;
                    //        return;
                    //    }
                    //}

                    event.preventDefault();
                    $(this).val('');

                },
                focus: function (event, ui) {
                    this.value = ui.item.label;
                    event.preventDefault();
                    $(this).val(ui.item.label);
                }
            });
        }, function (error) {
            alert(error.data);
        });

    };


    $scope.SearchData = function () {
        debugger
        $scope.kk = $("#Keyword").val();
        debugger;
        $http({
            url: '/Home/SearchData',
            method: 'POST',
            data: {
                list_keyword: $("#Keyword").val(),
                brand: $("#brand").val(),
                CompanyName: $("#CompanyName").val(),
                City_id: $("#CityId").val(),
                maincategory_id: $("#MainCate").val()
            }
        }).then(function (d) {
            debugger
            $scope.result = d.data.Keywordlist;
            debugger
            //    location.href = '/Home/SearchList?list=' + $scope.result.list + 'brand' + $scope.result.brand + 'CompanyName' + $scope.result.cname + 'CityId' + $scope.result.ctid + 'MainCate' + $scope.result.mcate;

        }, function (error) {
            alert(error.data);
        });

    };
    $scope.SliderList = function () {
        debugger
        $http.get("/Home/SliderList").then(function (d) {

            debugger
            $scope.SliderListData = d.data;
            setTimeout(() => {
                var mainslider = $(".owl-carousel-slider");
                if (mainslider.length > 0) {
                    mainslider.owlCarousel({
                        items: 1,
                        dots: false,
                        lazyLoad: true,
                        pagination: true,
                        autoPlay: 4000,
                        loop: true,
                        singleItem: true,
                        navigation: true,
                        stopOnHover: true,
                        nav: true,
                        navigationText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"]
                    });
                }
            }, 10);
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.sortByPrice = function (order) {
        debugger
        $scope.ProductData.sort(function (a, b) {
            if (order === 'asc') {
                return a.Price - b.Price;
            } else {
                return b.Price - a.Price;
            }
        });
    };
    $scope.FClear = function () {
        for (var s = 0; s < $scope.MainCateData.length; s++) {
            var vallc1s = $scope.MainCateData[s].MainCateId;
            $('#Main_' + vallc1s).prop('checked', false);

        }
        for (var i = 0; i < $scope.priceRanges.length; i++) {
            var id = $scope.priceRanges[i].id;
            $('#price_' + id).prop('checked', false);

        }

        var Cid = [];
        var priceTblarr = [];
        $scope.minPrice = 0;
        $scope.maxPrice = 0;
    };
    $scope.sortByReleaseDate = function (order) {
        $scope.ProductData.sort(function (a, b) {
            if (order === 'asc') {
                return new Date(a.Create_at) - new Date(b.Create_at);
            } else {
                return new Date(b.Create_at) - new Date(a.Create_at);
            }
        });
    };
    //$scope.propertyName = 'CompanyName';
    //$scope.reverse = true;
    //$scope.ProductData = orderBy($scope.ProductData, $scope.propertyName, $scope.reverse);
    //$scope.sortBy = function (propertyName) {
    //    debugger;
    //    $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
    //        ? !$scope.reverse : false;
    //    $scope.propertyName = propertyName;
    //    $scope.ProductData = orderBy($scope.ProductData, $scope.propertyName, $scope.reverse);
    //};
    $scope.FilterProductData = function (id) {
        debugger;

        var Cid = [];
        var Bid = [];
        if (id == 0) {
            $.each($(".form-check-input:checked"), function () {
                Bid.push(parseInt($(this).val()));
            });
        } else {

            $.each($(".form-check-input:checked"), function () {
                Cid.push(parseInt($(this).val()));
            });
        }

        var priceTblarr = [];
        for (var i = 0; i < $scope.priceRanges.length; i++) {
            if ($scope.priceRanges[i].Selected) {
                priceTblarr.push($scope.priceRanges[i]);
            }
        }
        $scope.minPrice = 0;
        $scope.maxPrice = 0;
        $scope.firstItem = priceTblarr[0]; // First item
        $scope.minPrice = $scope.firstItem.minPrice;
        $scope.lastItem = priceTblarr[priceTblarr.length - 1];
        $scope.maxPrice = $scope.lastItem.maxPrice;
        debugger
        $http({
            url: '/Home/FilterProductData',
            method: 'post',
            data: {
                Cid: Cid,
                maxprice: $scope.maxPrice,
                minprice: $scope.minPrice,
                Bid: Bid
            }
        }).then(function (d) {
            debugger
            $scope.ProductData = d.data.ProductList;
            $('.offcanvas').removeClass('show');
        }), function (error) {
            toastr["error"]("Something Went Wrong");
        };

    };
    $scope.GetMainCateData = function () {
        $http.get("/Home/GetMainCateData").then(function (d) {
            $scope.MainCateData = d.data;
            debugger
            //setTimeout(() => {
            //    $(".carausel-6-columns").each(function (key, item) {
            //        var id = $(this).attr("id");
            //        var sliderID = '#' + id;
            //        var appendArrowsClassName = '#' + id + '-arrows'

            //        $(sliderID).slick({
            //            dots: false,
            //            infinite: true,
            //            speed: 400,
            //            arrows: true,
            //            autoplay: true,
            //            slidesToShow: 8,
            //            slidesToScroll: 2,
            //            loop: true,
            //            adaptiveHeight: true,
            //            responsive: [
            //                {
            //                    breakpoint: 1025,
            //                    settings: {
            //                        slidesToShow: 4,
            //                        slidesToScroll: 2,
            //                    }
            //                },
            //                {
            //                    breakpoint: 768,
            //                    settings: {
            //                        slidesToShow: 3,
            //                        slidesToScroll: 2,
            //                    }
            //                },
            //                {
            //                    breakpoint: 480,
            //                    settings: {
            //                        slidesToShow: 3,
            //                        slidesToScroll: 2
            //                    }
            //                }
            //            ],
            //            prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
            //            nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
            //            appendArrows: (appendArrowsClassName),
            //        });
            //    });

            //    $(".carausel-6-columns").each(function (key, item) {
            //        var id = $(this).attr("id");
            //        var sliderID = '#' + id;
            //        var appendArrowsClassName = '#' + id + '-arrows'

            //        $(sliderID).slick({
            //            dots: false,
            //            infinite: true,
            //            speed: 400,
            //            arrows: true,
            //            autoplay: true,
            //            slidesToShow: 8,
            //            slidesToScroll: 2,
            //            loop: true,
            //            adaptiveHeight: true,
            //            responsive: [
            //                {
            //                    breakpoint: 1025,
            //                    settings: {
            //                        slidesToShow: 4,
            //                        slidesToScroll: 2,
            //                    }
            //                },
            //                {
            //                    breakpoint: 768,
            //                    settings: {
            //                        slidesToShow: 4,
            //                        slidesToScroll: 2,
            //                    }
            //                },
            //                {
            //                    breakpoint: 480,
            //                    settings: {
            //                        slidesToShow: 4,
            //                        slidesToScroll: 2
            //                    }
            //                }
            //            ],
            //            prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
            //            nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
            //            appendArrows: (appendArrowsClassName),
            //        });
            //    });


            //}, 100);
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetBannerCateData = function () {
        $http.get("/Home/GetBannerCateData").then(function (d) {
            $scope.MainCateData = d.data;
            debugger
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.GetProduct = function () {
        debugger
        $http.get("/Home/GetProduct").then(function (d) {
            debugger
            $scope.ProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.FilterProduct = function () {
        debugger
        $http.get("/Home/FilterProduct").then(function (d) {
            debugger
            $scope.ProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.priceRanges = [
        { id: 1, minPrice: 0, maxPrice: 300, selected: false },
        { id: 2, minPrice: 300, maxPrice: 500, selected: false },
        { id: 3, minPrice: 500, maxPrice: 700, selected: false },
        { id: 4, minPrice: 700, maxPrice: 1000, selected: false },
        { id: 5, minPrice: 1000, maxPrice: 1300, selected: false },
        { id: 6, minPrice: 1300, maxPrice: 1500, selected: false },

    ];


    $scope.BannerList = function () {
        debugger
        $http.get("/Home/BannerList").then(function (d) {

            debugger
            $scope.BannerListData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };



    $scope.GiftAddItemToCart = function (Productid) {
        debugger
        debugger;

        var selectedProduct = $scope.Product;
        var productId = selectedProduct.ProductId;

        // Check if the product with the same productId is already in the cart
        var productInCart = $scope.cart.find(function (item) {
            return item.ProductId === productId;
        });

        if (!productInCart) {
            // If the product is not in the cart, add it
            $scope.cart.push(selectedProduct);
            localStorage.setItem('cart', JSON.stringify($scope.cart));
            $scope.GetCart();
            toastr["success"]("Product successfully added to the cart.");
        } else {
            // If the product is already in the cart, you can handle this case as needed.
            // For example, you can display a message to the user.

            toastr["error"]('This product is already in your cart.');
            return;
        }
        //$scope.cart.push($scope.ProductData[index]);
        ////$scope.cart =    $scope.ProductData[index];
        ////$scope.cart.push({
        ////    'name': $scope.name,
        ////    'price': $scope.price
        ////});
        //localStorage.setItem('cart', JSON.stringify($scope.cart));
        //$scope.GetCart();
    };

    $scope.GetProductByid = function (id) {
        debugger
        $http.get("/Home/GetProductByid?id=" + id).then(function (d) {
            debugger
            $scope.Product = d.data;
            //$scope.idd = $scope.Product.MainCateId;

            $scope.GetSmillerProduct($scope.Product.ProductId, $scope.Product.MainCateId);

            $('#desc').html($scope.Product.PDesc);

            setTimeout(() => {

                //Load functions

                $('.product-image-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: false,
                    asNavFor: '.slider-nav-thumbnails',
                });

                $('.slider-nav-thumbnails').slick({
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    asNavFor: '.product-image-slider',
                    dots: false,
                    focusOnSelect: true,
                    prevArrow: '<button type="button" class="slick-prev"><i class="fi-rs-angle-left"></i></button>',
                    nextArrow: '<button type="button" class="slick-next"><i class="fi-rs-angle-right"></i></button>'
                });

                // Remove active class from all thumbnail slides
                $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');

                // Set active class to first thumbnail slides
                $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

                // On before slide change match active thumbnail to current slide
                $('.product-image-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    var mySlideNumber = nextSlide;
                    $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
                    $('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
                });

                $('.product-image-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    var img = $(slick.$slides[nextSlide]).find("img");
                    $('.zoomWindowContainer,.zoomContainer').remove();
                    $(img).elevateZoom({
                        zoomType: "inner",
                        cursor: "crosshair",
                        zoomWindowFadeIn: 500,
                        zoomWindowFadeOut: 750
                    });
                });
                //Elevate Zoom
                if ($(".product-image-slider").length) {
                    $('.product-image-slider .slick-active img').elevateZoom({
                        zoomType: "inner",
                        cursor: "crosshair",
                        zoomWindowFadeIn: 500,
                        zoomWindowFadeOut: 750
                    });
                }
                //Filter color/Size
                $('.list-filter').each(function () {
                    $(this).find('a').on('click', function (event) {
                        event.preventDefault();
                        $(this).parent().siblings().removeClass('active');
                        $(this).parent().toggleClass('active');
                        $(this).parents('.attr-detail').find('.current-size').text($(this).text());
                        $(this).parents('.attr-detail').find('.current-color').text($(this).attr('data-color'));
                    });
                });
                //Qty Up-Down
                $('.detail-qty').each(function () {
                    var qtyval = parseInt($(this).find('.qty-val').text(), 10);
                    $('.qty-up').on('click', function (event) {
                        event.preventDefault();
                        qtyval = qtyval + 1;
                        $(this).prev().text(qtyval);
                    });
                    $('.qty-down').on('click', function (event) {
                        event.preventDefault();
                        qtyval = qtyval - 1;
                        if (qtyval > 1) {
                            $(this).next().text(qtyval);
                        } else {
                            qtyval = 1;
                            $(this).next().text(qtyval);
                        }
                    });
                });

                $('.dropdown-menu .cart_list').on('click', function (event) {
                    event.stopPropagation();
                });


            }, 10);

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetSmillerProduct = function (id, idd) {
        debugger
        $http.get("/Home/GetSmillerProduct?id=" + id + '&idd=' + idd).then(function (d) {
            debugger
            $scope.ProductData = d.data;




        }, function (error) {
            alert(error.data);
        });
    };


    $scope.AddOrder = function () {

        if ($("#Name").val() === "") {
            toastr["error"]("Please Enter Name");

            return;
        }

        if ($("#MobileNo").val() === "") {
            toastr["error"]("Please Enter Mobile No.");

            return;
        }

        debugger;
        $http({
            url: '/Home/AddOrder',
            method: 'post',
            data: {
                UName: $("#Name").val(),
                MobileNo: $("#MobileNo").val(),
                UEmail: $("#Email").val(),
                UAddress: $("#Address").val(),
                City: $("#City").val(),
                UState: $("#State").val(),
                Pincode: $("#zipcode").val(),
                OrderList: $scope.cart,
                OrderAmount: $scope.TotalAmount
            }
        }).then(function (d) {
            $scope.result = d.data;
            debugger
            if ($scope.result.res === "1") {

                $scope.cart = [];
                localStorage.removeItem('cart');

                window.location.href = "/Home/thankyou";
            }
        }, function (error) {
            toastr["error"]("Something Went Wrong");
        });
    };

}]);