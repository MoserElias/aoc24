"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day19Execution = /** @class */ (function () {
    function Day19Execution() {
        var _this = this;
        this.availableTowelPatterns = new Set(); // Set of available towel patterns 
        this.towelPatternsToMatch = new Set(); // Set of given towel patterns
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        // parse the input into lines
        this.inputString = this.data
            .split("\n")
            .map(function (line) { return line.replace("\r", ""); });
        // parse available towel patterns
        var patternsLine = this.inputString[0];
        var patterns = patternsLine.split(",").map(function (p) { return p.trim(); });
        patterns.forEach(function (pattern) { return _this.availableTowelPatterns.add(pattern); });
        console.log(this.availableTowelPatterns);
        // parse designs to match
        for (var i = 2; i < this.inputString.length; i++) {
            var line = this.inputString[i].trim();
            if (line.length > 0) {
                this.towelPatternsToMatch.add(line);
            }
        }
        console.log(this.towelPatternsToMatch);
    }
    // check and return number of possible patterns can be build from the given towel patterns 
    Day19Execution.prototype.checkNumberOfPossiblePatterns = function () {
        var _this = this;
        var patterns = 0;
        // check 1 to 1 matches         
        this.towelPatternsToMatch.forEach(function (pattern) {
            if (_this.availableTowelPatterns.has(pattern)) {
                patterns++;
            }
        });
        // check if we can combine patterns to generate one of the available towel patterns
        this.towelPatternsToMatch.forEach(function (pattern) {
            if (_this.canBuildDesign(pattern)) {
                patterns++;
            }
        });
        return patterns;
    };
    // Helper method to check if a design can be built from available towel patterns
    Day19Execution.prototype.canBuildDesign = function (design) {
        var dp = new Array(design.length + 1).fill(false);
        dp[0] = true;
        var wordDict = Array.from(this.availableTowelPatterns);
        for (var i = 1; i <= design.length; i++) {
            for (var _i = 0, wordDict_1 = wordDict; _i < wordDict_1.length; _i++) {
                var word = wordDict_1[_i];
                var len = word.length;
                if (i >= len && dp[i - len]) {
                    if (design.substring(i - len, i) === word) {
                        dp[i] = true;
                        break;
                    }
                }
            }
        }
        return dp[design.length];
    };
    return Day19Execution;
}());
function main19() {
    var execution = new Day19Execution();
    var result = execution.checkNumberOfPossiblePatterns();
    console.log("matched patterns " + result);
}
main19();
