'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');


// ----------------------------------------------------------------------------
// Squares - generate some randomly sized and coloured sqaures
//
var Squares = function (selector) {


    var $mainElement = $(selector);
    var lastRandom = null;



    function rand (min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function getNextRandom () {

        // get a random number which is different from the last
        var min = 1;
        var max = 6;
        var random = rand(min, max);

        while (random === lastRandom) {
            random = rand(min, max);
        }
        lastRandom = random;

        return random;

    }

    function createElements () {

        // Create all the elements

        var total = 40;
        var html = '';
        var i;

        for(i=0; i<total; i++) {
            var height = rand(150, 170);
            var margin = rand(30, 100);
            var modifier = 'Squares-item--type' + getNextRandom();

            html += '<div class="Squares-item ' + modifier + '" style="height:' + height + 'px; margin-top:' + margin + 'px;" />';
        }

        $mainElement.append(html);
    }

    // Start by making all of the squares
    createElements();

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Squares;
