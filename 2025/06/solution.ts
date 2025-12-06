import { raw } from "utils";

const input = raw("2025/06/input.txt");

export function one(input: string): number {
	// Get columns
	const problems = input.lines().map((line) => {
		return line.trim().split(/\s+/);
	}).reduce((cols, row) => {
		row.forEach((val, i) => (cols[i] = cols[i] || []).push(val));
		return cols;
	}, [] as string[][]);

	const solutions = problems.reduce((total, p) => {
		const operator = p.pop();
		const numbers = p.map(Number);

		return total + eval(`${numbers.join(operator)}`);
	}, 0);

	return solutions;
}
export function two(input: string): number {
	const rows = input.lines();
	const width = Math.max(...rows.map((row) => row.length));
	const grid = rows.map((row) => row.padEnd(width, " "));
	const height = grid.length;

	// Group columns into problems from right to left, separated by empty columns
	const problems: number[][] = [];
	let current: number[] = [];

	for (let col = width - 1; col >= 0; col--) {
		const isSeparator = grid.every((row) => row[col] === " ");

		if (isSeparator) {
			if (current.length) {
				problems.push(current);
				current = [];
			}
			continue;
		}

		current.push(col);
	}

	if (current.length) {
		problems.push(current);
	}

	const solutions = problems.reduce((total, problem) => {
		const operatorCol = problem.find((col) => grid[height - 1][col] !== " ");
		if (operatorCol === undefined) return total;

		const operator = grid[height - 1][operatorCol];
		const numbers = problem.map((col) => {
			const digits = grid
				.slice(0, height - 1)
				.map((row) => row[col])
				.filter((char) => char.trim());

			return Number(digits.join(""));
		});

		const problemTotal = operator === "+"
			? numbers.reduce((sum, n) => sum + n, 0)
			: numbers.reduce((product, n) => product * n, 1);

		return total + problemTotal;
	}, 0);

	return solutions;
}

console.table({
	"Part 1": one(input),
	"Part 2": two(input),
});
