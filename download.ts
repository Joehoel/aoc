import "dotenv";

const date = new Date();
const day = date.getDate().toString();
const year = date.getFullYear().toString();

const url = `https://adventofcode.com/${year}/day/${day}/input`;

const session = Deno.env.get("AOC_SESSION");

if (!session) {
  throw new Error("No session found");
}

const cookie = `session=${session}`;

const input = await fetch(url, {
  headers: {
    cookie,
  },
}).then((res) => res.text());

Deno.writeTextFileSync(`./${year}/${day.padStart(2, "0")}/input.txt`, input);
