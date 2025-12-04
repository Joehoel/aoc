# Advent of Code

Hello. This is all my code for "all" the Advent of Code challenges. It is all
written in TypeScript with Deno, because I love that. I tried to do it in Rust
twice but I gave up after 10 minutes on the first day, both times.

I don't know why anyone else would like to run this code. But if you do, and
you're not stupid. Do the following:

1. Clone the repository
2. Install Deno
3. Run the code

Simple as that. I'm not going to tell you how to clone the repository or how to
install Deno.

I am going to tell you how to run the code though, because I'm nice like that.

There is a special task in the `deno.json` file where I made a script that runs
the code for you. You can pass `--test` to run the example input.

```sh
deno task run <year> <day> [--test]
```

I also made a `download` script that downloads the input from the current day
for you. You have to have a session cookie like this in a `.env` file:

```env
AOC_SESSION=joemama
```

Then you can run the script like this:

```sh
deno task download
```

If you are stealing my template. You can generate all the necessary files for a
new day by running:

```sh
deno task g
```

Okay thanks bye <3
