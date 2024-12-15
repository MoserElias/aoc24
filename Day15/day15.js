"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day15Execution = /** @class */ (function () {
    function Day15Execution() {
        var _a;
        this.map = [];
        this.movements = [];
        this.currentPos = [];
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map(function (line) { return line.replace("\r", ""); });
        // Parse the map until we find an empty line
        var mapFinished = false;
        for (var _i = 0, _b = this.inputString; _i < _b.length; _i++) {
            var element = _b[_i];
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
        // Search for the robot's current position (marked with '@') in the map
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === '@') {
                    this.currentPos = [i, j];
                    break;
                }
            }
        }
        // Parse the input movements: collect all lines after the empty line
        var emptyLineIndex = this.inputString.findIndex(function (line) { return line === ''; });
        var movementLines = this.inputString.slice(emptyLineIndex + 1);
        var movementsString = movementLines.join('').replace(/\s+/g, '');
        (_a = this.movements).push.apply(_a, movementsString.split(''));
        console.log(this.movements);
    }
    // moves robot according to moves in movements array, if 
    // box is before a robot (boxes are marked as O) then the robot moves the box if possible
    // if on a wall (marked as #) then the robot does not move 
    Day15Execution.prototype.moveBoxesInMap = function () {
        for (var _i = 0, _a = this.movements; _i < _a.length; _i++) {
            var direction = _a[_i];
            this.moveRobotToDirection(direction);
            // after each move print the map
            // console.log(direction);
            // for (let i = 0; i < this.map.length; i++) {
            //     console.log(this.map[i].join(''));
            // }
        }
        return this.map;
    };
    // move robot to direction and return the map with the robot moved and boxes moved if possible 
    Day15Execution.prototype.moveRobotToDirection = function (direction) {
        if (direction == "<") {
            var newPos = [this.currentPos[0], this.currentPos[1] - 1];
            this.moveRobotToNewPos(newPos, "<");
        }
        else if (direction == ">") {
            var newPos = [this.currentPos[0], this.currentPos[1] + 1];
            this.moveRobotToNewPos(newPos, ">");
        }
        else if (direction == "^") {
            var newPos = [this.currentPos[0] - 1, this.currentPos[1]];
            this.moveRobotToNewPos(newPos, "^");
        }
        else if (direction == "v") {
            var newPos = [this.currentPos[0] + 1, this.currentPos[1]];
            this.moveRobotToNewPos(newPos, "v");
        }
    };
    // move robot to new position if possible, move boxes if robot is before a box 
    Day15Execution.prototype.moveRobotToNewPos = function (newPos, direction) {
        if (this.map[newPos[0]][newPos[1]] === '.') {
            this.map[newPos[0]][newPos[1]] = '@';
            this.map[this.currentPos[0]][this.currentPos[1]] = '.';
            this.currentPos = newPos;
        }
        else if (this.map[newPos[0]][newPos[1]] === 'O') { // if a box is at the new position
            // shift box (O) within same direction as robot for ex. when @0.0 -> @00.
            // same direction as robot
            var boxNewPos = [newPos[0], newPos[1]];
            if (direction == "<") {
                boxNewPos = [newPos[0], newPos[1] - 1];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                }
                else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    var newBoxPos = [boxNewPos[0], boxNewPos[1]];
                    while (this.map[newBoxPos[0]][newBoxPos[1]] === 'O') {
                        newBoxPos = [newBoxPos[0], newBoxPos[1] - 1];
                    }
                    if (this.map[newBoxPos[0]][newBoxPos[1]] === '.') {
                        this.map[newBoxPos[0]][newBoxPos[1]] = 'O';
                        this.map[newPos[0]][newPos[1]] = '@';
                        this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                        this.currentPos = newPos;
                    }
                }
            }
            else if (direction == ">") {
                boxNewPos = [newPos[0], newPos[1] + 1];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                }
                else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    var newBoxPos = [boxNewPos[0], boxNewPos[1]];
                    while (this.map[newBoxPos[0]][newBoxPos[1]] === 'O') {
                        newBoxPos = [newBoxPos[0], newBoxPos[1] + 1];
                    }
                    if (this.map[newBoxPos[0]][newBoxPos[1]] === '.') {
                        this.map[newBoxPos[0]][newBoxPos[1]] = 'O';
                        this.map[newPos[0]][newPos[1]] = '@';
                        this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                        this.currentPos = newPos;
                    }
                }
            }
            else if (direction == "^") {
                boxNewPos = [newPos[0] - 1, newPos[1]];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                }
                else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    var newBoxPos = [boxNewPos[0], boxNewPos[1]];
                    while (this.map[newBoxPos[0]][newBoxPos[1]] === 'O') {
                        newBoxPos = [newBoxPos[0] - 1, newBoxPos[1]];
                    }
                    if (this.map[newBoxPos[0]][newBoxPos[1]] === '.') {
                        this.map[newBoxPos[0]][newBoxPos[1]] = 'O';
                        this.map[newPos[0]][newPos[1]] = '@';
                        this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                        this.currentPos = newPos;
                    }
                }
            }
            else if (direction == "v") {
                boxNewPos = [newPos[0] + 1, newPos[1]];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                }
                else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    var newBoxPos = [boxNewPos[0], boxNewPos[1]];
                    while (this.map[newBoxPos[0]][newBoxPos[1]] === 'O') {
                        newBoxPos = [newBoxPos[0] + 1, newBoxPos[1]];
                    }
                    if (this.map[newBoxPos[0]][newBoxPos[1]] === '.') {
                        this.map[newBoxPos[0]][newBoxPos[1]] = 'O';
                        this.map[newPos[0]][newPos[1]] = '@';
                        this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                        this.currentPos = newPos;
                    }
                }
            }
        }
    };
    // sum gps coordinates of all boxes in the map  
    // get the gps coordiniates of boxes (0) 
    Day15Execution.prototype.sumGPSCoordinates = function (map) {
        var sum = 0;
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] === 'O') {
                    // console.log(i, j);
                    sum += 100 * i + j;
                }
            }
        }
        return sum;
    };
    return Day15Execution;
}());
function main15() {
    var execution = new Day15Execution();
    var resultMap = execution.moveBoxesInMap();
    // print map 
    for (var i = 0; i < resultMap.length; i++) {
        console.log(resultMap[i].join(''));
    }
    var resultSumGPSCoordinates = execution.sumGPSCoordinates(resultMap);
    console.log(resultSumGPSCoordinates);
}
main15();
