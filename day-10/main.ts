import { lines } from "../utils.ts";

const input = lines("day-10/input.txt").map(line => line.split(""));

const opening = ["{", "[", "(", "<"];
const closing = ["}", "]", ")", ">"];

// loop over all tags and check if there is an opening tag, then loop over the rest until the corresponding closing tag is found, if its not found, the line is corrupt and need to be removed.
class Subsystem {
    public chunks: string[][] = [];
    public legalChunks: string[][] = [];

    constructor(chunks: string[][]) {
        this.chunks = chunks;
        this.findChunks();
    }

    public findChunks() {}
}

const ss = new Subsystem(input);
console.log(ss.legalChunks);
