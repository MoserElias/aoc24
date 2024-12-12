"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Region = /** @class */ (function () {
    function Region() {
        this.cells = new Set();
        this.perimeter = 0;
    }
    Region.prototype.getCells = function () {
        return Array.from(this.cells);
    };
    return Region;
}());
var Day12Execution = /** @class */ (function () {
    function Day12Execution() {
        var _this = this;
        this.plantMap = [];
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map(function (line) { return line.replace("\r", ""); });
        this.inputString.forEach(function (element) {
            _this.plantMap.push(element.split(""));
        });
    }
    Day12Execution.prototype.getKey = function (row, col) {
        return "".concat(row, ",").concat(col);
    };
    Day12Execution.prototype.findRegions = function (char) {
        var _this = this;
        var regions = [];
        var processed = new Set();
        for (var row = 0; row < this.plantMap.length; row++) {
            var _loop_1 = function (col) {
                if (this_1.plantMap[row][col] === char && !processed.has(this_1.getKey(row, col))) {
                    var region = new Region();
                    var toProcess_1 = [[row, col]];
                    var _loop_2 = function () {
                        var _a = toProcess_1.pop(), r = _a[0], c = _a[1];
                        var key = this_1.getKey(r, c);
                        if (processed.has(key))
                            return "continue";
                        processed.add(key);
                        region.cells.add(key);
                        // Check neighbors
                        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (_a) {
                            var dr = _a[0], dc = _a[1];
                            var nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < _this.plantMap.length &&
                                nc >= 0 && nc < _this.plantMap[0].length &&
                                _this.plantMap[nr][nc] === char) {
                                toProcess_1.push([nr, nc]);
                            }
                        });
                    };
                    while (toProcess_1.length > 0) {
                        _loop_2();
                    }
                    regions.push(region);
                }
            };
            var this_1 = this;
            for (var col = 0; col < this.plantMap[row].length; col++) {
                _loop_1(col);
            }
        }
        return regions;
    };
    Day12Execution.prototype.calculatePlantCosts = function () {
        var _this = this;
        var totalCosts = 0;
        var _loop_3 = function (i) {
            var char = String.fromCharCode(65 + i);
            var regions = this_2.findRegions(char);
            var _loop_4 = function (region) {
                var area = region.cells.size;
                var perimeter = 0;
                var _loop_5 = function (cell) {
                    var _c = cell.split(',').map(Number), row = _c[0], col = _c[1];
                    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (_a) {
                        var dr = _a[0], dc = _a[1];
                        var nr = row + dr, nc = col + dc;
                        if (nr < 0 || nr >= _this.plantMap.length ||
                            nc < 0 || nc >= _this.plantMap[0].length ||
                            _this.plantMap[nr][nc] !== char) {
                            perimeter++;
                        }
                    });
                };
                for (var _a = 0, _b = region.getCells(); _a < _b.length; _a++) {
                    var cell = _b[_a];
                    _loop_5(cell);
                }
                totalCosts += area * perimeter;
            };
            for (var _i = 0, regions_1 = regions; _i < regions_1.length; _i++) {
                var region = regions_1[_i];
                _loop_4(region);
            }
        };
        var this_2 = this;
        for (var i = 0; i < 26; i++) {
            _loop_3(i);
        }
        return totalCosts;
    };
    return Day12Execution;
}());
function main12() {
    var execution = new Day12Execution();
    var result = execution.calculatePlantCosts();
    console.log(result);
}
main12();
