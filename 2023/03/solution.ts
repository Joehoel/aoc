import { raw } from "utils";

const input = raw("2023/03/input.txt");

const adjacents = [
	[0, 1], // Top
	[0, -1], // Bottom
	[-1, 0], // Left
	[1, 0], // Right
	[1, 1], // Top right
	[-1, 1], // Top left
	[1, -1], // Bottom right
	[-1, -1], // Bottom left
];

function getAdjacentSymbol(grid: string[][], x: number, y: number) {
	const match = adjacents.find(([adjacentX, adjacentY]) => {
		const posX = x + adjacentX;
		const posY = y + adjacentY;

		return (
			posX >= 0 && // Check if out of bounds on the left.
			posX < grid.length && //   Check if out of bounds on the right
			posY >= 0 &&
			posY < grid[0].length && // Check if out of bounds on the top or bottom
			isSymbol(grid[posX][posY])
		);
	});

	if (!match) {
		return null;
	}

	return {
		x: x + match[0],
		y: y + match[1],
	};
}

function isSymbol(value: string): boolean {
	return !value.isDigit() && value !== ".";
}

export function one(input: string): number {
	const grid = input.lines().map((line) => line.split(""));

	const surrounded: number[] = [];

	grid.forEach((line, y) => {
		return [...line.join("").matchAll(/\d+/g)].map((match) => {
			const startOfMatch = match.index;

			if (typeof startOfMatch === "undefined") {
				return;
			}

			let matchSurrounded = false;

			for (let x = 0; x < match[0].length; x++) {
				if (getAdjacentSymbol(grid, y, startOfMatch + x)) {
					matchSurrounded = true;
					break;
				}
			}

			if (matchSurrounded) {
				surrounded.push(parseInt(match[0]));
			}
		});
	});

	return surrounded.sum();
}
export function two(input: string): number {
	const grid = input.lines().map((line) => line.split(""));

	const symbolHits = new Map<string, number[]>();

	grid.forEach((line, y) => {
		return [...line.join("").matchAll(/\d+/g)].map((match) => {
			const startOfMatch = match.index;

			if (typeof startOfMatch === "undefined") {
				return;
			}

			for (let x = 0; x < match[0].length; x++) {
				const matchCoords = getAdjacentSymbol(grid, y, startOfMatch + x);
				if (matchCoords) {
					const key = `${matchCoords.x},${matchCoords.y}`;
					if (symbolHits.has(key)) {
						const newValues = new Set([
							...symbolHits.get(key)!,
							parseInt(match[0]),
						]);
						symbolHits.set(key, [...newValues]);
					} else {
						symbolHits.set(key, [parseInt(match[0])]);
					}
				}
			}
		});
	});

	return Array.from(symbolHits.values())
		.filter((values) => values.length === 2)
		.reduce((sum, [a, b]) => sum + a * b, 0);
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
