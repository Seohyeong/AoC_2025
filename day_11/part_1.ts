import Denque from "denque";
import { readFileSync } from "fs";

const filePath = "day_11/input.txt";
const file = readFileSync(filePath, "utf-8");
const lines = file.split("\n").map((str) => str.split(": "));

const graph = new Map<string, string[]>();
for (const line of lines) {
    graph.set(line[0], line[1].split(" "));
}

console.log(graph);

const ways = new Map<string, number>();
ways.set("you", 1);
let queue = new Denque<string>();
queue.push("you");

while (queue.length > 0) {
    const nextQueue = new Denque<string>();
    const set = new Set<string>();

    while (queue.length > 0) {
            const currNode = queue.shift();
        if (!currNode) break;

        const neighbors = graph.get(currNode);
        if (!neighbors) break;

        console.log(`current node: ${currNode}, neighboring: ${neighbors}`);
        const delta = ways.get(currNode);
        if (!delta) break;

        for (const neighbor of neighbors) {
            if (!ways.has(neighbor)) {
                ways.set(neighbor, delta);
                console.log(`> setting neighboring ${neighbor} to ${delta}`);
            } else {
                const currWays = ways.get(neighbor)!;
                ways.set(neighbor, currWays + delta);
                console.log(`> setting neighboring ${neighbor} to ${currWays + delta}`);
            }

            if (!set.has(neighbor)) {
                set.add(neighbor);
                nextQueue.push(neighbor);
            }
        }
    }

    queue = nextQueue;
}

console.log(ways);