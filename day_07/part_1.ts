import { readFileSync } from "fs";

const filePath = "day_07/example.txt";
const file = readFileSync(filePath, "utf-8");
const grid = file.split("\n").map((line) => line.split(""));

export function drawBeamSplits(grid: string[][]): {grid: string[][], answer: number} {
    let answer = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "S") {
                grid[i+1][j] = "|";
            }

            if (grid[i][j] === "^") {
                // split
                if (grid[i-1][j] === "|") {
                    answer += 1;
                    // left
                    if (j - 1 >= 0 && grid[i][j-1] === ".") {
                        grid[i][j-1] = "|";
                    } 
                    // right
                    if (j + 1 < grid[0].length && grid[i][j+1] === "." ) {
                        grid[i][j+1] = "|";
                    }
                }
            }

            // propagation
            if (i > 0 && grid[i][j] === "." && grid[i-1][j] === "|") {
                grid[i][j] = "|";
            }
        }
    }
    return {grid, answer};
}

function runPart1(grid: string[][]) {
    const { grid: newGrid, answer } = drawBeamSplits(grid);

    for (const line of newGrid) {
        console.log(line.join(""));
    }
    console.log(answer);
}