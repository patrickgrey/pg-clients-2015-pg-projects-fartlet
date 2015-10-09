var infoButton = require('./infoButton.js'),
    _ = require('underscore');

var containerDiv = document.getElementById('ft-container');
var contentDiv = document.getElementById('ft-content-container');
var infoDiv = document.getElementById('ft-information-container');
var infoButtonElement = infoButton();
var toggleInfo = function (event) {
    infoDiv.className.indexOf('ft-screen-reader-text') === -1 ? hideInfo() : showInfo();

};
var showInfo = function (event) {
    infoDiv.className = 'ft-information';
    infoButtonElement.innerHTML = "x";
    infoButtonElement.className = "ft-button-information ft-button-information-close";
    // Change text to cross and colour to red.
};
var hideInfo = function (event) {
    infoDiv.className = 'ft-information ft-screen-reader-text';
    infoButtonElement.innerHTML = "?";
    infoButtonElement.className = "ft-button-information";
};
infoButtonElement.onclick = toggleInfo;
// infoButtonElement.onfocus = showInfo;
// infoButtonElement.onblur = hideInfo;
containerDiv.insertBefore(infoButtonElement, contentDiv);