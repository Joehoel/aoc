const input = Deno.readTextFileSync("day-3/input.txt")
	.split("\n")
	.map((string) => string.trim())
	.filter((string) => string.length > 0);

const count = input[0].length;

const rates = (input: string[]) => {
	const gamma: string[] = [];
	const epsilon: string[] = [];

	const bitLength = input[0].length;

	for (let i = 0; i < bitLength; i++) {
		let zeros = input.filter((string) => string[i] === "0").length;
		if (zeros > input.length / 2) {
			epsilon.push("0");
			gamma.push("1");
		} else {
			epsilon.push("1");
			gamma.push("0");
		}
		// let ones = 0;
	}

	return {
		gamma: parseInt(gamma.join(""), 2),
		epsilon: parseInt(epsilon.join(""), 2),
	};
};

const { gamma, epsilon } = rates(input);

console.log(gamma * epsilon);

export {};
