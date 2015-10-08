'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var velocity = require('velocity');


// ----------------------------------------------------------------------------
// Overlay
//
var Overlay = function (element) {


    // ::: Private
    var $overlay = $(element);
    var speed = 300;
    var largeScreen = false;
    var self = this;

    // TODO: refactor this out into its own function
    // large screen detection
    // check to see if matchMedia exists - no point in a pollyfill as the fallback will work
    if (window.matchMedia && matchMedia('screen and (min-width: 600px)').matches) {
        largeScreen = true;
        // large screen sliding requres some extra css
        $overlay.addClass('slide-up-down');
    }



    var init = function () {
        setup();
        resize();
        events();
    };

    var setup = function () {
        // TODO: create the overlay elements, take them out of the markup
    };

    var events = function () {

        $overlay.on('click', '.js-close', function (event) {
            event.preventDefault();
            self.hide();
        });

        // TODO: add window resize with a debounce
        // $(window).on('resize', debounce(function () {
        //     // resize
        // }, 250));

    };

    var resize = function () {

        // get the true height (scollHeight) of the page element. Then subtract the height of the triangles
        var trianglesHeight = $('.js-triangles').height();
        var portfolioPageHeight = $('#work').find('.js-page')[0].scrollHeight;

        // set height
        $overlay.css('height', portfolioPageHeight - trianglesHeight);

        // set top
        $overlay.css('top', trianglesHeight);
    };

    var slideIn = function () {
        $overlay.velocity({ translateX: [0, '-100%'] }, speed);
    };

    var slideOut = function () {
        $overlay.velocity({ translateX: ['-100%', 0] }, speed);
    };

    var slideUp = function () {
        $overlay.css('display', 'block').velocity({ translateY: [0, '100%'] }, speed);
    };

    var slideDown = function () {
        $overlay.velocity({ translateY: ['100%', 0] }, speed, function () {
            $overlay.css('display', 'none');
        });
    };




    // ::: Public
    this.show = function () {
        if (largeScreen) {
            slideUp();
        } else {
            slideIn();
        }
    };

    this.hide = function () {
        if (largeScreen) {
            slideDown();
        } else {
            slideOut();
        }
    };

    this.resize = function () {
        resize();
    };



    // Let's begin
    init();

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Overlay;
