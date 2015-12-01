module.exports = function (_) {
    // Object returned by module
    var obj = {};
    // Static variables
    obj.PORTRAIT = 'PORTRAIT';
    obj.LANDSCAPE = 'LANDSCAPE';
    obj.TOP = 'TOP';
    obj.RIGHT = 'RIGHT';
    obj.BOTTOM = 'BOTTOM';
    obj.LEFT = 'LEFT';
    
    
    // list of buttons and an object holding screen data that is used across several functions.
    var buttons = [ 'ft-audio-svg-btn-help', 'ft-audio-svg-btn-play', 'ft-audio-svg-btn-time', 
                    'ft-audio-svg-btn-sets-plus', 'ft-audio-svg-btn-sets-minus', 'ft-audio-svg-btn-sets-info',
                    'ft-audio-svg-btn-reset', 
                    // , 'ft-audio-svg-btn-time-radius'
                    ],
        screenData = {
            orientation: obj.PORTRAIT,
            screenVW: 100,
            screenVH: 100
        },
        originalElementAttributes = {}; //x,y,width,height
    
    
    /**
     * Handle screen resizes with a debounce delay
     * @param  {event} e) {                   getScreenSizeAndOrientation();        resizeElements();        repositionElements();    } 
     * @param  {integer} 50 milliseconds to delay function
     */
    var resizeHandler = _.debounce(function (e) {
        getScreenSizeAndOrientation();
        resizeElements();
        repositionElements();
    }, 50);
    
    
    /**
     * Set the SVG origin of elements so they position and scale consistently
     */
    var initElements = function () {
        
        TweenLite.set("#ft-audio-svg-title-background", {svgOrigin:"0 0", x:0, y:0});
        TweenLite.set("#ft-audio-svg-title", {svgOrigin:"0 0", x:0, y:3});
        TweenLite.set('#ft-audio-svg-btn-time', {rotation: 100, transformOrigin:"50% 50%" });
        
        for (var i = 0; i < buttons.length; i++) {
            TweenLite.set('#'+buttons[i], {svgOrigin:"0 0"});
            originalElementAttributes[buttons[i]] = getDims(buttons[i]);
        }
    }
    
    
    /**
     * Update the screen data in module scope object on resize.
     */
    var getScreenSizeAndOrientation = function() {
        screenData.screenVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 100;
        screenData.screenVH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 100;
    };
    
    
    /**
     * Reposition SVG Elements
     */
    var repositionElements = function () {
        
        var resetObj = getResetPositions();
        
        var titleBGDims = getDims('ft-audio-svg-title-background');
        
        var helpDims = getDims('ft-audio-svg-btn-help');
        var helpReset = resetObj['ft-audio-svg-btn-help'];
        setPosition('ft-audio-svg-btn-help', resetObj, {x:helpReset.x + (screenData.screenVW * 100) - helpDims.width - 20, y:helpReset.y + titleBGDims.height - (helpDims.height / 2) });
        
        var playDims = getDims('ft-audio-svg-btn-play');
        var playReset = resetObj['ft-audio-svg-btn-play'];
        var playPositions = {x:playReset.x + (screenData.screenVW * 100) - (helpDims.width * 4), y:playReset.y + (screenData.screenVH * 100) - playDims.height - 50 };
        
        setPosition('ft-audio-svg-btn-play', resetObj, playPositions);
        setPosition('ft-audio-svg-btn-time', resetObj, playPositions);
        
        var resetDims = getDims('ft-audio-svg-btn-reset');
        var resetReset = resetObj['ft-audio-svg-btn-reset'];
        setPosition('ft-audio-svg-btn-reset', resetObj, playPositions);
        
        setPosition('ft-audio-svg-btn-sets-plus', resetObj, playPositions);
        setPosition('ft-audio-svg-btn-sets-minus', resetObj, playPositions);
        setPosition('ft-audio-svg-btn-sets-info', resetObj, playPositions);
        // setPosition('ft-audio-svg-btn-time-radius', resetObj, playPositions);
        
    };
    
    var setPosition = function(id, resetObj, positions) {
        var helpDims = getDims(id);
        var helpReset = resetObj[id];
        TweenLite.set('#'+id, positions);
    };
    
    var getResetPositions = function() {
        // get original height
        // get current height
        // var currentHeight = getDims(id).height;
        // create scale factor from this
        // Get original y
        // Multiply by scale factor
        // subtract scaled y.
        
        var resetObject = {},
            elementDims,
            elementOrig,
            scaleWidthFactor,
            scaleHeightFactor,
            currentX,
            currentY;
        
        for (var i = 0; i < buttons.length; i++) {
            elementDims = getDims(buttons[i]);
            elementOrig = originalElementAttributes[buttons[i]];
            scaleWidthFactor = elementDims.width / elementOrig.width;
            scaleHeightFactor = elementDims.height / elementOrig.height;
            currentX = elementOrig.left * scaleWidthFactor;
            currentY = elementOrig.top * scaleHeightFactor;
            resetObject[buttons[i]] = {x: -currentX, y: -currentY};
        };
        return resetObject;
        
    };
    
    
    
    var getDims = function(id) {
        return document.getElementById(id).getBoundingClientRect();
    };
    
    /*var getBox = function(id) {
        return document.getElementById(id).getBBox();
    };*/
    
    
    /**
     * Set up resizing of all elements
     */
    var resizeElements = function () {
        
        // Calc orientation
        
        // Have two different data sets depending on orientation.
        var bgSettings = resizeElement({
            elementID: 'ft-audio-svg-title-background',
            width: (screenData.screenVW * 100),
            height: (screenData.screenVW * 15),
            minHeight: 30,
            maxHeight: 60
        });
        
        resizeElement({
            elementID: 'ft-audio-svg-title',
            scale: (bgSettings.height / 70)
        });
        
        for (var i = 0; i < buttons.length; i++) {
            
            resizeElement({
                elementID: buttons[i],
                scale: (screenData.screenVW * 0.3),
                minScale: 0.5,
                maxScale: 1.3
            });
            
        };
        
    }
    
    
    /**
     * [resizeElement scale and resize an individual element.
     * Resizing is needed if the item doesn't scale proportionately.
     * Scaling is used if scales proportionately.]
     * 
     * @param  {[object]} config [Contains the scaling settings to be used agains the current screen dimensions.
     *                               Options:
     *                                   elementID: CSS ID selector - *required.
     *                                   width: width relative to screen.
     *                                   minWidth: minimum width - overrides width setting
     *                                   maxWidth: maximum width - overrides width setting
     *                                   height: height relative to screen..
     *                                   minHeight: minimum height - overrides height setting
     *                                   maxHeight: maximum height - overrides height setting
     *                                   scale: value between 0 & 1.
     *                                   minScale: minimum scale - overrides scale setting
     *                                   maxScale: maximum scale - overrides scale setting]
     *                                   
     * @return {[object]}        [Return the settings after they have been updated against the screen settings and checked against parameters such as min and max]
     */
    var resizeElement = function(config) {
        
        // This would have to be calculated depending on orientation?
        config.width = config.width || -1;
        config.maxWidth = config.maxWidth || 99999999;
        config.minWidth = config.minWidth || 0;
        config.height = config.height || -1;
        config.maxHeight = config.maxHeight || 99999999;
        config.minHeight = config.minHeight || 0;
        config.scale = config.scale || 1;
        config.minScale = config.minScale || config.scale;
        config.maxScale = config.maxScale || config.scale;
        
        /*console.log('id: '+config.elementID);
        console.log('width: '+config.width);
        console.log('height: '+config.height);
        console.log('scale: '+config.scale);*/
        
        // Check that width & height is within min and max!
        config.width = _.min( [config.maxWidth, _.max([config.width, config.minWidth]) ]);
        config.height = _.min( [config.maxHeight, _.max([config.height, config.minHeight]) ]);
        config.scale = _.min( [config.maxScale, _.max([config.scale, config.minScale]) ]);
        
        TweenLite.set('#'+config.elementID, {scale: config.scale, attr:{width:config.width, height:config.height}});
        
        return config;
    };
    
    /**
     * UTILITY FUNCTIONS
     */
    
    
    function makeAbsoluteContext(element, svgDocument) {
      return function(x,y) {
        var offset = svgDocument.getBoundingClientRect();
        var matrix = element.getScreenCTM();
        return {
          x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
          y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
        };
      };
    }
    
    
    // Start positioning elements once page has loaded.
    obj.init = function (ftSVGPositionData) {
        
        var ftSVGPositionData = ftSVGPositionData || {};
        getScreenSizeAndOrientation();
        initElements();
        resizeElements();
        repositionElements();
        
        window.addEventListener("resize", resizeHandler, false);
    };
    
    return obj;
}