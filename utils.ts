export const sum = (n: number[]): number => n.reduce((sum, x) => sum + x, 0);
export const multiply = (n: number[]): number =>
	n.reduce((product, x) => product * x, 1);
/**
 * Returns an array of numbers from `start` to `end` (exclusive) with a step size of `step`.
 * @param start The starting number of the range.
 * @param end The ending number of the range.
 * @param step The step size between each number in the range. Defaults to 1.
 * @returns An array of numbers from `start` to `end` (exclusive) with a step size of `step`.
 */
export function range(start: number, end: number, step = 1): number[] {
	return [...Array(end - start).keys()]
		.map((i) => start + i * step)
		.filter((x) => x <= end);
}

export const raw = (file: string): string => Deno.readTextFileSync(file).trim();

export const lines = (file: string, split: string | RegExp = "\n"): string[] =>
	raw(file)
		.split(split)
		.map((x) => x.trim())
		.filter((x) => x);

export const groups = (file: string): string[][] => {
	const parts: string[][] = [[]];

	for (const line of raw(file)) {
		if (!line.trim().length) {
			parts.push([]);
		} else {
			parts[parts.length - 1].push(line);
		}
	}

	return parts.filter((x) => x.length > 0);
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
	return a.filter((x) => b.includes(x));
};

export const intersect = <T>(a: T[], b: T[], full = true): boolean => {
	if (!full) return a.some((x) => b.includes(x));

	return a.every((x) => b.includes(x));
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

export function letterToNumber(letter: string) {
	const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return alphabet.indexOf(letter) + 1;
}
declare global {
	interface String {
		lines(): string[];
		chars(): string[];
		isDigit(): boolean;
	}

	interface Array<T> {
		chunks(size: number): T[][];
		first(): T | undefined;
		last(): T | undefined;
		fillUntil<T>(size: number, fill: T): T[];
		sum(): number;
		multiply(): number;
	}
}

String.prototype.lines = function () {
	return this.split("\n").filter(Boolean);
};

String.prototype.chars = function () {
	return this.split("")
		.map((c) => c.trim())
		.filter(Boolean);
};

String.prototype.isDigit = function () {
	return /^\d+$/.test(this.valueOf());
};

Array.prototype.first = function <T>(): T | undefined {
	return this[0];
};

Array.prototype.last = function <T>(): T | undefined {
	return this[this.length - 1];
};

Array.prototype.chunks = function <T>(size: number) {
	return chunks<T>(this, size);
};

Array.prototype.fillUntil = function <T>(size: number, fill: T) {
	return fillUntil<T>(this, size, fill);
};

Array.prototype.sum = function () {
	if (this.some((x) => Number.isNaN(x))) {
		throw new Error(
			`Can only sum an array of numbers. Got '${typeof this.first()}'`,
		);
	}

	return sum(this);
};
Array.prototype.multiply = function () {
	if (this.some((x) => Number.isNaN(x))) {
		throw new Error(
			`Can only multiply an array of numbers. Got '${typeof this.first()}'`,
		);
	}

	return multiply(this);
};
