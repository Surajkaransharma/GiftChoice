﻿var app=angular.module("HomeApp",[]);app.controller("HomeController",["$scope","$http","$sce","startFromFilter","orderByFilter",function(t,e,a,n){e.get("/Home/GetNavbarMenu").then(function(e){t.NavbarMenuList=e.data.NavbarMenuList,t.ScondNavbarMenuList=e.data.ScondNavbarMenuList},function(t){alert(t.data)}),t.RecentViewGifts=[],t.RecentViewData=function(e){var a=t.ProductData[e],n=a.ProductId;t.RecentViewGifts.find(function(t){return t.ProductId===n})||(t.RecentViewGifts.push(a),localStorage.setItem("RecentViewGifts",JSON.stringify(t.RecentViewGifts))),t.GetRecentViewGifts()},t.GetRecentViewGifts=function(){t.RecentViewGifts=JSON.parse(localStorage.getItem("RecentViewGifts"))||[]},t.cart=[],t.GetCart=function(){if(t.cart=JSON.parse(localStorage.getItem("cart"))||[],null!=t.cart){t.TotalAmount=0;for(var e=0;e<t.cart.length;e++)t.TotalAmount+=t.cart[e].Price*t.cart[e].Qty}t.whatsappdata="";for(var e=0;e<t.cart.length;e++)t.whatsappdata+="*S.No. "+(e+1)+"* Gift Name =*"+t.cart[e].ProductTitle+"*%0aPrice =*"+t.cart[e].Price+"*%0aGift Url = *https://www.giftchoice.net/Home/Gift?url="+t.cart[e].PUrl+"*%0a"},t.addItemToCart=function(e){var a=t.ProductData[e],n=a.ProductId;!t.cart.find(function(t){return t.ProductId===n})&&(t.cart.push(a),localStorage.setItem("cart",JSON.stringify(t.cart)),t.GetCart())},t.LabeladdItemToCart=function(e,a){var n=t[a][e],r=n.ProductId;!t.cart.find(function(t){return t.ProductId===r})&&(t.cart.push(n),localStorage.setItem("cart",JSON.stringify(t.cart)),t.GetCart())},t.RecentViewaddItemToCart=function(e){var a=t.RecentViewGifts[e],n=a.ProductId;if(t.cart.find(function(t){return t.ProductId===n})){toastr.error("This product is already in your cart.");return}t.cart.push(a),localStorage.setItem("cart",JSON.stringify(t.cart)),t.GetCart(),toastr.success("Product successfully added to the cart.")},t.GiftsaddItemToCart=function(e){var a=t.ProductData[e],n=a.ProductId;if(t.cart.find(function(t){return t.ProductId===n})){toastr.error("This product is already in your cart.");return}t.cart.push(a),localStorage.setItem("cart",JSON.stringify(t.cart)),t.GetCart(),toastr.success("Product successfully added to the cart.")},t.removeItemFromCart=function(e){t.cart.splice(e,1),localStorage.setItem("cart",JSON.stringify(t.cart))},t.clearCart=function(){t.cart=[],localStorage.removeItem("cart")},t.Qty=1,t.AddQty=function(e,a){1==e&&(t.Qty+=1,t.cart[a].Qty=t.Qty),0==e&&(t.Qty-=1,t.cart[a].Qty=t.Qty),localStorage.setItem("cart",JSON.stringify(t.cart))},t.GetKeywordData=null,t.SelectedKeyword=null;var r=e({method:"POST",url:"/Home/GetKeyword",dataType:"json",data:{},headers:{"Content-Type":"application/json"}});r.success(function(e,a){t.GetKeywordData=e.Keywordlist}),r.error(function(t,e){$window.alert(t.Message)}),t.GetRandomKeyword=function(){$("#Keyword").addClass("ui-autocomplete-loader-center"),e.get("/Home/GetRandomKeyword?id="+t.Keyword).then(function(e){$("#Keyword").removeClass("ui-autocomplete-loader-center"),$("#Keyword").autocomplete({source:e.data.KeyWordList,select:function(e,a){a.item.label,a.item.value,t.SearchDataShop(),e.preventDefault(),$(this).val("")},focus:function(t,e){this.value=e.item.label,t.preventDefault(),$(this).val(e.item.label)}})},function(t){alert(t.data)})},t.SearchDataShop=function(){e({url:"/Home/SearchDataShop",method:"POST",data:{Keyword:$("#Keyword").val()}}).then(function(e){t.result=e.data.Keywords,location.href="/Home/Shop?Keyword="+t.result},function(t){alert(t.data)})},t.GetRandomKeywordMobile=function(){$("#MKeyword").addClass("ui-autocomplete-loader-center"),e.get("/Home/GetRandomKeyword?id="+t.Keyword).then(function(t){$("#MKeyword").removeClass("ui-autocomplete-loader-center"),$("#MKeyword").autocomplete({source:t.data.KeyWordList,select:function(t,e){e.item.label,e.item.value,t.preventDefault(),$(this).val("")},focus:function(t,e){this.value=e.item.label,t.preventDefault(),$(this).val(e.item.label)}})},function(t){alert(t.data)})},t.SearchData=function(){t.kk=$("#Keyword").val(),e({url:"/Home/SearchData",method:"POST",data:{list_keyword:$("#Keyword").val(),brand:$("#brand").val(),CompanyName:$("#CompanyName").val(),City_id:$("#CityId").val(),maincategory_id:$("#MainCate").val()}}).then(function(e){t.result=e.data.Keywordlist},function(t){alert(t.data)})},t.SliderList=function(){e.get("/Home/SliderList").then(function(e){t.SliderListData=e.data,setTimeout(()=>{var t=$(".home-slider");t.length>0&&t.owlCarousel({items:1,dots:!1,lazyLoad:!0,pagination:!0,autoPlay:4e3,loop:!0,singleItem:!0,navigation:!0,stopOnHover:!0,nav:!0,navigationText:["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"]})},10)},function(t){alert(t.data)})},t.GetFestivalBanner=function(){e.get("/Home/GetFestivalBanner").then(function(e){t.FestivalBannerData=e.data},function(t){alert(t.data)})},t.GetLabelProduct=function(){e.get("/Home/GetLabelProduct").then(function(e){t.TopsellingProduct=e.data.TopsellingProduct,t.NewProduct=e.data.NewProduct,t.NewArivals=e.data.NewArivals,t.Relation=e.data.Relation},function(t){alert(t.data)})},t.sortByPrice=function(e){t.ProductData.sort(function(t,a){return"asc"===e?t.Price-a.Price:a.Price-t.Price})},t.FClear=function(){for(var e=0;e<t.MainCateData.length;e++)$("#Main_"+t.MainCateData[e].MainCateId).prop("checked",!1);for(var a=0;a<t.priceRanges.length;a++)$("#price_"+t.priceRanges[a].id).prop("checked",!1);t.minPrice=0,t.maxPrice=0},t.sortByReleaseDate=function(e){t.ProductData.sort(function(t,a){return"asc"===e?new Date(t.Create_at)-new Date(a.Create_at):new Date(a.Create_at)-new Date(t.Create_at)})},t.FilterProductData=function(a){var n=[],r=[];0==a?$.each($(".bid:checked"),function(){r.push(parseInt($(this).val()))}):$.each($(".cid:checked"),function(){n.push(parseInt($(this).val()))});for(var o=[],s=0;s<t.priceRanges.length;s++)t.priceRanges[s].Selected&&o.push(t.priceRanges[s]);t.minPrice=0,t.maxPrice=0,0!=o.length&&(t.firstItem=o[0],t.minPrice=t.firstItem.minPrice,t.lastItem=o[o.length-1],t.maxPrice=t.lastItem.maxPrice),e({url:"/Home/FilterProductData",method:"post",data:{Cid:n,maxprice:t.maxPrice,minprice:t.minPrice,Bid:r}}).then(function(e){t.ProductData=e.data.ProductList,$(".offcanvas").removeClass("show")})},t.GetMainCateData=function(){e.get("/Home/GetMainCateData").then(function(e){t.MainCateData=e.data},function(t){alert(t.data)})},t.GetHomeMainCateData=function(){e.get("/Home/GetHomeMainCateData").then(function(e){t.HomeMainCateData=e.data,setTimeout(()=>{$(".carausel-1-columns").each(function(t,e){var a=$(this).attr("id");$("#"+a).slick({dots:!1,infinite:!0,speed:100,arrows:!0,autoplay:!0,slidesToShow:9,slidesToScroll:1,loop:!0,adaptiveHeight:!0,responsive:[{breakpoint:1025,settings:{slidesToShow:7,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:3,slidesToScroll:1}}],prevArrow:'<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',nextArrow:'<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',appendArrows:"#"+a+"-arrows"})})},10)},function(t){alert(t.data)})},t.GetHomeMainCateHeroData=function(){e.get("/Home/GetHomeMainCateHeroData").then(function(e){t.HomeHeroMainCateData=e.data,setTimeout(()=>{$(".carausel-5-columns").each(function(t,e){var a=$(this).attr("id");$("#"+a).slick({dots:!1,infinite:!0,speed:100,arrows:!0,autoplay:!0,slidesToShow:9,slidesToScroll:1,loop:!0,adaptiveHeight:!0,responsive:[{breakpoint:1025,settings:{slidesToShow:7,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:3,slidesToScroll:1}}],prevArrow:'<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',nextArrow:'<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',appendArrows:"#"+a+"-arrows"})})},10)},function(t){alert(t.data)})},t.GetBannerCateData=function(){e.get("/Home/GetBannerCateData").then(function(e){t.MainCateData=e.data},function(t){alert(t.data)})},t.GetProduct=function(){e.get("/Home/GetProduct").then(function(e){t.ProductData=e.data},function(t){alert(t.data)})},t.FilterProduct=function(){e.get("/Home/FilterProduct").then(function(e){t.ProductData=e.data},function(t){alert(t.data)})},t.priceRanges=[{id:1,minPrice:0,maxPrice:300,selected:!1},{id:2,minPrice:300,maxPrice:500,selected:!1},{id:3,minPrice:500,maxPrice:700,selected:!1},{id:4,minPrice:700,maxPrice:1e3,selected:!1},{id:5,minPrice:1e3,maxPrice:1300,selected:!1},{id:6,minPrice:1300,maxPrice:1500,selected:!1},],t.BannerList=function(){e.get("/Home/BannerList").then(function(e){t.BannerListData=e.data},function(t){alert(t.data)})},t.GiftAddItemToCart=function(e){var a=t.Product,n=a.ProductId;if(t.cart.find(function(t){return t.ProductId===n})){toastr.error("This product is already in your cart.");return}t.cart.push(a),localStorage.setItem("cart",JSON.stringify(t.cart)),t.GetCart(),toastr.success("Product successfully added to the cart.")},t.GetProductByid=function(a){e.get("/Home/GetProductByid?id="+a).then(function(e){t.Product=e.data,"BannerProduct"==t.Product.ProductType?t.GetBSmillerProduct(t.Product.ProductId,t.Product.BannerCateId):t.GetSmillerProduct(t.Product.ProductId,t.Product.MainCateId),$("#desc").html(t.Product.TableDesc),setTimeout(()=>{$(".product-image-slider").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!1,asNavFor:".slider-nav-thumbnails"}),$(".slider-nav-thumbnails").slick({slidesToShow:5,slidesToScroll:1,asNavFor:".product-image-slider",dots:!1,focusOnSelect:!0,prevArrow:'<button type="button" class="slick-prev"><i class="fi-rs-angle-left"></i></button>',nextArrow:'<button type="button" class="slick-next"><i class="fi-rs-angle-right"></i></button>'}),$(".slider-nav-thumbnails .slick-slide").removeClass("slick-active"),$(".slider-nav-thumbnails .slick-slide").eq(0).addClass("slick-active"),$(".product-image-slider").on("beforeChange",function(t,e,a,n){$(".slider-nav-thumbnails .slick-slide").removeClass("slick-active"),$(".slider-nav-thumbnails .slick-slide").eq(n).addClass("slick-active")}),$(".product-image-slider").on("beforeChange",function(t,e,a,n){var r=$(e.$slides[n]).find("img");$(".zoomWindowContainer,.zoomContainer").remove(),$(r).elevateZoom({zoomType:"inner",cursor:"crosshair",zoomWindowFadeIn:500,zoomWindowFadeOut:750})})},10)},function(t){alert(t.data)})},t.openimagemodel=function(e){t.productimage=e},t.SelectSizePrice=function(e){var a=t.Product.productDataArray.find(function(t){return t.ProductSize===e});a&&(t.Product.Price=a.Price)},t.GetBProductByid=function(a){e.get("/Home/GetBProductByid?id="+a).then(function(e){t.Product=e.data,t.GetBSmillerProduct(t.Product.ProductId,t.Product.BannerCateId),$("#desc").html(t.Product.TableDesc),setTimeout(()=>{$(".product-image-slider").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!1,asNavFor:".slider-nav-thumbnails"}),$(".slider-nav-thumbnails").slick({slidesToShow:5,slidesToScroll:1,asNavFor:".product-image-slider",dots:!1,focusOnSelect:!0,prevArrow:'<button type="button" class="slick-prev"><i class="fi-rs-angle-left"></i></button>',nextArrow:'<button type="button" class="slick-next"><i class="fi-rs-angle-right"></i></button>'}),$(".slider-nav-thumbnails .slick-slide").removeClass("slick-active"),$(".slider-nav-thumbnails .slick-slide").eq(0).addClass("slick-active"),$(".product-image-slider").on("beforeChange",function(t,e,a,n){$(".slider-nav-thumbnails .slick-slide").removeClass("slick-active"),$(".slider-nav-thumbnails .slick-slide").eq(n).addClass("slick-active")}),$(".product-image-slider").on("beforeChange",function(t,e,a,n){var r=$(e.$slides[n]).find("img");$(".zoomWindowContainer,.zoomContainer").remove(),$(r).elevateZoom({zoomType:"inner",cursor:"crosshair",zoomWindowFadeIn:500,zoomWindowFadeOut:750})})},10)},function(t){alert(t.data)})},t.GetSmillerProduct=function(a,n){e.get("/Home/GetSmillerProduct?id="+a+"&idd="+n).then(function(e){t.ProductData=e.data,setTimeout(()=>{$(".carausel-6-columns").each(function(t,e){var a=$(this).attr("id");$("#"+a).slick({dots:!1,infinite:!0,speed:100,arrows:!0,autoplay:!0,slidesToShow:6,slidesToScroll:2,loop:!0,adaptiveHeight:!0,responsive:[{breakpoint:1025,settings:{slidesToShow:4,slidesToScroll:2}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:2,slidesToScroll:2}}],prevArrow:'<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',nextArrow:'<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',appendArrows:"#"+a+"-arrows"})})},10)},function(t){alert(t.data)})},t.GetBSmillerProduct=function(a,n){e.get("/Home/GetBSmillerProduct?id="+a+"&idd="+n).then(function(e){t.ProductData=e.data,setTimeout(()=>{$(".carausel-6-columns").each(function(t,e){var a=$(this).attr("id");$("#"+a).slick({dots:!1,infinite:!0,speed:100,arrows:!0,autoplay:!0,slidesToShow:6,slidesToScroll:2,loop:!0,adaptiveHeight:!0,responsive:[{breakpoint:1025,settings:{slidesToShow:4,slidesToScroll:2}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:2,slidesToScroll:2}}],prevArrow:'<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',nextArrow:'<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',appendArrows:"#"+a+"-arrows"})})},10)},function(t){alert(t.data)})},t.AddOrder=function(){if(""===$("#Name").val()){toastr.error("Please Enter Name");return}if(""===$("#MobileNo").val()){toastr.error("Please Enter Mobile No.");return}e({url:"/Home/AddOrder",method:"post",data:{UName:$("#Name").val(),MobileNo:$("#MobileNo").val(),UEmail:$("#Email").val(),UAddress:$("#Address").val(),City:$("#City").val(),UState:$("#State").val(),Pincode:$("#zipcode").val(),OrderList:t.cart,OrderAmount:t.TotalAmount}}).then(function(e){t.result=e.data,"1"===t.result.res&&(t.cart=[],localStorage.removeItem("cart"),window.location.href="/Home/thankyou")},function(t){toastr.error("Something Went Wrong")})},t.GetSmallBanner=function(){e.get("/Home/GetSmallBanner").then(function(e){t.GetSmallBannerData=e.data.SmallBanner},function(t){alert(t.data)})},t.GetDesignBanner=function(){e.get("/Home/GetDesignBanner").then(function(e){t.DesignBannerData=e.data.DesignBanner},function(t){alert(t.data)})},t.GetMultipleBanner=function(){e.get("/Home/GetMultipleBanner").then(function(e){t.MultipleBannerData=e.data.MultipleBanner},function(t){alert(t.data)})},t.OpenModelInBanner=function(){var a=new URLSearchParams(window.location.search);t.banner=a.get("Banner"),t.BannerAll=a.get("BannerAll"),e.get("/Home/GetBannerAsk1?banner="+t.banner).then(function(e){t.GetBannerAsk1Data=e.data.Querydata,t.ModelStatus=e.data.ModelStatus,!0==t.ModelStatus?!0==t.GetBannerAsk1Data[0].BannerTitle.ModelQuery1&&setTimeout(()=>{$("#modalId").modal("toggle")},100):t.GetBannerAllProductwithmodel()},function(t){alert(t.data)})},t.OpenModelInBannerFilter=function(){var a=new URLSearchParams(window.location.search);t.banner=a.get("Banner"),t.BannerAll=a.get("BannerAll"),e.get("/Home/GetBannerAsk1?banner="+t.banner).then(function(e){t.GetBannerAsk1Data=e.data.Querydata,t.ModelStatus=e.data.ModelStatus,!0==t.GetBannerAsk1Data[0].BannerTitle.ModelQuery1?setTimeout(()=>{$("#modalId").modal("toggle")},100):t.GetBannerAllProduct()},function(t){alert(t.data)})},t.quickview=function(e){t.product=e,$("#quickview").modal("toggle"),setTimeout(()=>{var e=document.getElementById("pVideo");e&&(e.src="/images/ProductVideo/"+t.product.Video)},100)},t.GetBannerAllProductwithmodel=function(){var a=new URLSearchParams(window.location.search);t.banner=a.get("Banner"),e({url:"/Home/modelTofilterBannerProduct",method:"post",data:{BannerId:t.banner,id:0}}).then(function(e){t.ProductData=e.data.ProductList,t.FilterKeywordList=e.data.FilterKeywordList},function(t){toastr.error("Something Went Wrong")})},t.activeFilter="all",t.setActiveFilter=function(e){t.activeFilter=e},t.GetFilterKeywordBy=function(a){var n=new URLSearchParams(window.location.search);t.banner=n.get("Banner"),e({url:"/Home/modelTofilterBannerProduct",method:"post",data:{BannerId:t.banner,id:a}}).then(function(e){t.ProductData=e.data.ProductList},function(t){toastr.error("Something Went Wrong")})},t.ProductData=[],t.currentPage=1,t.pageSize=20,t.goToPage=function(e){t.currentPage=e},t.prevPage=function(){t.currentPage>1&&t.goToPage(t.currentPage-1),$("html, body").scrollTop(0)},t.nextPage=function(){t.currentPage*t.pageSize<t.ProductData.length&&t.goToPage(t.currentPage+1),$("html, body").scrollTop(0)},t.range=function(e){for(i=0,t.pages=[];i<e;i++)i<=3&&t.pages.push(i);return t.pages},t.trustSrc=function(t){return a.trustAsResourceUrl(t)},t.GetBannerAllProduct=function(){var a=new URLSearchParams(window.location.search);t.banner=a.get("Banner"),e({url:"/Home/modelTofilterBannerProduct",method:"post",data:{BannerId:t.banner}}).then(function(e){t.ProductData=e.data.ProductList,$("#modalId").modal("toggle")},function(t){toastr.error("Something Went Wrong")})},t.ContinueAskQues1=function(){for(var a=0;a<t.GetBannerAsk1Data.length;a++)$("#AskQues1_"+t.GetBannerAsk1Data[a].QId).is(":checked")&&(t.QId=parseInt(t.GetBannerAsk1Data[a].QId));e.get("/Home/ContinueAskQues1?QId="+t.QId).then(function(e){t.GetBannerAsk2Data=e.data},function(t){alert(t.data)})},t.ContinueAskQues2=function(){for(var a=0;a<t.GetBannerAsk2Data.length;a++)for(var n=0;n<t.GetBannerAsk2Data[a].AnswerList.length;n++)$("#AskQues2_"+t.GetBannerAsk2Data[a].AnswerList[n].BSubDId).is(":checked")&&(t.BSubDId=parseInt(t.GetBannerAsk2Data[a].AnswerList[n].BSubDId));e.get("/Home/ContinueAskQues2?BSubDId="+t.BSubDId).then(function(e){t.GetContinueAskQues2Data=e.data},function(t){alert(t.data)})},t.modelTofilterBannerProduct=function(){for(var a=[],n=0;n<t.GetBannerAsk1Data.length;n++)$("#AskQues1_"+t.GetBannerAsk1Data[n].QId).is(":checked")&&a.push(t.GetBannerAsk1Data[n].QId);e({url:"/Home/modelTofilterBannerProduct",method:"post",data:{PBanner:a,BannerId:t.banner}}).then(function(e){t.ProductData=e.data.ProductList,$("#modalId").modal("toggle"),t.pageSize=20,t.currentPage=1,t.totalPages=Math.ceil(t.ProductData.length/t.pageSize),t.goToPage(1)},function(t){toastr.error("Something Went Wrong")})},t.GetTopProduct=function(){var a=new URLSearchParams(window.location.search);t.ProductType=a.get("ProductType"),e.get("/Home/GetTopProduct?ProductType="+t.ProductType).then(function(e){t.ProductData=e.data.ProductList},function(t){alert(t.data)})},t.giftfilterkeyword=function(){var a=new URLSearchParams(window.location.search);t.ProductType=a.get("ProductType"),e.get("/Home/getgiftfilterkeyword?ProductType="+t.ProductType).then(function(e){t.ProductData=e.data.ProductList},function(t){alert(t.data)})},t.expand=function(e){t.productlimit+=e},t.productlimit=24,t.giftbannerfilterkeyword=function(){var a=new URLSearchParams(window.location.search);t.ProductType=a.get("BannerType");var n=new URLSearchParams(window.location.search);t.keyword=n.get("keyword"),e({url:"/Home/modelTofilterBannerProduct",method:"post",data:{BannerId:t.ProductType,id:t.keyword}}).then(function(e){t.ProductData=e.data.ProductList},function(t){toastr.error("Something Went Wrong")})},t.showFullContent=!1,t.toggleContent=function(e){t.showFullContent=!t.showFullContent},t.GetFilterWordList=function(){e.get("/Home/GetFilterWordList").then(function(e){t.Giftsunder499=e.data.Giftsunder499,t.Giftsunder999=e.data.Giftsunder999,t.giftsFriendsbestsellers=e.data.giftsFriendsbestsellers,t.loveAnniversaryData=e.data.loveAnniversaryData,t.BirthdayData=e.data.BirthdayData},function(t){alert(t.data)})}}]),app.filter("startFrom",function(){return function(t,e){return e=+e,t.slice(e)}});