import { raw } from "utils";

const input = raw("2022/05/input.txt");

const print = (stacks: string[][]) => {
  for (let i = 0; i < 10; i++) {
    let row = "";
    for (let j = 0; j < stacks.length; j++) {
      row += stacks[j][i] ?? "   ";
    }
    console.log(row);
  }
};

export function parseStacks(input: string): string[][] {
  // split the stack of items into individual lines and reverse the order
  // slice the array to remove the first element (which is a number)
  const itemLines = input.split("\n").reverse().slice(1);

  // calculate the number of stacks by dividing the length of the first line by 4
  const numStacks = (itemLines[0].length + 1) / 4;

  // create the stacks by mapping over the lines and extracting the slice of each line
  // corresponding to the current stack, then filtering out any empty strings
  const stacks = Array.from({ length: numStacks }, (_, i) =>
    itemLines.map(line => line.slice(i * 4, i * 4 + 3).trim()).filter(Boolean)
  );

  return stacks;
}

export function parseInstructions(input: string): number[][] {
  const instructions = input
    .split("\n")
    .map(line =>
      line
        .split(" ")
        .filter(l => l.match(/\d+/g))
        .map(Number)
    )
    .filter(s => s.length > 0);

  return instructions;
}

export function topCrates(stacks: string[][]) {
  return stacks
    .map(s => s[s.length - 1])
    .join("")
    .replace(/[\[\]]/g, "");
}

export function one(input: string): string {
  const groups = input.split("\n\n");

  const [stacks, instructions] = [parseStacks(groups[0]), parseInstructions(groups[1])];

  for (const instruction of instructions) {
    const count = instruction[0];
    const from = instruction[1] - 1;
    const to = instruction[2] - 1;

    for (let i = 0; i < count; i++) {
      stacks[to].push(stacks[from].pop() ?? "");
    }
  }

  return topCrates(stacks);
}

export function two(input: string): string {
  const groups = input.split("\n\n");

  const [stacks, instructions] = [parseStacks(groups[0]), parseInstructions(groups[1])];

  for (const instruction of instructions) {
    const count = instruction[0];
    const from = instruction[1] - 1;
    const to = instruction[2] - 1;

    stacks[to].push(...stacks[from].splice(-count));
  }

  return topCrates(stacks);
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
