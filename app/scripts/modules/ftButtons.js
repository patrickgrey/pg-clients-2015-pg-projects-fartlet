module.exports = function () {
    // Draggable.create("#ft-audio-player-custom-btn-time-id", {type: "rotation", trigger: "#ft-audio-player-custom-btn-time-centre-id"});
    // TweenLite.set("#svgRectangle",{svgOrigin:"150 150"});
    // Draggable.create("#svgRectangle", {type: "rotation"});
    
    TweenLite.set("#ft-audio-player-custom-btn-time-id",{svgOrigin:"175 175"});
 
    var R = Draggable.create("#ft-audio-player-custom-btn-time-id", {
        type:"rotation",
        throwProps:true,
        onDrag: test,
        onThrowUpdate:test
    });
    
    var fartletTime = 30,
        currentRotation = 0,
        stepLimit = 10,
        stepCount = 0,
        minimumSeconds = 3;
    
    function test(e) {
        
        // Not working yet if get to minimum and keep passing it. Need to reverse for a while before
        // counting back up again. Need to log out other numbers.
        
        var rotation = Math.round(this.target._gsTransform.rotation % 360);
        
        if (rotation > currentRotation) {
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
        // else {
            
        // }
        
        currentRotation = rotation;
        console.log(fartletTime);
        // first check direction / negative or positive
        // Will need to buffer numbers somewhat.
        
        // if (rotation < -180) { 
        //     rotation += 360;
        // }
        
        // updateBounds(this.target);
        
        // if (rotation < 12 && rotation > -12 && !animation.isActive()) {
        //   animation.restart();
        // }
    }
    
    //trigger:"#topBar"
}