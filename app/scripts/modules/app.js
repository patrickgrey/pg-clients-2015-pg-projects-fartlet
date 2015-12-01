/*var infoButton = require('./ftInfoButton.js'),
    activateAccessibleControls = require('./ftActivateAccessibleControls.js'),*/
var  ftControllerFartlet = require('./ftControllerFartlet.js');
var  ftButtons = require('./ftButtons.js');
var  _ = require('underscore');
    
var ftSVGPosition = require('./ftSVGPosition.js');
    
var ftSVGPositionObj = ftSVGPosition(_);
var ftControllerFartletObj = ftControllerFartlet(ftSVGPositionObj);

ftButtons(ftControllerFartletObj);

var ftSVGPositionData = 
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
    
ftSVGPositionObj.init(ftSVGPositionData);
// infoButton('ft-wrapper-id', 'ft-content-id', 'ft-information-id');
// activateAccessibleControls('ft-skip-to-player',  'ft-audio-player-custom', 'ft-audio-player-custom-accessible');


// Position SVG
// First get vw and vh
// Add resize with debounce
// Check orientation
// Position and size using GSAP...
// Use Object to hold ID's and settings