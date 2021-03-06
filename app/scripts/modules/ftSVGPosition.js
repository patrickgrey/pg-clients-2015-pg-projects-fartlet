module.exports = function (_) {
    
    /**
     * 
     * 
     * VARIABLES
     * 
     * 
     */
    
    // Object returned by module
    var module = {};
    var elementsOrigin = {};
    var playPositions;
    // let controller know screen has been resized
    var controllerResizeEvent = new Event('controllerResize');
    // Static variables
    module.PORTRAIT = 'PORTRAIT';
    module.LANDSCAPE = 'LANDSCAPE';
    module.TOP = 'TOP';
    module.RIGHT = 'RIGHT';
    module.BOTTOM = 'BOTTOM';
    module.LEFT = 'LEFT';
    
    
    // list of buttons and an object holding screen data that is used across several functions.
    var buttons = [ 'ft-audio-svg-btn-help', 'ft-audio-svg-btn-play', 
                    'ft-audio-svg-btn-time', 
                    'ft-audio-svg-btn-sets-plus', 'ft-audio-svg-btn-sets-minus', 'ft-audio-svg-btn-sets-info',
                    'ft-audio-svg-btn-reset', 
                    // , 'ft-audio-svg-btn-time-radius'
                    ],
        screenData = {
            orientation: module.PORTRAIT,
            screenVW: 100,
            screenVH: 100
        },
        originalElementAttributes = {}; //x,y,width,height
    
    
    
    /**
     * 
     * 
     * METHODS
     * 
     * 
     */
    
    /**
     * New approach
     * 
     * - On first init, get all ID elements in SVG and put into a dictionary object
     * - then run through and set a neutral tween on each so that they have the _gsTransform attached - this is tested and required
     * - now we need the reset and the current positions?
     */
    
    /**
     * Start positioning elements once page has loaded.
     */
    module.init = function (ftSVGPositionData) {
        
        var ftSVGPositionData = ftSVGPositionData || {};
        
        initElements();
        resizeHandler();
        
        window.addEventListener("resize", resizeHandler, false);
    };
    
    
    /**
     * Set the SVG origin of elements so they position and scale consistently
     */
    var initElements = function () {
        
        // elementsOrigin = {};
        // var elementList = document.getElementById('ft-audio-svg').querySelectorAll('[id]');
        // for (var i = 0; i < elementList.length; i++) {
        //     // console.log(elementList[i].getAttribute('id'));
        //     var currentElement = elementList[i];
        //     // ensure each element has the _gsTransform object.
        //     TweenLite.set(currentElement, {x: 1});
            
        //     elementsOrigin[currentElement.getAttribute('id')] = currentElement;
        //     console.log(currentElement.getAttribute('id'));
        //     console.log(elementsOrigin[currentElement.getAttribute('id')]._gsTransform.y);
        //     // if (elementsOrigin[currentElement.getAttribute('id')]._gsTransform) {
        //     // } else {
        //     //     console.log('no transform applied');
        //     // }
        //     console.log('*************************');
        // };
        // // console.log(elementList[0]._gsTransform.x);
        // console.log(elementsOrigin['ft-audio-svg-btn-play']._gsTransform.y - 100);
        
        TweenLite.set("#ft-audio-svg-title-background", {svgOrigin:"0 0", x:0, y:0});
        TweenLite.set("#ft-audio-svg-title", {svgOrigin:"0 0", x:0, y:3});
        TweenLite.set('#ft-audio-svg-btn-time', {rotation: 100, transformOrigin:"50% 50%" });
        
        for (var i = 0; i < buttons.length; i++) {
            TweenLite.set('#'+buttons[i], {svgOrigin:"0 0"});
            originalElementAttributes[buttons[i]] = module.getDims(buttons[i]);
        }
    };
    
    
    /**
     * Handle screen resizes with a debounce delay
     * @param  {event} e) {                   module.getScreenSize();        resizeElements();        repositionElements();    } 
     * @param  {integer} 50 milliseconds to delay function
     */
    var resizeHandler = _.debounce(function (e) {
        
        
        
        module.getScreenSize();
        resizeElements();
        repositionElements();
        
        window.dispatchEvent(controllerResizeEvent);
        
    }, 5);
    
    
    
    //  POSITIONING
    
    /**
     * Reposition SVG Elements
     * THIS IS WHERE MEDIA QUERY STYLE CHOOSING WOULD WORK...
     */
    var repositionElements = function () {
        
        var resetObj = module.getButtonResets();
        
        var titleBGDims = module.getDims('ft-audio-svg-title-background');
        
        var helpDims = module.getDims('ft-audio-svg-btn-help');
        var helpReset = resetObj['ft-audio-svg-btn-help'];
        setPosition('ft-audio-svg-btn-help', {x:helpReset.x + (screenData.screenVW * 100) - helpDims.width - 20, y:helpReset.y + titleBGDims.height - (helpDims.height / 2) });
        
        var playDims = module.getDims('ft-audio-svg-btn-play');
        var playReset = resetObj['ft-audio-svg-btn-play'];
        playPositions = {x:playReset.x + (screenData.screenVW * 100) - (helpDims.width * 4), y:playReset.y + (screenData.screenVH * 100) - playDims.height - 50 };
        
        setPosition('ft-audio-svg-btn-play', playPositions);
        setPosition('ft-audio-svg-btn-time', playPositions);
        
        // var resetDims = module.getDims('ft-audio-svg-btn-reset');
        // var resetReset = resetObj['ft-audio-svg-btn-reset'];
        setPosition('ft-audio-svg-btn-reset', playPositions);
        
        setPosition('ft-audio-svg-btn-sets-plus', playPositions);
        setPosition('ft-audio-svg-btn-sets-minus', playPositions);
        setPosition('ft-audio-svg-btn-sets-info', playPositions);
        // setPosition('ft-audio-svg-btn-time-radius', resetObj, playPositions);
        
    };
    
    module.getButtonResets = function () {
        return getResetPositions(buttons);
    };
    
    var setPosition = function(id, positions) {
        TweenLite.set('#'+id, positions);
    };
    
    
    // get original height
    // get current height
    // var currentHeight = getDims(id).height;
    // create scale factor from this
    // Get original y
    // Multiply by scale factor
    // subtract scaled y.
    var getResetPositions = function(itemsArray) {
        
        var resetObject = {},
            elementDims,
            elementOrig,
            scaleWidthFactor,
            scaleHeightFactor,
            currentX,
            currentY;
        
        for (var i = 0; i < itemsArray.length; i++) {
            // console.log(itemsArray[i]);
            elementDims = module.getDims(itemsArray[i]);
            elementOrig = originalElementAttributes[itemsArray[i]];
            scaleWidthFactor = elementDims.width / elementOrig.width;
            scaleHeightFactor = elementDims.height / elementOrig.height;
            currentX = elementOrig.left * scaleWidthFactor;
            currentY = elementOrig.top * scaleHeightFactor;
            resetObject[itemsArray[i]] = {x: -currentX, y: -currentY};
        };
        
        return resetObject;
        
    };
    
    module.getCurrentPosition = function () {
        var currentPositions = {};
        var elementList = document.getElementById('ft-audio-svg').querySelectorAll('[id]');
        return elementList;
    }
    
    // SCALING
    
    /**
     * Set up resizing of all elements.
     * THIS IS WHERE MEDIA QUERY STYLE CHOOSING WOULD WORK...
     */
    var resizeElements = function () {
        
        var bgSettings = resizeElement({
            elementID: 'ft-audio-svg-title-background',
            width: (screenData.screenVW * 100),
            height: (screenData.screenVW * 15),
            minHeight: 30,
            maxHeight: 60
        });
        
        resizeElement({
            elementID: 'ft-audio-svg-title',
            scale: (bgSettings.height / 60)
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
    
    /*
    http://codepen.io/blackridge/pen/jEVMjz
    
     function normalizeSVGOrigin(element, offset) {
    var bounds = element.getBBox();
    if (typeof offset !== "objectect") {
        offset = {x:0, y:0};
    }
    return (offset.x - bounds.x) + "px " + (offset.y - bounds.y) + "px";
  return bounds
}*/
    
    
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
        
        // Set variable defaults
        config.width = config.width || -1;
        config.maxWidth = config.maxWidth || 99999999;
        config.minWidth = config.minWidth || 0;
        config.height = config.height || -1;
        config.maxHeight = config.maxHeight || 99999999;
        config.minHeight = config.minHeight || 0;
        config.scale = config.scale || 1;
        config.minScale = config.minScale || config.scale;
        config.maxScale = config.maxScale || config.scale;
        
        // Check that width & height is within min and max!
        config.width = _.min( [config.maxWidth, _.max([config.width, config.minWidth]) ]);
        config.height = _.min( [config.maxHeight, _.max([config.height, config.minHeight]) ]);
        config.scale = _.min( [config.maxScale, _.max([config.scale, config.minScale]) ]);
        
        // Set size of element
        TweenLite.set('#'+config.elementID, {scale: config.scale, attr:{width:config.width, height:config.height}});
        
        // Return new size in case can be used on other elements.
        return config;
    };
    
    
    
    /**
     * 
     * 
     * UTILITIES
     * 
     * 
     */
    
    /**
     * Return the Client Bounding box
     * @param  {string} id id of element to find
     * @return {object}    object containing metrics
     */
    module.getDims = function(id) {
        return document.getElementById(id).getBoundingClientRect();
    };
    
    /**
     * Update the screen data in module scope object on resize.
     */
    module.getScreenSize = function() {
        screenData.screenVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 100;
        screenData.screenVH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 100;
        return screenData;
    };
    
    module.getPlayPositions = function() {
        return playPositions.css;
    }; 
    
    
    return module;
}