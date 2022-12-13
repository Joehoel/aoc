const input = await Deno.readTextFile("./input.txt");

type Packet = number | number[];

type Pair = Packet | Packet[];

const fixPair = (pair: Pair): Pair => (typeof pair === "number" ? [pair] : pair);

function compair(left: Pair, right: Pair): boolean | undefined {
  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLength = Math.max(left.length, right.length);

    for (let i = 0; i < maxLength; i++) {
      return compair(left[i], right[i]);
    }

    // If the left list runs out of items first then the inputs are in the right order
    // If the right list runs out of items first then the inputs are in the wrong order
    return left.length < right.length;
  }

  if (typeof left === "number" && typeof right === "number") {
    return left < right;
  }

  return compair(fixPair(left), fixPair(right));
}

export function one(input: string): number {
  const pairs = input.split("\n\n").map(pair => {
    const lines = pair.split("\n");
    const packets = lines.map(line => JSON.parse(line));

    return packets as [Pair[], Pair[]];
  });

  let correctIndeces = 0;

  for (const [left, right] of pairs) {
    if (compair(left as Pair, right as Pair)) correctIndeces++;
  }

  return correctIndeces;
}
export function two(input: string): number {
  return 0;
}

console.log(`Part 1: `, one(input));
console.log(`Part 2: `, two(input));
