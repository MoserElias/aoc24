var fs3 = require("fs");
var Day3Execution = /** @class */ (function () {
    function Day3Execution() {
        this.inputFilePath = "real-input.txt";
        this.data = fs3.readFileSync(this.inputFilePath, "utf8");
        this.lines = this.data.trim().split("\n");
    }
    // extract "mult(x,y)" patterns from string, ignore everything else 
    // multiply ever x and y and sum them up and return result 
    Day3Execution.prototype.extractMult = function (string) {
        var result = 0;
        var newString = string.join('');
        var mult = newString.match(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
        if (mult != null) {
            for (var _i = 0, mult_1 = mult; _i < mult_1.length; _i++) {
                var element = mult_1[_i];
                var numbers = element.match(/\d+/g);
                if (numbers) {
                    var x = parseInt(numbers[0]);
                    var y = parseInt(numbers[1]);
                    result += x * y;
                }
            }
        }
        return result;
    };
    Day3Execution.prototype.getLines = function () {
        return this.lines;
    };
    return Day3Execution;
}());
function main3() {
    var execution = new Day3Execution();
    var result = execution.extractMult(execution.getLines());
    console.log(result);
}
main3();
