module.exports = function (ftControllerFartletObj) {
    // Draggable.create("#ft-audio-player-custom-btn-time-id", {type: "rotation", trigger: "#ft-audio-player-custom-btn-time-centre-id"});
    // TweenLite.set("#svgRectangle",{svgOrigin:"150 150"});
    // Draggable.create("#svgRectangle", {type: "rotation"});
    
    var ftControllerFartletObj = ftControllerFartletObj;
    
    var fartletTime = 30,
        currentRotation = 0,
        stepLimit = 4,
        stepCount = 0,
        minimumSeconds = 3,
        currentSets = 10;
        buttonPlay = document.getElementById('ft-audio-svg-btn-play-hit'),
        timeText = document.getElementById('ft-audio-svg-btn-play-text'),
        setsText = document.getElementById('ft-audio-svg-btn-sets-info-text'),
        setsPlus = document.getElementById('ft-audio-svg-btn-sets-plus'),
        setsMinus = document.getElementById('ft-audio-svg-btn-sets-minus');
    
    var initButtons = function () {
        
        TweenLite.set("#ft-audio-svg-btn-time-inner",{svgOrigin:"30 372"});
        
        Draggable.create("#ft-audio-svg-btn-time-inner", {
            type:"rotation",
            throwProps:true,
            onDrag: updateTime,
            onThrowUpdate:updateTime
        });
        
        buttonPlay.addEventListener('click', function (e) {
            ftControllerFartletObj.togglePlay();
        });
        
        setsPlus.addEventListener('click', function (e) {
            if (currentSets < 99) {
                currentSets++;
                updateSetsInfo();
            }
        });
        
        setsMinus.addEventListener('click', function (e) {
            if (currentSets > 1) {
                currentSets--;
                updateSetsInfo();
            }
        });
        
        function updateSetsInfo () {
            setsText.textContent = currentSets.toString();
        }
    }
    
    var  updateTime = function (e) {
        
        // Not working yet if get to minimum and keep passing it. Need to reverse for a while before
        // counting back up again. Need to log out other numbers.
        
        var rotation = Math.round(this.target._gsTransform.rotation % 360);
        
        if (rotation === currentRotation) {
            // do nothing
        }
        else if (rotation > currentRotation) {
            stepCount++;
        }
        else {
            stepCount--;
        }
        
        if (stepCount > stepLimit && fartletTime < 999) {
            fartletTime++;
            stepCount = 0;
        }
        else if(stepCount < -stepLimit && fartletTime > (minimumSeconds)){ 
            fartletTime--;
            stepCount = 0;
        }
        else if(stepCount > stepLimit || stepCount < -stepLimit ){
            stepCount = 0;
        }
        
        currentRotation = rotation;
        
        timeText.textContent = fartletTime.toString();

    }
    
    initButtons();
    
}