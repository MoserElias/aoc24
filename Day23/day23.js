"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day22Execution = /** @class */ (function () {
    function Day22Execution() {
        this.inputString = [];
        this.computers = new Set();
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data
            .split("\n")
            .map(function (line) { return line.trim().replace("\r", ""); })
            .filter(function (line) { return line.length > 0; });
        for (var _i = 0, _a = this.inputString; _i < _a.length; _i++) {
            var pair = _a[_i];
            var computersPair = pair.split("-");
            this.computers.add(computersPair);
        }
        console.log(this.computers);
        this.solvePuzzle(this.computers);
    }
    // search interconnected computers (3 way) 
    // computer A is connected to computer B1 and A to B2 and B1 and B2 are also connected 
    Day22Execution.prototype.solvePuzzle = function (lanConnections) {
        var adjacency = new Map();
        lanConnections.forEach(function (_a) {
            var a = _a[0], b = _a[1];
            if (!adjacency.has(a))
                adjacency.set(a, new Set());
            if (!adjacency.has(b))
                adjacency.set(b, new Set());
            adjacency.get(a).add(b);
            adjacency.get(b).add(a);
        });
        var threeWayConnections = new Set();
        adjacency.forEach(function (neighbors, nodeA) {
            var nbrs = Array.from(neighbors);
            for (var i = 0; i < nbrs.length; i++) {
                for (var j = i + 1; j < nbrs.length; j++) {
                    var nodeB = nbrs[i];
                    var nodeC = nbrs[j];
                    if (adjacency.get(nodeB).has(nodeC)) {
                        var sortedTriplet = [nodeA, nodeB, nodeC].sort().join(",");
                        threeWayConnections.add(sortedTriplet);
                    }
                }
            }
        });
        console.log(threeWayConnections, threeWayConnections.size);
        // Optional filter: sets containing a computer name starting with 't'
        var filtered = Array.from(threeWayConnections).filter(function (t) { return t.split(",").some(function (x) { return x.startsWith("t"); }); });
        console.log(filtered, filtered.length);
        return threeWayConnections;
    };
    Day22Execution.prototype.getInputString = function () {
        return this.inputString;
    };
    return Day22Execution;
}());
function main() {
    var execution = new Day22Execution();
}
main();
