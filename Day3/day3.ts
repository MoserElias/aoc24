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
}

function main3() {
  const execution = new Day3Execution();
}

main3();
