function myFunction() {
    var e = document.getElementById("dots"),
        s = document.getElementById("more"),
        i = document.getElementById("myBtn");
    "none" === e.style.display ? ((e.style.display = "inline"), (i.innerHTML = "Read more"), (s.style.display = "none")) : ((e.style.display = "none"), (i.innerHTML = "Read less"), (s.style.display = "inline"));
}
!(function (e) {
    "use strict";
    e(window).on("load", function () {
        e("#preloader-active").delay(450).fadeOut("slow"), e("body").delay(450).css({ overflow: "visible" }), e("#onloadModal").modal("show");
    });
    var s,
        i,
        o,
        n,
        a = e(".sticky-bar"),
        l = e(window);
    l.on("scroll", function () {
        200 > l.scrollTop() ? (a.removeClass("stick"), e(".header-style-2 .categori-dropdown-active-large").removeClass("open"), e(".header-style-2 .categori-button-active").removeClass("open")) : a.addClass("stick");
    }),
        e.scrollUp({ scrollText: '<i class="fi-rs-arrow-up"></i>', easingType: "linear", scrollSpeed: 900, animation: "fade" }),
        new WOW().init(),
        e(".sticky-sidebar").length && e(".sticky-sidebar").theiaStickySidebar(),
        e("#slider-range").length &&
        (e("#slider-range").slider({
            range: !0,
            min: 0,
            max: 500,
            values: [130, 250],
            slide: function (s, i) {
                e("#amount").val("$" + i.values[0] + " - $" + i.values[1]);
            },
        }),
            e("#amount").val("$" + e("#slider-range").slider("values", 0) + " - $" + e("#slider-range").slider("values", 1))),
        e(".hero-slider-1").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: !0,
            loop: !0,
            dots: !0,
            arrows: !0,
            prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
            nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
            appendArrows: ".hero-slider-1-arrow",
            autoplay: !0,
        }),
        e(".carausel-4-columns").each(function (s, i) {
            var o = e(this).attr("id");
            e("#" + o).slick({
                dots: !1,
                infinite: !0,
                speed: 1e3,
                arrows: !0,
                autoplay: !0,
                slidesToShow: 4,
                slidesToScroll: 1,
                loop: !0,
                adaptiveHeight: !0,
                responsive: [
                    { breakpoint: 1025, settings: { slidesToShow: 3, slidesToScroll: 3 } },
                    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
                prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
                nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
                appendArrows: "#" + o + "-arrows",
            });
        }),
        e('button[data-bs-toggle="tab"]').on("shown.bs.tab", function (s) {
            e(".carausel-4-columns").slick("setPosition");
        }),
        e("[data-countdown]").each(function () {
            var s = e(this),
                i = e(this).data("countdown");
            s.countdown(i, function (s) {
                e(this).html(
                    s.strftime(
                        '<span class="countdown-section"><span class="countdown-amount hover-up">%d</span><span class="countdown-period"> days </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%H</span><span class="countdown-period"> hours </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%M</span><span class="countdown-period"> mins </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%S</span><span class="countdown-period"> sec </span></span>'
                    )
                );
            });
        }),
        e(".product-slider-active-1").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: !0,
            fade: !1,
            loop: !0,
            dots: !1,
            arrows: !0,
            prevArrow: '<span class="pro-icon-1-prev"><i class="fi-rs-angle-small-left"></i></span>',
            nextArrow: '<span class="pro-icon-1-next"><i class="fi-rs-angle-small-right"></i></span>',
            responsive: [
                { breakpoint: 1199, settings: { slidesToShow: 3 } },
                { breakpoint: 991, settings: { slidesToShow: 2 } },
                { breakpoint: 767, settings: { slidesToShow: 2 } },
                { breakpoint: 575, settings: { slidesToShow: 1 } },
            ],
        }),
        e(".testimonial-active-1").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            fade: !1,
            loop: !0,
            dots: !1,
            arrows: !0,
            prevArrow: '<span class="pro-icon-1-prev"><i class="fi-rs-angle-small-left"></i></span>',
            nextArrow: '<span class="pro-icon-1-next"><i class="fi-rs-angle-small-right"></i></span>',
            responsive: [
                { breakpoint: 1199, settings: { slidesToShow: 3 } },
                { breakpoint: 991, settings: { slidesToShow: 2 } },
                { breakpoint: 767, settings: { slidesToShow: 1 } },
                { breakpoint: 575, settings: { slidesToShow: 1 } },
            ],
        }),
        e(".testimonial-active-3").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            fade: !1,
            loop: !0,
            dots: !0,
            arrows: !1,
            responsive: [
                { breakpoint: 1199, settings: { slidesToShow: 3 } },
                { breakpoint: 991, settings: { slidesToShow: 2 } },
                { breakpoint: 767, settings: { slidesToShow: 1 } },
                { breakpoint: 575, settings: { slidesToShow: 1 } },
            ],
        }),
        e(".categories-slider-1").slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            fade: !1,
            loop: !0,
            dots: !1,
            arrows: !1,
            responsive: [
                { breakpoint: 1199, settings: { slidesToShow: 4 } },
                { breakpoint: 991, settings: { slidesToShow: 3 } },
                { breakpoint: 767, settings: { slidesToShow: 2 } },
                { breakpoint: 575, settings: { slidesToShow: 1 } },
            ],
        }),
        e(".categori-button-active").on("click", function (s) {
            s.preventDefault(),
                e(this).hasClass("open")
                    ? (e(this).removeClass("open"), e(this).siblings(".categori-dropdown-active-large").removeClass("open"))
                    : (e(this).addClass("open"), e(this).siblings(".categori-dropdown-active-large").addClass("open"));
        });
    var t,
        r,
        c,
        d = e("#slider-range"),
        p = e("#amount");
    if (
        (e(function () {
            d.slider({
                range: !0,
                min: 16,
                max: 400,
                values: [0, 300],
                slide: function (e, s) {
                    p.val("$" + s.values[0] + " - $" + s.values[1]);
                },
            }),
                p.val("$" + d.slider("values", 0) + " - $" + d.slider("values", 1));
        }),
            e(".sort-by-product-area").length)
    ) {
        var w = e("body"),
            u = e(".sort-by-product-area"),
            g = u.find(".sort-by-dropdown");
        u.on("click", ".sort-by-product-wrap", function (s) {
            s.preventDefault();
            var i = e(this);
            i.parent().hasClass("show") ? i.siblings(".sort-by-dropdown").removeClass("show").parent().removeClass("show") : i.siblings(".sort-by-dropdown").addClass("show").parent().addClass("show");
        }),
            w.on("click", function (s) {
                var i = s.target;
                e(i).is(".sort-by-product-area") || e(i).parents().is(".sort-by-product-area") || !u.hasClass("show") || (u.removeClass("show"), g.removeClass("show"));
            });
    }
    e(".shop-filter-toogle").on("click", function (s) {
        s.preventDefault(), e(".shop-product-fillter-header").slideToggle();
    }),
        e(".shop-filter-toogle").on("click", function () {
            e(".shop-filter-toogle").toggleClass("active");
        }),
        e(".pro-dec-big-img-slider").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !1, draggable: !1, fade: !1, asNavFor: ".product-dec-slider-small , .product-dec-slider-small-2" }),
        e(".product-dec-slider-small").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".pro-dec-big-img-slider",
            dots: !1,
            focusOnSelect: !0,
            fade: !1,
            arrows: !1,
            responsive: [
                { breakpoint: 991, settings: { slidesToShow: 3 } },
                { breakpoint: 767, settings: { slidesToShow: 4 } },
                { breakpoint: 575, settings: { slidesToShow: 2 } },
            ],
        }),
        e(".img-popup").magnificPopup({ type: "image", gallery: { enabled: !0 } }),
        e(".btn-close").on("click", function (s) {
            e(".zoomContainer").remove();
        }),
        e("#quickViewModal").on("show.bs.modal", function (s) {
            e(document).click(function (s) {
                var i = e(".modal-dialog");
                i.is(s.target) || 0 !== i.has(s.target).length || e(".zoomContainer").remove();
            });
        }),
        e(".select-active").select2(),
        e(".checkout-click1").on("click", function (s) {
            s.preventDefault(), e(".checkout-login-info").slideToggle(900);
        }),
        e(".checkout-click3").on("click", function (s) {
            s.preventDefault(), e(".checkout-login-info3").slideToggle(1e3);
        }),
        e(".checkout-toggle2").on("click", function () {
            e(".open-toggle2").slideToggle(1e3);
        }),
        e(".checkout-toggle").on("click", function () {
            e(".open-toggle").slideToggle(1e3);
        }),
        e(".payment-method").on("click", 'input[name="payment_method"]', function () {
            var s = "payment-selected";
            e(this).parents(".sin-payment").first().addClass(s).siblings().removeClass(s);
        }),
        e(".count").counterUp({ delay: 10, time: 2e3 }),
        e(".grid").imagesLoaded(function () {
            e(".grid").isotope({ itemSelector: ".grid-item", percentPosition: !0, layoutMode: "masonry", masonry: { columnWidth: ".grid-item" } });
        }),
        (t = e(".search-active")),
        (r = e(".search-close")),
        (c = e(".main-search-active")),
        t.on("click", function (e) {
            e.preventDefault(), c.addClass("search-visible");
        }),
        r.on("click", function () {
            c.removeClass("search-visible");
        }),
        (s = e(".burger-icon")),
        (i = e(".mobile-menu-close")),
        (o = e(".mobile-header-active")),
        (n = e("body")).prepend('<div class="body-overlay-1"></div>'),
        s.on("click", function (e) {
            e.preventDefault(), o.addClass("sidebar-visible"), n.addClass("mobile-menu-active");
        }),
        i.on("click", function () {
            o.removeClass("sidebar-visible"), n.removeClass("mobile-menu-active");
        }),
        e(".body-overlay-1").on("click", function () {
            o.removeClass("sidebar-visible"), n.removeClass("mobile-menu-active");
        });
    var v = e(".mobile-menu"),
        m = v.find(".dropdown");
    m.parent().prepend('<span class="menu-expand"><i class="fi-rs-angle-small-down"></i></span>'),
        m.slideUp(),
        v.on("click", "li a, li .menu-expand", function (s) {
            var i = e(this);
            i
                .parent()
                .attr("class")
                .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
                ("#" === i.attr("href") || i.hasClass("menu-expand")) &&
                (s.preventDefault(),
                    i.siblings("ul:visible").length
                        ? (i.parent("li").removeClass("active"), i.siblings("ul").slideUp())
                        : (i.parent("li").addClass("active"), i.closest("li").siblings("li").removeClass("active").find("li").removeClass("active"), i.closest("li").siblings("li").find("ul:visible").slideUp(), i.siblings("ul").slideDown()));
        }),
        e(".mobile-language-active").on("click", function (s) {
            s.preventDefault(), e(".lang-dropdown-active").slideToggle(900);
        }),
        e(".categori-button-active-2").on("click", function (s) {
            s.preventDefault(), e(".categori-dropdown-active-small").slideToggle(900);
        });
    var $ = e(".tm-demo-options-wrapper");
    e(".view-demo-btn-active").on("click", function (e) {
        e.preventDefault(), $.toggleClass("demo-open");
    }),
        e(".more_slide_open").slideUp(),
        e(".more_categories").on("click", function () {
            e(this).toggleClass("show"), e(".more_slide_open").slideToggle();
        }),
        e(".modal").on("shown.bs.modal", function (s) {
            e(".product-image-slider").slick("setPosition"),
                e(".slider-nav-thumbnails").slick("setPosition"),
                e(".product-image-slider .slick-active img").elevateZoom({ zoomType: "inner", cursor: "crosshair", zoomWindowFadeIn: 500, zoomWindowFadeOut: 750 });
        }),
        e("#news-flash").vTicker({ speed: 500, pause: 3e3, animation: "fade", mousePause: !1, showItems: 1 });
})(jQuery);
var swiper = new Swiper(".swiper-container", {
    slidesPerView: 3,
    spaceBetween: 6,
    autoplay: { delay: 1500 },
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: { nextEl: ".next-btn", prevEl: ".prev-btn" },
    breakpoints: {
        250: { slidesPerView: 2, spaceBetween: 10 },
        340: { slidesPerView: 3, spaceBetween: 10 },
        480: { slidesPerView: 4, spaceBetween: 10 },
        768: { slidesPerView: 5, spaceBetween: 10 },
        990: { slidesPerView: 7, spaceBetween: 10 },
        1366: { slidesPerView: 8, spaceBetween: 10 },
        1440: { slidesPerView: 10, spaceBetween: 10 },
    },
});
(swiper = new Swiper(".related-product-swiper", {
    slidesPerView: 1,
    spaceBetween: 1,
    autoplay: { delay: 1500 },
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: { nextEl: ".next-btn", prevEl: ".prev-btn" },
    breakpoints: {
        250: { slidesPerView: 1, spaceBetween: 5 },
        340: { slidesPerView: 2, spaceBetween: 5 },
        480: { slidesPerView: 2, spaceBetween: 5 },
        768: { slidesPerView: 2, spaceBetween: 5 },
        990: { slidesPerView: 3, spaceBetween: 5 },
        1366: { slidesPerView: 3, spaceBetween: 5 },
        1440: { slidesPerView: 3, spaceBetween: 5 },
    },
})),


    (swiper = new Swiper(".selected-product", {
        slidesPerView: 4,
        spaceBetween: 6,
        autoplay: { delay: 1500 },
        pagination: { el: ".swiper-pagination", clickable: !0 },
        navigation: { nextEl: ".next-btn", prevEl: ".prev-btn" },
        breakpoints: {
            250: { slidesPerView: 1, spaceBetween: 10 },
            340: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            990: { slidesPerView: 3, spaceBetween: 10 },
            1366: { slidesPerView: 4, spaceBetween: 10 },
            1440: { slidesPerView: 4, spaceBetween: 10 },
        },
    }))



        (swiper = new Swiper(".selected-product-new", {
            slidesPerView: 4,
            spaceBetween: 6,
            autoplay: { delay: 1500 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: { nextEl: ".next-btn", prevEl: ".prev-btn" },
            breakpoints: {
                250: { slidesPerView: 1, spaceBetween: 10 },
                340: { slidesPerView: 2, spaceBetween: 10 },
                480: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 10 },
                990: { slidesPerView: 3, spaceBetween: 10 },
                1366: { slidesPerView: 4, spaceBetween: 10 },
                1440: { slidesPerView: 4, spaceBetween: 10 },
            },
        }))

    