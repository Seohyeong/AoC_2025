import { readFileSync } from "fs";

const filePath = "day_09/input.txt";
const file = readFileSync(filePath, "utf-8");
const coordinates = file.split("\n").map((str) => str.split(",").map(Number));

let answer = 0;
for (let i = 0; i < coordinates.length; i++) {
    for (let j = 0; j < coordinates.length; j++) {
        if (i <= j) continue;
        const area = (Math.abs(coordinates[i][0] - coordinates[j][0]) + 1) * (Math.abs(coordinates[i][1] - coordinates[j][1]) + 1);
        if (area > answer) {
            answer = area;
        }
    }
}

console.log(answer);