import { is, range, raw, sum } from "../../utils.ts";

const input = raw("2022/10/input.txt");

export function one(input: string): number {
  const signals = [20, 60, 100, 140, 180, 220];

  const instructions = input
    .split("\n")
    .filter(Boolean)
    .map(l => [l.split(" ")[0], Number(l.split(" ")[1])]);

  let x = 1;

  const cycles: number[] = [];

  for (const [instruction, value] of instructions) {
    if (instruction === "noop") {
      cycles.push(0);
    }

    if (instruction === "addx") {
      if (!is("number", value)) throw new Error("Invalid value");

      cycles.push(0);
      cycles.push(value);
    }
  }

  const strengths: number[] = [];

  cycles.forEach((c, i) => {
    if (signals.includes(i + 1)) {
      strengths.push(x * (i + 1));
    }
    x += c;
  });

  return sum(strengths);
}
export function two(input: string): number {
  const instructions = input
    .split("\n")
    .filter(Boolean)
    .map(l => [l.split(" ")[0], Number(l.split(" ")[1])]);

  let x = 1;

  const cycles: number[] = [];

  for (const [instruction, value] of instructions) {
    if (instruction === "noop") {
      cycles.push(0);
    }

    if (instruction === "addx") {
      if (!is("number", value)) throw new Error("Invalid value");

      cycles.push(0);
      cycles.push(value);
    }
  }

  const grid: string[][] = Array.from({ length: 6 }, () => new Array(40).fill(" "));

  cycles.forEach((c, index) => {
    const [dx, dy] = [index % 40, Math.floor(index / 40)];

    const shouldPaint = dx === x || dx === x - 1 || dx === x + 1;
    grid[dy][dx] = shouldPaint ? "X" : " ";
    x += c;
  });

  grid.forEach(row => {
    console.log(row.join(" "));
  });

  return 0;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
