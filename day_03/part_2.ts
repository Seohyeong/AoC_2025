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
    console.log(`bank: ${bank}\n`)
    let range = bank;

    let answer: number[] = Array(12).fill(0);
    let start = 0
    let end = 11

    while (true) {
        if (start > end) break;
        console.log("******************");
        console.log(`range: ${range}`);

        let { value, index } = getBiggestNumber(range);

        // length of sequence starting at index is smaller than
        // length of the answer slots that have to be filled
        if (range.length - index < end - start + 1) {
            console.log(`end: ${end}, range.length: ${range.length}, index: ${index}`);
            const replaceStart = end - (range.length - index) + 1;
            const replacement = range.slice(index);
            // update answer and end
            answer.splice(replaceStart, replacement.length, ...replacement);
            console.log(`replace from idx ${replaceStart} for ${replacement.length} with ${replacement}`);
            end -= replacement.length;
            // update range
            range = range.slice(0, index);
            console.log(`answer: ${answer}`);
        } else {
            // update answer and start
            answer[start] = value;
            start += 1;
            // update range
            range = range.slice(index + 1);
            console.log(`answer: ${answer}`);
        }
        console.log(`start: ${start}, end: ${end}`);
    }
    console.log(`${bank} => ${answer}`);
    console.log(answer.join(""));
    sumOfAnswers += Number(answer.join(""));
}
console.log(sumOfAnswers);