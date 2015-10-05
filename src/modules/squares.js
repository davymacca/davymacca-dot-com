'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var velocity = require('velocity');



// ----------------------------------------------------------------------------
// AppView
//
var Squares = function () {


    // generate all the sqaures
    // .js-squares

    function rand (min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    var lastRandom = null;
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

    // create all the squaressp
    var total = 40;
    var html = '';

    var prevClass = '';

    for(var i=0; i<total; i++) {
        var height = rand(150, 170);
        var margin = rand(30, 100);
        var modifier = 'Squares-item--type' + getNextRandom();

        html += '<div class="Squares-item ' + modifier + '" style="height:' + height + 'px; margin-top:' + margin + 'px;"></div>';
    }

    $('.js-squares').append(html);

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Squares;
