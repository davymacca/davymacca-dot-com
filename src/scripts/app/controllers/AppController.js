'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var owl = require('owlcarousel');
var velocity = require('velocity');
var portfolio = require('./../../portfolio');
var squares = require('./../../squares');

var Navigation = require('./../modules/Navigation');
var debounce = require('./../modules/debounce');


// ----------------------------------------------------------------------------
// AppView
//
var AppView = function () {



    // setup the Navigation
    var nav = new Navigation();

    $(window).on('resize', debounce(function () {
        nav.resize();
    }, 250));


    // setup specific pages




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


    portfolio();


};


// ----------------------------------------------------------------------------
// exports
//
module.exports = new AppView();
