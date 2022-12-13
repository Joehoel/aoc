import { assertEquals } from "testing/asserts.ts";
import { one, two } from "./solution.ts";

const example = await Deno.readTextFile("2022/13/example.txt");

Deno.test("Part 1", () => {
  const result = one(example);

  assertEquals(result, 13);
});

Deno.test("Part 2", () => {
  const result = two(example);

  assertEquals(result, 0);
});
