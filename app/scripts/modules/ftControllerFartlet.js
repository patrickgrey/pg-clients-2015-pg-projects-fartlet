module.exports = function (ftSVGPosition) {
    
    var obj = {};
    var timeButton = document.getElementById('ft-audio-svg-btn-time');
    var playCircle = document.getElementById('ft-audio-svg-btn-play-centre');
    var timeButtonText = document.getElementById('ft-audio-svg-btn-play-text');
    var timeButtonIconPlay = document.getElementById('ft-audio-svg-btn-play-icon-play');
    var timeButtonIconPause = document.getElementById('ft-audio-player-custom-btn-play-icon-pause');
    var timeTotal;
    var setButtonPlus = document.getElementById('ft-audio-svg-btn-sets-plus');
    var setButtonMinus = document.getElementById('ft-audio-svg-btn-sets-minus');
    var setInfo = document.getElementById('ft-audio-svg-btn-sets-info');
    var setsText = document.getElementById('ft-audio-svg-btn-sets-info-text');
    var resetButton = document.getElementById('ft-audio-svg-btn-reset');
    
    var setsTotal;
    
    obj.currentInfoAnimation;
    
    
    
    obj.togglePlay = function () {
        // 
        // SETS INFO MOVEMENT
        // Maybe use a false copy?
        // Duplicate the positioned element, and animate that to a position where
        // it will remain correct even with screen rotation.
        // 
        // The screen isn't going to change horizontally!!!
        // We just have to deal with changes between portrait and landscape.
        // Check the state of the circle. If it is larger than other buttons,
        // Fix is to large position and kill animation.
        
        if (timeButtonIconPlay.style.display != 'none') {
            
            timeButtonIconPlay.style.display = 'none';
            timeButtonIconPause.style.display = 'block';
            timeButton.style.display = 'none';
            setButtonPlus.style.display = 'none';
            setButtonMinus.style.display = 'none';
            resetButton.style.display = 'none';
            playCircle.style.fill = '#ff0';
            
            
            TweenLite.killTweensOf("#ft-audio-svg-btn-time-inner");
            if(obj.currentInfoAnimation) {
                obj.currentInfoAnimation.progress(1).kill();
            }
            obj.currentInfoAnimation = TweenLite.to(setInfo, 0.3, {x:"-=250", y:"-=200", scale:"+=1"});
        }
        else {
            timeButtonIconPlay.style.display = 'block';
            timeButtonIconPause.style.display = 'none';
            timeButton.style.display = 'block';
            setButtonPlus.style.display = 'block';
            setButtonMinus.style.display = 'block';
            resetButton.style.display = 'block';
            playCircle.style.fill = '#8BC34A';
            // get current position of element from position class
            
            // console.log(ftSVGPosition);
            if(obj.currentInfoAnimation) {
                obj.currentInfoAnimation.progress(1).kill();
            }
            obj.currentInfoAnimation = TweenLite.to(setInfo, 0.2, {x:"+=250", y:"+=200", scale:"-=1"});
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