var infoButton = require('./infoButton.js'),
    _ = require('underscore');

var contentDiv = document.getElementById("ft-container");
document.body.insertBefore(infoButton(), contentDiv);