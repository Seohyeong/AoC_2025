import { solve } from 'yalps';
import { readFileSync } from "fs";

const filePath = "day_10/input.txt";
const file = readFileSync(filePath, "utf-8");
const lines = file.split("\n");

let problems: [string, number[][], number[]][] = [];

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

function run(requirement: number[], instructions: number[][]): number {
    const model: any = {
        direction: "minimize",
        objective: "totalPresses",
        constraints: {},
        variables: {},
        integers: true,
    };

    // create constraints
    for (let counterIdx = 0; counterIdx < requirement.length; counterIdx++) {
        model.constraints[`counter_${counterIdx}`] = {
            equal: requirement[counterIdx]
        };
    }

    // create variables (each button)
    for (let buttonIdx = 0; buttonIdx < instructions.length; buttonIdx++) {
        const button = instructions[buttonIdx];
        const varDef: any = {
            totalPresses: 1
        };

        for (let counterIdx = 0; counterIdx < requirement.length; counterIdx++) {
            if (button.includes(counterIdx)) {
                varDef[`counter_${counterIdx}`] = 1;
            } else {
                varDef[`counter_${counterIdx}`] = 0;
            }
        }

        model.variables[`button_${buttonIdx}`] = varDef;
    }

    const result = solve(model);
    
    return result.result;
}

let answer = 0;
for (const problem of problems){
    const [, instructions, requirement] = problem;
    const step = run(requirement, instructions);
    // console.log(`step: ${step}`);
    answer += step;
}
console.log(answer);

/*
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
        a1  a2   a3    a4   a5     a6

{
  optimize: "totalPresses",
  opType: "min",
  constraints: {
    counter_0: { equal: 3 },
    counter_1: { equal: 5 },
    counter_2: { equal: 4 },
    counter_3: { equal: 7 }
  },
  variables: {
    button_0: {  // Button (3) - only affects counter 3
      totalPresses: 1,
      counter_0: 0,
      counter_1: 0,
      counter_2: 0,
      counter_3: 1
    },
    button_1: {  // Button (1,3) - affects counters 1 and 3
      totalPresses: 1,
      counter_0: 0,
      counter_1: 1,
      counter_2: 0,
      counter_3: 1
    },
    button_2: {  // Button (2) - only affects counter 2
      totalPresses: 1,
      counter_0: 0,
      counter_1: 0,
      counter_2: 1,
      counter_3: 0
    },
    button_3: {  // Button (2,3) - affects counters 2 and 3
      totalPresses: 1,
      counter_0: 0,
      counter_1: 0,
      counter_2: 1,
      counter_3: 1
    },
    button_4: {  // Button (0,2) - affects counters 0 and 2
      totalPresses: 1,
      counter_0: 1,
      counter_1: 0,
      counter_2: 1,
      counter_3: 0
    },
    button_5: {  // Button (0,1) - affects counters 0 and 1
      totalPresses: 1,
      counter_0: 1,
      counter_1: 1,
      counter_2: 0,
      counter_3: 0
    }
  }
}
*/
