import Denque from "denque";
import { readFileSync } from "fs";

const filePath = "day_08/input.txt";
const file = readFileSync(filePath, "utf-8");
const coordinates: Array<[number, number, number]> = 
    file.split("\n").map((str) => str.split(",").map(Number) as [number, number, number]);

function getDistance(loc1: [number, number, number], loc2: [number, number, number]): number {
    return Math.sqrt(Math.pow((loc1[0] - loc2[0]), 2) + Math.pow((loc1[1] - loc2[1]), 2) + Math.pow((loc1[2] - loc2[2]), 2));
}

const distanceMap = new Map<string, number>();
for (let i = 0; i < coordinates.length; i++) {
    for (let j = 0; j < coordinates.length; j++) {
        if (i < j) {
            const key = `${i},${j}`;
            const value = getDistance(coordinates[i], coordinates[j]);
            distanceMap.set(key, value);
        }
    }
}

const N = 1000;
const sortedTopN = [...distanceMap.entries()].sort((a, b) => a[1] - b[1]).slice(0, N);

// console.log(sortedTopN);

// index represents each coordinate
const neighborMap = new Map<string, string[]>();

for (const pair of sortedTopN) {
    const [idx1, idx2] = pair[0].split(",");

    // assign connections
    const tmp1 = neighborMap.get(idx1) ?? [];
    tmp1.push(idx2)
    neighborMap.set(idx1, tmp1);

    const tmp2 = neighborMap.get(idx2) ?? [];
    tmp2.push(idx1)
    neighborMap.set(idx2, tmp2);
}

// push singletons
for (let i = 0; i < coordinates.length; i++) {
    if (!neighborMap.has(String(i))) {
        neighborMap.set(String(i), []);
    }
}
// console.log([...neighborMap.entries()]);

// build neighborhood
const queue = new Denque<string>();
const visited = new Set<string>();
let clusters: string[][] = [];
let cluster: string[] = [];

for (const [curr, neighbors] of neighborMap.entries()) {
    if (visited.has(curr)) continue;  // skip nodes already clustered

    cluster = [];
    queue.push(curr);
    visited.add(curr);

    while (queue.length > 0) {
        const node = queue.shift()!;
        cluster.push(node);

        const adj = neighborMap.get(node) ?? [];
        for (const n of adj) {
            if (!visited.has(n)) {
                visited.add(n);
                queue.push(n);
            }
        }
    }

    clusters.push(cluster);
}

clusters.sort((a, b) => b.length - a.length);


const answer = clusters
    .slice(0, 3)
    .map((arr) => arr.length)
    .reduce((total, n) => total * n, 1);

console.log(answer);