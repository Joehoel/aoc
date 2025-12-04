import { raw } from "utils";

const input = raw("2023/02/input.txt");

type Subset = { red: number; green: number; blue: number };

type Color = keyof Subset;

class Game {
	constructor(
		public id: number,
		public subsets: Subset[],
		public requirements: Record<Color, number>,
	) {}

	public get possible() {
		return this.subsets.every((subset) => {
			return Object.entries(subset).every(([key, num]) => {
				return num <= this.requirements[key as Color];
			});
		});
	}

	public get power() {
		// Get the max of each color for every game
		const maxes: Subset = { red: 0, green: 0, blue: 0 };

		for (const subset of this.subsets) {
			for (const [color, number] of Object.entries(subset)) {
				maxes[color as Color] = Math.max(maxes[color as Color], number);
			}
		}

		return Object.values(maxes).reduce((acc, num) => acc * num, 1);
	}

	public static from(value: string) {
		const parts = value.split(": ");
		const id = parseInt(parts[0].split(" ")[1], 10);

		const subsets = parts[1].split("; ").map((subset) => {
			const counts: Subset = { red: 0, green: 0, blue: 0 };

			for (const str of subset.split(", ")) {
				const [num, key] = str.split(" ");

				counts[key as Color] = parseInt(num);
			}

			return counts;
		});

		return new Game(id, subsets, { red: 12, green: 13, blue: 14 });
	}
}

export function one(input: string): number {
	const games = input.lines().map((line) => Game.from(line));

	return games
		.filter((game) => game.possible)
		.map((game) => game.id)
		.sum();
}
export function two(input: string): number {
	const games = input.lines().map((line) => Game.from(line));
	return games.map((game) => game.power).sum();
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
