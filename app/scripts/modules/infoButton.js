module.exports = function (infoContainer, infoParent, infoPanel) {

    var containerDiv = document.getElementById(infoContainer),
    contentDiv = document.getElementById(infoParent),
    infoDiv = document.getElementById(infoPanel),
    button = document.createElement('button');

    button.innerHTML = '?';
    button.className = 'ft-button-information';

    var toggleInfo = function (event) {
        infoDiv.className.indexOf('ft-screen-reader-text') === -1 ? hideInfo() : showInfo();
    };

    var showInfo = function (event) {
        infoDiv.className = 'ft-information';
        button.innerHTML = "x";
        button.className = "ft-button-information ft-button-information-close";
        // Change text to cross and colour to red.
    };

    var hideInfo = function (event) {
        infoDiv.className = 'ft-information ft-screen-reader-text';
        button.innerHTML = "?";
        button.className = "ft-button-information";
    };

    button.onclick = toggleInfo;

    containerDiv.insertBefore(button, contentDiv);

    return button;
}