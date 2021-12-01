const input = Deno.readTextFileSync("day-1/input.txt").split("\n").map(Number);

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
const three = (index: number, array: number[]) => array.slice(index, index + 3);
const valid = (array: number[]) => array.length === 3 && !array.includes(0);

const count = input.reduce((acc, _, index, array) => {
    if (!valid(three(index, array))) return acc;

    const value = sum(three(index, array));
    const previous = sum(three(index - 1, array));

    if (index == 0) {
        console.log(`${value} (N/A - no previous measurement)`);
        return acc;
    }
    if (value > previous) {
        console.log(`${value} (increased)`);
        return acc + 1;
    } else if (value == previous) {
        console.log(`${value} (N/A - no change)`);
        return acc;
    } else if (value < previous) {
        console.log(`${value} (decreased)`);
        return acc;
    }
    return acc;
}, 0);

console.log(count);

export {};
