import { raw } from "utils";

const input = raw("2023/05/input.txt");

function binarySearch<T>(array: T[], search: T) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (array[mid] === search) {
      return mid;
    } else if (array[mid] < search) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1; // Not found
}

class Almanac {
  public constructor(public seeds: number[], public maps: Map[]) {}

  public static from(input: string) {}
}

type Entry = {
  start: {
    destination: number;
    source: number;
  };
  range: number;
};

class Map {
  private from?: string;
  private to?: string;
  public constructor(public entries: Entry[]) {}

  public lookup(source: number) {
    // Binary search
  }
}

export function one(input: string): number {
  return 0;
}
export function two(input: string): number {
  return 0;
}

console.table({
  "Part 1": one(input),
  "Part 2": two(input),
});
