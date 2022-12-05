import { raw, sum, chunks, range } from "utils";
import { assertEquals } from "testing/asserts.ts";

const example = raw("2022/04/example.txt");
const input = raw("2022/04/input.txt");

function one(input: string): number {
  const lines = input.split("\n").filter(Boolean);

  const pairs = lines.map(line => line.split(","));

  const assignments = pairs.map(pair => {
    return pair.map(p => {
      const [start, end] = p.split("-").map(Number);

      return range(start, end + 1);
    });
  });

  // if one of the items in a pair overlaps completetly than add one to the accumulator
  const result = assignments.reduce((acc, [left, right]) => {
    if (left.every(value => right.includes(value)) || right.every(value => left.includes(value))) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return result;
}

function two(input: string): number {
  const lines = input.split("\n").filter(Boolean);

  const pairs = lines.map(line => line.split(","));

  const assignments = pairs.map(pair => {
    return pair.map(p => {
      const [start, end] = p.split("-").map(Number);

      return range(start, end + 1);
    });
  });

  // if one of the items in a pair overlaps completetly than add one to the accumulator
  const result = assignments.reduce((acc, [left, right]) => {
    if (left.some(value => right.includes(value)) || right.some(value => left.includes(value))) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return result;
}

Deno.test("Part 1", () => {
  const result = one(example);

  assertEquals(result, 2);
});

Deno.test("Part 2", () => {
  const result = two(example);

  assertEquals(result, 4);
});

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
