var app = angular.module("HomeApp", ['angucomplete-alt']);
app.controller("HomeController", ['$scope',  '$http', '$sce', function ($scope,  $http, $sce) {

    $http.get("/Home/GetNavbarMenu").then(function (d) {
        $scope.NavbarMenuList = d.data.NavbarMenuList;
        $scope.ScondNavbarMenuList = d.data.ScondNavbarMenuList;

        debugger
    }, function (error) {
        alert(error.data);
    });
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
 
      $scope.addItemToCart = function() {
          $scope.cart.push({
              'name': $scope.name,
              'price': $scope.price
          });
    localStorage.setItem('cart', JSON.stringify($scope.cart));
  };

  // Function to remove an item from the cart.
  $scope.removeItemFromCart = function(index) {
    $scope.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify($scope.cart));
  };

  // Function to clear the entire cart.
  $scope.clearCart = function() {
    $scope.cart = [];
    localStorage.removeItem('cart');
    };

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

                    for (var i = 0; i < d.data.KeyWordList.length; i++) {
                        if (label === d.data.KeyWordList[i].label) {
                            location.href = '/Home/Shop?Keyword=' + label  ;

                            //var UniversityName = d.data.Renew[i].University_name;
                            //$('#University_name').val(UniversityName).trigger('change');
                            //var courseName = d.data.Renew[i].course_name;
                            //$('#course_name').val(courseName).trigger('change');


                            return;
                        }
                    }

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

     
    $scope.FilterProductData = function () {

    };
    $scope.GetMainCateData = function () {
        $http.get("/GiftDashBoard/GetMainCateData").then(function (d) {
            $scope.MainCateData = d.data;
            setTimeout(() => {
                $(".carausel-6-columns").each(function (key, item) {
                    var id = $(this).attr("id");
                    var sliderID = '#' + id;
                    var appendArrowsClassName = '#' + id + '-arrows'

                    $(sliderID).slick({
                        dots: false,
                        infinite: true,
                        speed: 1000,
                        arrows: true,
                        autoplay: true,
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        loop: true,
                        adaptiveHeight: true,
                        responsive: [
                            {
                                breakpoint: 1025,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1,
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1
                                }
                            }
                        ],
                        prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
                        nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
                        appendArrows: (appendArrowsClassName),
                    });
                });

                $(".carausel-6-columns").each(function (key, item) {
                    var id = $(this).attr("id");
                    var sliderID = '#' + id;
                    var appendArrowsClassName = '#' + id + '-arrows'

                    $(sliderID).slick({
                        dots: false,
                        infinite: true,
                        speed: 1000,
                        arrows: true,
                        autoplay: true,
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        loop: true,
                        adaptiveHeight: true,
                        responsive: [
                            {
                                breakpoint: 1025,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1,
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1
                                }
                            }
                        ],
                        prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
                        nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
                        appendArrows: (appendArrowsClassName),
                    });
                });


            }, 100);
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

    $scope.FilterProduct = function (id) {
        debugger
        $http.get("/Home/FilterProduct?id=" + id).then(function (d) {
            debugger
            $scope.ProductData = d.data;
        }, function (error) {
            alert(error.data);
        });
    };


    $scope.BannerList = function () {
        debugger
        $http.get("/Home/BannerList").then(function (d) {

            debugger
            $scope.BannerListData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };

    $scope.FilterProductData = function () {

    };


    $scope.GetProductByid = function (id) {
        debugger 
        $http.get("/Home/GetProductByid?id=" + id).then(function (d) {
            debugger
            $scope.Product = d.data;

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
                

            }, 100);

        }, function (error) {
            alert(error.data);
        });
    };
    $scope.GetSmillerProduct = function (id) {
        debugger
        $http.get("/Home/GetSmillerProduct?id=" + id).then(function (d) {
            debugger
            $scope.ProductList = d.data;

          
      

        }, function (error) {
            alert(error.data);
        });
    };
}]);