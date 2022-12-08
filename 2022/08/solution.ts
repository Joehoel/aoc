import { raw, sum } from "utils";

const input = raw("2022/08/input.txt");

type Cell = {
  top: number[];
  right: number[];
  bottom: number[];
  left: number[];
};

export function one(input: string): number {
  const lines = input.split("\n").filter(Boolean);

  const grid = lines.map(line => line.split("").map(Number));

  // Create a new Map object
  const neighbours = new Map<number, number[]>();

  // Iterate over the grid using a for loop
  for (let i = 0; i < grid.length; i++) {
    // Add an if statement that checks if the current index is 0 or the last index in the grid array
    if (i === 0 || i === grid.length - 1) {
      // Continue to the next iteration of the loop
      continue;
    }

    const row = grid[i];

    const top: number[] = grid.reduce((acc, row, j) => {
      // Add an if statement that checks if the current index is 0 or the last index in the grid array
      if (j < i) {
        return acc.concat(row[i]);
      }
      return acc;
    }, []);

    const right: number[] = row.slice(i + 1);

    // Add an if statement that checks if the current index is 0 or the last index in the grid array
    if (i === 0 || i === grid.length - 1) {
      // Continue to the next iteration of the loop
      continue;
    }

    const bottom: number[] = grid.reduce((acc, row, j) => {
      if (j > i) {
        return acc.concat(row[i]);
      }
      return acc;
    }, []);

    const left: number[] = row.slice(0, i);

    // Create an object with the top, right, bottom, and left neighbours of the current element in the grid
    const cell: Cell = {
      top,
      right,
      bottom,
      left,
    };

    // Use the set() method on the Map object to store the cell object with the current element in the grid as the key
    neighbours.set(grid[i][i], cell);
  }

  //   Go through all the neighbors and check if every neighbor is lower or equal to the its value
  const visible = grid.reduce((acc, row, i) => {
    // Add an if statement that checks if the current index is 0 or the last index in the grid array
    if (i === 0 || i === grid.length - 1) {
      // Continue to the next iteration of the loop
      return acc;
    }

    const current = row[i];

    const cell = neighbours.get(current);

    if (!cell) {
      return acc;
    }

    const { top, right, bottom, left } = cell;

    const isTopVisible = top.every(n => n <= current);

    const isRightVisible = right.every(n => n <= current);

    const isBottomVisible = bottom.every(n => n <= current);

    const isLeftVisible = left.every(n => n <= current);

    if (isTopVisible && isRightVisible && isBottomVisible && isLeftVisible) {
      return acc + 1;
    }
  });

  return sum(visible);
}

export function two(input: string): number {
  return 0;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
