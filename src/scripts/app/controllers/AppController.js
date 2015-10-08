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

    var nav = new Navigation();
    var portfolio = new Portfolio();
    var contact = new Contact();

    $(window).on('resize', debounce(function () {
        nav.resize();
        portfolio.resize();
    }, 250));

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = new AppController();
