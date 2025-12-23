import { readFileSync } from "fs";
import Denque from "denque";

import { drawBeamSplits } from "./part_1";

const filePath = "day_07/input.txt";
const file = readFileSync(filePath, "utf-8");
const grid = file.split("\n").map((line) => line.split(""));

const { grid: newGrid, answer: prevAnswer }= drawBeamSplits(grid);

// init queue and countMap
let queue = new Denque<number[]>();
// const countMap = new Map<number[], number>(); // arrays are compared by reference (will always be undefined)
const countMap = new Map<string, number>();

// find the initial node
for (let j = 0; j < newGrid[0].length; j++) {
    if (newGrid[1][j] === "|") {
        queue.push([1, j]);
        countMap.set(`[1, ${j}]`, 1);
    }
}

let answer = 0;

for (let i = 2; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[0].length; j++) {
        if (newGrid[i][j] === "|") {
            let deltaCount = 0;
            // const currentCount = countMap.get(`[${i}, ${j}]`) ?? 0;
            if (j >= 1 && newGrid[i-1][j-1] === "|" && newGrid[i][j-1] === "^") {
                const leftCount = countMap.get(`[${i-1}, ${j-1}]`) ?? 0;
                deltaCount += leftCount;
            }
            if (j+1 < newGrid[0].length && newGrid[i-1][j+1] === "|" && newGrid[i][j+1] === "^") {
                const rightCount = countMap.get(`[${i-1}, ${j+1}]`) ?? 0;
                deltaCount += rightCount;
            }
            if (newGrid[i-1][j] === "|") {
                const upCount = countMap.get(`[${i-1}, ${j}]`) ?? 0;
                deltaCount += upCount;
            }
            countMap.set(`[${i}, ${j}]`, deltaCount);

            if (i === newGrid.length-1) {
                answer += countMap.get(`[${i}, ${j}]`) ?? 0;
            }
        }
    }
}

console.log(answer);