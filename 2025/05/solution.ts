import { count } from "node:console";
import { range, raw } from "utils";

const input = raw("2025/05/input.txt");

export function one(input: string): number {
	const [rangesStr, ingredients] = input.trim().split("\n\n").map((s) =>
		s.lines()
	);

	const ranges = rangesStr.map((r) => {
		const [start, end] = r.split("-").map(Number);
		return { start, end };
	});

	const ingredientNums = ingredients.map(Number);

	const isInRange = (n: number) =>
		ranges.some((r) => n >= r.start && n <= r.end);

	const checked = new Set<number>();
	return ingredientNums.reduce((total, number) => {
		if (isInRange(number) && !checked.has(number)) {
			checked.add(number);
			return total + 1;
		}
		return total;
	}, 0);
}
export function two(input: string): number {
	const [rangesStr] = input.trim().split("\n\n").map((s) => s.lines());

	const ranges = rangesStr
		.map((r) => {
			const [start, end] = r.split("-").map(Number);
			return { start, end };
		})
		.sort((a, b) => a.start - b.start);

	let total = 0;
	let currentStart = -1;
	let currentEnd = -1;

	for (const { start, end } of ranges) {
		if (start <= currentEnd + 1) {
			// Overlapping or adjacent, extend
			currentEnd = Math.max(currentEnd, end);
		} else {
			// Gap found, count previous range
			if (currentEnd >= 0) {
				total += currentEnd - currentStart + 1;
			}
			currentStart = start;
			currentEnd = end;
		}
	}

	// Add final range
	if (currentEnd >= 0) {
		total += currentEnd - currentStart + 1;
	}

	return total;
}

console.table({
	"Part 1": one(input),
	"Part 2": two(input),
});
