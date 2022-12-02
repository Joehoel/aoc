import { raw, sum } from "utils";
import { assertEquals } from "testing/asserts.ts";

const example = raw("2022/02/example.txt");
const input = raw("2022/02/input.txt");

const guide = {
  // Rock
  A: 1,
  // Paper
  B: 2,
  // Scissors
  C: 3,

  //  Rock
  X: 1,
  // Paper
  Y: 2,
  // Scissors
  Z: 3,
} as const;

const newGuide = {
  // Rock
  A: 1,
  // Paper
  B: 2,
  // Scissors
  C: 3,

  X: 0,
  Y: 3,
  Z: 6,
} as const;

const moves = ["Rock", "Paper", "Scissors"];

type Move = keyof typeof guide;

function parse(input: string): Move[][] {
  const lines = input.split("\n").filter(Boolean);

  const rounds = lines.map(line => line.split(" ")) as Move[][];

  return rounds;
}

function strategize(moves: Move[][]): number {
  return moves.reduce((acc, [elf, ending]) => {
    switch (newGuide[elf]) {
      case 1:
        if (newGuide[ending] === 0) acc += 3;
        if (newGuide[ending] === 3) acc += 1;
        if (newGuide[ending] === 6) acc += 2;

        break;
      case 2:
        if (newGuide[ending] === 0) acc += 1;
        if (newGuide[ending] === 3) acc += 2;
        if (newGuide[ending] === 6) acc += 3;
        break;

      case 3:
        if (newGuide[ending] === 0) acc += 2;
        if (newGuide[ending] === 3) acc += 3;
        if (newGuide[ending] === 6) acc += 1;

        break;
    }

    return (acc += newGuide[ending]);
  }, 0);
}

function calculate(moves: Move[][]): number {
  return moves.reduce((acc, [elf, you]) => {
    if (guide[elf] + 1 === guide[you] || guide[elf] - 2 === guide[you]) {
      // console.log("Win");
      acc += 6;
      acc += guide[you];
    } else if (guide[elf] === guide[you]) {
      // console.log("Draw");

      acc += 3;
      acc += guide[you];
    } else {
      // console.log("Loss");
      acc += guide[you];
    }
    // console.log(moves[guide[elf] - 1], moves[guide[you] - 1]);
    // console.log("\n");

    return acc;
  }, 0);
}

function one(input: string): number {
  return calculate(parse(input));
}

function two(input: string): number {
  return strategize(parse(input));
}

Deno.test("Part 1", () => {
  const result = one(example);

  assertEquals(result, 15);
});

Deno.test("Part 2", () => {
  const result = two(example);

  assertEquals(result, 12);
});

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
