import { intersection, raw } from "utils";

const input = raw("2023/04/input.txt");

export function one(input: string): number {
	return input.lines().reduce((total, l) => {
		const [winning, mine] = l
			.split(": ")[1]
			.split("|")
			.map(
				(x) =>
					new Set(
						x
							.split(" ")
							.map((y) => parseInt(y))
							.filter(Boolean),
					),
			);

		const count = intersection([...winning], [...mine]).length;

		if (count > 0) {
			return (total += 2 ** (count - 1));
		}

		return total;
	}, 0);
}
export function two(input: string): number {
	const scratchcards = new Map<number, number>();

	return input.lines().reduce((total, l, i) => {
		if (!scratchcards.has(i + 1)) {
			scratchcards.set(i + 1, 1);
		}

		const [winning, mine] = l
			.split(": ")[1]
			.split("|")
			.map(
				(x) =>
					new Set(
						x
							.split(" ")
							.map((y) => parseInt(y))
							.filter(Boolean),
					),
			);

		const count = intersection([...winning], [...mine]).length;

		total += scratchcards.get(i + 1) || 0;

		for (let j = i + 2; j <= i + 1 + count; j++) {
			scratchcards.set(
				j,
				(scratchcards.get(j) || 1) + (scratchcards.get(i + 1) || 0),
			);
		}

		return total;
	}, 0);
}

console.table({
	"Part 1": one(input),
	"Part 2": two(input),
});
