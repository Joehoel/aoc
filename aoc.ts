import { join } from "path";
import { parse } from "flags";

const flags = parse(Deno.args, {
  boolean: ["test"],
  default: { test: false },
  "--": true,
});

const date = new Date();
const currentDay = date.getDate().toString();
const currentYear = date.getFullYear().toString();

const [year = currentYear, day = currentDay] = Deno.args;

const command = new Deno.Command(Deno.execPath(), {
  args: [
    flags.test ? `test` : `run`,
    "--allow-all",
    join(
      year,
      day.padStart(2, "0"),
      flags.test ? "solution.test.ts" : "solution.ts"
    ),
  ],
});

const { stdout, stderr } = command.outputSync();

console.log(new TextDecoder().decode(stdout));
console.log(new TextDecoder().decode(stderr));
