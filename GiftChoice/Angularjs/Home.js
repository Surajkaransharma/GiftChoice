var app = angular.module("HomeApp", []);
app.controller("HomeController", ['$scope',  '$http', '$sce', function ($scope,  $http, $sce) {

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

    $scope.BannerList = function () {
        debugger
        $http.get("/Home/BannerList").then(function (d) {

            debugger
            $scope.BannerListData = d.data;

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
}]);