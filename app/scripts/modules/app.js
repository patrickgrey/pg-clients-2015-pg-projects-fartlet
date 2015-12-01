/*var infoButton = require('./ftInfoButton.js'),
    activateAccessibleControls = require('./ftActivateAccessibleControls.js'),
    ftControllerFartlet = require('./ftControllerFartlet.js'),
    ftButtons = require('./ftButtons.js'),
    ftSVGPosition = require('./ftSVGPosition.js'),*/
var  ftControllerFartlet = require('./ftControllerFartlet.js');
var  ftButtons = require('./ftButtons.js');
var  _ = require('underscore');
// var  _math = require('lodash/Math');
// var  _function = require('lodash/Function');
    
var ftSVGPosition = require('./ftSVGPosition.js');
    
var ftControllerFartletObj = ftControllerFartlet();
var ftSVGPositionObj = ftSVGPosition(_),
    ftSVGPositionData = 
    [
      {   
        'id':          'ft-audio-svg-title-background',
        'positioning':  {
                          'anchorX': ftSVGPositionObj.LEFT,
                          'anchorY': 'BOTTOM',
                          'x': '10vw',
                          'y': '10vh',
                          'width': '15vw',
                          'height': '15vw',
                          'max-width': '100%',
                          'max-height': '65px'
                        }
      }
    ];
    
// infoButton('ft-wrapper-id', 'ft-content-id', 'ft-information-id');
// activateAccessibleControls('ft-skip-to-player',  'ft-audio-player-custom', 'ft-audio-player-custom-accessible');
ftButtons(ftControllerFartletObj);
ftSVGPositionObj.init(ftSVGPositionData);


// Position SVG
// First get vw and vh
// Add resize with debounce
// Check orientation
// Position and size using GSAP...
// Use Object to hold ID's and settings