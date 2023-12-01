import { assertEquals } from "testing/asserts.ts";
import { raw } from "../../utils.ts";
import { one, two } from "./solution.ts";

const example = raw("2022/05/example.txt");

Deno.test("Part 1", () => {
	const result = one(example);

	assertEquals(result, "CMZ");
});

Deno.test("Part 2", () => {
	const result = two(example);

	assertEquals(result, "MCD");
});
