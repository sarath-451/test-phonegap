(function($) {
    "use strict";
    /*==============================
        Is mobile
    ==============================*/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    /*==============================
        Main
    ==============================*/
    
    function main() {
        fnHeader();
        GoogleMap();       
        /*==============================
            SELECT STYLE
        ==============================*/
        if ($('select').length) {
            $.each($('select'), function() {
                if(!$(this).hasClass("country_select") && !$(this).hasClass("state_select")){
                    var selected = $(this).find('option:selected').text();
                    $(this)
                        .wrap('<div class="select-custom"></div>')
                        .css({
                            'z-index':10,
                            'opacity':0,
                        })
                        .after('<span class="select">' +
                                    selected +
                                '</span>' +
                                '<i class="fa fa-caret-down">' +
                                '</i>'
                        )
                        .change(function() {
                            var val = $('option:selected',this).text();
                            $(this).next().text(val);
                        });
                }
            });
        }
        if($('#date').length)
        {
            $("#date").datepicker({
                dateFormat: 'mm/dd/yy',
                constrainInput: true,
                minDate: 0,
            });
        }

        if($(".awe-date-picker").length){
            $(".awe-date-picker").each(function(){
                var option = {
                    dateFormat:'mm/dd/yy',
                    constrainInput:true,
                    minDate:0,
                };
                // if ($(this).hasClass("de-date")) {
                //     option.dateFormat = 'mm.dd.yy';
                // }
                $(this).datepicker(option);
            });
        }
        
        /*==============================
            Scroll To and popup
        ==============================*/

        $('.awe-scroll-to').on('click', function()
        {
            var scroll = $(this).find('a').attr('href');
            $("html,body").animate({
                scrollTop:$(scroll).offset().top
            }, 800, 'easeInOutExpo');
            return false;
        })

        if ($('.open-popup-reservation').length) {
            $('.open-popup-reservation').find('a').magnificPopup({
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-reservation',
                callbacks: {
                    open: function()
                    {
                        $("#date").datepicker({
                            dateFormat: 'mm/dd/yy',
                            constrainInput: true,
                            minDate: 0,
                        });
                    }
                    
                }, 
            });
        };

        /*==============================
            Toggle cart
        ==============================*/
        $('.navigation, .header').delegate('.toggle-minicart', 'click', function() {
            $('.minicart-wrap')
                .find('.minicart-body')
                .toggleClass('cart-toggle');
        });

        $('html').on('click', function() {
            $('.minicart-wrap')
                .find('.minicart-body')
                    .removeClass('cart-toggle');
        });
        $('.navigation, .header').delegate('.minicart-wrap', 'click', function(e) {
            e.stopPropagation();
        });

        /*==============================
            Event slider
        ==============================*/
        if ($('.event-slider').length) {
            $('.event-slider').bxSlider({
                mode: 'fade',
                speed: 1000,
                slideMargin: 0,
                pager: true,
                controls: false,
                pagerCustom: '.event-pager'
            });
            colPagerEvent();
        }

        /*==============================
            Event scroll
        ==============================*/
        var $scrollbarEvent = $('.event-pager-scroll');
        $scrollbarEvent.perfectScrollbar({
            maxScrollbarLength: 150,
            suppressScrollY: true,
            useBothWheelAxes: true,
            includePadding: true
        });

        /*==============================
            Map show
        ==============================*/
        var dataText1 = $('.see-map a').data('see-contact'),
            dataText2 = $('.see-map a').data('see-map');     
        $('.see-map a').text(dataText2);
        $('.see-map').delegate('a', 'click', function(e) {
            e.preventDefault();
            $('.contact-first')
                .find('.contact-body')
                    .slideToggle(300);
            $('.contact-first')
                .find('.awe-overlay')
                    .fadeToggle(300);
            $('.contact-first')
                .find('.section-content')
                    .toggleClass('pd0');
 
            $(this).text(dataText2);
            if ($('.section-content').hasClass('pd0')) {
                $(this).text(dataText1);
            }
        });
        var heightMap = $('.contact-first').find('.section-content').outerHeight();
        $('.contact-first').height(heightMap);

                /*==============================
            Login
        ==============================*/
        if($('.login-register').length)
        {

            $(window).on('load resize', function() {
                var childHeight = $('#customer_login form.active').height();
                $('#customer_login').height(childHeight);
            });
            var tabsItem = $('.login-register').find('a'),
                tabs = $('.login-register'),
                leftActive = tabs.find('.tabs-active').position().left,
                widthActive = tabs.find('.tabs-active').outerWidth(),
                formactive = $('.login-register .tabs-active').find('a').attr('href');
            $(formactive)
                .show()
                .addClass('active');
            tabs.append('<li class="tabs-bg"></li>');
            $('.tabs-bg').css({
                left: leftActive,
                width: widthActive
            });
            tabsItem.on('click', function(evt) {
                evt.preventDefault();
                var left = $(this).parent().position().left,
                    width = $(this).parent().outerWidth() + 1;
                $('.login-register li').removeClass('tabs-active');
                $(this).parent().addClass('tabs-active');
                var activeTab = $(this).attr('href');
                $('#customer_login form')
                    .fadeOut(600)
                    .removeClass('active');
                $(activeTab)
                    .fadeIn(600)
                    .addClass('active');
                var childHeight = $('#customer_login form.active').height();
                $('#customer_login').height(childHeight);
                $('.tabs-bg').animate({
                    left: left,
                    width: width
                }, 300, 'easeInOutExpo');
            });
                    
        }
        /*==============================
            Testimonial slider
        ==============================*/
        if ( $().owlCarousel )
        {
            $(".testimonial-slider").each(function(){
                if($(this).length) {
                    var numt = 1;
                    numt = $(this).data().num;
                    if ($(this).data('num') === 1) {
                        var singleitem = true;
                    } else {
                        var singleitem = false;
                    }
                    $(this).owlCarousel({
                        items: numt,
                        itemsDesktop : [1199,2],
                        itemsDesktopSmall : [992,2],
                        itemsTablet: [767,1],
                        itemsTabletSmall: [600,1],
                        autoPlay: 20000,
                        slideSpeed: 300,
                        navigation: false,
                        pagination: true,
                        singleItem: singleitem,
                        navigationText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>']  
                    });
                }
            })
        }
        /*==============================
            Milestones slider
        ==============================*/
        if ( $().owlCarousel )
        {
            $(".milestones-slider").each(function(){
                if ($(this).length) {
                var numm = 5;
                numm = $(this).data().num;
                if ($(this).data('num') === 1) {
                    var singleitem = true;
                } else {
                    var singleitem = false;
                }
                $(this).owlCarousel({
                    items: numm,
                    itemsDesktop : [1199,numm],
                    itemsDesktopSmall : [992,2],
                    itemsTablet: [767,2],
                    itemsTabletSmall: [600,1],
                    slideSpeed: 200,
                    navigation: true,
                    pagination: false,
                    singleItem: singleitem,
                    navigationText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>']  
                });
            }
            })
        }
        
        /*==============================
            Our story slider
        ==============================*/
        if ($('.our-story').length) {
            $('.story-slider').bxSlider({
                mode: 'fade',
                speed: 600,
                slideMargin: 0,
                pager: true,
                controls: false,
                pagerCustom: '.story-pager'
            });
            $('.story-pager').owlCarousel({
                items: 5,
                itemsCustom: [[0,3], [400,4], [700,5]],
                slideSpeed: 300,
                navigation: false,
                pagination: false,
                addClassActive: true,
                touchDrag: false,
                mouseDrag: false
            });
            var totalActive = $('.story-pager').find('.owl-item.active').length;
            $('.story-pager .active:eq('+ totalActive +')').find('.line').hide();
            $('.story-pager').delegate('.owl-item ', 'click', function() {
                $('.story-pager').find('.owl-item').css('border', '0');
                if ($(this).prevAll('.active').length == 0) {
                    if ($(this).index() > 0){

                        $(this).find('.line').fadeIn(400);
                        $('.story-pager').trigger('owl.prev');
                        $('.story-pager .active:eq('+ totalActive +')').find('.line').fadeOut(500);
                    }
                        
                }
                if ($(this).prevAll('.active').length ==  $('.story-pager').find('.owl-item.active').length -1) {

                    if ($(this).index() < $('.story-pager').find('.owl-item').length -1) {
                        
                        $(this).next().find('.line').fadeOut(400);
                        $(this).find('.line').fadeIn(400);
                        $('.story-pager').trigger('owl.next');
                    }
                        
                        
                }
            });

        }

        $('.js_subcr').on("click", function(e){
        e.preventDefault();
        $.post(
            ajax_process.ajaxurl,
                {
                    action : 'awe_subscribe',

                    // send the nonce along with the request
                    subscribeNonce : ajax_process.subscribeNonce,
                    email: $("input.js_email").val()
                },
                function( response ) {
                    var data = JSON.parse(response);
                    if(data.type=='error')
                    {
                        $(".subscribe-status").html(data.msg).addClass("alert-error").removeClass("alert-done").fadeIn();
                    }
                    else{
                        $(".subscribe-status").html(data.msg).addClass("alert-done").removeClass("alert-error").fadeIn();
                    }
                }
            );
            return false;
        })

        if($('.awe-slider').length)
        {
            $('.awe-slider').each(function()
            {
                $(this).owlCarousel({
                    items: $(this).data('item'),
                    itemsDesktop : [1199,3],
                    itemsDesktopSmall : [992,2],
                    itemsTablet: [767,2],
                    itemsTabletSmall: [600,1],
                    slideSpeed: $(this).data('speed'),
                    navigation: true,
                    pagination: false,
                    navigationText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>']  
                });
            })
        }
        // PRODUCT SLIDER
        if ( $().owlCarousel )
        {
            if ($('.product-page-slider').length) {
                $(".product-page-slider").owlCarousel({
                    autoPlay: 10000,
                    navigation: false,
                    slideSpeed: 300,
                    transitionStyle: 'fade',
                    singleItem:true,
                    pagination: true
                });
            }
        }
        /*==============================
            Gallery slider
        ==============================*/
        if ($('.gallery-slider').length) {
            $('.gallery-slider').each(function(){
                $(this).owlCarousel({
                    items: $(this).data('num'),
                    autoPlay: true,
                    itemsDesktop : [1199,3],
                    itemsDesktopSmall : [992,3],
                    itemsTablet: [767,3],
                    itemsTabletSmall: [600,2],
                    slideSpeed: 300,
                    navigation: false,
                    pagination: false,
                    navigationText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>']  
                });
            })
            //Popup
            if ( $().magnificPopup )
            {
                $('.gallery-slider').magnificPopup({
                    delegate: '.gallery-item a',
                    type: 'image',
                    closeOnContentClick: false,
                    closeBtnInside: false,
                    mainClass: 'pp-gallery mfp-with-zoom mfp-img-mobile',
                    image: {
                        verticalFit: true,
                    },
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300, // don't foget to change the duration also in CSS
                        opener: function(element) {
                            return element.find('img');
                        }
                    },
                });
            }
            $('.gallery-item a').hover(function() {
                $('.gallery-item a').addClass('grayscale');
                $(this).removeClass('grayscale');
            }, function() {
                $('.gallery-item a').removeClass('grayscale');
            });
        }
        /*==============================
            Ajax popup
        ==============================*/
        if ( $().magnificPopup )
        {
            if ($('.pp-product-detail').length) {
                
                    $('.pp-product-detail').magnificPopup({
                        type: 'ajax'
                    });
                
            }
        }


        /*==============================
            Accordion
        ==============================*/
        $('.accordion-wrap .collapse').on('shown.bs.collapse', function() {
            $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
        }).on('hidden.bs.collapse', function(){
            $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
        });


    }

    /*==============================
        Header
    ==============================*/ 

    function fnHeader() {
        
        //Nav
        var $nav = $('.navigation'),
            flagResize = 0,
            mediascreen = $nav.data('menu-type'),
            windowWidth = window.innerWidth,
            $minicart = $('.minicart-wrap');
        $('header.header').addClass('fix-header');
        if (windowWidth <= mediascreen) {
            flagResize = 1;
            $('header.header').prependTo('body');
            $('body').prepend('<div class="menu-mobile"></div>');
            $nav.appendTo('.menu-mobile');
            $('.open-menu-mobile')
                .show()
                .before($('.minicart-wrap'));
            $('header.header').removeClass('fix-header');
        }
        $(window).resize(function() {
            var $nav = $('.navigation'),
            mediascreen = $nav.data('menu-type'),
            windowWidth = window.innerWidth,
            $minicart = $('.minicart-wrap');
            if (windowWidth <= mediascreen && !flagResize) {
                flagResize = 1;
                $('header.header').prependTo('body');
                $('body').prepend('<div class="menu-mobile"></div>');
                $nav.appendTo('.menu-mobile');
                $('.open-menu-mobile')
                    .show()
                    .before($('.minicart-wrap'));
                $('header.header').removeClass('fix-header');
            }
            if (windowWidth > mediascreen && flagResize) {
                flagResize = 0;
                $('header.header').prependTo('#page-wrap');
                $('.menu-mobile').remove();
                $nav.appendTo('header.header .container');
                $('.navigation .nav').after($('.minicart-wrap'));
                $('.open-menu-mobile').hide();
                $('header.header').addClass('fix-header');
            }
        });
        var wHeight = $(window).height(),
            headerHeight = $('header.header').height(),
            homeHeight = wHeight - headerHeight;
        $('.home-fullscreen').height(wHeight);
        $('.onepage .home-fullscreen').height(wHeight);

        $('header.header')
            .parent('#page-wrap')
            .css('padding-top', headerHeight);
        $('header.header')
            .next()
            .next('#page-wrap')
            .css('padding-top', headerHeight);

        $(window).on('scroll', function() {
            //header fixed
            var windownScrolltop = $(window).scrollTop();
            if (windownScrolltop > 180) {
                $('.awe-header-fixed')
                    .addClass('header-fixed');
            } else {
                $('.awe-header-fixed')
                    .removeClass('header-fixed');
            }
        });
        var $haschild = $('.nav .menu-item-has-children');
        $('html').on('click', function() {
            $('#page-wrap, .header').removeClass('toggle-translate');
            $('.open-menu-mobile').removeClass('open-menu-active');
            $('.menu-mobile').removeClass('fixSfr');
            setTimeout(function() {
                if (windowWidth <= mediascreen) {
                    $('html, body').removeClass('overflow-hidden');
                    $('.menu-mobile').removeClass('overflow-auto');
                    $haschild
                        .children('.plus')
                            .removeClass('plus-active')
                        .siblings('.sub-menu')
                            .slideUp();
                }
            }, 290);
        });
        $('.open-menu-mobile').on('click', function() {
            $('#page-wrap, .header').toggleClass('toggle-translate');
            $(this).toggleClass('open-menu-active');
            $('.menu-mobile').toggleClass('fixSfr');
            setTimeout(function() {
                if (windowWidth <= mediascreen) {
                    $('html, body').toggleClass('overflow-hidden');
                    $('.menu-mobile').toggleClass('overflow-auto');
                    $haschild
                        .children('.plus')
                            .removeClass('plus-active')
                        .siblings('.sub-menu')
                            .slideUp();
                }
            }, 290);
        });
        $('.navigation, .open-menu-mobile').on('click', function(evt) {
            evt.stopPropagation();
        });
        $haschild.prepend('<span class="plus"><span>+</span></span>');
        $haschild.on('click', '> .plus', function() {
            if ($(this).hasClass('plus-active') == false) {
                $(this)
                    .parent()
                        .siblings()
                            .children('.plus')
                                .removeClass('plus-active')
                            .siblings('.sub-menu')
                                .slideUp(300);
            }
            $(this)
                .toggleClass('plus-active')
                .siblings('.sub-menu')
                    .slideToggle(300);
        });

        $('.navigation').find('.nav > li').on('click', '> a', function(evt) {

            var $anchor = $(this);
            // console.log($(this).attr("href").search("#"));
            // console.log(str.search("locate"))
            if(!$anchor.closest('li').hasClass('menu-item-language') && $(this).attr("href").search("#") != -1)
            {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 800, 'easeInOutExpo');
                setTimeout(function() {
                    $('#page-wrap, .header').removeClass('toggle-translate');
                    $('.open-menu-mobile').removeClass('open-menu-active');
                    $('.menu-mobile').removeClass('fixSfr');
                    setTimeout(function() {
                        $('html, body').removeClass('overflow-hidden');
                        $('.menu-mobile').removeClass('overflow-auto');
                        $('.menu-mobile .nav .menu-item-has-children')
                            .children('.plus')
                                .removeClass('plus-active')
                            .siblings('.sub-menu')
                                .slideUp();
                    }, 290);
                },700);
                evt.preventDefault();
            }
            
        });

        $('.navigation .sub-menu').each(function() {
            var offsetLeft = $(this).offset().left,
                width = $(this).width(),
                offsetRight = ($(window).width() - (offsetLeft + width));
          
            if (offsetRight < 60) {
                $(this)
                .removeClass('left')
                .addClass('right');
            } else {
                $(this)
                .removeClass('right');
            }
            if (offsetLeft < 60) {
                $(this)
                    .removeClass('right')
                    .addClass('left');
            } else {
                $(this)
                    .removeClass('left');
            }
        });

        $('.billing-address')
            .closest('.login-page')
            .css('background-color', '#fff');
    }


    function setHeight() {
        var wHeight = $(window).height(),
            headHeight = $('header.header').height(),
            homeHeight = wHeight - headHeight,
            homefixheight = $('.home-fixheight').height();
        $('.home-fullscreen, .home-fullscreen .image-wrap, .home-fullscreen .home-slider').height(wHeight);
        $('.onepage .home-fullscreen, .onepage .home-fullscreen .image-wrap, .onepage .home-fullscreen .home-slider').height(wHeight);
        $('.home-fixheight .image-wrap, .home-fixheight .home-slider').height(homefixheight);
        
    }

    /*==============================
        Google map
    ==============================*/
    function GoogleMap() {
        if ($('#map').length) {
            // Option map
            
            var $map = $('#map'),
                mapZoom = $map.data('map-zoom'),
                lat = $map.data('map-latlng').split(',')[0],
                lng = $map.data('map-latlng').split(',')[1],
                marker = $map.data('map-marker'),
                width = parseInt($map.data('map-marker-size').split('*')[0]),
                height = parseInt($map.data('map-marker-size').split('*')[1]),
                grayscale = [
                    {featureType: 'all',  stylers: [{saturation: -100},{gamma: 0.50}]}
                ],
                blue = [
                    {featureType: 'all',  stylers: [{hue: '#0000b0'},{invert_lightness: 'true'},{saturation: -30}]}
                ],
                dark = [
                    {featureType: 'all',  stylers: [{ hue: '#ff1a00' },{ invert_lightness: true },{ saturation: -100  },{ lightness: 33 },{ gamma: 0.5 }]}
                ],
                pink = [
                    {"stylers": [{ "hue": "#ff61a6" },{ "visibility": "on" },{ "invert_lightness": true },{ "saturation": 40 },{ "lightness": 10 }]}
                ],
                light = [
                    {"featureType": "water","elementType": "all","stylers": [{"hue": "#e9ebed"},{"saturation": -78},{"lightness": 67},{"visibility": "simplified"}]
                    },{"featureType": "landscape","elementType": "all","stylers": [{"hue": "#ffffff"},{"saturation": -100},{"lightness": 100},{"visibility": "simplified"}]
                    },{"featureType": "road","elementType": "geometry","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": 31},{"visibility": "simplified"}]
                    },{"featureType": "poi","elementType": "all","stylers": [{"hue": "#ffffff"},{"saturation": -100},{"lightness": 100},{"visibility": "off"}]
                    },{"featureType": "road.local","elementType": "geometry","stylers": [{"hue": "#e9ebed"},{"saturation": -90},{"lightness": -8},{"visibility": "simplified"}]
                    },{"featureType": "transit","elementType": "all","stylers": [{"hue": "#e9ebed"},{"saturation": 10},{"lightness": 69},{"visibility": "on"}]
                    },{"featureType": "administrative.locality","elementType": "all","stylers": [ {"hue": "#2c2e33"},{"saturation": 7},{"lightness": 19},{"visibility": "on"}]
                    },{"featureType": "road","elementType": "labels","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": 31},{"visibility": "on"}]
                    },{"featureType": "road.arterial","elementType": "labels","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": -2},{"visibility": "simplified"}]}
                ],
                blueessence = [
                    {featureType: "landscape.natural",elementType: "geometry.fill",stylers: [{ "visibility": "on" },{ "color": "#e0efef" }]
                    },{featureType: "poi",elementType: "geometry.fill",stylers: [{ "visibility": "on" },{ "hue": "#1900ff" },{ "color": "#c0e8e8" }]
                    },{featureType: "landscape.man_made",elementType: "geometry.fill"
                    },{featureType: "road",elementType: "geometry",stylers: [{ lightness: 100 },{ visibility: "simplified" }]
                    },{featureType: "road",elementType: "labels",stylers: [{ visibility: "off" }]
                    },{featureType: 'water',stylers: [{ color: '#7dcdcd' }]
                    },{featureType: 'transit.line',elementType: 'geometry',stylers: [{ visibility: 'on' },{ lightness: 700 }]}
                ],
                bentley = [
                    {featureType: "landscape",stylers: [{hue: "#F1FF00"},{saturation: -27.4},{lightness: 9.4},{gamma: 1}]
                    },{featureType: "road.highway",stylers: [{hue: "#0099FF"},{saturation: -20},{lightness: 36.4},{gamma: 1}]
                    },{featureType: "road.arterial",stylers: [{hue: "#00FF4F"},{saturation: 0},{lightness: 0},{gamma: 1}]
                    },{featureType: "road.local",stylers: [{hue: "#FFB300"},{saturation: -38},{lightness: 11.2},{gamma: 1}]
                    },{featureType: "water",stylers: [{hue: "#00B6FF"},{saturation: 4.2},{lightness: -63.4},{gamma: 1}]
                    },{featureType: "poi",stylers: [{hue: "#9FFF00"},{saturation: 0},{lightness: 0},{gamma: 1}]}
                ],
                retro = [
                    {featureType:"administrative",stylers:[{visibility:"off"}]
                    },{featureType:"poi",stylers:[{visibility:"simplified"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"simplified"}]
                    },{featureType:"water",stylers:[{visibility:"simplified"}]},{featureType:"transit",stylers:[{visibility:"simplified"}]},{featureType:"landscape",stylers:[{visibility:"simplified"}]
                    },{featureType:"road.highway",stylers:[{visibility:"off"}]},{featureType:"road.local",stylers:[{visibility:"on"}]
                    },{featureType:"road.highway",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",stylers:[{color:"#84afa3"},{lightness:52}]},{stylers:[{saturation:-17},{gamma:0.36}]
                    },{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#3f518c"}]}
                ],
                cobalt = [
                    {featureType: "all",elementType: "all",stylers: [{invert_lightness: true},{saturation: 10},{lightness: 30},{gamma: 0.5},{hue: "#435158"}]}
                ],
                brownie = [
                    {"stylers": [{ "hue": "#ff8800" },{ "gamma": 0.4 }]}
                ];
            var mapTheme;
            switch($map.data('snazzy-map-theme')){
                case 'grayscale' : {
                    mapTheme = grayscale;
                } break;
                case 'blue' : {
                    mapTheme = blue;
                } break;
                case 'dark' : {
                    mapTheme = dark;
                } break;
                case 'pink' : {
                    mapTheme = pink;
                } break;
                case 'light' : {
                    mapTheme = light;
                } break;
                case 'blue-essence' : {
                    mapTheme = blueessence;
                } break;
                case 'bentley' : {
                    mapTheme = bentley;
                } break;
                case 'retro' : {
                    mapTheme = retro;
                } break;
                case 'cobalt' : {
                    mapTheme = cobalt;
                } break;
                case 'brownie' : {
                    mapTheme = brownie;
                } break;
                default : {
                    mapTheme = grayscale;
                }
            }

            // Map
            // if (isMobile.any()) {
            //     var noDraggableMobile = false;
            // } else {
            //     var noDraggableMobile = true;
            // }
            // var MY_MAPTYPE_ID = 'custom_style';
            // var featureOpts = mapTheme;
            // var latlng = new google.maps.LatLng(lat, lng);
            // var settings = {
            //     zoom: mapZoom,
            //     center: latlng,
            //     mapTypeControlOptions: {
            //         mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            //     },
            //     mapTypeControl: false,
            //     mapTypeId: MY_MAPTYPE_ID,
            //     scrollwheel: false,
            //     draggable: noDraggableMobile,
            // };

            // var map = new google.maps.Map(document.getElementById("map"), settings);
            // var styledMapOptions = {
            //     name: 'Custom Style'
            // };
            // var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

            // map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

            // google.maps.event.addDomListener(window, "resize", function () {
            //     var center = map.getCenter();
            //     google.maps.event.trigger(map, "resize");
            //     map.setCenter(center);
            // });
            // var companyImage = new google.maps.MarkerImage(marker,
            //     new google.maps.Size(width, height),
            //     new google.maps.Point(0, 0)
            // );
            // var companyPos = new google.maps.LatLng(lat, lng);
            // var companyMarker = new google.maps.Marker({
            //     position: companyPos,
            //     map: map,
            //     icon: companyImage,
            //     title: "Road",
            //     zIndex: 3
            // });
        }
    }

    /*==============================
        BLOG GRID
    ==============================*/
    function masonry() {
        if ($('.blog-grid').length) {
            $('.blog-grid').masonry({
                columnWidth: '.grid-sizer',
                itemSelector: '.post'
            });
        }
    }


    /*==============================
        BUTTON STYLE
    ==============================*/
    function aweBtn() {
        $.each($('.awe-btn'), function() {
            var classtype = $(this).attr("class");
            $(this)
                .wrap('<div class="' + classtype +'"></div>')
                .removeClass();
        });
    }

    /*==============================
        Set col pager
    ==============================*/
    function colPagerEvent() {
        var loop = 0;
        $('.event-pager').each(function(){
            loop++;
        })
        var widthitem = $('.event-pager-scroll').width()/3;
        if (window.innerWidth <= 480  ) {
            var widthitem = $('.event-pager-scroll').width()/2;
        }
        var $item = $('.event-pager a'),
            $allitem = $item.length,
            allwidthitem = $allitem * widthitem;
        $item.css('width', widthitem);
        $('.event-pager').css({
            'width': allwidthitem/loop
        });
    }
    /*==============================
        Divider
    ==============================*/
    function divider() {
        $.each($('.divider'), function() {
            var bgcolor = $(this).css('color'),
                color = bgcolor,
                svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="8 px" viewBox="0 0 96.166 48.083" enable-background="new 0 0 96.166 48.083" xml:space="preserve"><polyline fill="'+color+'" points="0,48.083 48.083,0 96.166,48.083 "/></svg>',
                encoded = window.btoa(svg);
            $(this).css({
                'background-image': 'url(data:image/svg+xml;base64,' + encoded + ')'
            });

            if($(this).parent('.awe-color').length) {
                var color = $(this).parent('.awe-color').css('background-color');
                $(this).attr('data-color', color);
                var bgcolor = $(this).data('color'),
                    svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="8 px" viewBox="0 0 96.166 48.083" enable-background="new 0 0 96.166 48.083" xml:space="preserve"><polyline fill="' + bgcolor + '" points="0,48.083 48.083,0 96.166,48.083 "/></svg>',
                    encoded = window.btoa(svg);
                $(this).css({
                    'background-image': 'url(data:image/svg+xml;base64,' + encoded + ')'
                });
            }
        });
    }
    var ie = (function() {
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        var checkIe9 = v > 4 ? v : undef;
        if (checkIe9){
            if (checkIe9 > 9) {
                divider();
            }
        } else {
            divider();
        }
        return v > 4 ? v : undef;
    });

    function parallaxInit() {
        if ($('.awe-parallax').length) {
            if (isMobile.any()) {
            } else {
                //$('.awe-parallax').parallax("50%", 0.1);
                $('.awe-parallax').each(function()
                {
                    var parallax = $(this).data('parallax');
                    $('.'+parallax).parallax("50%", 0.1);
                })
            }
        }
    }
    if (isMobile.any()) {
    } else {
        new WOW().init();
    }
    // READY FUNCTION
    $(document).ready(function() {
        main();
        ie();
        // GoogleMap();

        $(window).on('load', function() {
            aweBtn();
            masonry();
            setHeight();
            parallaxInit();
            //Preloader
            $('.preloader').addClass('load-anim');

            var widthPagerEvent = $('.event-pager-scroll').outerHeight();
            $('.event-pager-scroll').css('margin-top', - widthPagerEvent);
            if (isMobile.iOS()) {
                        $('.awe-parallax, .awe-static')
                            .addClass('fix-background-ios');
            }

            $('.tab-menu-content .row').each(function() {
                var $this = $(this);
                $this.wrapInner('<div class="menu-masonry"></div>');
                $this.find('.menu-masonry')
                    .children()
                    .addClass('menu-item');
                var masonry = function() {
                    $this.find('.menu-masonry').masonry({
                        columnWidth: '.menu-item',
                        itemSelector: '.menu-item'
                    });
                }
                masonry();
                $('.tabs-menu .nav-tabs a').on('shown.bs.tab', function() {
                    masonry();
                });
            });
        });

        $(window).on('resize', function() {
            setHeight();
            colPagerEvent();
        });
        $(window).load(function() {
            if ($('.shop-page').length) {
                var $container = $('.shop-page .tab-shop-content');
                if ( $().isotope )
                {
                    $container.isotope({
                        transitionDuration: '0.5s',
                        hiddenStyle: {
                            opacity: 0,
                            transform: 'scale(0.001)'
                        },
                        visibleStyle: {
                            opacity: 1,
                            transform: 'scale(1)'
                        }
                    });
                    $('.shop-page #filters a').click(function() {
                        $('.shop-page #filters .active').removeClass('active');
                        $(this)
                            .parent('li')
                            .addClass('active');
                        var selector = $(this).attr('data-filter');
                        $('.tab-shop-content').isotope({
                            filter: selector
                        });
                        return false;
                    });
                    $('.shop-page #filters .active a').click();
                }
            }
        });

        $('.coupon-popup').on('click', '.awe-popup-close', function() {
            $('.coupon-popup').fadeOut(400);
            $('header.header').removeClass('zindex');
        });
        $('.showcoupon').on('click', function(event) {
            event.preventDefault();
            $('.coupon-popup').fadeIn(400);
            $('header.header').addClass('zindex');
        });

        $('html').on('click', function(event) {
            $('.coupon-popup').fadeOut(400);
            $('.login-popup').fadeOut(400);
            $('header.header').removeClass('zindex');
        });
        $('.coupon-popup').on('click', '.checkout_coupon', function(event) {
            event.stopPropagation();
        });
        ///////////////////////////////
        $('.login-popup').on('click', '.awe-popup-close', function() {
            $('.login-popup').fadeOut(400);
            $('header.header').removeClass('zindex');
        });
        $('.showlogin').on('click', function(event) {
            event.preventDefault();
            $('.login-popup').fadeIn(400);
            $('header.header').addClass('zindex');
        });

        $('.login-popup').on('click', '.login', function(event) {
            event.stopPropagation();
        });
        $('#payment').on( 'click', '.payment_methods input.input-radio', function() {
            if ( $( '.payment_methods input.input-radio' ).length > 1 ) {
                var target_payment_box = $( 'div.payment_box.' + $( this ).attr( 'ID' ) );

                if ( $( this ).is( ':checked' ) && ! target_payment_box.is( ':visible' ) ) {
                    $( 'div.payment_box' ).filter( ':visible' ).slideUp( 250 );

                    if ( $( this ).is( ':checked' ) ) {
                        $( 'div.payment_box.' + $( this ).attr( 'ID' ) ).slideDown( 250 );
                    }
                }
            } else {
                $( 'div.payment_box' ).show();
            }

            if ( $( this ).data( 'order_button_text' ) ) {
                $( '#place_order' ).val( $( this ).data( 'order_button_text' ) );
            } else {
                $( '#place_order' ).val( $( '#place_order' ).data( 'value' ) );
            }
        })
        var currency = ["د.إ","лв.","kr.","Kr.","Rs.","руб."];
        var decimal = $("#num-decimal").val();
        function get_currency(pricehtml){
            var check,index,price_size,i;
            for(i = 0;i<6;i++){
                if(pricehtml.search(currency[i]) != -1)  {
                    check = true;
                    index = i;
                }
            }
            if(check) price_size =  pricehtml.replace(currency[index],"");
            else price_size = pricehtml.replace(/[^0-9\.]+/g,"");
            return price_size;
        }
        $(".quantity").find(".plus").on("click",function(){
            var min = $(this).prev().attr("min");
            var max = $(this).prev().attr("max");
            var step = $(this).prev().attr("step");
            if(max !==undefined && $(this).prev().val()<max || max === undefined){ 
                if(step!='') $(this).prev().val(Number($(".quantity").find(".qty").val())+Number(step));
            }
            var num = $(this).prev().val();
            var price_html = $(this).parent().parent().parent().find(".product-price .amount").html();
            var curent_tt_html = $(this).parent().parent().parent().find(".product-subtotal .amount").html();
            var curent_tt_price = get_currency(curent_tt_html);
            var price = get_currency(price_html);
            price = price.replace(",","");
            var price_item = price*num;
            if(num != 0) price_item = parseFloat(price_item).toFixed(decimal);
            var total_html = curent_tt_html.replace(curent_tt_price,price_item);
            $(this).parent().parent().parent().find(".product-subtotal .amount").html(total_html);
        })
        $(".quantity").find(".minus").on("click",function(){
            var min = $(this).next().attr("min");
            var max = $(this).next().attr("max");
            var step = $(this).next().attr("step");
            if(min !==undefined && $(this).next().val()>min || min === undefined){
                if(step!='') $(this).next().val(Number($(".quantity").find(".qty").val())-Number(step));
            }
            var num = $(this).next().val();
            var price_html = $(this).parent().parent().parent().find(".product-price .amount").html();
            var curent_tt_html = $(this).parent().parent().parent().find(".product-subtotal .amount").html();
            var curent_tt_price = get_currency(curent_tt_html);
            var price = get_currency(price_html);
            price = price.replace(",","");
            var price_item = price*num;
            if(num != 0) price_item = parseFloat(price_item).toFixed(decimal);
            var total_html = curent_tt_html.replace(curent_tt_price,price_item);
            $(this).parent().parent().parent().find(".product-subtotal .amount").html(total_html);
        })
        $(".quantity input.qty").on("keyup change",function(){
            var num = $(this).val();
            var price_html = $(this).parent().parent().parent().find(".product-price .amount").html();
            var curent_tt_html = $(this).parent().parent().parent().find(".product-subtotal .amount").html();
            var curent_tt_price = get_currency(curent_tt_html);
            var price = get_currency(price_html);
            price = price.replace(",","");
            var price_item = price*num;
            if(num != 0) price_item = parseFloat(price_item).toFixed(decimal);
            var total_html = curent_tt_html.replace(curent_tt_price,price_item);
            $(this).parent().parent().parent().find(".product-subtotal .amount").html(total_html);            
        })

    });
})(jQuery);