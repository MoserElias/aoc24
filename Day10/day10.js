"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day10Execution = /** @class */ (function () {
    function Day10Execution() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n");
        // remove \r elements 
        this.inputString = this.inputString.map(function (line) { return line.replace("\r", ""); });
        // map array to trailMap 
        this.map = this.inputString.map(function (line) { return line.split("").map(function (char) { return parseInt(char); }); });
    }
    // Search trailheads (height 0)
    Day10Execution.prototype.searchTrailHeads = function () {
        var positions = new Set();
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 0) {
                    positions.add("".concat(i, ",").concat(j));
                }
            }
        }
        return positions;
    };
    // Compute the score for a single trailhead
    Day10Execution.prototype.computeTrailheadScore = function (i, j) {
        var queue = [];
        var visited = new Set();
        var trailEndsReached = new Set();
        queue.push({ x: i, y: j, height: this.map[i][j] }); // push starting pos to queue
        console.log("queue at start: " + queue);
        visited.add("".concat(i, ",").concat(j));
        while (queue.length > 0) {
            var _a = queue.shift(), x = _a.x, y = _a.y, height = _a.height; // remove first element from queue
            console.log("Processing position (".concat(x, ",").concat(y, ") with height ").concat(height));
            if (height == 9) { // found a trail end
                // Reached a trail end
                trailEndsReached.add("".concat(x, ",").concat(y));
                continue;
            }
            var directions = [
                { dx: -1, dy: 0 },
                { dx: 1, dy: 0 },
                { dx: 0, dy: -1 },
                { dx: 0, dy: 1 }
            ];
            for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                var dir = directions_1[_i];
                var newX = x + dir.dx;
                var newY = y + dir.dy;
                if (newX >= 0 && newX < this.map.length && newY >= 0 && newY < this.map[0].length) {
                    var newHeight = this.map[newX][newY];
                    if (newHeight == height + 1) {
                        var posKey = "".concat(newX, ",").concat(newY);
                        if (!visited.has(posKey)) { // check if position has been visited, if not add to visited and push to queue
                            visited.add(posKey);
                            queue.push({ x: newX, y: newY, height: newHeight }); // push to end of queue
                        }
                    }
                }
            }
        }
        // number of trail ends reached starting from current trailhead 
        return trailEndsReached.size;
    };
    return Day10Execution;
}());
function main10() {
    var execution = new Day10Execution();
    var posTrailHeads = execution.searchTrailHeads(); // search 0 in the map
    var totalScore = 0;
    posTrailHeads.forEach(function (position) {
        var _a = position.split(',').map(Number), i = _a[0], j = _a[1];
        var score = execution.computeTrailheadScore(i, j);
        console.log("Trailhead at (".concat(i, ",").concat(j, ") has score: ").concat(score));
        totalScore += score;
    });
    console.log("Total sum of trailhead scores: " + totalScore);
}
main10();
