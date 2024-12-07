"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs7 = require("fs");
var Day7Execution = /** @class */ (function () {
    function Day7Execution() {
        this.inputFilePath = "example-input.txt";
        this.data = fs7.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map(function (line) { return line.replace(/\r$/, ""); });
    }
    // should check all results from each line of inputString, 
    // if result is valid, add result to validResultsSum
    Day7Execution.prototype.calculateValidResults = function () {
        var validResultsSum = 0;
        // line of inputString consists of 3 parts, first is result after : the two nums 
        for (var _i = 0, _a = this.inputString; _i < _a.length; _i++) {
            var line = _a[_i];
            var result = line.split(":")[0];
            // remove from line all chars til :
            var numsString = line.split(":")[1].trim();
            // convert numString to array of nums 
            var nums = numsString.split(" ").map(function (num) { return parseInt(num); });
            var valid = false;
            var allOperators = this.getOperatorCombinations(nums.length - 1);
            // iterate over all possible operator combinations
            for (var _b = 0, allOperators_1 = allOperators; _b < allOperators_1.length; _b++) {
                var operators = allOperators_1[_b];
                var currentResult = nums[0];
                for (var i = 0; i < operators.length; i++) {
                    if (operators[i] === "+") {
                        currentResult += nums[i + 1];
                    }
                    else {
                        currentResult *= nums[i + 1];
                    }
                }
                if (currentResult.toString() === result) {
                    valid = true;
                    break;
                }
            }
            if (valid) {
                validResultsSum += parseInt(result);
            }
        }
        return validResultsSum;
    };
    Day7Execution.prototype.getOperatorCombinations = function (length) {
        var operators = ['+', '*'];
        if (length === 0)
            return [[]];
        var result = [];
        var smallerCombos = this.getOperatorCombinations(length - 1);
        for (var _i = 0, smallerCombos_1 = smallerCombos; _i < smallerCombos_1.length; _i++) {
            var combo = smallerCombos_1[_i];
            for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
                var op = operators_1[_a];
                var newCombo = __spreadArray(__spreadArray([], combo, true), [op], false);
                result.push(newCombo);
            }
        }
        return result;
    };
    Day7Execution.prototype.getGrid = function () {
        return this.inputString;
    };
    return Day7Execution;
}());
function main7() {
    var execution = new Day7Execution();
    console.log(execution.calculateValidResults());
}
main7();
