import { readFileSync } from "fs";

const filePath = "day_05/input.txt";
const file = readFileSync(filePath, "utf-8");

const [rangeBlock, idBlock] = file.split("\n\n");
const ranges = rangeBlock
    .split("\n")
    .map((line) => line.split("-").map(Number));
const ids = idBlock
    .split("\n").map(Number);

let answer = 0;
for (let id of ids) {
    for (let range of ranges) {
        if (range[0] <= id && id <= range[1]) {
            answer += 1;
            break;
        }
    }
}

console.log(answer);