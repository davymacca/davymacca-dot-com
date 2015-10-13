'use strict';

var git = require('git-rev');

module.exports = {

    getHash: function (callback) {
        git.short(function (str) {
            callback(str);
        });
    }

};
