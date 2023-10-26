import { raw, sum } from "../../utils.ts";

const input = raw("2022/01/input.txt");

input.lines().sum();

function calories(input: string) {
  const groups = input.split("\n\n");

  const calories = groups
    .reduce<number[]>((acc, group) => {
      const numbers = group
        .split("\n")
        .filter(Boolean)
        .map((n) => parseInt(n));
      acc.push(sum(numbers));

      return acc;
    }, [])
    .filter(Boolean);
  return calories;
}

export function one(input: string): number {
  return Math.max(...calories(input));
}

export function two(input: string): number {
  return sum(
    calories(input)
      .sort((a, b) => b - a)
      .slice(0, 3)
  );
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
