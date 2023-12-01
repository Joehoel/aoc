import { lines, sum } from "../utils.ts";

/* Oplossing dankzij @Alex, niet zelf bedacht */

type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g";

class Digit {
	public readonly segments: Segment[];

	constructor(digit: string) {
		this.segments = digit
			.split("")
			.filter((value, index, array) => array.indexOf(value) === index)
			.sort() as Segment[];
	}

	// length
	public get length(): number {
		return this.segments.length;
	}

	// toString
	public toString() {
		return this.segments.join("");
	}
}

// Display
class Display {
	// keep track of all digits and displayed digits (left, right)
	public left: Digit[];
	public right: Digit[];
	// a map of all digits mapped to a number
	public digitToNumber: { [digit: string]: number };

	// a map of all numbers mapped to digits
	public numberToDigit: { [number: number]: Digit };

	// keep track of unmapped digits
	private unmapped: Digit[];

	constructor(left: string[], right: string[]) {
		this.left = left.map((digit) => new Digit(digit));
		this.right = right.map((digit) => new Digit(digit));

		this.digitToNumber = {};
		this.numberToDigit = {};

		this.unmapped = [...this.left];

		// Number
		// Length

		// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
		// 6, 2, 5, 5, 4, 5, 6, 3, 7, 6
		this.findByLength(2, 1);
		// 0, 2, 3, 4, 5, 6, 7, 8, 9
		// 6, 5, 5, 4, 5, 6, 3, 7, 6
		this.findByLength(4, 4);
		// 0, 2, 3, 5, 6, 7, 8, 9
		// 6, 5, 5, 5, 6, 3, 7, 6
		this.findByLength(3, 7);
		// 0, 2, 3, 5, 6, 8, 9
		// 6, 5, 5, 5, 6, 7, 6
		this.findByLength(7, 8);
		// 0, 2, 3, 5, 6, 9
		// 6, 5, 5, 5, 6, 6
		this.findByContains(5, 3, [1]);
		// 0, 2, 5, 6, 9
		// 6, 5, 5, 6, 6
		this.findByContains(6, 9, [3]);
		// 0, 2, 5, 6
		// 6, 5, 5, 6
		this.findByContains(6, 0, [1]);
		// 2, 5, 6
		// 5, 5, 6
		this.findByLength(6, 6);
		// 2, 5
		// 5, 5
		this.findBySegmentMatch(5, 5, { number: 4, segmentMatchCount: 3 });
		// 2
		// 5
		this.findByLength(5, 2);
	}

	private findByLength(length: number, number: number) {
		const match = this.unmapped.filter((digit) => digit.length == length);

		this.setDigit(match, number);
	}

	private findByContains(length: number, number: number, contains: number[]) {
		const shouldContainDigits = contains.map((number) =>
			this.numberToDigit[number]
		);

		const match = this.unmapped
			.filter((digit) => digit.length == length)
			.filter((digit) => {
				// Every digits segment in shuoldContainDigits should be in digit and there should only be one
				return shouldContainDigits.every((shouldContainDigit) =>
					shouldContainDigit.segments.every((segment) =>
						digit.segments.includes(segment)
					)
				);
			});
		this.setDigit(match, number);
	}

	private findBySegmentMatch(
		length: number,
		number: number,
		segmentsMatches: { number: number; segmentMatchCount: number },
	) {
		const match = this.unmapped
			.filter((digit) => digit.length == length)
			.filter((digit) => digit)
			.filter((digit) => {
				return (
					this.numberToDigit[segmentsMatches.number].segments.filter((seg) => {
						return digit.segments.includes(seg);
					}).length == segmentsMatches.segmentMatchCount
				);
			});

		this.setDigit(match, number);
	}

	private setDigit(match: Digit[], number: number) {
		if (match.length !== 1) throw new Error("1 Match expected");
		const digit = match[0];

		// Alles bijhouden
		this.digitToNumber[digit.toString()] = number;
		this.numberToDigit[number] = digit;

		// Remove digit from unmapped list
		this.unmapped.splice(this.unmapped.indexOf(digit), 1);
	}
}

const input = lines("day-8/input.txt").map((line) => {
	const [left, right] = line.split(" | ").map((s) => s.trim().split(" "));

	return {
		left,
		right,
	};
});

const readings = input.map(({ left, right }) => {
	return new Display(left, right);
});

const output = readings
	.map((reading) => {
		return reading.right
			.map((displayed) => reading.digitToNumber[displayed.toString()])
			.map((n) => `${n}`)
			.join("");
	})
	.map(Number);

console.log(output);
console.log(sum(output));
