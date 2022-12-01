import { raw, sum } from "utils";
import { assertEquals } from "testing/asserts.ts";

function calories(input: string) {
  const groups = input.split("\n\n");

  const calories = groups
    .reduce<number[]>((acc, group) => {
      const numbers = group
        .split("\n")
        .filter(Boolean)
        .map(n => parseInt(n));
      acc.push(sum(numbers));

      return acc;
    }, [])
    .filter(Boolean);
  return calories;
}

function one(input: string): number {
  return Math.max(...calories(input));
}

function two(input: string): number {
  return sum(
    calories(input)
      .sort((a, b) => b - a)
      .slice(0, 3)
  );
}

Deno.test("Part 1", () => {
  const input = raw("2022/01/example.txt");
  const result = one(input);

  assertEquals(result, 24000);
});

Deno.test("Part 2", () => {
  const input = raw("2022/01/example.txt");
  const result = two(input);

  assertEquals(result, 45000);
});

console.log(`Part 1: ${one(raw("2022/01/input.txt"))}`);
console.log(`Part 2: ${two(raw("2022/01/input.txt"))}`);
