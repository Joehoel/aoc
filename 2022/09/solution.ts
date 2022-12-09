import { range, raw } from "../../utils.ts";

const input = raw("2022/09/input.txt");

type Direction = "U" | "D" | "L" | "R";

type Movement = {
  direction: Direction;
  steps: number;
};
type Position = {
  x: number;
  y: number;
};

const directions: Record<Direction, ({ x, y }: Position) => Position> = {
  D: ({ x, y }) => ({ x, y: y - 1 }),
  U: ({ x, y }) => ({ x, y: y + 1 }),
  L: ({ x, y }) => ({ x: x - 1, y }),
  R: ({ x, y }) => ({ x: x + 1, y }),
};

function positionDiff(start: Position, end: Position): Position {
  return { x: end.x - start.x, y: end.y - start.y };
}

function move(tail: Position, head: Position): Position {
  const diff = positionDiff(tail, head);

  if (diff.x >= -1 && diff.x <= 1 && diff.y >= -1 && diff.y <= 1) {
    return { x: tail.x, y: tail.y };
  }
  // top
  else if (diff.y === +2 && diff.x === -1) return { x: tail.x - 1, y: tail.y + 1 };
  else if (diff.y === +2 && diff.x === 0) return { x: tail.x, y: tail.y + 1 };
  else if (diff.y === +2 && diff.x === +1) return { x: tail.x + 1, y: tail.y + 1 };
  // bottom
  else if (diff.y === -2 && diff.x === -1) return { x: tail.x - 1, y: tail.y - 1 };
  else if (diff.y === -2 && diff.x === 0) return { x: tail.x, y: tail.y - 1 };
  else if (diff.y === -2 && diff.x === +1) return { x: tail.x + 1, y: tail.y - 1 };
  // right
  else if (diff.x === +2 && diff.y === -1) return { x: tail.x + 1, y: tail.y - 1 };
  else if (diff.x === +2 && diff.y === 0) return { x: tail.x + 1, y: tail.y };
  else if (diff.x === +2 && diff.y === +1) return { x: tail.x + 1, y: tail.y + 1 };
  // left
  else if (diff.x === -2 && diff.y === -1) return { x: tail.x - 1, y: tail.y - 1 };
  else if (diff.x === -2 && diff.y === 0) return { x: tail.x - 1, y: tail.y };
  else if (diff.x === -2 && diff.y === +1) return { x: tail.x - 1, y: tail.y + 1 };
  else if (diff.x === 2 && diff.y === 2) return { x: tail.x + 1, y: tail.y + 1 };
  else if (diff.x === 2 && diff.y === -2) return { x: tail.x + 1, y: tail.y - 1 };
  else if (diff.x === -2 && diff.y === -2) return { x: tail.x - 1, y: tail.y - 1 };
  else if (diff.x === -2 && diff.y === 2) return { x: tail.x - 1, y: tail.y + 1 };

  throw new Error(`Moved too much: diff(x: ${diff.x},y: ${diff.y})`);
}

function getMovements(input: string): Movement[] {
  return input
    .trim()
    .split("\n")
    .map(line => {
      const [direction, steps] = line.split(" ");

      if (direction !== "D" && direction !== "L" && direction !== "U" && direction !== "R") {
        throw new Error(`Wrong direction: "${direction}"`);
      }

      return {
        direction: direction as Direction,
        steps: parseInt(steps, 10),
      };
    });
}

function getTail(rope: Position[]) {
  return rope[rope.length - 1];
}

export function one(input: string): number {
  const movements = getMovements(input);

  const visited = new Set<string>([JSON.stringify({ x: 0, y: 0 })]);

  let head: Position = { x: 0, y: 0 };
  let tail: Position = { x: 0, y: 0 };

  for (const { direction, steps } of movements) {
    for (const _ of range(0, steps)) {
      head = directions[direction](head);
      tail = move(tail, head);
      visited.add(JSON.stringify(tail));
    }
  }

  return visited.size;
}
export function two(input: string): number {
  const movements = getMovements(input);

  const visited = new Set<string>([JSON.stringify({ x: 0, y: 0 })]);

  const rope: Position[] = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }));

  for (const { direction, steps } of movements) {
    for (const _ of range(0, steps)) {
      rope[0] = directions[direction](rope[0]);

      for (const i of range(1, rope.length)) {
        rope[i] = move(rope[i], rope[i - 1]);
      }

      visited.add(JSON.stringify(getTail(rope)));
    }
  }

  return visited.size;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
