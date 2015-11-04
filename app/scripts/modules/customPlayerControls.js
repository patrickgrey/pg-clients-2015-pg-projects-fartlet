module.exports = function (resetClass, reduceClass, increaseClass) {
    var resetButton = document.getElementById(resetClass);
    var reduceButton = document.getElementById(reduceClass);
    var increaseButton = document.getElementById(increaseClass);
    // console.log(resetClass);
    resetButton.innerHTML = "";
    reduceButton.innerHTML = "";
    increaseButton.innerHTML = "";
}