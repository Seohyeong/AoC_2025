import { readFileSync } from "fs";

const filePath = "day_02/input.txt";
const input = readFileSync(filePath, "utf-8");
const ranges = input.split(",").map((str) => str.split("-").map(Number));

function isInvalid(id: number): boolean {
    const idString = String(id);
    const idLength = idString.length;
    let output = false;

    for (let unit = 1; unit <= Math.floor(idLength / 2); unit++) {
        if (idLength % unit !== 0) continue;
        
        const numRepeats = idLength / unit;
        const idToCompare = idString.slice(0, unit).repeat(numRepeats);
        if (idToCompare === idString) {
            output = true;
        }
    }

    return output;
}

let answer = 0;
for (const range of ranges) {
    console.log("****************");
    console.log(range);
    for (let i = range[0]; i < range[1] + 1; i++) {
        if (isInvalid(i)) {
            console.log(`invalid id: ${i}`);
            answer += i;
        }
    }
}
console.log(answer);