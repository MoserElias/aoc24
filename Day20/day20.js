"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day20Execution = /** @class */ (function () {
    function Day20Execution() {
        this.mapRacetrack = [];
        this.startPosition = [];
        this.endPosition = [];
        this.distStart = [];
        this.distEnd = [];
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        // Parse input
        this.inputString = this.data
            .split("\n")
            .map(function (line) { return line.replace("\r", ""); });
        // Convert each line to a row of characters
        for (var _i = 0, _a = this.inputString; _i < _a.length; _i++) {
            var element = _a[_i];
            var line = element.trim();
            if (line.length > 0) {
                this.mapRacetrack.push(line.split(""));
            }
        }
        console.log(this.mapRacetrack);
        // Find start/end
        for (var i = 0; i < this.mapRacetrack.length; i++) {
            for (var j = 0; j < this.mapRacetrack[i].length; j++) {
                if (this.mapRacetrack[i][j] === "S") {
                    this.startPosition.push(i, j);
                }
                if (this.mapRacetrack[i][j] === "E") {
                    this.endPosition.push(i, j);
                }
            }
        }
        // Precompute distances from start and from end
        this.distStart = this.buildDistanceMap(this.startPosition[0], this.startPosition[1]);
        this.distEnd = this.buildDistanceMap(this.endPosition[0], this.endPosition[1]);
    }
    Day20Execution.prototype.buildDistanceMap = function (rowStart, colStart) {
        var rows = this.mapRacetrack.length;
        var cols = this.mapRacetrack[0].length;
        var distMap = Array.from({ length: rows }, function () { return Array(cols).fill(Infinity); });
        var queue = [[rowStart, colStart, 0]];
        distMap[rowStart][colStart] = 0;
        while (queue.length > 0) {
            var _a = queue.shift(), row = _a[0], col = _a[1], steps = _a[2];
            var directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                var _b = directions_1[_i], dx = _b[0], dy = _b[1];
                var newRow = row + dx;
                var newCol = col + dy;
                if (this.isValidMove(newRow, newCol) && distMap[newRow][newCol] > steps + 1) {
                    distMap[newRow][newCol] = steps + 1;
                    queue.push([newRow, newCol, steps + 1]);
                }
            }
        }
        return distMap;
    };
    Day20Execution.prototype.findCheatingPaths = function () {
        var savings = new Map();
        var normalTime = this.distStart[this.endPosition[0]][this.endPosition[1]];
        // Loop through every possible cheat start
        for (var startRow = 0; startRow < this.mapRacetrack.length; startRow++) {
            for (var startCol = 0; startCol < this.mapRacetrack[0].length; startCol++) {
                if (this.mapRacetrack[startRow][startCol] === "#")
                    continue;
                // Check every possible cheat end within 2 steps
                for (var endRow = startRow - 2; endRow <= startRow + 2; endRow++) {
                    for (var endCol = startCol - 2; endCol <= startCol + 2; endCol++) {
                        if (!this.isInBounds(endRow, endCol))
                            continue;
                        if (this.mapRacetrack[endRow][endCol] === "#")
                            continue;
                        var cheatDist = Math.abs(endRow - startRow) + Math.abs(endCol - startCol);
                        if (cheatDist > 2)
                            continue;
                        var timeToCheatStart = this.distStart[startRow][startCol];
                        var timeFromCheatEnd = this.distEnd[endRow][endCol];
                        // If the path from start → cheatStart or cheatEnd → end is unreachable, skip
                        if (timeToCheatStart === Infinity || timeFromCheatEnd === Infinity)
                            continue;
                        // Calculate time with cheat
                        var timeWithCheat = timeToCheatStart + cheatDist + timeFromCheatEnd;
                        if (timeWithCheat < normalTime) {
                            var saved = normalTime - timeWithCheat;
                            savings.set(saved, (savings.get(saved) || 0) + 1);
                        }
                    }
                }
            }
        }
        return savings;
    };
    Day20Execution.prototype.isValidMove = function (row, col) {
        return this.isInBounds(row, col) && this.mapRacetrack[row][col] !== "#";
    };
    Day20Execution.prototype.isInBounds = function (row, col) {
        return (row >= 0 &&
            row < this.mapRacetrack.length &&
            col >= 0 &&
            col < this.mapRacetrack[0].length);
    };
    Day20Execution.prototype.solve = function () {
        var savings = this.findCheatingPaths();
        var count = 0;
        savings.forEach(function (value, key) {
            if (key >= 100)
                count += value;
        });
        return count;
    };
    return Day20Execution;
}());
function main20() {
    var execution = new Day20Execution();
    console.log("Cheats saving \u2265100 picoseconds: ".concat(execution.solve()));
}
main20();
