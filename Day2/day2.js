var fs = require('fs');
var Day2Execution = /** @class */ (function () {
    function Day2Execution() {
        this.inputFilePath = "example-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, 'utf8');
        this.lines = this.data.trim().split('\n');
        console.log(this.lines);
    }
    return Day2Execution;
}());
function main() {
    var execution = new Day2Execution();
    // Call methods on execution if needed
}
main();
