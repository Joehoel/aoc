import { intersect, range, raw } from "utils";

const input = raw("2022/04/input.txt");

const parseAssignments = (input: string) => {
  const lines = input.split("\n").filter(Boolean);

  const pairs = lines.map(line => line.split(","));

  const assignments = pairs.map(pair => {
    return pair.map(p => {
      const [start, end] = p.split("-").map(Number);

      return range(start, end + 1);
    });
  });
  return assignments;
};

export function one(input: string): number {
  const assignments = parseAssignments(input);

  // if one of the items in a pair overlaps completetly than add one to the accumulator
  const result = assignments.reduce((acc, [left, right]) => {
    if (intersect(left, right) || intersect(right, left)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return result;
}

export function two(input: string): number {
  const assignments = parseAssignments(input);

  // if one of the items in a pair overlaps completetly than add one to the accumulator
  const result = assignments.reduce((acc, [left, right]) => {
    if (intersect(left, right, false) || intersect(right, left, false)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return result;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
