import { raw, sum } from "../utils.ts";

const input = raw("day-7/input.txt").split(",").map(Number);

const max = Math.max(...input);

// Brute force
const outcomes = [];
for (let i = 0; i < max; i++) {
	const outcome = [];
	for (let j = 0; j < input.length; j++) {
		const cost = Math.abs(input[j] - i) * ((Math.abs(input[j] - i) + 1) / 2);
		outcome.push(cost);
	}
	outcomes.push(outcome);
}

const output = Math.min(...outcomes.map(sum));
console.log(output);
