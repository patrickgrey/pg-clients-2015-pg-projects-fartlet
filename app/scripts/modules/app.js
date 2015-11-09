var infoButton = require('./infoButton.js'),
    activateAccessibleControls = require('./activateAccessibleControls.js'),
    // gsap = require('gsap'),
    // TweenLite = require('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TimelineLite.min.js'),
    // Draggable = require('../../../node_modules/gsap/src/uncompressed/utils/Draggable.js'),
    // CSSPlugin = require('../../../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js'),
    // CSSPlugin = require('./../bower_components/gsap/src/uncompressed/plugins/CSSPlugin.js'),
    // Draggable = require('./../bower_components/gsap/src/uncompressed/utils/Draggable.js'),
    _ = require('underscore');
    
    
    // TweenLite.to("#ft-audio-player-custom-btn-time-id", 1, {x:100, y:100, scale:0.5, rotation:180, skewX:45});
    Draggable.create("#ft-audio-player-custom-btn-time-id", {type: "rotation", throwProps: true});


var infoButtonElement = infoButton('ft-wrapper-id', 'ft-content-id', 'ft-information-id');
activateAccessibleControls('ft-skip-to-player', 'ft-return-to-svg', 'ft-audio-player-custom', 'ft-audio-player-custom-accessible');
