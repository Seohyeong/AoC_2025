import { readFileSync } from "fs";

const filePath = "day_06/input.txt";
const file = readFileSync(filePath, "utf-8");
const input = file.split("\n");

const operators = input.at(-1)
    ?.split(" ").map((str) => str.trim()).filter((str) => str !== "")
    ?? [];
const operands = input.slice(0, -1)
    .map((line) => 
        line
            .split(" ")
            .map((str) => str.trim())
            .filter((str) => str !== "")
            .map(Number));

console.log(operators);
console.log(operands);

const numRow = operands.length;
const numCol = operands[0].length;

let matrix = [...Array(numCol)].map(() => Array(numRow).fill(0));
for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numCol; j++) {
        matrix[j][i] = operands[i][j];
    }
}

let answer = 0;
for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
        answer += matrix[i].reduce((total, n) => total + n, 0);
    }
    if (operators[i] === "*") {
        answer += matrix[i].reduce((total, n) => total * n, 1);
    }
}

console.log(answer);