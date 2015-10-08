'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var Overlay = require('./../modules/Overlay');
var Triangles = require('./../modules/Triangles');


// ----------------------------------------------------------------------------
// Portfolio - creates the portfolio list and overlay
//
var Portfolio = function () {


    // ::: Private
    var $portfolio = $('.js-portfolio');
    var overlay, triangles;



    var init = function () {

        triangles = new Triangles('.js-triangles');
        overlay = new Overlay('.js-overlay');

        positionWatermark();
        events();
    };

    var events = function () {

        // Setup click events for the portfolio list
        $portfolio.on('click', 'a', function (event) {
            event.preventDefault();
            var id = $(this).data('section');
            setActiveDetailsState(id);
        });

    };

    var setActiveDetailsState = function (id) {

        // simple show and hide of the portfolio details
        $('.js-portfolio-item').removeClass('is-active');
        $('#' + id).addClass('is-active');

        overlay.show();

    };

    var positionWatermark = function () {

        // The watermark needs to sit at the bottom of each page (for aesthetics)
        // with all the scaling, scrolling and all that jazz it needs doing with JS :(

        var $page = $('#work').find('.js-page');
        var pageHeight = $page.height();
        var pageScrollHeight = $page[0].scrollHeight;

        $('.js-watermark').css('bottom', -(pageScrollHeight - pageHeight));

    };


    // Let's begin
    init();

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Portfolio;
