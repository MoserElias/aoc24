import * as fs from "fs";

class Day15Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private map: string[][] = [];
    private readonly movements: string[] = [];
    private currentPos: number[] = [];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map((line) => line.replace("\r", ""));

        // Parse the map until we find an empty line
        let mapFinished = false;
        for (const element of this.inputString) {
            if (element === '') {
                mapFinished = true;
                continue;
            }
            if (!mapFinished) {
                this.map.push(element.split(''));
            } else {
                // We've reached the movement instructions
                break;
            }
        }

        // Search for the robot's current position (marked with '@') in the map
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === '@') {
                    this.currentPos = [i, j];
                    break;
                }
            }
        }

        // Parse the input movements: collect all lines after the empty line
        const emptyLineIndex = this.inputString.findIndex((line) => line === '');
        const movementLines = this.inputString.slice(emptyLineIndex + 1);
        const movementsString = movementLines.join('').replace(/\s+/g, '');
        this.movements.push(...movementsString.split(''));

        console.log(this.movements);
    }

    // moves robot according to moves in movements array, if 
    // box is before a robot (boxes are marked as O) then the robot moves the box if possible
    // if on a wall (marked as #) then the robot does not move 
    moveBoxesInMap(): string[][] {
        for (const direction of this.movements) {
            this.moveRobotToDirection(direction);

            // after each move print the map
            // console.log(direction);
            // for (let i = 0; i < this.map.length; i++) {
            //     console.log(this.map[i].join(''));
            // }
        }

        return this.map;
    }

    // move robot to direction and return the map with the robot moved and boxes moved if possible 
    private moveRobotToDirection(direction: string) {
        if (direction == "<") {
            let newPos = [this.currentPos[0], this.currentPos[1] - 1];
            this.moveRobotToNewPos(newPos, "<");
        } else if (direction == ">") {
            let newPos = [this.currentPos[0], this.currentPos[1] + 1];
            this.moveRobotToNewPos(newPos, ">");
        } else if (direction == "^") {
            let newPos = [this.currentPos[0] - 1, this.currentPos[1]];
            this.moveRobotToNewPos(newPos, "^");
        } else if (direction == "v") {
            let newPos = [this.currentPos[0] + 1, this.currentPos[1]];
            this.moveRobotToNewPos(newPos, "v");
        }
    }

    // move robot to new position if possible, move boxes if robot is before a box 
    private moveRobotToNewPos(newPos: number[], direction: string) {
        if (this.map[newPos[0]][newPos[1]] === '.') {
            this.map[newPos[0]][newPos[1]] = '@';
            this.map[this.currentPos[0]][this.currentPos[1]] = '.';
            this.currentPos = newPos;
        } else if (this.map[newPos[0]][newPos[1]] === 'O') { // if a box is at the new position
            // shift box (O) within same direction as robot for ex. when @0.0 -> @00.
            // same direction as robot
            let boxNewPos = [newPos[0], newPos[1]];
            if (direction == "<") {
                boxNewPos = [newPos[0], newPos[1] - 1];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                } else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    let newBoxPos = [boxNewPos[0], boxNewPos[1]];
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
            } else if (direction == ">") {
                boxNewPos = [newPos[0], newPos[1] + 1];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                } else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    let newBoxPos = [boxNewPos[0], boxNewPos[1]];
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
            } else if (direction == "^") {
                boxNewPos = [newPos[0] - 1, newPos[1]];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                } else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    let newBoxPos = [boxNewPos[0], boxNewPos[1]];
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
            } else if (direction == "v") {
                boxNewPos = [newPos[0] + 1, newPos[1]];
                // check if newBoxPosition is a box or a wall, if a box try to shift it if possible
                if (this.map[boxNewPos[0]][boxNewPos[1]] === '.') {
                    this.map[boxNewPos[0]][boxNewPos[1]] = 'O';
                    this.map[newPos[0]][newPos[1]] = '@';
                    this.map[this.currentPos[0]][this.currentPos[1]] = '.';
                    this.currentPos = newPos;
                } else if (this.map[boxNewPos[0]][boxNewPos[1]] === 'O') {
                    // shift all boxes by the same direction as robot and then move robot
                    let newBoxPos = [boxNewPos[0], boxNewPos[1]];
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
    }

    // sum gps coordinates of all boxes in the map  
    // get the gps coordiniates of boxes (0) 
    sumGPSCoordinates(map: string[][]): number {
        let sum = 0;

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 'O') {
                    // console.log(i, j);
                    sum += 100 * i + j;
                }
            }
        }


        return sum;
    }
}

function main15() {
    const execution = new Day15Execution();
    let resultMap = execution.moveBoxesInMap();

    // print map 
    for (let i = 0; i < resultMap.length; i++) {
        console.log(resultMap[i].join(''));
    }

    let resultSumGPSCoordinates = execution.sumGPSCoordinates(resultMap); 
    console.log(resultSumGPSCoordinates);
}

main15();