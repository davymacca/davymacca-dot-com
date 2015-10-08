'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var Overlay = require('./../modules/Overlay');
var Triangles = require('./../modules/Triangles');


// ----------------------------------------------------------------------------
// Lightbox - really really really simple
//
var Lightbox = function () {


    var $lightbox = null;




    var init = function () {
        setup();
        events();
    };

    var setup = function () {

        // craete the div and add it to the body
        $lightbox = $('<div />').addClass('Lightbox js-lightbox');
        $('body').prepend($lightbox);

    };

    var events = function () {

        $lightbox.on('click', function () {
            closeBox();
        });

    };

    var openBox = function (path) {

        // create the image
        var img = $('<img/>').prop('src', path);
        img.src = path;

        // add img to the element
        // reset the height
        // and show the div
        $lightbox.html(img).css('height', '').show();

        img.one('load', function () {
            // make the background big enough once the image has loaded
            $lightbox.height($(document).height());
        });
    };

    var closeBox = function () {
        $lightbox.hide();
    };


    // ::: Public
    this.open = function (path) {
        openBox(path)
    };

    this.close = function () {
        closeBox();
    };

    // Let's begin
    init();

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Lightbox;
