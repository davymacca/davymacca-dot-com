'use strict';

// ----------------------------------------------------------------------------
// Imports
//
var $ = require('jquery');
var Navigation = require('./../modules/Navigation');
var Portfolio = require('./../views/Portfolio');
var Contact = require('./../views/Contact');
var debounce = require('./../modules/debounce');


// ----------------------------------------------------------------------------
// AppController
//
var AppController = function () {

    // setup the Navigation
    var nav = new Navigation();

    $(window).on('resize', debounce(function () {
        nav.resize();
    }, 250));


    // setup specific pages
    var portfolio = new Portfolio();
    var contact = new Contact();

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = new AppController();
