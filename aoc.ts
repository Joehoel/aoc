import { join } from "path";

const [year, day] = Deno.args;

const p = await Deno.run({
  cmd: [`deno`, `run`, "--allow-read", join(year, day.padStart(2, "0"), "solution.ts")],
});

const { code } = await p.status(); // (*1); wait here for child to finish
p.close();
