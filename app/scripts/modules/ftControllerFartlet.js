module.exports = function (ftSVGPosition, _) {
    
    var obj = {};
    var ftSVGPosition = ftSVGPosition;
    var _ = _;
    var elementsObject = {};
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
    var isPlaying = false;
    
    var timeButtonIconPlayOrigX = timeButtonIconPlay.x;
    
    obj.currentInfoAnimation;
    
    // obj.tl = new TimelineLite();
    
    // obj.tl.to('#ft-audio-svg-btn-sets-plus', 1, {scale:"-=0"});
            // .to(setButtonMinus, 1, {scale:"-=0"})
            // .to(resetButton, 1, {scale:"-=0"})
            // .to(timeButton, 1, {scale:"-=0"});
    
    // obj.doPlay = function () {
    //     obj.t1.play(0);
    // }
    
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
        // 
        // This function is being called from another scope!!
        // This is the current object!
        // 
        // Just go with seperate Tweens?
        var timeDims = ftSVGPosition.getDims('ft-audio-svg-btn-sets-info');
        // 
        var tmline = new TimelineLite();
            tmline.fromTo([resetButton,setButtonMinus,setButtonPlus,timeButton], 0.1, {autoAlpha: 1}, {autoAlpha: 0});
            tmline.fromTo(playCircle, 0.1, {fill: '#8BC34A'}, {fill: '#ff0'});
            tmline.fromTo(timeButtonIconPlay, 0.2, {y: elementsObject['ft-audio-svg-btn-play']._gsTransform.y-100}, {y: elementsObject['ft-audio-svg-btn-play']._gsTransform.y-100 + 20});
            // console.log(ftSVGPosition);
            
            
        
        if (!isPlaying) {
            isPlaying = true;
            // timeButtonIconPause.style.display = 'block';
            // timeButtonIconPlay.style.display = 'none';
            // timeButton.style.display = 'none';
            // setButtonPlus.style.display = 'none';
            // setButtonMinus.style.display = 'none';
            // resetButton.style.display = 'none';
            // playCircle.style.fill = '#ff0';
            
            
            TweenLite.killTweensOf("#ft-audio-svg-btn-time-inner");
            if(obj.currentInfoAnimation) {
                obj.currentInfoAnimation.progress(1).kill();
            }
            obj.currentInfoAnimation = TweenLite.to(setInfo, 0.8, {x:"-=350", y:"-=280", scale:"+=1.3", ease: Elastic.easeOut, delay: tmline.duration()});
            
            // TweenLite.to(timeButton, 0.1, {autoAlpha: 0});
            
            
            
            tmline.play(0);
            // console.log(obj.tl.duration());
            // this.play(0);
            /*var tl = new TimelineLite();
            tl.to('#ft-audio-svg-btn-sets-plus', 1, {scale:"-=1"});
            tl.play();*/
            
            
        }
        else {
            isPlaying = false;
            // timeButtonIconPlay.style.display = 'block';
            // timeButtonIconPause.style.display = 'none';
            // timeButton.style.display = 'block';
            // setButtonPlus.style.display = 'block';
            // setButtonMinus.style.display = 'block';
            // resetButton.style.display = 'block';
            // playCircle.style.fill = '#8BC34A';
            // get current position of element from position class
            // TweenLite.to(timeButton, 0.1, {autoAlpha: 1});
            tmline.reverse(0);
            // console.log(ftSVGPosition);
            if(obj.currentInfoAnimation) {
                obj.currentInfoAnimation.progress(1).kill();
            }
            obj.currentInfoAnimation = TweenLite.to(setInfo, 0.8, {x:"+=350", y:"+=280", scale:"-=1.3", ease: Elastic.easeOut});
        }
    }
    
    /**
     * Get the current position of all objects once they have been set by ftSVGPosition     
     * @param  {[type]} e) {                           console.log(ftSVGPosition.getCurrentPosition());            } [description]
     * @param  {[type]} 5  [description]
     * @return {[type]}    [description]
     */
    var resizeHandler = function (e) {
        // Getting there, need to subract orignal value!
        elementsObject = {};
        var elementList = document.getElementById('ft-audio-svg').querySelectorAll('[id]');
        for (var i = 0; i < elementList.length; i++) {
            // console.log(elementList[i].getAttribute('id'));
            elementsObject[elementList[i].getAttribute('id')] = elementList[i];
        };
        // console.log(elementList[0]._gsTransform.x);
        console.log(elementsObject['ft-audio-svg-btn-play']._gsTransform.y - 100);
        
    };
    
    window.addEventListener("controllerResize", resizeHandler, false);
    // All elements need to be in one SVG to avoid overlaps etc.
    // Can still be styled just as before but target groups instead of SVG's.
    // Problem was that can't use units like VH! Surely can use percentages?
    // Also need to make container full height!
    // Also, set buttons outline too thick!!
    // Make whole interface, including title and help SVG!!!
    
    return obj;
}