import Denque from "denque";
import { readFileSync } from "fs";

const filePath = "day_10/input.txt";
const file = readFileSync(filePath, "utf-8");
const lines = file.split("\n");

let problems: any[][] = [];

for (const line of lines) {
    const [indiBlock, rest] = line.split("]").map((str) => str.trim());
    const [instBlock, rqrmBlock] = rest.split("{").map((str) => str.trim());

    // parse indicator (0/.: off, 1/#: on)
    const indicator = indiBlock.slice(1, indiBlock.length);

    // parse instructions
    const instructions = instBlock.split(" ").map((str) => str.slice(1, str.length-1).split(",").map(Number));

    // parse requirement
    const requirement = rqrmBlock.slice(0, rqrmBlock.length-1).split(",").map(Number);

    problems.push([indicator, instructions, requirement]);
}

function apply(inst: number[], indi: string): string {
    const indiArray = indi.split("");

    for (const idx of inst) {
        indiArray[idx] = indiArray[idx] === "." ? "#" : ".";
    }
    return indiArray.join("");
}

function run(indicator: string, instructions: number[][]): number {
    let step = 0;
    let queue = new Denque<string>(); // queue of representation of indicator states
    const set = new Set<string>();
    queue.push(".".repeat(indicator.length));

    let found = false;

    while (!found) {
        const nextQueue = new Denque<string>();
        // console.log(`\n******** step: ${step} ********`)
        while (queue.length > 0) {
            const currIndi = queue.shift();
            // console.log(`queue after pop: ${queue.toArray()}`)
            // console.log(`current indicator: ${currIndi}`);
            if (!currIndi) break;
            if (currIndi === indicator) {
                // console.log(`[match] ${currIndi} vs ${indicator}`)
                found = true;
                break;
            }
            
            for (const inst of instructions) {
                const nextIndi = apply(inst, currIndi);
                // console.log(`apply(${inst}, ${currIndi}) => ${nextIndi}`);
                if (!set.has(nextIndi)) {
                    nextQueue.push(nextIndi);
                    set.add(nextIndi);
                }
            }
        }
        
        // console.log(`******** Done ********`);
        step += 1;
        queue = nextQueue;
        // console.log(`next queue: ${nextQueue.toArray()}\n`);
    }

    return step
}


let answer = 0;
for (const problem of problems){
    const [indicator, instructions, requirement] = problem;
    // console.log(indicator, instructions);
    const step = run(indicator, instructions) - 1;
    answer += step;
}
console.log(answer);