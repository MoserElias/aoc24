"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day18Execution = /** @class */ (function () {
    function Day18Execution() {
        var _this = this;
        this.visualMemorySpace = [];
        this.byteSize = 70;
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data
            .split("\n")
            .map(function (line) { return line.replace("\r", ""); })
            .filter(function (line) { return line.length > 0; }); // Filter out empty lines
        console.log(this.inputString);
        this.visualMemorySpace = Array.from({ length: this.byteSize + 1 }, function () { return Array.from({ length: _this.byteSize + 1 }, function () { return "."; }); });
        // console.log(this.visualMemorySpace);    
    }
    // save bytes are marked with . and unsafe bytes are marked with #
    Day18Execution.prototype.markCorruptedByesInMemorySpace = function () {
        var unsafeBytePos = this.inputString;
        for (var _i = 0, unsafeBytePos_1 = unsafeBytePos; _i < unsafeBytePos_1.length; _i++) {
            var pos = unsafeBytePos_1[_i];
            var _a = pos.split(","), xStr = _a[0], yStr = _a[1];
            var x = parseInt(xStr);
            var y = parseInt(yStr);
            if (!isNaN(x) && !isNaN(y)) { // Check if x and y are valid numbers
                this.visualMemorySpace[y][x] = "#";
            }
        }
        // printing the visual memory space 
        for (var _b = 0, _c = this.visualMemorySpace; _b < _c.length; _b++) {
            var row = _c[_b];
            console.log(row.join(''));
        }
        return this.visualMemorySpace;
    };
    // searches the shortest path to the exit, which is (byteSize, byteSize)   
    // allowed moves are up, down, left, right 
    // obstacles are marked with #, cannot cannot be passed 
    Day18Execution.prototype.searchShortesPathToExit = function () {
        var _this = this;
        var queue = [];
        var visited = Array.from({ length: this.byteSize + 1 }, function () { return Array(_this.byteSize + 1).fill(false); });
        // Check if starting or exit positions are blocked
        if (this.visualMemorySpace[0][0] === '#' || this.visualMemorySpace[this.byteSize][this.byteSize] === '#') {
            return -1;
        }
        // Starting position
        queue.push({ x: 0, y: 0, steps: 0 });
        visited[0][0] = true;
        var directions = [
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 }, // Down
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 } // Right
        ];
        while (queue.length > 0) {
            var _a = queue.shift(), x = _a.x, y = _a.y, steps = _a.steps;
            // Check if we've reached the exit
            if (x === this.byteSize && y === this.byteSize) {
                return steps;
            }
            for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                var _b = directions_1[_i], dx = _b.dx, dy = _b.dy;
                var newX = x + dx;
                var newY = y + dy;
                // Check boundaries
                if (newX >= 0 && newX <= this.byteSize && newY >= 0 && newY <= this.byteSize) {
                    // Check if the cell is not visited and not an obstacle
                    if (!visited[newY][newX] && this.visualMemorySpace[newY][newX] !== '#') {
                        visited[newY][newX] = true;
                        queue.push({ x: newX, y: newY, steps: steps + 1 });
                    }
                }
            }
        }
        // If no path is found
        return -1;
    };
    return Day18Execution;
}());
function main18() {
    var execution = new Day18Execution();
    execution.markCorruptedByesInMemorySpace();
    var result = execution.searchShortesPathToExit();
    console.log(result);
}
main18();
