"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day14Execution = /** @class */ (function () {
    function Day14Execution() {
        this.maximumX = 100; // 11 tiles wide (0-10)
        this.maximumY = 102; // 7 tiles tall (0-6)
        this.currentPositionsRobots = new Set();
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.trim().split("\n");
        for (var _i = 0, _a = this.inputString; _i < _a.length; _i++) {
            var line = _a[_i];
            var values = line.split(" ");
            var p = values[0].split("=")[1].split(",");
            var v = values[1].split("=")[1].split(",");
            var pInt = [parseInt(p[0]), parseInt(p[1])];
            var vInt = [parseInt(v[0]), parseInt(v[1])];
            this.currentPositionsRobots.add([pInt, vInt]);
        }
    }
    Day14Execution.prototype.moveRobots = function (positionRobots) {
        var _this = this;
        var newPositionsRobots = new Set();
        positionRobots.forEach(function (_a) {
            var currentPos = _a[0], velocity = _a[1];
            var newX = currentPos[0] + velocity[0];
            var newY = currentPos[1] + velocity[1];
            newX = (newX + _this.maximumX + 1) % (_this.maximumX + 1);
            newY = (newY + _this.maximumY + 1) % (_this.maximumY + 1);
            newPositionsRobots.add([[newX, newY], velocity]);
        });
        return newPositionsRobots;
    };
    Day14Execution.prototype.buildRobotsField = function (currentPositionsRobots) {
        var _this = this;
        var field = Array.from({ length: this.maximumY + 1 }, function () {
            return new Array(_this.maximumX + 1).fill(".");
        });
        currentPositionsRobots.forEach(function (_a) {
            var position = _a[0];
            var x = position[0], y = position[1];
            if (x >= 0 && x <= _this.maximumX && y >= 0 && y <= _this.maximumY) {
                field[y][x] = field[y][x] === "." ? "1" : (parseInt(field[y][x]) + 1).toString();
            }
        });
        // for (let y = 0; y <= this.maximumY; y++) {
        //     let line = "";
        //     for (let x = 0; x <= this.maximumX; x++) {
        //         line += field[y][x];
        //     }
        //     console.log(line);
        // }
        return field;
    };
    Day14Execution.prototype.buildQuadrant = function (inputField) {
        var _this = this;
        var quadrant = Array.from({ length: this.maximumY + 1 }, function () {
            return new Array(_this.maximumX + 1).fill(".");
        });
        // at half of maximumY and maximumY remove those lines  
        for (var y = 0; y <= this.maximumY; y++) {
            for (var x = 0; x <= this.maximumX; x++) {
                if (y != this.maximumY / 2 && x != this.maximumX / 2) {
                    quadrant[y][x] = inputField[y][x];
                }
            }
        }
        // print quadrant
        for (var y = 0; y <= this.maximumY; y++) {
            var line = "";
            for (var x = 0; x <= this.maximumX; x++) {
                line += quadrant[y][x];
            }
            console.log(line);
        }
        return quadrant;
    };
    // multiply robots in quadrant and return sum 
    Day14Execution.prototype.multiplyRobots = function (quadrant) {
        var sum = 0;
        var numberOfRobots1Qudrant = 0;
        var numberOfRobots2Qudrant = 0;
        var numberOfRobots3Qudrant = 0;
        var numberOfRobots4Qudrant = 0;
        for (var y = 0; y <= this.maximumY; y++) {
            for (var x = 0; x <= this.maximumX; x++) {
                var value = quadrant[y][x] === '.' ? 0 : parseInt(quadrant[y][x]);
                if (y <= this.maximumY / 2 && x <= this.maximumX / 2) {
                    numberOfRobots1Qudrant += value;
                }
                else if (y <= this.maximumY / 2 && x > this.maximumX / 2) {
                    numberOfRobots2Qudrant += value;
                }
                else if (y > this.maximumY / 2 && x <= this.maximumX / 2) {
                    numberOfRobots3Qudrant += value;
                }
                else if (y > this.maximumY / 2 && x > this.maximumX / 2) {
                    numberOfRobots4Qudrant += value;
                }
            }
        }
        console.log("1st quadrant: " + numberOfRobots1Qudrant);
        console.log("2nd quadrant: " + numberOfRobots2Qudrant);
        console.log("3rd quadrant: " + numberOfRobots3Qudrant);
        console.log("4th quadrant: " + numberOfRobots4Qudrant);
        sum = numberOfRobots1Qudrant * numberOfRobots2Qudrant * numberOfRobots3Qudrant * numberOfRobots4Qudrant;
        return sum;
    };
    Day14Execution.prototype.getRobots = function () {
        return this.currentPositionsRobots;
    };
    return Day14Execution;
}());
function main14() {
    var execution = new Day14Execution();
    var currentPositionRobots = execution.getRobots();
    for (var i = 0; i < 100; i++) {
        currentPositionRobots = execution.moveRobots(currentPositionRobots);
    }
    var quadrant = execution.buildQuadrant(execution.buildRobotsField(currentPositionRobots));
    var result = execution.multiplyRobots(quadrant);
    console.log(result);
}
main14();
