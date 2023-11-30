const winW = $(window).width();
const winH = $(window).height();

const getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

const page = location.pathname.split('/').slice(-1)[0];

$(document).ready(function() {

    //datepicker-------------------------------------------
    $('#datepicker').datepicker({
        format: 'yyyy/mm/dd',
    });
    $('#timepicker').timepicker({
        timeFormat: 'p HH:mm',
    });
    $('#timepicker2').timepicker({
        timeFormat: 'p HH:mm',
    });

    //menu選單 tab 選取 --------------------------------
    if (winW > 768) {
        $('.nav_link').focusin(function() {
            $('.nav_link').removeClass('active');
            $(this).addClass('active');
        });
        $('.subnav_link').focusin(function() {
            $('.nav_link').removeClass('active');
            $(this).closest('.nav_li').find('.nav_link').addClass('active');
        });
        $('a').not('.nav_link, .subnav_link').focusin(function() {
            $('.nav_link').removeClass('active');
        });
        $('.nav_li').hover(function() {
            $(this).find('.nav_link').addClass('active');
        }, function() {
            $('.nav_link').removeClass('active');
        });
    }

    //menu選單 手機板-------------------------------------------
    if (winW <= 768) {
        const hamburger = $('.hamburger'),
            nav = $('.nav'),
            nav_link = $('.nav_link'),
            subnav_box = nav.find('.subnav_box'),
            navReset = function() {
                nav_link.attr('o', 1);
                nav.clearQueue();
                subnav_box.slideUp(0);
            };
        let o = true;

        navReset();
        nav_link.click(function(e) {
            var _this = $(this),
                _thisSubnav = _this.siblings('.subnav_box'),
                _o = _this.attr('o');
            if (_thisSubnav.length <= 0) return;
            e.preventDefault();
            if (_o == 1) {
                _thisSubnav.clearQueue();
                _thisSubnav.slideDown();
                _this.attr('o', 0);
            } else {
                _thisSubnav.slideUp();
                _this.attr('o', 1);
            }
        });


        TweenMax.set(nav, {
            opacity: 0,
            display: 'none'
        });
        hamburger.click(function() {
            if (o) {
                navReset();
                TweenMax.to(nav, .3, { opacity: 1, display: 'flex' });
                hamburger.addClass('cross');
                o = false;
            } else {
                TweenMax.to(nav, .2, { opacity: 0, display: 'none' });
                hamburger.removeClass('cross');
                o = true;
            }

        });
    }

    //常設展動態 --------------------------------
    if ($('.permanent_kv').length > 0) {
        var tl = new TimelineMax()
            .staggerFrom('.txt_1, .txt_2, .txt_3, .txt_en', .5, { y: -winH / 2, ease: Back.easeOut.config(.7) }, 0.12)
            .staggerFrom('.txt_4, .txt_5, .txt_6', .5, { y: winH / 2, ease: Back.easeOut.config(.7) }, 0.12, '-=.2')
            .staggerFrom('.pm_kv_peo', .4, { scale: 0, ease: Back.easeOut.config(1.2) }, 0.12)

        TweenMax.to('.peo_1, .peo_4', 1.2, { y: 3, repeat: -1, yoyo: true, ease: Power1.easeInOut })
        TweenMax.to('.peo_2, .peo_5', 1, { y: -2, repeat: -1, yoyo: true, ease: Power1.easeInOut })
        TweenMax.to('.peo_3', 1.5, { y: 5, repeat: -1, yoyo: true, ease: Power1.easeInOut })

        tl.eventCallback("onComplete", function() {
            TweenMax.to('.peo_1', .3, { delay: .4, rotation: 3, repeat: 1, yoyo: true, ease: Power1.easeInOut })
            TweenMax.to('.peo_2', .3, { delay: .0, rotation: -3, repeat: 1, yoyo: true, ease: Power1.easeInOut })
            TweenMax.to('.peo_3', .3, { delay: .2, rotation: -5, repeat: 1, yoyo: true, ease: Power1.easeInOut })
            TweenMax.to('.peo_4', .3, { delay: .4, rotation: 5, repeat: 1, yoyo: true, ease: Power1.easeInOut })
            TweenMax.to('.peo_5', .3, { delay: .0, rotation: -3, repeat: 1, yoyo: true, ease: Power1.easeInOut })
        });
    }


    // swiper ------------------------------------------


    if ($(".gallery_swiper").length > 0) {

        const $swiper = '.gallery_swiper';
        const container = $swiper + ' .swiper-container';
        const pagination = $swiper + ' .swiper-pagination';
        const button_next = $swiper + ' .swiper-button-next';
        const button_prev = $swiper + ' .swiper-button-prev';

        const mySwiper = new Swiper(container, {
            grabCursor: true,
            preloadImages: false,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: true,
            },
            navigation: {
                nextEl: button_next,
                prevEl: button_prev,
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                },
                840: {
                    slidesPerView: 5,
                }
            }
        });
    }

    if ($(".kv_swiper").length > 0) {

        const $swiper = '.kv_swiper';
        const container = $swiper + ' .swiper-container';
        const pagination = $swiper + ' .swiper-pagination';
        const button_next = $swiper + ' .swiper-button-next';
        const button_prev = $swiper + ' .swiper-button-prev';

        const mySwiper = new Swiper(container, {
            grabCursor: true,
            speed: 800,
            effect: "fade",
            lazy: {
                loadPrevNext: true,
            },
            autoplay: {
                delay: 6000,
            },
            pagination: {
                el: pagination,
            },
        });
    }

    if ($(".news_swiper").length > 0) {

        const $swiper = '.news_swiper';
        const container = $swiper + ' .swiper-container';
        const pagination = $swiper + ' .swiper-pagination';
        const button_next = $swiper + ' .swiper-button-next';
        const button_prev = $swiper + ' .swiper-button-prev';

        const mySwiper = new Swiper(container, {
            grabCursor: true,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                }
            },
            a11y: {
                enabled: true,
                firstSlideMessage: "第一則",
                lastSlideMessage: "最後一則",
                paginationBulletMessage: "到第 {{index}} 則",
            },
        });
    }

    if ($(".event_swiper").length > 0) {

        const elements = document.querySelectorAll('.event_swiper');

        Array.from(elements).forEach((obj, ind) => {
            const $swiper = '.event_page[page="' + ind + '"] .event_swiper';
            const container = $swiper + ' .swiper-container';
            const button_next = $swiper + ' .swiper-button-next';
            const button_prev = $swiper + ' .swiper-button-prev';

            const mySwiper = new Swiper(container, {
                grabCursor: true,
                preloadImages: false,
                watchSlidesVisibility: true,
                lazy: {
                    loadPrevNext: true,
                },
                navigation: {
                    nextEl: button_next,
                    prevEl: button_prev,
                },
                a11y: {
                    enabled: true,
                    firstSlideMessage: "第一則",
                    lastSlideMessage: "最後一則",
                    paginationBulletMessage: "到第 {{index}} 則",
                },
            });

        });

    }

    if ($('.swiper_org').length > 0) {

        const $swiper = '.swiper_org';
        const container = $swiper + ' .swiper-container';
        const pagination = $swiper + ' .swiper-pagination';
        const button_next = $swiper + ' .swiper-button-next';
        const button_prev = $swiper + ' .swiper-button-prev';

        var mySwiper = new Swiper(container, {
            slidesPerView: 'auto',
            grabCursor: true,
            loop: true,
            loopedSlides: 4,
            centeredSlides: true,
            speed: 400,
            preloadImages: false,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: true,
            },
            autoplay: {
                delay: 3500,
            },
            a11y: {
                enabled: true,
                firstSlideMessage: "第一則",
                lastSlideMessage: "最後一則",
                paginationBulletMessage: "到第 {{index}} 則",
            },
        });
    }


    if ($(".swiper_floor").length > 0) {

        let container;
        let pagination;
        let mySwiper;

        function swiper_floor($swiper) {
            container = $swiper + ' .swiper-container';
            pagination = $swiper + ' .swiper-pagination';
            button_next = $swiper + ' .swiper-button-next';
            button_prev = $swiper + ' .swiper-button-prev';

            mySwiper = new Swiper(container, {
                slidesPerView: 1,
                grabCursor: true,
                lazy: {
                    loadPrevNext: true,
                },
                pagination: {
                    el: pagination,
                },
                a11y: {
                    enabled: true,
                    firstSlideMessage: "第一則",
                    lastSlideMessage: "最後一則",
                    paginationBulletMessage: "到第 {{index}} 則",
                },
            });
        }

        for (var i = 1; i <= 4; i++) {
            swiper_floor('#swiper_floor_' + i);
        }
    }


    //faq ------------------------------------------
    let faq_this;
    let _parent;
    let _o;
    const faq_question = $('.faq_question');
    const faq_answer = $('.faq_answer');

    faq_question.attr('o', 1);
    faq_answer.slideUp(0);
    faq_question.click(function() {
        faq_this = $(this);
        _parent = faq_this.parent();
        _o = faq_this.attr('o');
        if (_o == 1) {
            _parent.find('.faq_answer').slideDown();
            faq_this.attr('o', 0);
        } else {
            _parent.find('.faq_answer').slideUp();
            faq_this.attr('o', 1);
        }
    });


    // tracker ------------------------------------------

    if (winW > 1024) {
        let mouseX, mouseY, trackerW;
        const tracker = $(".tracker");

        $("body").bind("mousemove", function(a) {
            mouseX = a.clientX;
            mouseY = a.clientY;
            trackerW = tracker.width();
            TweenMax.to(tracker, .3, {
                x: mouseX - trackerW / 2,
                y: mouseY - trackerW / 2,
                opacity: 1,
                repeat: 0,
                delay: 0.05
            })
        });

        $('.hover').hover(function() {
            tracker.addClass('hover');
        }, function() {
            tracker.removeClass('hover');
        });
    }


    // Parallax ------------------------------------------

    if ($('#scene').length > 0) {

        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);

        let _this;
        let _page;
        const event_tab_link = $('.event_tab_link');
        const event_page = $('.event_page');

        event_page.hide();
        event_page.eq(0).fadeIn();
        event_tab_link.click(function() {
            _this = $(this);
            _page = _this.data('page');
            event_tab_link.removeClass('active');
            _this.addClass('active');
            event_page.hide();
            event_page.eq(_page).fadeIn();
        });

    }

    if ($('.floor_display').length > 0) {

        let _n = 0;
        const floor = $('.floor');
        const floor_tab = $('.floor_tab');
        const floor_page = $('.floor_page');
        const floor_title = $('.floor_title');
        const btn_up = $('.btn_up');
        const btn_down = $('.btn_down');

        function floorChange(_n) {
            floor_tab.removeClass('active');
            floor_tab.eq(_n).addClass('active');
            floor_page.hide();
            floor_page.eq(_n).fadeIn();
            floor.removeClass('active');
            $('.floor_' + _n).addClass('active');
            switch (_n) {
                case 0:
                    floor_title.text('1F');
                    break;
                case 1:
                    floor_title.text('3F');
                    break;
                case 2:
                    floor_title.text('3F');
                    break;
                case 3:
                    floor_title.text('4F');
                    break;
                default:
            }

            if (_n == 0) btn_down.addClass('disabled');
            else btn_down.removeClass('disabled');

            if (_n == 3) btn_up.addClass('disabled');
            else btn_up.removeClass('disabled');
        }

        floorChange(_n);

        floor_tab.click(function() {
            _n = $(this).data('page');
            floorChange(_n);
        });

        btn_up.click(function() {
            _n++;
            if (_n > 3) _n = 3;
            floorChange(_n);
        });

        btn_down.click(function() {
            _n--;
            if (_n < 0) _n = 0;
            floorChange(_n);
        });
    }


    // tabs ------------------------------------------

    const search_slide_sec = $('.search_slide_sec');
    const search_slide_box = $('.search_slide_box');
    const tab_link = $('.tab_link');
    const tab_row = $('.tab_row');
    const tab_page = $('.tab_page');
    let _this;
    let _page;

    search_slide_sec.slideUp(0);
    TweenMax.set(search_slide_box, {
        opacity: 0
    });

    tab_page.hide();
    $('.page_0').fadeIn();

    tab_link.click(function() {
        _this = $(this);
        _page = _this.data('page');
        tab_page.hide();
        $('.page_' + _page).fadeIn();
        tab_link.removeClass('active');
        _this.addClass('active');
        if (_this.hasClass('search_trigger')) {
            tab_row.addClass('active');
            search_slide_sec.slideDown();
            TweenMax.to(search_slide_box, .3, { delay: .4, opacity: 1, ease: Power0.easeOut });
        } else {
            tab_row.removeClass('active');
            search_slide_sec.slideUp();
            TweenMax.to(search_slide_box, .3, { opacity: 0 });
        }
    });





    //lightbox-------------------------------------------
    var lightbox = $('.lightbox');
    var lightbox_pic = $('.lightbox_pic');
    var lbBtn = $('.lbBtn');
    var lbBtn_pic = $('.lbBtn_pic');
    closeFn(lightbox);
    closeFn(lightbox_pic);
    lbBtn.click(function() {
        var data = $(this).data('lb');
        var _src = $(this).find('img').attr('src');
        $('#lb_pic').find('img').attr('src', _src);
        TweenLite.to($('#' + data), .4, { opacity: 1, display: 'flex', ease: Circ.easeOut });
    });

    lbBtn_pic.click(function() {
        var _src = $(this).find('.img').attr('src');
        $('.lb_img').attr('src', _src);
        TweenMax.to('#lb_pic', .4, { opacity: 1, display: 'flex', ease: Circ.easeOut });
    });

    // tab 點選
    $('.lbBtn').keypress(function(e) {
        if (e.which == 13) {
            var data = $(this).data('lb');
            TweenLite.to($('#' + data), .4, {
                opacity: 1,
                display: 'flex',
                ease: Circ.easeOut,
                onComplete: function() {
                    if (winW <= 768) return;
                    lb_acc();
                }
            });
        }
    });
    lbBtn_pic.keypress(function(e) {
        if (e.which == 13) {
            TweenMax.to($('#lb_pic'), .4, {
                opacity: 1,
                display: 'flex',
                ease: Circ.easeOut,
                onComplete: function() {
                    lb_acc('lb_pic');
                }
            });
        }
    });

    function closeFn(lightbox) {
        var btnClose = lightbox.find('.btnClose');
        btnClose.click(function(e) {
            TweenLite.to(lightbox, .2, {
                opacity: 0,
                display: 'none',
                ease: Circ.easeOut
            });
            // tab 點選 btnClose
            if (e.detail === 0) {
                $('.arti_pic').focus();
            }
        });
        lightbox.click(function(e) {
            if ($(e.target).is(lightbox))
                TweenLite.to(lightbox, .2, {
                    opacity: 0,
                    display: 'none',
                    ease: Circ.easeOut
                });
        });

    }

    function lbFn(_this) {
        closeFn(_this);
        TweenLite.to(_this, .4, {
            opacity: 1,
            display: 'flex',
            ease: Circ.easeOut,
            onComplete: function() {
                if (winW <= 768) return;
                scrollBox();
            }
        });
    }

    function lb_acc() {

        var focusedElementBeforeModal;
        focusedElementBeforeModal = document.activeElement;

        var modal = document.querySelector('.lightbox');
        modal.addEventListener('keydown', trapTabKey);

        var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        var focusableElements = modal.querySelectorAll(focusableElementsString);

        focusableElements = Array.prototype.slice.call(focusableElements);

        var firstTabStop = focusableElements[0];
        var lastTabStop = focusableElements[focusableElements.length - 1];
        firstTabStop.focus();

        function trapTabKey(e) {

            if (e.keyCode === 9) {

                // SHIFT + TAB
                if (e.shiftKey) {
                    if (document.activeElement === firstTabStop) {
                        e.preventDefault();
                        lastTabStop.focus();
                    }

                    // TAB
                } else {
                    if (document.activeElement === lastTabStop) {
                        e.preventDefault();
                        firstTabStop.focus();
                    }
                }
            }

            // ESCAPE
            if (e.keyCode === 27) {
                TweenLite.to(lightbox, .2, {
                    opacity: 0,
                    display: 'none',
                    ease: Circ.easeOut
                });
                focusedElementBeforeModal.focus();
            }
        }
    }


    //--------------------- landing 動態 ---------------------//

    // var tween = new TimelineMax({ paused: true, delay: .5 })
    //     .staggerFrom('.cotton_bird', .4, { opacity: 0, scale: 0, ease: Back.easeOut.config(2) }, .15)
    //     .staggerFrom('.tree', .4, { opacity: 0, scale: 0, ease: Back.easeOut.config(1.7) }, .15, '-=.4')
    //     .staggerFrom('.leaf_left .leaf', .8, { opacity: 0, x: -80, y: -50, ease: Circ.easeOut }, -.16, '-=.5')
    //     .staggerFrom('.leaf_right .leaf', .9, { opacity: 0, x: 50, y: -80, ease: Circ.easeOut }, -.18, '-=1')
    //     .from('.kv_rock_2', .4, { opacity: 0, ease: Power2.easeIn }, '-=.4')
    //     .from('.kv_rock_3', .4, { opacity: 0, ease: Power2.easeIn }, '-=.0')
    //     .from('.kv_rock_1', .4, { opacity: 0, ease: Power2.easeIn }, '-=.0')
    //     .from('.kv_cloud_1, .kv_cloud_2, .kv_cloud_3', .5, { opacity: 0, ease: Power0.easeOut }, '-=.0')
    //     .from('.kv_water', .6, { opacity: 0, ease: Power0.easeOut }, '-=.0')
    //     .staggerTo('.cotton_bird .ovr', .3, { opacity: 1, ease: Circ.easeOut }, -.18, '-=0', function() {
    //         $('.cotton_bird').addClass('active');
    //     })
    //     .staggerTo('.tree .ovr', .3, { opacity: 1, ease: Circ.easeOut }, .18, '-=.2')
    //     .staggerTo('.leaf .ovr', .3, { opacity: 1, ease: Circ.easeOut }, -.18, '-=.2')
    //     .from('.peo_bird', .7, {
    //         x: -20,
    //         y: -5,
    //         opacity: 0,
    //         ease: Circ.easeOut,
    //         onComplete: function() {
    //             $('.peo_bird').addClass('active');
    //         }
    //     }, '-=.6')
    //     .from('.peo_goat', 1, {
    //         x: 60,
    //         opacity: 0,
    //         ease: Circ.easeOut,
    //         onComplete: function() {
    //             $('.peo_goat').addClass('active');
    //         }
    //     }, '-=.0')
    //     .staggerFrom('.cotton_sheep', 1.5, { x: 100, opacity: 0, ease: Circ.easeOut }, .2, '-=.6')
    //     .staggerTo('.cotton_sheep .ovr', .4, { opacity: 1, ease: Circ.easeOut }, -.18, '-=1')
    //     .from('.kv_title', .8, { opacity: 0, ease: Power0.easeOut }, '+=.2')



    // $('.skip_btn').click(function() {
    //     TweenMax.to('.landing_block', .4, { opacity: 0, display: 'none', ease: Power2.easeOut });
    // });








    //--------------------- imagesLoaded ---------------------//
    function removeLoading() {
        $(".loading").fadeOut(function() {
            $(this).remove();
            lazyload();
            tween.play();
        });
    }

    imagesLoaded("html, body", function() {
        removeLoading();
    });
});