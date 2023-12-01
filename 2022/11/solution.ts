import { range, raw } from "../../utils.ts";

const input = raw("2022/11/input.txt");

type Monkey = {
	id: number;
	items: number[];
	operation: (worry: number) => number;
	condition: (worry: number) => number;
	divisor: number;
};

function getMonkeys(input: string) {
	const monkeys: Monkey[] = input
		.split("\n\n")
		.filter(Boolean)
		.map((group) =>
			group
				.split("\n")
				.map((l) => l.trim())
				.filter(Boolean)
		)
		.map((g) => g.slice(1))
		.map((g, i) => {
			const items = g
				.at(0)!
				.match(/(\d+)/g)!
				.map((m) => Number(m));

			const operation = (worry: number) => {
				const [op, amount] = g.at(1)!.replace("Operation: new = old ", "")
					.split(" ");

				const parsedAmount = amount === "old" ? worry : parseInt(amount);

				if (op === "+") return worry + parsedAmount;
				if (op === "*") return worry * parsedAmount;
				throw new Error("Invalid operation");
			};

			const condition = (worry: number) => {
				const trueMonkey = parseInt(
					g.at(3)!.replace("If true: throw to monkey ", ""),
				);
				const falseMonkey = parseInt(
					g.at(4)!.replace("If false: throw to monkey ", ""),
				);
				const divisor = parseInt(g.at(2)!.replace("Test: divisible by ", ""));

				if (worry % divisor === 0) return trueMonkey;
				return falseMonkey;
			};

			const divisor = parseInt(g.at(2)!.replace("Test: divisible by ", ""));

			return {
				id: i,
				items,
				operation,
				condition,
				divisor,
			};
		});

	return monkeys;
}

export function one(input: string): number {
	const monkeys: Monkey[] = getMonkeys(input);

	const counts = Array.from({ length: monkeys.length }, () => 0);

	for (const _ of range(0, 20)) {
		console.count();

		for (const monkey of monkeys) {
			while (monkey.items.length > 0) {
				counts[monkey.id] += 1;

				const worry = monkey.items.shift()!;
				const newWorry = Math.floor(monkey.operation(worry) / 3);
				const next = monkey.condition(newWorry);
				monkeys[next].items.push(newWorry);
			}
		}
	}

	counts.sort((a, b) => b - a);

	console.log({ counts });

	return counts[0] * counts[1];
}
export function two(input: string): number {
	const monkeys: Monkey[] = getMonkeys(input);

	const counts = Array.from({ length: monkeys.length }, () => 0);

	const globalMod = monkeys.reduce((a, b) => a * b.divisor, 1);

	for (const _ of range(0, 10_000)) {
		console.count();

		for (const monkey of monkeys) {
			while (monkey.items.length > 0) {
				counts[monkey.id] += 1;

				const worry = monkey.items.shift()!;
				const newWorry = monkey.operation(worry) % globalMod;
				const next = monkey.condition(newWorry);
				monkeys[next].items.push(newWorry);
			}
		}
	}

	counts.sort((a, b) => b - a);

	console.log({ counts });

	return counts[0] * counts[1];
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
