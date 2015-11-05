module.exports = function (skipToPlayer, returnToSVG, customControls, accessibleControls) {
    
    var skipToPlayer = document.getElementsByClassName(skipToPlayer)[0];
    var returnToSVG = document.getElementsByClassName(returnToSVG)[0];
    var customControls = document.getElementsByClassName(customControls)[0];
    var accessibleControls = document.getElementsByClassName(accessibleControls)[0];
    
    skipToPlayer.addEventListener('click', function() {
        customControls.style.display = 'none';
        accessibleControls.style.display = 'block';
    }, false);
    
    returnToSVG.addEventListener('click', function() {
        customControls.style.display = 'block';
        accessibleControls.style.display = 'none';
    }, false);
}