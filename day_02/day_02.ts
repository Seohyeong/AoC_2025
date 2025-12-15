import { readFileSync } from "fs";

const filePath = "day_02/input.txt";
const input = readFileSync(filePath, "utf-8");
const ranges = input.split(",")

function getNext(id: number): number {
    const idString = String(id);
    const numDigits = idString.length;
    let output: number;

    if (numDigits % 2 === 0) {
        const isLast = idString.split("").every((char: string) => char === "9");

        if (isLast) {
            const step = numDigits === 2 ? "911" : "9" + ("0".repeat(numDigits / 2 - 1) + "1").repeat(2);
            output = id + Number(step);
        } else {
            const step = "1" + "0".repeat(numDigits / 2 - 1) + "1";
            output = id + Number(step);
        }
    } else {
        const targetDigits = numDigits + 1;
        output = Number("1" + "0".repeat(targetDigits / 2 + 1));
    }
    return output;
}

function isInvalid(idString: string): boolean {
    const numDigits = idString.length;
    let output: boolean;

    if (numDigits % 2 !== 0) {
        output = false;
    } else {
        const target = idString.slice(0, numDigits % 2).repeat(2);
        output = target === idString ? true : false;
    }
    return output;
}

function getInvalidIds(rangeStart: string, rangeEnd: string): number[] {
    let invalidIds: number[] = [];
    const numDigits = rangeStart.length;

    // no invalid number in the range 
    if ((numDigits % 2 !== 0) && (rangeStart.length == rangeEnd.length)) {
        return invalidIds;
    }

    // find the smallest invalid number
    let smallest: number;
    if (numDigits % 2 === 0) {
        if (isInvalid(rangeStart)) {
            smallest = Number(rangeStart);
        } else {
            let possibleSmallest = Number(rangeStart.slice(0, numDigits / 2).repeat(2));
            while (possibleSmallest < Number(rangeStart)) {
                possibleSmallest = getNext(possibleSmallest);
            }
            smallest = possibleSmallest;
        }
    } else {
        smallest = Number(("1" + "0".repeat((numDigits + 1) / 2 - 1)).repeat(2));
    }

    while (smallest >= Number(rangeStart) && smallest <= Number(rangeEnd)) {
        invalidIds.push(smallest);
        smallest = getNext(smallest);
    }
    
    return invalidIds
}

let answer = 0;
for (const range of ranges) {
    console.log(range);
    const [rangeStart, rangeEnd] = range.split("-");
    const invalidIds = getInvalidIds(rangeStart, rangeEnd);
    console.log(`invalidIds: ${invalidIds}\n`);
    invalidIds.forEach((id) => answer = answer + id);
}
console.log(answer);