'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var owl = require('owlcarousel');
var velocity = require('velocity');
var portfolio = require('./../portfolio');
var squares = require('./../squares');



// ----------------------------------------------------------------------------
// AppView
//
var AppView = function () {


    var viewportHeight = $(window).height();
    var navHeight = $('.js-nav').height();
    var isMenuOpen = false;
    var $pagesContainer = $('.js-pages');
    var $page = $('.js-page');
    var $subNav = $('.js-sub-nav');



    function setupMenu () {

        // set height of the element to the same as the page
        $page.css('height', viewportHeight - navHeight);

    }

    function setupCarosuel () {

        // setup carousel
        $('.owl-carousel').owlCarousel({
            items: 1,
            margin: 400
        }).on('changed.owl.carousel', function (event) {
            // TODO: refactor all of this
            $subNav.find('.js-sub-nav-link').removeClass('is-active');
            $subNav.find('[data-section="' + event.item.index + '"]').addClass('is-active');
            console.log('changed', event.item.index);
        });

        // stop events from propagating through to the carousel
        // when the menu is closed
        $(document).on('mousedown mousemove touchstart touchmove', 'body', function (event) {
            if (!isMenuOpen) {
                event.stopPropagation();
            }
        });

    }

    function setupClickEvents () {

        // Main Menu button click
        $('.js-menu').on('click', function (e) {
            e.preventDefault();

            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                menuOpen();
            } else {
                menuClose();
            }
        });

        // Sub Nav click events
        $subNav.on('click', '.js-sub-nav-link', function (e) {
            e.preventDefault();

            var $link = $(this);
            var id = $link.data('section');

            $('.owl-carousel').trigger('to.owl.carousel', [id, 1000]);

            console.log('click the nav', id);
        });


        // We don't want to close the menu when you are dragging, only clicking so...
        // On mousedown, set the state, if the mousemove event is
        // fired record it, on mouseup, check if the mouse moved.
        // If it moved, we've been dragging. If we've not moved, it's a click.

        var isDragging = false;

        $page.mousedown(function() {
            isDragging = false;
        });

        $page.mousemove(function() {
            isDragging = true;
        });

        $page.mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            if (!wasDragging) {
                if (isMenuOpen) {
                    menuClose();
                }
            }
        });

    }

    function menuOpen () {

        isMenuOpen = true;
        $pagesContainer.addClass('is-active');
        $page.velocity({ scale: 0.6 }, 200, 'easeOutCubic', function () {
            showSubNav();
        });

    }

    function menuClose () {

        isMenuOpen = false;
        $pagesContainer.removeClass('is-active');

        // hide the subnav then close the menu
        hideSubMenu(function () {
            $page.velocity({ scale: 1 }, 250, whenMenuCloseAnimationIsComplete);
        });

    }

    function showSubNav (callback) {
        $subNav.velocity({ opacity: 1, translateY: -15 }, 100, callback);
    }

    function hideSubMenu (callback) {
        $subNav.velocity({ opacity: 0, translateY: 0 }, 100, function () {
            callback();
        });
    }

    function whenMenuOpenAnimationIsComplete () {
        console.log('menu is now open');

    }

    function whenMenuCloseAnimationIsComplete () {
        console.log('menu is now closed');
    }


    // Init
    setupCarosuel();
    setupMenu();
    setupClickEvents();
    portfolio();
    squares();




    // create lots of svg elements
    // TODO: move this to its own file
    var html = '';
    var i = 0;
    var total = 60;
    var $triangles = $('.js-triangles');
    var triangle = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210"><polyline points="209.5,209 0.5,209 0.5,0"/></svg>';
    for(i=0; i<total; i++) {
        html += triangle;
    }
    $triangles.html(html);


    // TODO: only do this on large screen sizes
    // randomly add class to triangle every 3 seconds
    var $currentSvgEl = null;
    var SVGelements = $triangles.find('svg');
    var min = 0;
    var max = 40;
    var changeSvgClass = function () {
        var rand = Math.floor(Math.random() * max) + min;

        function showTriangle ($el, callback) {
            $el.velocity({ opacity: 1 }, 1000, callback);
        }

        function hideTriangle ($el, callback) {
            $el.velocity({ opacity: 0 }, 1000, callback);
        }

        // if no element has current been hidden then choose the random one
        if (!$currentSvgEl) {
            $currentSvgEl = $(SVGelements[rand]);
        }

        showTriangle($currentSvgEl, function  () {
            $currentSvgEl = $(SVGelements[rand]); // choose new random
            hideTriangle($currentSvgEl);
        });
    };
    var interval = setInterval(changeSvgClass, 5000);

    changeSvgClass(); // run once before the first interval fires








};


// ----------------------------------------------------------------------------
// exports
//
module.exports = new AppView();
