import { raw, sum } from "utils";

const input = raw("2022/07/input.txt");

const MAX = 100000;

type Directory = {
  parent?: Directory;
  files: Record<string, number>;
  directories: Record<string, Directory>;
};

function tree(input: string) {
  const fileSystem: Directory = { files: {}, directories: {} };

  // Get commands that start with $
  const lines = input.split("\n").filter(Boolean);

  let current = fileSystem;

  for (const line of lines) {
    const [size, cmd, arg] = line.split(" ");
    if (line.startsWith("$")) {
      if (cmd === "cd") {
        if (arg === "..") {
          current = current.parent || fileSystem;
        } else if (arg === "/") {
          current = fileSystem;
        } else {
          if (!current.directories[arg]) {
            current.directories[arg] = { parent: current, files: {}, directories: {} };
          }

          current = current.directories[arg];
        }
      }
    } else if (!line.startsWith("dir")) {
      current.files[cmd] = parseInt(size);
    }
  }

  return fileSystem;
}

const dirSizes: number[] = [];

const directorySize = (curr: Directory): number => {
  let size = 0;

  for (const file in curr.files) {
    size += curr.files[file];
  }

  for (const dir in curr.directories) {
    const dirSize = directorySize(curr.directories[dir]);
    size += dirSize;

    dirSizes.push(dirSize);
  }

  return size;
};
export function one(input: string) {
  const fs = tree(input);

  directorySize(fs);

  return sum(dirSizes.filter(size => size <= MAX));
}

export function two(input: string): number {
  const TOTAL_SPACE = 70000000;
  const NEEDED_SPACE = 30000000;

  const fs = tree(input);

  const rootSize = directorySize(fs);

  // Find the smallest directory in fs that can be deleted that is equal to or greater than SIZE_TO_DELETE
  const smallest = Math.min(
    ...dirSizes.filter(size => size >= NEEDED_SPACE - (TOTAL_SPACE - rootSize))
  );

  return smallest;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
