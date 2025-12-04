import { raw } from "utils";

const input = raw("2023/06/input.txt");

class Document {
	public constructor(public races: Race[]) {}

	public static from(string: string) {
		const distances = string.lines()[0].split(" ").map(Number).filter(Boolean);
		const times = string.lines()[1].split(" ").map(Number).filter(Boolean);

		const races = distances.map((distance, index) => {
			return new Race(distance, times[index]);
		});

		return new Document(races);
	}
}

class Race {
	public constructor(public time: number, public record: number) {}

	public distance(speed: number) {
		return (this.time - speed) * speed;
	}

	public get win() {
		let won = 0;

		for (let speed = 0; speed < this.time; speed++) {
			if (this.distance(speed) > this.record) {
				won++;
			}
		}

		return won;
	}
}

export function one(input: string): number {
	const races = Document.from(input).races;
	return races.map((race) => race.win).multiply();
}
export function two(input: string): number {
	const races = Document.from(input).races;
	return races.map((race) => race.win).multiply();
}

console.table({
	"Part 1": one(input),
	"Part 2": two(input),
});
