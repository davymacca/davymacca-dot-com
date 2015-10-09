'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var velocity = require('velocity');


// ----------------------------------------------------------------------------
// Triangles - creates lots of triangles
//
var Triangles = function (selector) {


    // ::: Private
    var $mainElement = $(selector);
    var $triangles = null;
    var $activeElement = null;



    var init = function () {

        createTriangles();

        // TODO: only do the animation on larger screens
        startAnimating();

    };

    var createTriangles = function () {

        // adds all of the triangle elements to the main div
        var i;
        var html = '';
        var total = 60;
        var element = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210"><polyline points="209.5,209 0.5,209 0.5,0"/></svg>';

        for(i = 0; i < total; i++) {
            html += element;
        }

        // add the html to the div in 1 go - more efficient
        $mainElement.html(html);
        $triangles = $mainElement.find('svg');

    };

    var startAnimating = function () {

        var wait = 7000;
        var interval = setInterval(animateRandomTriangle, wait);

        // run once initially before the first interval fires
        animateRandomTriangle();

    };

    var animateRandomTriangle = function () {

        if ($triangles) {

            // select a ramdom triangle element then animate the opacity in and out
            var min = 0;
            var max = 40;
            var rand = Math.floor(Math.random() * max) + min;
            var $el = $($triangles[rand]);

            animateElement($el);

        }

    };

    var animateElement = function ($el) {

        // fades the selected element in... waits a while then fade it back in again

        if (!$activeElement) {
            $activeElement = $el;
        }

        // Show the element
        showTriangle($activeElement, function () {
            $activeElement = $el;
            // hide the current element
            hideTriangle($activeElement);
        });
    };

    var showTriangle = function ($el, callback) {
        $el.velocity({ opacity: 1 }, 1000, callback);
    };

    var hideTriangle = function ($el, callback) {
        $el.velocity({ opacity: 0 }, 1000, callback);
    };








    // Let's Begin
    init();


};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Triangles;
