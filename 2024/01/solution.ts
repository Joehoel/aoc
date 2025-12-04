import { diff } from "testing/_diff.ts";
import { raw } from "utils";

const input = raw("2024/01/input.txt");

export function one(input: string): number {
	const lists = input.lines().map((x) => x.split("   "));
	// Get the first item for the left and the second items for the right side and get a list for bots
	const [left, right] = lists.reduce<[Array<number>, Array<number>]>(
		([left, right], [l, r]) => {
			left.push(parseInt(l));
			right.push(parseInt(r));
			return [left, right];
		},
		[[], []],
	);

	left.sort((a, b) => a - b);
	right.sort((a, b) => a - b);

	// Get the diff of every item at the same index
	const diffs = left.map((_, i) => Math.abs(right[i] - left[i]));

	return diffs.sum();
}
export function two(input: string): number {
	const lists = input.lines().map((x) => x.split("   "));
	// Get the first item for the left and the second items for the right side and get a list for bots
	const [left, right] = lists.reduce<[Array<number>, Array<number>]>(
		([left, right], [l, r]) => {
			left.push(parseInt(l));
			right.push(parseInt(r));
			return [left, right];
		},
		[[], []],
	);

	// Calculate how many times each number in the left list appears in the right list
	const counts = left.map((x) => {
		return right.filter((y) => y === x).length;
	});
	// Get the score by adding up each number in the left ist after multiplying it by the amount of times it appears in the right list
	return left.map((x, i) => x * counts[i]).sum();
}

console.table({
	"Part 1": one(input),
	"Part 2": two(input),
});
