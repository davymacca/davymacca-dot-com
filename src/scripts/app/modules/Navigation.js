'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var owl = require('owlcarousel');
var velocity = require('velocity');



// ----------------------------------------------------------------------------
// Navigation
//
var Navigation = function () {


    // ::: Private
    var isMenuOpen = false;

    var $nav = $('.js-nav');
    var $page = $('.js-page');
    var $subNav = $('.js-sub-nav');
    var $carousel = $('.owl-carousel');
    var $pagesContainer = $('.js-pages');



    // TODO: This page is too big, needs some refacoring
    var init = function () {
        setupCarosuel();
        setupEvents();
        resizePage();
    };

    var setupEvents = function () {

        // navigation menu button
        mainMenuClickEvents();

        // subnav click and slide navigation
        subNavClickEvents();

        // main page, click the page contents to select that page
        pageClickEvents();

        // set some event callbacks
        $carousel.on('changed.owl.carousel', whenPageHasChanged);

    };

     var setupCarosuel = function () {

        // setup the main carousel
        $carousel.owlCarousel({
            items: 1,
            margin: 400
        });

        // stop all events from propagating through to the carousel when the menu is closed
        $(document).on('mousedown mousemove touchstart touchmove', 'body', function (event) {
            if (!isMenuOpen) {
                event.stopPropagation();
            }
        });

    };

    var menu = {

        open: function () {

            isMenuOpen = true;

            $pagesContainer.addClass('is-active');
            $page.velocity({ scale: 0.6 }, 200, 'easeOutCubic', function () {
                subNav.show();
            });

        },

        close: function () {

            isMenuOpen = false;

            $pagesContainer.removeClass('is-active');

            // hide the subnav then close the menu
            subNav.hide(function () {
                $page.velocity({ scale: 1 }, 250, whenMenuCloseAnimationIsComplete);
            });
        }

    };

    var subNav = {

        show: function (callback) {
            $subNav.velocity({ opacity: 1, translateY: -15 }, 100, callback);
        },

        hide: function (callback) {
             $subNav.velocity({ opacity: 0, translateY: 0 }, 100, function () {
                callback();
            });
        },

        setActiveState: function (index) {
            // Sets the subnav active state by adding a class to the nav element
            $subNav.find('.js-sub-nav-link').removeClass('is-active');
            $subNav.find('[data-section="' + index + '"]').addClass('is-active');
        }

    }

    var resizePage = function () {

        // set height of the page element to the same as viewport, minus the nav
        var viewportHeight = $(window).height();
        var navHeight = $nav.height();
        $page.css('height', viewportHeight - navHeight);

    };

    var whenPageHasChanged = function (event) {
        subNav.setActiveState(event.item.index);
    };

    var mainMenuClickEvents = function () {

        // Main Menu button click
        $nav.on('click', '.js-menu-button', function (e) {
            e.preventDefault();

            // Toggle the menu open and closed
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                menu.open();
            } else {
                menu.close();
            }
        });

    };

    var subNavClickEvents = function () {

        // Sub Nav click events
        $subNav.on('click', '.js-sub-nav-link', function (event) {
            event.preventDefault();
            $carousel.trigger('to.owl.carousel', [$(this).data('section'), 1000]);
        });

    };

    var pageClickEvents = function () {

        // We don't want to close the menu when you are dragging, only clicking so...
        // On mousedown, set the state, if the mousemove event is
        // fired record it, on mouseup, check if the mouse moved.
        // If it moved, we've been dragging. If we've not moved, it's a click.

        var isDragging = false;

        $page.mousedown(function () {
            isDragging = false;
        });

        $page.mousemove(function () {
            isDragging = true;
        });

        $page.mouseup(function () {

            var wasDragging = isDragging;
            isDragging = false;

            if (!wasDragging) {
                if (isMenuOpen) {
                    menu.close();
                }
            }

        });
    }

    var whenMenuOpenAnimationIsComplete = function () {
        // do something
    };

    var whenMenuCloseAnimationIsComplete = function () {
        // so something
    };



    // ::: Public
    this.resize = function () {
        resizePage();
    };


    // Let's begin
    init();
};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Navigation;
