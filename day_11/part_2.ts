import Denque from "denque";
import { readFileSync } from "fs";

const filePath = "day_11/example.txt";
const file = readFileSync(filePath, "utf-8");
const lines = file.split("\n").map((str) => str.split(": "));

const graph = new Map<string, string[]>();
for (const line of lines) {
    graph.set(line[0], line[1].split(" "));
}

/* 
{
"aaa": {"00": 1, ...}
       {"dac flag + fft flag": # of ways, ... }
}
*/
const ways = new Map<string, Map<string, number>>(); 
ways.set("svr", new Map([["00", 1]]));

let queue = new Denque<[string, number, number]>(); // node, dac flag, fft flag
queue.push(["svr", 0, 0]); // node, dac flag, fft flag

while (queue.length > 0) {
    const nextQueue = new Denque<[string, number, number]>(); // node, dac flag, fft flag
    const set = new Set<string>(); // keep "string,number,number"(node, dac flag, fft flag) as one string

    while (queue.length > 0) {
        const currNode = queue.shift();
        if (!currNode) continue;

        const neighbors = graph.get(currNode[0]);
        if (!neighbors) continue;

        console.log(`current node: ${currNode[0]}, neighboring: ${neighbors}`);

        // filter allWays to get ways that matches the current state
        const stateKey = `${currNode[1]}${currNode[2]}`;
        const currNodeWay = new Map<string, number>();
        const allWays = ways.get(currNode[0]);
        if (allWays) {
            const count = allWays.get(stateKey) ?? 0;
            if (count > 0) {
                currNodeWay.set(stateKey, count);
            }
        }

        // const currNodeWay = ways.get(currNode[0]);
        // if (!currNodeWay) break;

        for (const neighbor of neighbors) {
            let neighborWay: Map<string, number>;

            if (!ways.has(neighbor)) { 
                neighborWay = new Map<string, number>(); 
            } else { 
                neighborWay = new Map(ways.get(neighbor)!); 
            }

            // check what the neighbor is dac, fft
            if (neighbor === "dac") {
                for (const [k, v] of currNodeWay) {
                    const key = "1" + k.slice(1, 2);
                    neighborWay.set(key, v + (neighborWay.get(key) ?? 0))
                }
            } else if (neighbor === "fft") {
                for (const [k, v] of currNodeWay) {
                    const key = k.slice(0, 1) + "1";
                    neighborWay.set(key, v + (neighborWay.get(key) ?? 0))
                }
            } else {
                for (const [k, v] of currNodeWay) {
                    neighborWay.set(k, v + (neighborWay.get(k) ?? 0));
                }
            }
            
            ways.set(neighbor, neighborWay); // would this deep copy?
            console.log(`> setting neighboring ${neighbor} to ${[...neighborWay]}`);

            const nextArray: [string, number, number] = [neighbor, currNode[1], currNode[2]]; // string, dac, fft

            if (nextArray[1] === 0 && neighbor === "dac") nextArray[1] = 1;
            if (nextArray[2] === 0 && neighbor === "fft") nextArray[2] = 1;
            
            const nextArrayString = nextArray.map(String).join(",");
            if (!set.has(nextArrayString)) {
                set.add(nextArrayString);
                nextQueue.push(nextArray);
            }
        }
    }

    queue = nextQueue;
}

console.log(ways);
console.log(ways.get("out")!);
