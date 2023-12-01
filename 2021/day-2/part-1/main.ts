const input = Deno.readTextFileSync("day-2/input.txt")
	.split("\n")
	.map((string) => string.trim())
	.filter((string) => string.length > 0);

let depth = 0;
let position = 0;

for (const string of input) {
	const [instruction, amount] = string.split(" ");

	if (instruction === "forward") {
		position += Number(amount);
	} else if (instruction === "down") {
		depth += Number(amount);
	} else if (instruction === "up") {
		depth -= Number(amount);
	}
}

const output = depth * position;

console.log(output);

export {};
