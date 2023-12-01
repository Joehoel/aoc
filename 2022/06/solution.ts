import { raw } from "utils";

const input = raw("2022/06/input.txt");

function detectMarker(sequence: string, length: number) {
	const chars = sequence
		.split("")
		.map((c) => c.trim())
		.filter(Boolean);

	// find the index where there is a sequence of 4 unique letters
	const marker = chars.findIndex((_, i) => {
		const slice = chars.slice(i, i + length);

		return new Set(slice).size === length;
	});

	return marker + length;
}

export function one(input: string) {
	return detectMarker(input, 4);
}

export function two(input: string) {
	return detectMarker(input, 14);
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
