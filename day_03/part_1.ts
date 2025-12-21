import { readFileSync } from "fs";

const filePath = "day_03/input.txt";
const input = readFileSync(filePath, "utf-8");
const banks = input.split("\n").map((str) => [...str].map(Number));

function getBiggestNumber(bank: number[]): {value: number, index: number} {
    let value = bank[0];
    let index = 0;
    for (let i = 1; i < bank.length; i++) {
        if (bank[i] > value) {
            value = bank[i];
            index = i;
        }
    }
    return {value, index};
}

let sumOfAnswers = 0
for (const bank of banks) {
    let answer = "";
    let { value, index } = getBiggestNumber(bank);

    if (index === bank.length - 1) {
        const { value: firstValue, index: firstIndex } = getBiggestNumber(bank.slice(0, index));
        answer += String(firstValue);
        answer += String(value);
    } else {
        const { value: secondValue, index: secondIndex } = getBiggestNumber(bank.slice(index + 1));
        answer += String(value);
        answer += String(secondValue);
    }
    console.log(`${bank} => ${answer}`);
    sumOfAnswers += Number(answer);
}
console.log(sumOfAnswers);