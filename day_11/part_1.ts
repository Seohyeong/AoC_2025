import { readFileSync } from "fs";


const graph = new Map<string, string[]>();

// Read and parse input
const file = readFileSync("day_11/input.txt", "utf-8");
const lines = file.split("\n").map((str) => str.split(": "));
for (const line of lines) {
    graph.set(line[0], line[1].split(" "));
}

// Memoized recursive function
const memo = new Map<string, number>();

function count(src: string, dst: string): number {
    const key = `${src},${dst}`;
    
    // Check memoization cache
    if (memo.has(key)) {
        return memo.get(key)!;
    }
    
    // Base case: if source equals destination
    if (src === dst) {
        memo.set(key, 1);
        return 1;
    }
    
    // Recursive case: sum paths from all neighbors
    const neighbors = graph.get(src) || [];
    let result = 0;
    for (const neighbor of neighbors) {
        result += count(neighbor, dst);
    }
    
    // Store in cache and return
    memo.set(key, result);
    return result;
}

console.log(count("you", "out"));