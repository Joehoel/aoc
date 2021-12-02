const input = Deno.readTextFileSync("day-2/input.txt")
    .split("\n")
    .map(string => string.trim())
    .filter(string => string.length > 0);

let depth = 0;
let position = 0;
let aim = 0;

for (const string of input) {
    const [instruction, amount] = string.split(" ");

    if (instruction === "down") {
        aim += Number(amount);
    } else if (instruction === "up") {
        aim -= Number(amount);
    } else if (instruction === "forward") {
        position += Number(amount);
        depth += aim * Number(amount);
    }
}

const output = depth * position;

console.log(output);

export {};
