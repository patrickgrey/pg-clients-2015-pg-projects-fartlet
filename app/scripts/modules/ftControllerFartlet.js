module.exports = function () {
    
    var obj = {};
    var timeButton = document.getElementById('ft-audio-player-custom-btn-time-id');
    var playCircle = document.getElementById('ft-audio-player-custom-btn-play-centre-id');
    var timeButtonText = document.getElementById('ft-audio-player-custom-btn-play-text-inner-id');
    var timeButtonIconPlay = document.getElementById('ft-audio-player-custom-btn-play-icon-play-id');
    var timeButtonIconPause = document.getElementById('ft-audio-player-custom-btn-play-icon-pause-id');
    var timeTotal;
    var setButtonPlus = document.getElementById('ft-button-sets-info-plus-id');
    var setButtonMinus = document.getElementById('ft-button-sets-info-minus-id');
    var setInfo = document.getElementById('ft-button-sets-info-id');
    var setsText = document.getElementById('ft-audio-player-custom-btn-time-id');
    var resetButton = document.getElementById('ft-button-reset-svg-id');
    
    var setsTotal;
    
    obj.togglePlay = function () {
        console.log('play fartlet2');
        
        if (timeButtonIconPlay.style.display === 'none') {
            timeButtonIconPlay.style.display = 'block';
            timeButtonIconPause.style.display = 'none';
            timeButton.style.display = 'block';
            setButtonPlus.style.display = 'block';
            setButtonMinus.style.display = 'block';
            resetButton.style.display = 'block';
            playCircle.style.fill = '#8BC34A';
            TweenLite.to(setInfo, 1, {x:0, y:0});
        }
        else {
            timeButtonIconPlay.style.display = 'none';
            timeButtonIconPause.style.display = 'block';
            timeButton.style.display = 'none';
            setButtonPlus.style.display = 'none';
            setButtonMinus.style.display = 'none';
            resetButton.style.display = 'none';
            playCircle.style.fill = '#ff0';
            TweenLite.to(setInfo, 1, {x:-200, y:-200});
        }
    }
    
    // All elements need to be in one SVG to avoid overlaps etc.
    // Can still be styled just as before but target groups instead of SVG's.
    // Problem was that can't use units like VH! Surely can use percentages?
    // Also need to make container full height!
    // Also, set buttons outline too thick!!
    // Make whole interface, including title and help SVG!!!
    
    return obj;
}