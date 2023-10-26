import { join } from "path";
import { parse } from "flags";

const flags = parse(Deno.args, {
  boolean: ["--test"],
});

const [year, day] = flags._.map((x) => x.toString());

// if (!year || !day) {
//   console.error("Please provide a year and day");
//   Deno.exit(1);
// }

// if (flags.test) console.log("Running tests...\n");

// const command = new Deno.Command(Deno.execPath(), {
//   args: [
//     `deno`,
//     flags.test ? `test` : `run`,
//     "--allow-read",
//     "--watch",
//     join(
//       year,
//       day.padStart(2, "0"),
//       flags.test ? "solution.test.ts" : "solution.ts"
//     ),
//   ],
// });

// const output = await command.output()
// if (flags.test) console.log("Running tests...\n");

// const command = new Deno.Command(Deno.execPath(), {
//   args: [
//     `deno`,
//     flags.test ? `test` : `run`,
//     "--allow-read",
//     "--watch",
//     join(
//       year,
//       day.padStart(2, "0"),
//       flags.test ? "solution.test.ts" : "solution.ts"
//     ),
//   ],
// });

// const output = await command.output();
// console.log(output.stdout.toString());

// Deno.exit(output.code);

const p = Deno.run({
  cmd: [
    `deno`,
    flags.test ? `test` : `run`,
    "--allow-read",
    "--watch",
    join(
      year,
      day.padStart(2, "0"),
      flags.test ? "solution.test.ts" : "solution.ts"
    ),
  ],
});

await p.status(); // (*1); wait here for child to finish
p.close();
