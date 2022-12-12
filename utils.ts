export const sum = (n: number[]): number => n.reduce((sum, x) => sum + x, 0);

export const range = (start: number, end: number, step = 1): number[] =>
  [...Array(end - start).keys()].map(i => start + i * step).filter(x => x < end);

export const raw = (file: string): string => Deno.readTextFileSync(file);

export const lines = (file: string, split: string | RegExp = "\n"): string[] =>
  raw(file)
    .split(split)
    .map(x => x.trim())
    .filter(x => x);

export const groups = (file: string): string[][] => {
  const parts: string[][] = [[]];

  for (const line of raw(file)) {
    if (!line.trim().length) {
      parts.push([]);
    } else {
      parts[parts.length - 1].push(line);
    }
  }

  return parts.filter(x => x.length > 0);
};

export const chunks = <T>(n: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < n.length; i += size) {
    chunks.push(n.slice(i, i + size));
  }

  return chunks;
};

export const median = (n: number[]) => {
  const sorted = [...n].sort((a, b) => a - b);

  return [Math.floor(sorted.length / 2)];
};

export const intersection = <T>(a: T[], b: T[]): T[] => {
  return a.filter(x => b.includes(x));
};

export const intersect = <T>(a: T[], b: T[], full = true): boolean => {
  if (!full) return a.some(x => b.includes(x));

  return a.every(x => b.includes(x));
};

export class Stack<T> {
  private items: T[] = [];

  constructor(...items: T[]) {
    this.items = items;
  }

  push(item: T) {
    this.items.push(item);
  }

  pop(count = 1): T | undefined {
    return this.items.splice(this.items.length - count, count)[0];
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get length() {
    return this.items.length;
  }
}

export const fillUntil = <T>(n: T[], size: number, fill: T): T[] => {
  return n.length < size ? [...n, ...Array(size - n.length).fill(fill)] : n;
};

export function is(
  type: any | null | undefined | boolean | number | string | symbol | object,
  x: string | number
): x is number {
  return typeof x === type;
}

export function letterToNumber(letter: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter) + 1;
}
