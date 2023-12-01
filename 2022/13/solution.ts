const input = await Deno.readTextFile("2022/13/input.txt");

type Packet = number | number[];

type Pair = Packet | Packet[];

const fixPair = (
	pair: Pair,
): Pair => (typeof pair === "number" ? [pair] : pair);

function compair(left: Pair, right: Pair): boolean | undefined {
	if (Array.isArray(left) && Array.isArray(right)) {
		for (let i = 0; i < left.length && i < right.length; i++) {
			const diff = compair(left[i], right[i]);

			if (diff !== undefined) return diff;
		}

		// If the left list runs out of items first then the inputs are in the right order
		if (left.length < right.length) return true;
		// If the right list runs out of items first then the inputs are in the wrong order
		if (left.length > right.length) return false;

		return undefined;
	} else if (typeof left === "number" && typeof right === "number") {
		if (left < right) return true;
		if (left > right) return false;

		return undefined;
	} else {
		return compair(fixPair(left), fixPair(right));
	}
}

export function one(input: string): number {
	const pairs = input.split("\n\n").map((pair) => {
		const lines = pair.trim().split("\n");
		const packets = lines.map((line) => JSON.parse(line));

		return packets as [Pair[], Pair[]];
	});

	let correctIndeces = 0;
	let count = 0;

	for (const [left, right] of pairs) {
		count += 1;
		if (compair(left as Pair, right as Pair)) correctIndeces += count;
	}

	return correctIndeces;
}
export function two(input: string): number {
	const pairs = input.split("\n\n").map((pair) => {
		const lines = pair.trim().split("\n");
		const packets = lines.map((line) => JSON.parse(line));

		return packets as [Pair[], Pair[]];
	});

	const injection = [[[2]], [[6]]];

	const sorted = pairs
		.flat()
		.concat(injection)
		.sort((a, b) => (compair(a as Pair, b as Pair) ? -1 : 1));

	const key = [-1, -1];

	for (const p of sorted) {
		if (JSON.stringify(p) === JSON.stringify(injection[0])) {
			key[0] = sorted.indexOf(p) + 1;
		}
		if (JSON.stringify(p) === JSON.stringify(injection[1])) {
			key[1] = sorted.indexOf(p) + 1;
		}
	}

	return key[0] * key[1];
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
