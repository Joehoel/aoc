import { range, raw, sum } from "../utils.ts";

const state = raw("day-6/input.txt").split(",").map(Number);
// Part 1
// for (let i = 0; i < days; i++) {
//     for (let index = 0; index < state.length; index++) {
//         if (state[index] === 0n) {
//             state[index] = 6n;
//             state.push(9n);
//         } else if (state[index] > 0n && state[index] <= 9n) {
//             state[index] = state[index] - 1n;
//         }
//     }
//     // console.log("Day: ", state);
//     // await new Promise(resolve => setTimeout(resolve, 500));
// }

function grow(fish: number[], days: number) {
	for (const _ of range(0, days)) {
		const calender = [...Array.from({ length: 9 }, () => 0)];
		for (const day of range(0, 9)) {
			if (day === 0) {
				calender[6] = fish[0];
				calender[8] = fish[0];
			} else {
				calender[day - 1] += fish[day];
			}
			// console.log({ newFish });
		}
		fish = [...calender];
	}
	return fish;
}

const fish = [...Array.from({ length: 9 }, () => 0)];
for (const item of state) {
	fish[item]++;
}

const days = 256;

console.log(sum(grow(fish, days)));
