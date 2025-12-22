import { readFileSync } from "fs";

const filePath = "day_06/input.txt";
const file = readFileSync(filePath, "utf-8");
const input = file.split("\n");

const operators = input.at(-1)
    ?.split(" ").map((str) => str.trim()).filter((str) => str !== "")
    ?? [];
const operands = input.slice(0, -1)

let totalNumbers: number[][] = [];
let numbers: number[] = [];
for (let i = operands[0].length - 1; i >= 0; i--) {

    let numberInString = "";

    for (let j = 0; j < operands.length; j++) {
        numberInString += operands[j][i];
    }

    if (numberInString === " ".repeat(operands.length)) {
        totalNumbers.push(numbers);
        numbers = [];
        continue;
    }

    numbers.push(Number(numberInString.trim()));
}
totalNumbers.push(numbers);

let answer = 0;
for (let i = 0; i < operators.length; i++) {
    if (operators[operators.length - i - 1] === "+") {
        answer += totalNumbers[i].reduce((total, n) => total + n, 0);
        
    } else {
        answer += totalNumbers[i].reduce((total, n) => total * n, 1);
    }
}
console.log(answer);
