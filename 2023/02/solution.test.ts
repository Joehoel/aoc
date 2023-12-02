import { assertEquals } from "testing/asserts.ts";
import { raw } from "utils";
import { one, two } from "./solution.ts";

const example = raw("2023/02/example.txt");

Deno.test("Part 1", () => {
  const result = one(example);

  assertEquals(result, 8);
});

Deno.test("Part 2", () => {
  const result = two(example);

  assertEquals(result, 2286);
});
