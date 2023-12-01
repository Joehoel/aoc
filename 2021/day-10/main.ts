import { lines } from "../utils.ts";

const input = lines("day-10/input.txt").map((line) => line.split(""));

// loop over all tags and check if there is an opening tag, then loop over the rest until the corresponding closing tag is found, if its not found, the line is corrupt and need to be removed.
class Subsystem {
	private readonly opening = ["{", "[", "(", "<"];
	private readonly closing = ["}", "]", ")", ">"];

	private chunks: string[][];

	constructor(chunks: string[][]) {
		this.chunks = chunks;
	}
}

const ss = new Subsystem(input);
