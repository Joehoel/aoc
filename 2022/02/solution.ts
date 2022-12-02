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

const moves = ["Rock", "Paper", "Scissors"];

type Move = keyof typeof guide;

function one(input: string): number {
  const lines = input.split("\n").filter(Boolean);

  const rounds = lines.map(line => line.split(" ")) as Move[][];

  const score = rounds.reduce((acc, [elf, you]) => {
    if (guide[elf] + 1 === guide[you] || guide[elf] - 2 === guide[you]) {
      console.log("Win");
      acc += 6;
      acc += guide[you];
    } else if (guide[elf] === guide[you]) {
      console.log("Draw");

      acc += 3;
      acc += guide[you];
    } else {
      console.log("Loss");
      acc += guide[you];
    }
    console.log(moves[guide[elf] - 1], moves[guide[you] - 1]);
    console.log("\n");

    return acc;
  }, 0);

  return score;
}

Deno.test("Part 1", () => {
  const result = one(example);

  assertEquals(result, 15);
});

console.log(`Part 1: `, one(input));
