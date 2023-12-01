import { raw } from "utils";

const input = raw("2023/01/input.txt");

function isNumber(value?: string | number): boolean {
  return value != null && value !== "" && !isNaN(Number(value.toString()));
}

const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export function one(input: string): number {
  return input.split("\n").reduce((acc, line) => {
    const digits: number[] = [];

    for (let i = 0; i < line.length; i++) {
      const l = line[i];
      if (isNumber(l)) {
        digits.push(parseInt(l, 10));
      }
    }

    return (acc += Number(
      digits.at(0)!.toString() + digits.at(-1)!.toString()
    ));
  }, 0);
}
export function two(d: string): number {
  return d.split("\n").reduce((acc, line) => {
    const digits: number[] = [];

    for (let i = 0; i < line.length; i++) {
      const l = line[i];

      if (isNumber(l)) {
        digits.push(parseInt(l, 10));
      }

      for (let j = 0; j < words.length; j++) {
        const word = words[j];
        if (line.slice(i).startsWith(word)) {
          digits.push(j + 1);
        }
      }
    }

    return (acc += Number(
      digits.at(0)!.toString() + digits.at(-1)!.toString()
    ));
  }, 0);
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
