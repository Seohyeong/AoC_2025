import { readFileSync } from "fs";

const filePath = "day_04/input.txt";
const input = readFileSync(filePath, "utf-8");
const grid = input.split("\n").map((str) => [...str]);
let gridCopy = input.split("\n").map((str) => [...str]);

const isValid = (row: number, col: number): boolean => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

function countRolls(row: number, col: number): number {
    let totalCount = 0;

    for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
            if (dx === 0 && dy === 0) {
                continue;
            }
            if (isValid(row+dx, col+dy)) {
                totalCount = grid[row+dx][col+dy] === "@" ? totalCount + 1 : totalCount
            }
        }
    }

    return totalCount;
}

let answer = 0
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "@" && countRolls(i, j) < 4) {
            answer += 1;
            gridCopy[i][j] = "X";
        } 
    }
}

grid.forEach(row => console.log(row.join("")));
console.log("************************");
gridCopy.forEach(row => console.log(row.join("")));
console.log(answer);