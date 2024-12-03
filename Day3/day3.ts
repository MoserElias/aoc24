const fs3 = require("fs");

class Day3Execution {
  private readonly inputFilePath: string;
  private readonly data: string;
  private readonly lines: string[];

  constructor() {
    this.inputFilePath = "real-input.txt";
    this.data = fs3.readFileSync(this.inputFilePath, "utf8");
    this.lines = this.data.trim().split("\n");
  }

  // extract "mult(x,y)" patterns from string, ignore everything else 
  // multiply ever x and y and sum them up and return result 
  extractMult(string: string[]): number {
    let result = 0;
    let newString = string.join('');

    let mult = newString.match(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
    if (mult != null) {
      for (const element of mult) {
        let numbers = element.match(/\d+/g);
        if (numbers) {
          let x = parseInt(numbers[0]);
          let y = parseInt(numbers[1]);
          result += x * y;
        }
      }
    }
    return result;
  }

  getLines() {
    return this.lines;
  }

}

function main3() {
  const execution = new Day3Execution();
  const result = execution.extractMult(execution.getLines());
  console.log(result);
}

main3();