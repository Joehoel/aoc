import { raw } from "../../utils.ts";

const input = raw("2022/08/input.txt");

type Cell = {
	top: number[];
	right: number[];
	bottom: number[];
	left: number[];
};

function findNeighbors(grid: number[][]) {
	const neighbors: Record<string, Cell> = {};

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			// Continue if the current cell is in the outside row or column
			if (
				i === 0 || j === 0 || i === grid.length - 1 || j === grid[i].length - 1
			) {
				continue;
			}

			// Get all the neighbors
			const top = grid.slice(0, i).map((row) => row[j]);
			const right = grid[i].slice(j + 1, grid.length);
			const bottom = grid.slice(i + 1).map((row) => row[j]);
			const left = grid[i].slice(0, j);

			// Add the neighbors to the neighbors object
			neighbors[`${i}-${j}`] = {
				top,
				right,
				bottom,
				left,
			};
		}
	}

	return neighbors;
}

export function one(input: string): number {
	const lines = input.split("\n").filter(Boolean);

	const grid = lines.map((line) => line.split("").map(Number));

	// Create a new Map object

	const outsideCount = grid.length * 2 + (grid[0].length - 2) * 2;

	let visible = 0;
	const neighbors = findNeighbors(grid);

	for (const [key, { bottom, left, top, right }] of Object.entries(neighbors)) {
		const i = Number(key.split("-")[0]);
		const j = Number(key.split("-")[1]);

		if (grid[i][j] > Math.max(...top)) {
			visible++;
			continue;
		}

		if (grid[i][j] > Math.max(...right)) {
			visible++;
			continue;
		}

		if (grid[i][j] > Math.max(...bottom)) {
			visible++;
			continue;
		}

		if (grid[i][j] > Math.max(...left)) {
			visible++;
			continue;
		}
	}

	return visible + outsideCount;
}

function findDistanceToTallerTrees(
	grid: number[][],
	i: number,
	j: number,
	direction: string,
) {
	let distance = 0;

	if (direction === "top") {
		for (let k = i - 1; k >= 0; k--) {
			distance++;
			if (grid[k][j] >= grid[i][j]) {
				break;
			}
		}
	} else if (direction === "left") {
		for (let k = j - 1; k >= 0; k--) {
			distance++;
			if (grid[i][k] >= grid[i][j]) {
				break;
			}
		}
	} else if (direction === "bottom") {
		for (let k = i + 1; k < grid.length; k++) {
			distance++;
			if (grid[k][j] >= grid[i][j]) {
				break;
			}
		}
	} else if (direction === "right") {
		for (let k = j + 1; k < grid[i].length; k++) {
			distance++;
			if (grid[i][k] >= grid[i][j]) {
				break;
			}
		}
	}

	return distance;
}

export function two(input: string): number {
	const lines = input.split("\n").filter(Boolean);

	const grid = lines.map((line) => line.split("").map(Number));

	let maxScenicScore = 0;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			// bepaal de afstand naar andere bomen in elke richting
			const top = findDistanceToTallerTrees(grid, i, j, "top");
			const left = findDistanceToTallerTrees(grid, i, j, "left");
			const bottom = findDistanceToTallerTrees(grid, i, j, "bottom");
			const right = findDistanceToTallerTrees(grid, i, j, "right");

			// bereken het uitzichtspunt voor de huidige boom door de afstanden te vermenigvuldigen
			const scenicScore = top * left * bottom * right;

			// bewaar het hoogste uitzichtspunt dat u hebt gevonden
			maxScenicScore = Math.max(maxScenicScore, scenicScore);
		}
	}
	return maxScenicScore;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
