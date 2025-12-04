import { assertEquals } from "testing/asserts.ts";
import { raw } from "utils";
import { one, two } from "./solution.ts";

const example = raw("2023/01/example.txt");

Deno.test("Part 1", () => {
	const result = one(`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`);

	assertEquals(result, 142);
});

Deno.test("Part 2", () => {
	const result = two(example);

	assertEquals(result, 281);
});
