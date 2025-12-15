import { readFileSync } from "fs";

const filePath = "day_01/input.txt";
const input = readFileSync(filePath, "utf-8")
const rotations = input.split("\n")

type Direction = "L" | "R";

function getNextValue(
    direction: Direction, 
    current: number, 
    amount: number
): {
    numPassedZero: number;
    output: number;
} {
    const wrap = (n: number): number => ((n % 100) + 100) % 100;

    const start = current;
    const end = direction === "L" ? current - amount : current + amount;

    const distantanceToZero = start === 0 ? 0 : 100 - start;
    const numPassedZero = direction === "L" 
        ? Math.floor((amount + distantanceToZero) / 100)
        : Math.floor((start + amount) / 100);

    return { 
        numPassedZero, 
        output: wrap(end),
    };
}

let current = 50;
let answer = 0;

for (const rotation of rotations) {
    const direction = rotation[0] as Direction;
    const amount = Number(rotation.slice(1));

    const { numPassedZero, output } = getNextValue(direction, current, amount)

    console.log(`current: ${current} => ${rotation} => ${output}`)
    console.log(`num passed zero: ${numPassedZero}\n\n`);
    answer += numPassedZero;
    current = output;
}
console.log(answer);