import { readFileSync } from "fs";

const filePath = "day_01/input.txt";
const input = readFileSync(filePath, "utf-8")
const rotations = input.split("\n")

type Direction = "L" | "R";

const wrap = (n: number): number => ((n % 100) + 100) % 100;

function getNextValue(direction: Direction, current: number, amount: number): number {
    const output = direction === "L" ? current - amount : current + amount;
    return wrap(output);
}

let current = 50;
let answer = 0;

for (const rotation of rotations) {
    const direction = rotation[0] as Direction;
    const amount = Number(rotation.slice(1));

    const next = getNextValue(direction, current, amount)
    current = next;
    if (next === 0) {
        answer ++;
    }
}
console.log(answer);