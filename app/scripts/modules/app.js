var infoButton = require('./infoButton.js'),
    activateAccessibleControls = require('./activateAccessibleControls.js'),
    _ = require('underscore');


var infoButtonElement = infoButton('ft-wrapper-id', 'ft-content-id', 'ft-information-id');
activateAccessibleControls('ft-skip-to-player', 'ft-return-to-svg', 'ft-audio-player-custom', 'ft-audio-player-custom-accessible');
