const input = Deno.readTextFileSync("day-3/input.txt")
	.split("\n")
	.map((string) => string.trim())
	.filter((string) => string.length > 0);

function rating(
	input: string[],
	fn: (zeros: number, length: number) => string,
	number = 0,
): number {
	if (input.length === 0) {
		return parseInt(input[0], 2);
	}

	const zeros = input.filter((x: string) => x[number] === "0").length;
	const bit = fn(zeros, input.length);
	const values = input.filter((x: string) => x[number] === bit);
	return rating(values, fn, number + 1);
}

function ratings(input: string[]) {
	const oxygen = (zeros: number, length: number) => {
		return zeros > length / 2 ? "0" : "1";
	};

	const co2 = (zeros: number, length: number) => {
		return zeros <= length / 2 ? "0" : "1";
	};

	return {
		oxygen: rating(input, oxygen, 0),
		co2: rating(input, co2),
	};
}

const { oxygen, co2 } = ratings(input);
console.log(ratings(input));
console.log(oxygen * co2);

export {};
