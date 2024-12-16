"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day15Execution = /** @class */ (function () {
    function Day15Execution() {
        this.map = [];
        this.inputFilePath = "example-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map(function (line) { return line.replace("\r", ""); });
        // console.log(this.inputString);
        // Parse the map until we find an empty line
        var mapFinished = false;
        for (var _i = 0, _a = this.inputString; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element === '') {
                mapFinished = true;
                continue;
            }
            if (!mapFinished) {
                this.map.push(element.split(''));
            }
            else {
                // We've reached the movement instructions
                break;
            }
        }
    }
    // find shortest path in map, obstacles (#) cannote be passed 
    // reindeer can move in 4 directions, starting at S (startingPoint) and should End at Tile E (endingPoint)
    // every vistied tile should be marked with "<, >, ^, v" depending on the direction of the reindeer
    Day15Execution.prototype.findShortestPath = function () {
        var start = this.findStartingPoint();
        var end = this.findEndingPoint();
        // Priority queue will store states ordered by cost
        var queue = [];
        // Track visited states (position + direction)
        var visited = new Set();
        // Start facing east
        queue.push({ pos: start, dir: '>', cost: 0 });
        while (queue.length > 0) {
            // Get state with lowest cost
            queue.sort(function (a, b) { return a.cost - b.cost; });
            var current = queue.shift(); // get and remove first element
            var stateKey = "".concat(current.pos[0], ",").concat(current.pos[1], ",").concat(current.dir); // unique key for state (position + direction)
            if (visited.has(stateKey))
                continue;
            visited.add(stateKey);
            // Mark path on map
            if (this.map[current.pos[0]][current.pos[1]] !== 'S' &&
                this.map[current.pos[0]][current.pos[1]] !== 'E') {
                this.map[current.pos[0]][current.pos[1]] = current.dir;
            }
            // Check if we reached the end
            if (current.pos[0] === end[0] && current.pos[1] === end[1]) {
                return current.cost;
            }
            // Try moving forward
            var forward = this.getNextPosition(current.pos, current.dir);
            if (forward && this.map[forward[0]][forward[1]] !== '#') {
                queue.push({
                    pos: forward,
                    dir: current.dir,
                    cost: current.cost + 1
                });
            }
            // Try rotating left and right
            var rotations = this.getRotations(current.dir);
            for (var _i = 0, rotations_1 = rotations; _i < rotations_1.length; _i++) {
                var newDir = rotations_1[_i];
                var newPos = this.getNextPosition(current.pos, newDir);
                if (newPos && this.map[newPos[0]][newPos[1]] !== '#') {
                    queue.push({
                        pos: newPos,
                        dir: newDir,
                        cost: current.cost + 1001 // 1000 for rotation + 1 for movement
                    });
                }
            }
        }
        return Infinity; // No path found
    };
    Day15Execution.prototype.getNextPosition = function (pos, dir) {
        var row = pos[0], col = pos[1];
        switch (dir) {
            case '^': return row > 0 ? [row - 1, col] : null;
            case 'v': return row < this.map.length - 1 ? [row + 1, col] : null;
            case '<': return col > 0 ? [row, col - 1] : null;
            case '>': return col < this.map[0].length - 1 ? [row, col + 1] : null;
            default: return null;
        }
    };
    Day15Execution.prototype.getRotations = function (dir) {
        switch (dir) {
            case '^': return ['<', '>'];
            case 'v': return ['<', '>'];
            case '<': return ['^', 'v'];
            case '>': return ['^', 'v'];
            default: return [];
        }
    };
    Day15Execution.prototype.findStartingPoint = function () {
        var startingPoint = [];
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 'S') {
                    startingPoint = [i, j];
                    break;
                }
            }
        }
        return startingPoint;
    };
    Day15Execution.prototype.findEndingPoint = function () {
        var endingPoint = [];
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 'E') {
                    endingPoint = [i, j];
                    break;
                }
            }
        }
        return endingPoint;
    };
    // print current state of map 
    Day15Execution.prototype.printMap = function () {
        for (var i = 0; i < this.map.length; i++) {
            console.log(this.map[i].join(''));
        }
    };
    return Day15Execution;
}());
function main15() {
    var execution = new Day15Execution();
    var resultCosts = execution.findShortestPath();
    console.log(resultCosts);
    execution.printMap();
}
main15();
