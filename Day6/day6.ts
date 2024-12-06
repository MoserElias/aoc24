import * as fs6 from "fs";

class Day6Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[]; 
    private readonly grid: string[][] = [];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs6.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n");

        // create 2d string array 
        for (const element of this.inputString) {
            let line = element; 
            let lineArray = line.split(""); 
            this.grid.push(lineArray);
        }
        // console.log(this.grid);
    }

    searchCurrentPositionOfGuard(grid: string[][]): number[] { 
        // search for "^" char in the grid and return index position row and colum 
        let position: number[] = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === "^") {
                    position.push(i);
                    position.push(j);
                    return position;
                }
            }
        }
        return position;
    } 

    // search exit of mapped area, when before a # obstacle turn right otherwise step forward
    // figure is "^" and shows current direction of the guard 
    // curentPos is = [row, column]
    searchExitOfGrid(grid: string[][], currentPos: number[]): number { 
        let steps = 0; 
        let visited = new Set<string>();

        // search for exit of the grid
        while (true) { 

            console.log(currentPos);

            // Mark the current position as visited
            visited.add(`${currentPos[0]},${currentPos[1]}`);
    
            // determine current direction of guard 
            let currentDirection = ""; 
            if(grid[currentPos[0]][currentPos[1]] === "^") { 
                currentDirection = "up";
            } else if(grid[currentPos[0]][currentPos[1]] === ">") {
                currentDirection = "right";
            } else if (grid[currentPos[0]][currentPos[1]] === "v") {
                currentDirection = "down";
            } else if (grid[currentPos[0]][currentPos[1]] === "<") {
                currentDirection = "left";
            } else {
                console.log("Error: Guard has no direction?");
                break;
            }
    
            // exit case, if guard is at the border of the grid and points to the exit direction
            if (currentDirection === "up" && currentPos[0] == 0) {
                break;
            } else if (currentDirection === "right" && currentPos[1] == grid[0].length - 1) {
                break;
            } else if (currentDirection === "down" && currentPos[0] == grid.length - 1) {
                break;
            } else if (currentDirection === "left" && currentPos[1] == 0) {
                break;
            }
    
            // move guard, if obstacle turn right otherwise step forward til we reach the exit 
            // move also guard symbol in the grid
            if (currentDirection == "up") { 
                if(grid[currentPos[0] - 1][currentPos[1]] === "#") { 
                    grid[currentPos[0]][currentPos[1]] = ">";
                    currentDirection = "right";
                } else {
                    //remove old guard symbol and replace with X 
                    grid[currentPos[0]][currentPos[1]] = "X";

                    currentPos[0] -= 1; 
                    grid[currentPos[0]][currentPos[1]] = "^";
                }
            } else if(currentDirection == "right") {
                if(grid[currentPos[0]][currentPos[1] + 1] === "#") {
                    grid[currentPos[0]][currentPos[1]] = "v";
                    currentDirection = "down";
                } else { 
                    grid[currentPos[0]][currentPos[1]] = "X";
                    currentPos[1] += 1; 
                    grid[currentPos[0]][currentPos[1]] = ">";
                }
            } else if(currentDirection == "down") {
                if(grid[currentPos[0] + 1][currentPos[1]] === "#") {
                    grid[currentPos[0]][currentPos[1]] = "<";
                    currentDirection = "left";
                } else {
                    grid[currentPos[0]][currentPos[1]] = "X";
                    currentPos[0] += 1; 
                    grid[currentPos[0]][currentPos[1]] = "v";
                }
            } else if(currentDirection == "left") {
                if(grid[currentPos[0]][currentPos[1] - 1] === "#") {
                    grid[currentPos[0]][currentPos[1]] = "^";
                    currentDirection = "up";
                } else {
                    grid[currentPos[0]][currentPos[1]] = "X";
                    currentPos[1] -= 1; 
                    grid[currentPos[0]][currentPos[1]] = "<";
                }
            } 
    
            steps += 1;
        }
    
        return visited.size; 
    }

    getGrid(): string[][] {
        return this.grid;
    }
}


function main6() {
    let execution = new Day6Execution(); 
    let position = execution.searchCurrentPositionOfGuard(execution.getGrid());
    console.log(position);
    let steps = execution.searchExitOfGrid(execution.getGrid(), position);
    console.log(steps);
}

main6();