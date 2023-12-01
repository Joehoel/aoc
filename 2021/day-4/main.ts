import { groups } from "../utils.ts";

const input = groups("day-4/input.txt");

const drawn = input[0][0].split(",").map(Number);

const cards: Card[] = input.slice(1).map((card) => {
	return card.map((row) => {
		return row.trim().split(/\s+/g).map(Number);
	});
});

type Row = (number | null)[];
type Card = Row[];

function mark(card: Card, number: number) {
	card.forEach((line, y) => {
		line.forEach((cell, x) => {
			if (cell === number) {
				card[y][x] = null;
			}
		});
	});
}

function winner(card: Card) {
	for (const line of card) {
		if (line.every((value) => value === null)) return true;
	}
	for (let i = 0; i < card[0].length; i++) {
		if (card.every((row) => row[i] === null)) return true;
	}

	return false;
}

function getScore(card: Card) {
	let score = 0;
	for (const row of card) {
		for (const value of row) {
			if (value !== null) score += value;
		}
	}
	return score;
}

function one(drawn: number[], cards: Card[]) {
	for (const number of drawn) {
		for (const card of cards) {
			mark(card, number);
			if (winner(card)) {
				return getScore(card) * number;
			}
		}
	}
}

function two(drawn: number[], cards: Card[]) {
	for (const number of drawn) {
		for (const card of cards) {
			mark(card, number);
			if (winner(card)) {
				if (cards.length === 1) {
					return getScore(card) * number;
				}
				cards.splice(cards.indexOf(card), 1);
			}
		}
	}
}

console.log(two(drawn, cards));
