import { raw, sum, chunks } from "utils";

const input = raw("2022/03/input.txt");

function letterToNumber(letter: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter) + 1;
}

export function one(input: string): number {
  const lines = input.split("\n").filter(Boolean);
  const items = lines.map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)]);

  const values = items.map(([left, right]) => [left.split(""), right.split("")]);

  // get the values that appear in both left and right
  const common = values.flatMap(([left, right]) =>
    Array.from(new Set(left.filter(value => right.includes(value))))
  );

  const result = sum(common.map(letterToNumber));

  return result;
}

export function two(input: string): number {
  const lines = input.split("\n").filter(Boolean);

  const groups = chunks(lines, 3);

  const common = groups.flatMap(group => {
    // find the common letter in all three items of the array
    const [left, middle, right] = group.map(line => line.split(""));
    return Array.from(
      new Set(left.filter(value => middle.includes(value) && right.includes(value)))
    );
  });

  const result = sum(common.map(letterToNumber));

  return result;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
