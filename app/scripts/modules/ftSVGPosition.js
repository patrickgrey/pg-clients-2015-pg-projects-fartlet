module.exports = function (ftSVGPositionData) {
    
    var obj = {};
    obj.TOP = 'TOP';
    obj.RIGHT = 'RIGHT';
    obj.BOTTOM = 'BOTTOM';
    obj.LEFT = 'LEFT';
    
    obj.initData = function (ftSVGPositionData) {
        
        var ftSVGPositionData = ftSVGPositionData || {};
        console.log(ftSVGPositionData);
    };
    
    
    return obj;
}