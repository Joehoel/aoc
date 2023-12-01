const input = Deno.readTextFileSync("day-1/input.txt").split("\n").map(Number);

export const count = (arr: number[]) =>
	arr.reduce((acc, curr, index, array) => {
		// count the number of times a measurement (curr) increases from the previous measurement (acc)
		if (index == 0) {
			console.log(`${curr} (N/A - no previous measurement)`);
			return acc;
		}
		if (curr > array[index - 1]) {
			console.log(`${curr} (increased)`);
			return acc + 1;
		} else if (curr == array[index - 1]) {
			console.log(`${curr} (N/A - no change)`);
			return acc;
		}
		return acc;
	}, 0);

console.log(count(input));
