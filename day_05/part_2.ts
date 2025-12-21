import { readFileSync } from "fs";
import Denque from "denque";

const filePath = "day_05/input.txt";
const file = readFileSync(filePath, "utf-8");

const [rangeBlock, idBlock] = file.split("\n\n");
const ranges = rangeBlock
    .split("\n")
    .map((line) => line.split("-").map(Number));

// sort by start range (ascending sort)
ranges.sort((a, b) => a[0] - b[0]);

let answer = 0;
// let uniqueRanges: number[][] = [];
const queue = new Denque(ranges);

while (queue.length > 0) {
    let currentRange = queue.shift();
    if (!currentRange) break;
    
    while (true) {
        const nextRange = queue.peekFront();
        if (!nextRange) {
            answer += currentRange[1] - currentRange[0] + 1;
            // uniqueRanges.push(currentRange);
            break;
        }

        if (nextRange[0] <= currentRange[1]){
            currentRange = [currentRange[0], Math.max(currentRange[1], nextRange[1])];
            queue.shift();
        } else {
            answer += currentRange[1] - currentRange[0] + 1;
            // uniqueRanges.push(currentRange);
            break;
        }
    }
}

console.log(answer);