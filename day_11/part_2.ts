import { readFileSync } from "fs";


const graph = new Map<string, string[]>();

// Read and parse input
const file = readFileSync("day_11/input.txt", "utf-8");
const lines = file.split("\n").map((str) => str.split(": "));
for (const line of lines) {
    graph.set(line[0], line[1].split(" "));
}

const memo = new Map<string, number>();

function count(src: string, dst: string): number {
    const key = `${src},${dst}`;
    
    if (memo.has(key)) {
        return memo.get(key)!;
    }
    
    // Base case
    if (src === dst) {
        memo.set(key, 1);
        return 1;
    }
    
    const neighbors = graph.get(src) || [];
    let result = 0;
    for (const neighbor of neighbors) {
        result += count(neighbor, dst);
    }
    
    // Store in cache and return
    memo.set(key, result);
    return result;
}


const svr2dac = count("svr", "dac");
console.log(`svr => dac: ${svr2dac}`);
const dac2fft = count("dac", "fft");
console.log(`dac => fft: ${dac2fft}`);
const fft2out = count("fft", "out");
console.log(`fft => out: ${fft2out}`);
console.log(`***** svr => dac => fft => out: ${svr2dac * dac2fft * fft2out}`);


const svr2fft = count("svr", "fft");
console.log(`svr => fft: ${svr2fft}`);
const fft2dac = count("fft", "dac");
console.log(`fft => dac: ${fft2dac}`);
const dac2out = count("dac", "out");
console.log(`dac => out: ${dac2out}`);
console.log(`***** svr => fft => dac => out: ${svr2fft * fft2dac * dac2out}`);

