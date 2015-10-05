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

    function setPortfolioItem (id) {
        currentItem = id;
    }

    function setActiveNavState ($el) {
        // sets a marker on the Nav
        $portfolio.find('a').removeClass('is-active');
        $el.addClass('is-active');
    }

    function setActiveDetailsState (newItemId) {
        // shows the details for the selected portfolio item

        function show (id, callback) {
            var $el = $('#' + id);
            $el.velocity({ opacity: 1 }, 200, callback);
        }

        function hide (id, callback) {
            var $el = $('#' + id);
            $el.velocity({ opacity: 0 }, 200, callback);
        }

        if (currentItem) {
            hide(currentItem, function () {
                show(newItemId);
            });
        } else {
            show(newItemId);
        }

    }


    // Setup click events for the portfolio list
    $portfolio.on('click', 'a', function (event) {
        event.preventDefault();
        var $el = $(this);
        var id = $el.data('section');
        $portfolio.trigger('DMC.portfolioHasChanged', { id: id, $el: $el });
    });

    $portfolio.on('DMC.portfolioHasChanged', function (event, data) {
        setActiveNavState(data.$el);
        setActiveDetailsState(data.id);
        setPortfolioItem(data.id);
    });





};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Portfolio;
