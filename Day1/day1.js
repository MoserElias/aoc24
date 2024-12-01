var fs = require('fs');
var inputFilePath = "real-input.txt";
var data = fs.readFileSync(inputFilePath, 'utf8');
var lines = data.trim().split('\n');
var Day1Execution = /** @class */ (function () {
    function Day1Execution() {
    }
    Day1Execution.prototype.parseLines = function (inputLines) {
        var leftSide = [];
        var rightSide = [];
        inputLines.forEach(function (line) {
            var _a = line.split(/\s+/).map(Number), left = _a[0], right = _a[1];
            leftSide.push(left);
            rightSide.push(right);
        });
        console.log(leftSide);
        console.log(rightSide);
        return { leftSide: leftSide, rightSide: rightSide };
    };
    // sort arrays and build pairs
    Day1Execution.prototype.sortLeftRight = function (leftSide, rightSide) {
        leftSide.sort(function (a, b) { return a - b; });
        rightSide.sort(function (a, b) { return a - b; });
        return { leftSide: leftSide, rightSide: rightSide };
    };
    // calculate the distance between each pair 
    Day1Execution.prototype.calculateDistance = function (leftSide, rightSide) {
        var distance = 0;
        for (var i = 0; i < leftSide.length; i++) {
            distance += Math.abs(leftSide[i] - rightSide[i]);
        }
        return distance;
    };
    return Day1Execution;
}());
function main() {
    var execution = new Day1Execution();
    var _a = execution.parseLines(lines), leftSide = _a.leftSide, rightSide = _a.rightSide;
    var sorted = execution.sortLeftRight(leftSide, rightSide);
    console.log(sorted);
    var distance = execution.calculateDistance(sorted.leftSide, sorted.rightSide);
    console.log('the calculated distance is: ', distance);
}
main();
