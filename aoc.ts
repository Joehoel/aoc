import { join } from "path";
import { parse } from "https://deno.land/std@0.91.0/flags/mod.ts";

const [year, day] = Deno.args;

const flags = parse(Deno.args, {
  boolean: ["--test"],
});

if (flags.test) console.log("Running tests...\n");

const p = Deno.run({
  cmd: [
    `deno`,
    flags.test ? `test` : `run`,
    "--allow-read",
    "--watch",
    join(year, day.padStart(2, "0"), flags.test ? "solution.test.ts" : "solution.ts"),
  ],
});

await p.status(); // (*1); wait here for child to finish
p.close();
