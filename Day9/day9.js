"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs9 = require("fs");
var Day9Execution = /** @class */ (function () {
    function Day9Execution() {
        this.inputFilePath = "real-input.txt";
        this.data = fs9.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n");
        //parse input string every char into int 
        this.inputNumArray = this.inputString[0].split("").map(function (num) { return parseInt(num); });
    }
    // take every second num, and insert it as ID into the array
    Day9Execution.prototype.buildIDRepresentation = function () {
        var idRepresentationWithSpaces = [];
        var idSteps = 0;
        for (var i = 0; i < this.inputNumArray.length; i++) {
            var currentNum = this.inputNumArray[i];
            if (i % 2 == 0 || i == 0) {
                for (var j = 0; j < currentNum; j++) {
                    idRepresentationWithSpaces.push(idSteps.toString());
                }
                idSteps++;
            }
            else {
                for (var j = 0; j < currentNum; j++) {
                    idRepresentationWithSpaces.push(".");
                }
            }
        }
        // console.log(idRepresentationWithSpaces);
        return idRepresentationWithSpaces;
    };
    // moves the last character of the first free spaces "." till every "." is at the end of the array
    Day9Execution.prototype.amphipodIDRepresentation = function (idRepresentation) {
        // console.log(idRepresentation);
        var length = idRepresentation.length;
        // console.log("idRepresentationLenght: " + length);
        for (var i = 0; i < idRepresentation.length - 1; i++) {
            if (idRepresentation[i] == ".") { // free space found, replace with last char  
                // console.log(i);
                // console.log("free space found at index: " + i);
                var lastChar = idRepresentation[length - 1];
                while (lastChar == ".") { // if last char is a "." skip it and take the next one  
                    length--;
                    lastChar = idRepresentation[length - 1];
                }
                // console.log("lenght: " + length);
                idRepresentation[i] = lastChar;
                idRepresentation[length - 1] = ".";
                // console.log("after move " + idRepresentation);
                if (this.allIdsAlligned(idRepresentation)) {
                    break;
                }
            }
        }
        // console.log(idRepresentation);
        return idRepresentation;
    };
    Day9Execution.prototype.calculateCheckSum = function (amphipodRepresentation) {
        var checkSum = 0;
        for (var i = 0; i < amphipodRepresentation.length; i++) {
            if (amphipodRepresentation[i] != ".") {
                checkSum += (parseInt(amphipodRepresentation[i]) * i);
            }
        }
        return checkSum;
    };
    // check if all ids alligned 
    Day9Execution.prototype.allIdsAlligned = function (idRepresentation) {
        for (var i = 0; i < idRepresentation.length - 1; i++) {
            if (idRepresentation[i] == ".") {
                for (var j = i + 1; j < idRepresentation.length - 1; j++) {
                    if (idRepresentation[j] != ".") {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    Day9Execution.prototype.getInputString = function () {
        return this.inputString;
    };
    return Day9Execution;
}());
function main9() {
    var execution = new Day9Execution();
    var resultBuildIDRep = execution.buildIDRepresentation();
    var resultAmphipodIDRep = execution.amphipodIDRepresentation(resultBuildIDRep);
    var resultCheckSum = execution.calculateCheckSum(resultAmphipodIDRep);
    console.log("CheckSum: " + resultCheckSum);
}
main9();
