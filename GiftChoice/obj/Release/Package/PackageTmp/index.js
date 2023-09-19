var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/home1', {
            templateUrl: 'Pages/home.html',
            controller: 'homeController'
        }).when('/home1/Cart', {
            templateUrl: 'Pages/Cart.html',
            controller: 'CartController'
        }).when('/home1/AllShop', {
            templateUrl: 'Pages/Shop.html',
            controller: 'AShopController'
        }).when('/home1/Contact', {
            templateUrl: 'Pages/Contact.html',
            controller: 'ContactController'
        })

        .otherwise({ redirectTo: '/home1' });

    $locationProvider.html5Mode(true);
}]);


scotchApp.controller('homeController', function ($scope, $http) {
    // $('html,body').animate({ scrollTop: 0 }, 'slow');
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
    $scope.GetMainCateData = function () {
        $http.get("/Home/GetMainCateData").then(function (d) {
            $scope.MainCateData = d.data;
            debugger
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
    $scope.BannerList = function () {
        debugger
        $http.get("/Home/BannerList").then(function (d) {

            debugger
            $scope.BannerListData = d.data;

        }, function (error) {
            alert(error.data);
        });
    };

});

scotchApp.controller('ContactController', function ($scope, $http) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');

});
scotchApp.controller('AShopController', function ($scope, $http) {
  
    debugger
    var urlParams = new URLSearchParams(window.location.search);
    var a = '/Home/FilterProduct?' + urlParams.toString();

    debugger
    $http.get(a).then(function (d) {
        debugger
        $scope.ProductData = d.data;
    });


});
scotchApp.controller('CartController', function ($scope, $http) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
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

});

scotchApp.component('navbar', {
    templateUrl: 'Component/navbar.html',
    controller: "navbarController"
});
scotchApp.component('appfooter', {
    templateUrl: 'Component/footer.html',
    controller: "footerController"
});
scotchApp.controller('navbarController', function ($scope, $http) {
    $scope.Getmenu = function () {

        $http.get("/Home/GetNavbarMenu").then(function (d) {

            $scope.NavbarMenuList = d.data.NavbarMenuList;
            $scope.ScondNavbarMenuList = d.data.ScondNavbarMenuList;

            debugger
        }, function (error) {
            alert(error.data);
        });
    };
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
});


scotchApp.controller('footerController', function ($scope) {

});

