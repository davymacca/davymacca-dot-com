'use strict';

// ----------------------------------------------------------------------------
// Debounce - I didn't need all of underscore.js so just used the debounce function
//
var Debounce = function (func, wait, immediate) {

    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };

};


// ----------------------------------------------------------------------------
// exports
//
module.exports = Debounce;
