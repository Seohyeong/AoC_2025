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

const sortedTopN = [...distanceMap.entries()].sort((a, b) => a[1] - b[1]);

const clusters: Array<Set<string>> = [];
let lastPair1: string | null = null;
let lastPair2: string | null = null;

// build clusters
for (const pair of sortedTopN) {
    const [idx1, idx2] = pair[0].split(",");

    // get the idx of cluster 1 and 2
    let clusterIdx1: number | null = null;
    let clusterIdx2: number | null = null;
    for (const [clusterIdx, cluster] of clusters.entries()) {
        if (cluster.has(idx1)) {
            clusterIdx1 = clusterIdx;
        }
        if (cluster.has(idx2)) {
            clusterIdx2 = clusterIdx;
        }
        if (clusterIdx1 !== null && clusterIdx2 !== null) break;
    }

    // idx1 and idx2 both don't exist yet
    if (clusterIdx1 === null && clusterIdx2 === null) {
        const newCluster = new Set<string>();
        newCluster.add(idx1);
        newCluster.add(idx2);
        clusters.push(newCluster);
        continue;
    }

    // both exist
    if (clusterIdx1 !== null && clusterIdx2 !== null) {
        if (clusterIdx1 === clusterIdx2) continue;

        // ensure clusterIdx1 < clusterIdx2
        const [low, high] = clusterIdx1 < clusterIdx2 ? [clusterIdx1, clusterIdx2] : [clusterIdx2, clusterIdx1];

        const merged = new Set([...clusters[low], ...clusters[high]]);
        clusters.splice(high, 1);
        clusters.splice(low, 1); 
        clusters.push(merged);

        // reset last pair
        lastPair1 = idx1;
        lastPair2 = idx2;

        continue;
    }

    // one exists
    if (clusterIdx1 !== null) {
        clusters[clusterIdx1].add(idx2);

        // reset last pair
        lastPair1 = idx1;
        lastPair2 = idx2;

        continue;
    }

    if (clusterIdx2 !== null) {
        clusters[clusterIdx2].add(idx1);

        // reset last pair
        lastPair1 = idx1;
        lastPair2 = idx2;

        continue;
    }
}

console.log(coordinates[Number(lastPair1)]); // Number(null) is 0
console.log(coordinates[Number(lastPair2)]);
console.log(coordinates[Number(lastPair1)][0] * coordinates[Number(lastPair2)][0]);