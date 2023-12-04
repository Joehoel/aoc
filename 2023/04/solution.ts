import { raw } from "utils";

const input = raw("2023/04/input.txt");

export function one(input: string): number {
  let cards = input.lines().map((l) => {
    const [winning, mine] = l
      .split(": ")[1]
      .split(" | ")
      .map((x) =>
        x
          .split(" ")
          .map((y) => parseInt(y))
          .filter(Boolean)
      );

    return { winning, mine };
  });

  let sum = 0;
  let x = 0;

  // Count how many of my numbers are in the winning numbers for each card
  const winning = cards.map((card, i, array) => {
    const count = card.winning.filter((x) => card.mine.includes(x)).length;

    // The first match makes the card worth one point and each match after the first doubles the point value of that card.
    if (count > 0) {
      // If there is a winning card push it to array

      sum += 2 ** (count - 1);
    }

    return count;
  });

  console.log(winning);

  return sum;
}
export function two(input: string): number {
  let cards = input.lines().map((l) => {
    const [winning, mine] = l
      .split(": ")[1]
      .split(" | ")
      .map((x) =>
        x
          .split(" ")
          .map((y) => parseInt(y))
          .filter(Boolean)
      );

    return { winning, mine };
  });

  let totalCards = [...cards]; // Copy of the original cards array to store additional cards
  let i = 0;

  // Process each card and any new cards added during the process
  while (i < totalCards.length) {
    const card = totalCards[i];
    const count = card.winning.filter((x) => card.mine.includes(x)).length;

    for (let j = 1; j <= count && i + j < cards.length; j++) {
      totalCards.push({ ...cards[i + j] });
    }

    i++;
  }

  return totalCards.length;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
