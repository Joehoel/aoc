import { raw } from "../../utils.ts";

const input = raw("2022/12/input.txt");

type Point = { x: number; y: number };

type Path = Point[];

const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,

  S: 1,
  E: 26,
};

function validMoves(grid: number[][], point: Point) {
  const moves = [
    { x: point.x + 1, y: point.y },
    { x: point.x - 1, y: point.y },
    { x: point.x, y: point.y + 1 },
    { x: point.x, y: point.y - 1 },
  ];

  const elevation = grid[point.y][point.x];

  return moves.filter(move => {
    const { x, y } = move;

    if (x < 0 || y < 0) return false;
    if (x >= grid[0].length || y >= grid.length) return false;

    return grid[y][x] >= elevation - 1;
  });
}

export function one(input: string): number {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));

  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = grid[y][x];
      if (tile === "S") start = { x, y };
      if (tile === "E") end = { x, y };
    }
  }
  const numberGrid = grid.map(row =>
    row.map(tile => letterToNumber[tile as keyof typeof letterToNumber])
  );

  const pointToString = (point: Point) => `${point.x},${point.y}`;
  const visitedPoints = new Set<string>([pointToString(start)]);

  let incompletePaths: Path[] = [[start]];

  while (incompletePaths.length > 0) {
    const newIncompletePaths: Path[] = [];

    for (const incompletePath of incompletePaths) {
      const lastPoint = incompletePath[incompletePath.length - 1];
      const moves = validMoves(numberGrid, lastPoint);

      for (const move of moves) {
        if (visitedPoints.has(pointToString(move))) continue;

        visitedPoints.add(pointToString(move));

        const newIncompletePath = [...incompletePath];

        newIncompletePath.push(move);

        if (move.x === end.x && move.y === end.y) {
          console.log("ANSWER FOUND");

          return newIncompletePath.length - 1;
        }

        newIncompletePaths.push(newIncompletePath);
      }
    }
    incompletePaths = newIncompletePaths;
  }

  throw new Error("No path found");
}
export function two(input: string): number {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));

  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = grid[y][x];
      if (tile === "S") start = { x, y };
      if (tile === "E") end = { x, y };
    }
  }
  const numberGrid = grid.map(row =>
    row.map(tile => letterToNumber[tile as keyof typeof letterToNumber])
  );

  const pointToString = (point: Point) => `${point.x},${point.y}`;
  const visitedPoints = new Set<string>([pointToString(start)]);

  let incompletePaths: Path[] = [[end]];

  while (incompletePaths.length > 0) {
    const paths: Path[] = [];

    for (const incompletePath of incompletePaths) {
      const lastPoint = incompletePath[incompletePath.length - 1];
      const moves = validMoves(numberGrid, lastPoint);

      for (const move of moves) {
        if (visitedPoints.has(pointToString(move))) continue;

        visitedPoints.add(pointToString(move));

        const newIncompletePath = [...incompletePath];

        newIncompletePath.push(move);

        if (numberGrid[move.y][move.x] === 1) {
          console.log("ANSWER FOUND");

          return newIncompletePath.length - 1;
        }

        paths.push(newIncompletePath);
      }
    }
    console.log("before", incompletePaths.length);
    console.log("after", paths.length);

    incompletePaths = paths;
  }

  throw new Error("No path found");
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
