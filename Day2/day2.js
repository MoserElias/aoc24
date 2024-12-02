var fs = require('fs');
var Day2Execution = /** @class */ (function () {
    function Day2Execution() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, 'utf8');
        this.lines = this.data.trim().split('\n');
    }
    Day2Execution.prototype.buildDifferenceArray = function (inputLines) {
        var _this = this;
        var differenceArray = [];
        inputLines.forEach(function (line) {
            var lineNumberArray = _this.convertInputLine(line);
            var lineDifferenceArray = [];
            // calculate the difference between each next num and push to lineDifferenceArray
            for (var index = 0; index < lineNumberArray.length - 1; index++) {
                var num = lineNumberArray[index];
                var num1 = lineNumberArray[index + 1];
                var difference = num1 - num; // Use actual difference to detect increasing or decreasing
                lineDifferenceArray.push(difference);
            }
            differenceArray.push(lineDifferenceArray);
        });
        return differenceArray;
    };
    Day2Execution.prototype.checkReports = function (differenceArray) {
        var safeReports = 0;
        for (var _i = 0, differenceArray_1 = differenceArray; _i < differenceArray_1.length; _i++) {
            var differences = differenceArray_1[_i];
            var foundUnsafe = false;
            var isIncreasing = null;
            for (var _a = 0, differences_1 = differences; _a < differences_1.length; _a++) {
                var element = differences_1[_a];
                var diff = element;
                // Check if difference is between -3 and -1 (decreasing) or 1 and 3 (increasing)
                if (diff >= -3 && diff <= -1) { // decreasing 
                    if (isIncreasing === null) {
                        isIncreasing = false;
                    }
                    else if (isIncreasing) {
                        foundUnsafe = true;
                        break;
                    }
                }
                else if (diff >= 1 && diff <= 3) { // increasing
                    if (isIncreasing === null) {
                        isIncreasing = true;
                    }
                    else if (!isIncreasing) {
                        foundUnsafe = true;
                        break;
                    }
                }
                else {
                    foundUnsafe = true;
                    break;
                }
            }
            if (!foundUnsafe) {
                safeReports++;
            }
        }
        return safeReports;
    };
    Day2Execution.prototype.convertInputLine = function (inputLine) {
        return inputLine.split(' ').map(Number);
    };
    Object.defineProperty(Day2Execution.prototype, "getLines", {
        get: function () {
            return this.lines;
        },
        enumerable: false,
        configurable: true
    });
    return Day2Execution;
}());
function main2() {
    var execution = new Day2Execution();
    var differenceArray = execution.buildDifferenceArray(execution.getLines);
    var safeReportCount = execution.checkReports(differenceArray);
    console.log("Number of safe reports:", safeReportCount);
}
main2();
