module.exports = function (_math, _function) {
    
    var obj = {},
        orientation = 'portrait';
    
    obj.TOP = 'TOP';
    obj.RIGHT = 'RIGHT';
    obj.BOTTOM = 'BOTTOM';
    obj.LEFT = 'LEFT';
    
    var resizeHandler = _function.debounce(function (e) {
        scaleElements();
    }, 50);
    
    var initElements = function () {
        TweenLite.set("#ft-audio-svg-title-background", {svgOrigin:"0 0", x:0, y:0});
        // http://stackoverflow.com/questions/6966036/how-can-i-scale-svg-graphics-group-to-desired-sizenot-by-factor
        // http://jsfiddle.net/luken/4xx9edo2/
        TweenLite.set("#ft-audio-svg-title", {svgOrigin:"0 0", x:0, y:8});
        // TweenLite.set("#ft-audio-svg-title", {svgOrigin:"0 0", scale:0.5, x:0, y:5});
    }
    
    var scaleElements = function () {
        
        var screenVW = window.screen.width / 100;
        var screenVH = window.screen.height / 100;
        
        // Calc orientation
        
        // Have two different data sets depending on orientation.
        scaleElement({
            elementID: '#ft-audio-svg-title-background',
            width: (screenVW * 100),
            height: (screenVW * 15),
            minHeight: 30,
            maxHeight: 60
        }); 
        // #ft-audio-svg-title-background
        // var tempHeight = screenVW * 15;
        // if (tempHeight < 30) {tempHeight = 30};
        // if (tempHeight > 60) {tempHeight = 60};
        // TweenLite.set("#ft-audio-svg-title-background", {width:(screenVW * 100), height:tempHeight});
        // TweenLite.set("#ft-audio-svg-title", {scale:tempHeight/80});
        // elementID, scaleValue, minW, maxW, minH, maxH
        // 
        // #ft-audio-svg-title
        // Has a max min height same as background - test that from bounding box or height attribute
        // Otherwise, should just scale relative to width (if portrait)
    }
    
    var scaleElement = function(config) {
        
        // This would have to be calculated depending on orientation?
        config.maxHeight = config.maxHeight || 99999999;
        config.minHeight = config.minHeight || 0;
        // Check that height is within min and max!
        // WHAT IF NO MinMaxHEIGHT???
        config.height = _math.min( [config.maxHeight, _math.max([config.height, config.minHeight]) ]);
        
        // if (config.minHeight && config.height < config.minHeight) {config.height = config.minHeight};
        // if (config.maxHeight && config.height > config.maxHeight) {config.height = config.maxHeight};
        
        TweenLite.set(config.elementID, {scale: config.scale, width:config.width, height:config.height});
        return config;
    };
    
    obj.init = function (ftSVGPositionData) {
        
        var ftSVGPositionData = ftSVGPositionData || {};
        initElements();
        scaleElements();
        
        window.addEventListener("resize", resizeHandler, false);
        
        
        
    };
    
    return obj;
}