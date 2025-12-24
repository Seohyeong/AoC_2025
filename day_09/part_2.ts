import { readFileSync } from "fs";

const filePath = "day_09/input.txt";
const file = readFileSync(filePath, "utf-8");
const coordinates = file.split("\n").map((str) => str.split(",").map(Number) as [number, number]);

// build the map
const maxX = Math.max(...coordinates.map((pair) => pair[0]));
const maxY = Math.max(...coordinates.map((pair) => pair[1]));
const grid = Array.from({ length: maxY }, () => Array(maxX).fill("."));

// fill the grid with red tiles
for (const [x, y] of coordinates) {
    grid[y-1][x-1] = "#"
}

// fill the horizontal edges with grean tiles
for (let i = 0; i < grid.length; i++){
    let min: number | null = null;
    let max: number | null = null;
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "#") {
            if (min === null) {
                min = j;
            }
            if (max === null || j > max) {
                max = j;
            }
        }
    }

    if (min === null || max === null) continue;
    if (min === max) continue;

    for (let idx = min + 1; idx < max; idx ++) {
        grid[i][idx] = "X";
    }
}

// fill the vertical edges with green tiles
for (let j = 0; j < grid[0].length; j++){
    let min: number | null = null;
    let max: number | null = null;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][j] === "#") {
            if (min === null) {
                min = i;
            }
            if (max === null || i > max) {
                max = i;
            }
        }
    }

    if (min === null || max === null) continue;
    if (min === max) continue;

    for (let idx = min + 1; idx < max; idx ++) {
        grid[idx][j] = "X";
    }
}

// fill the inside with green tiles
for (let j = 0; j < grid[0].length; j++){
    let min: number | null = null;
    let max: number | null = null;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][j] !== ".") {
            if (min === null) {
                min = i;
            }
            if (max === null || i > max) {
                max = i;
            }
        }
    }

    if (min === null || max === null) continue;
    if (min === max) continue;

    for (let idx = min + 1; idx < max; idx ++) {
        if (grid[idx][j] === ".") {
            grid[idx][j] = "X";
        }
    }
}

// for (const line of grid) {
//  console.log(line.join(""));
// }

function isValid(idx1: [number, number], idx2: [number, number]): boolean {
    let output = true;

    const [minX, maxX] = idx1[0] < idx2[0] ? [idx1[0], idx2[0]] : [idx2[0], idx1[0]];
    const [minY, maxY] = idx1[1] < idx2[1] ? [idx1[1], idx2[1]] : [idx2[1], idx1[1]];

    for (let i = minY; i < maxY; i++) {
        for (let j = minX; j < maxX; j++) {
            if (grid[i][j] === ".") {
                output = false;
                break;
            }
        }
    }

    return output
} 

let answer = 0;
for (let i = 0; i < coordinates.length; i++) {
    for (let j = 0; j < coordinates.length; j++) {
        if (i <= j) continue;
        const area = (Math.abs(coordinates[i][0] - coordinates[j][0]) + 1) * (Math.abs(coordinates[i][1] - coordinates[j][1]) + 1);
        if (isValid(coordinates[i], coordinates[j]) && area > answer) {
            answer = area;
        }
    }
}

console.log(answer);