'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var velocity = require('velocity');



// ----------------------------------------------------------------------------
// AppView
//
var Portfolio = function () {

    var currentItem = null;
    var $portfolio = $('.js-portfolio');
    var $overlay = $('.js-overlay');
    var largeScreen = false;

    // large screen detection
    // check to see if matchMedia exists - no point in a pollyfill as the fallback will work
    if (window.matchMedia && matchMedia('screen and (min-width: 600px)').matches) {
        largeScreen = true;
        // large screen sliding requres some extra css
        $overlay.addClass('slide-up-down');
    }

    function setActiveDetailsState (id) {
        // hide all items
        $('.js-portfolio-item').removeClass('is-active');

        // show correct item
        $('#' + id).addClass('is-active');

        Overlay.show();
    }



    var Overlay = {

        setup: function () {

            // get the true height (scollHeight) of the page element. Then subtract the height of the triangles
            var trianglesHeight = $('.js-triangles').height();
            var portfolioPageHeight = $('#work').find('.js-page')[0].scrollHeight;

            // set height
            $overlay.css('height', portfolioPageHeight - trianglesHeight);

            // set top
            $overlay.css('top', trianglesHeight);
        },

        resize: function () {

        },

        slideIn: function () {
            $overlay.velocity({
                translateX: [0, '-100%']
            }, 300);
        },

        slideOut: function () {
            $overlay.velocity({
                translateX: ['-100%', 0]
            }, 300);
        },

        slideUp: function () {
            $overlay.css('display', 'block').velocity({
                translateY: [0, '100%']
            }, 300);
        },

        slideDown: function () {
            $overlay.velocity({
                translateY: ['100%', 0]
            }, 300, function () {
                $overlay.css('display', 'none');
            });
        },

        show: function () {
            if (largeScreen) {
                this.slideUp();
            } else {
                this.slideIn();
            }
        },

        hide: function () {
            if (largeScreen) {
                this.slideDown();
            } else {
                this.slideOut();
            }
        }

    };



    $overlay.on('click', '.js-close', function (event) {
        event.preventDefault();
        Overlay.hide();
    });

    // Setup click events for the portfolio list
    $portfolio.on('click', 'a', function (event) {
        event.preventDefault();
        var $el = $(this);
        var id = $el.data('section');
        $portfolio.trigger('DMC.portfolioHasChanged', { id: id, $el: $el });
    });

    $portfolio.on('DMC.portfolioHasChanged', function (event, data) {
        setActiveDetailsState(data.id);
    });



    // Setup the overlay
    Overlay.setup();


};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Portfolio;
