import { raw, sum, chunks, range, fillUntil } from "utils";
import { assertEquals } from "testing/asserts.ts";

const example = raw("2022/05/example.txt");
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

function one(input: string): string {
  const groups = input.split("\n\n");

  // if a line in the stacks string contains numbers, remove the line. remove all brackets [] and make  a grid of the remaining lines.
  const stacks: string[][] = [];
  // const stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];

  const toStack = groups[0].split("\n").reverse().slice(1);

  for (let i = 0; i < (toStack[0].length + 1) / 4; i++) {
    stacks.push(toStack.map(line => line.slice(i * 4, i * 4 + 3).trim()).filter(Boolean));
  }

  // get all the digits from the string into an array
  const instructions = groups[1]
    .split("\n")
    .map(line =>
      line
        .split(" ")
        .filter(l => l.match(/\d+/g))
        .map(Number)
    )
    .filter(s => s.length > 0);

  // move 'number' amount of items from the top of 'from' stack to the top of 'to' stack

  for (const instruction of instructions) {
    const count = instruction[0];
    const from = instruction[1] - 1;
    const to = instruction[2] - 1;

    for (let i = 0; i < count; i++) {
      stacks[to].push(stacks[from].pop() ?? "");
    }
  }
  const result = stacks
    .map(s => s[s.length - 1])
    .join("")
    .replace(/[\[\]]/g, "");

  return result;
}

function two(input: string): string {
  const groups = input.split("\n\n");

  // if a line in the stacks string contains numbers, remove the line. remove all brackets [] and make  a grid of the remaining lines.
  const stacks: string[][] = [];
  // const stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];

  const toStack = groups[0].split("\n").reverse().slice(1);

  for (let i = 0; i < (toStack[0].length + 1) / 4; i++) {
    stacks.push(toStack.map(line => line.slice(i * 4, i * 4 + 3).trim()).filter(Boolean));
  }

  // get all the digits from the string into an array
  const instructions = groups[1]
    .split("\n")
    .map(line =>
      line
        .split(" ")
        .filter(l => l.match(/\d+/g))
        .map(Number)
    )
    .filter(s => s.length > 0);

  // move 'number' amount of items from the top of 'from' stack to the top of 'to' stack

  //  for (const instruction of instructions) {
  //    const count = instruction[0];
  //    const from = instruction[1] - 1;
  //    const to = instruction[2] - 1;

  //    for (let i = 0; i < count; i++) {
  //      stacks[to].push(stacks[from].pop() ?? "");
  //    }
  //  }
  // instead of executing the instructions one by one we can just move them all (count) and keep the order that they are in

  for (const instruction of instructions) {
    const count = instruction[0];
    const from = instruction[1] - 1;
    const to = instruction[2] - 1;

    stacks[to].push(...stacks[from].splice(-count));
  }

  const result = stacks
    .map(s => s[s.length - 1])
    .join("")
    .replace(/[\[\]]/g, "");

  return result;
}

Deno.test("Part 1", () => {
  const result = one(example);

  assertEquals(result, "CMZ");
});

Deno.test("Part 2", () => {
  const result = two(example);

  assertEquals(result, "MCD");
});

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
