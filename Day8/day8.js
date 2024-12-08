"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs8 = require("fs");
var Day8Execution = /** @class */ (function () {
    function Day8Execution() {
        var _this = this;
        this.inputFilePath = "real-input.txt";
        this.data = fs8.readFileSync(this.inputFilePath, "utf8");
        this.inputMap = this.data.split("\n").map(function (line) { return line.replace("\r", "").split(" "); });
        // parse the stringLine of every row to a string array 
        this.inputMap.forEach(function (stringLine, index) {
            _this.inputMap[index] = stringLine[0].split("");
        });
        // console.log(this.inputMap);
    }
    // search for antennas in inputMap (could be letters or digits) and save the position in posAntennas 
    // (key: position (unique), value: antenna char)
    Day8Execution.prototype.searchAntennas = function () {
        this.posAntennas = new Map();
        for (var i = 0; i < this.inputMap.length; i++) {
            for (var j = 0; j < this.inputMap[i].length; j++) {
                if (RegExp(/[a-zA-Z0-9]/).exec(this.inputMap[i][j])) {
                    this.posAntennas.set(i + "," + j, this.inputMap[i][j]);
                }
            }
        }
        // print the antennas and their positions 
        // this.posAntennas.forEach((value, key) => {
        //     console.log(key + " -> " + value);
        // });
    };
    // calculate antinode positions and return the total count
    Day8Execution.prototype.calculateAnitnodePositions = function () {
        var _this = this;
        var antinodePositions = new Set();
        var antennasByFreq = this.groupAntennasByFrequency();
        antennasByFreq.forEach(function (positions, freq) {
            for (var i = 0; i < positions.length; i++) {
                var _loop_1 = function (j) {
                    var _a = positions[i], x1 = _a[0], y1 = _a[1];
                    var _b = positions[j], x2 = _b[0], y2 = _b[1];
                    // Skip if antennas are at the same position
                    if (x1 === x2 && y1 === y2) {
                        return "continue";
                    }
                    // Consider both ratios: 1:2 and 2:1
                    var ratios = [
                        { m: 1, n: 2 },
                        { m: 2, n: 1 },
                    ];
                    ratios.forEach(function (_a) {
                        var m = _a.m, n = _a.n;
                        // Calculate internal and external division points
                        var internalPoint = _this.dividePoints(x1, y1, x2, y2, m, n, true);
                        var externalPoint = _this.dividePoints(x1, y1, x2, y2, m, n, false);
                        // Validate and add positions
                        [internalPoint, externalPoint].forEach(function (point) {
                            if (_this.isValidPosition(point[0], point[1])) {
                                antinodePositions.add("".concat(point[0], ",").concat(point[1]));
                            }
                        });
                    });
                };
                for (var j = i + 1; j < positions.length; j++) {
                    _loop_1(j);
                }
            }
        });
        // Return the total count of unique antinode positions
        return antinodePositions.size;
    };
    // group antennas by frequency, return new map with frequency as key and positions of antennas as value
    Day8Execution.prototype.groupAntennasByFrequency = function () {
        var antennasByFreq = new Map();
        this.posAntennas.forEach(function (freq, pos) {
            var _a = pos.split(',').map(Number), row = _a[0], col = _a[1];
            if (!antennasByFreq.has(freq)) {
                antennasByFreq.set(freq, []);
            }
            antennasByFreq.get(freq).push([row, col]);
        });
        return antennasByFreq;
    };
    Day8Execution.prototype.dividePoints = function (x1, y1, x2, y2, m, n, isInternal) {
        var x;
        var y;
        if (isInternal) {
            x = (n * x1 + m * x2) / (m + n);
            y = (n * y1 + m * y2) / (m + n);
        }
        else {
            x = (n * x1 - m * x2) / (n - m);
            y = (n * y1 - m * y2) / (n - m);
        }
        return [x, y];
    };
    Day8Execution.prototype.isValidPosition = function (x, y) {
        return (Number.isInteger(x) &&
            Number.isInteger(y) &&
            x >= 0 &&
            y >= 0 &&
            x < this.inputMap.length &&
            y < this.inputMap[x].length);
    };
    Day8Execution.prototype.getInputString = function () {
        return this.inputMap;
    };
    return Day8Execution;
}());
function main8() {
    var execution = new Day8Execution();
    execution.searchAntennas();
    var res = execution.calculateAnitnodePositions();
    console.log("Number of unique antinode positions: ".concat(res));
}
main8();
