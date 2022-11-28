<img src="./assets/christmas_ferris.png" width="164" align="center">

# 🎄 [Advent of Code](https://adventofcode.com/)

![Language](https://badgen.net/badge/Language/Rust/orange)

<!--- advent_readme_stars table --->

## 2022 Results

|                      Day                       | Part 1 | Part 2 |
| :--------------------------------------------: | :----: | :----: |
|  [Day 1](https://adventofcode.com/2021/day/1)  |   ⭐   |   ⭐   |
|  [Day 2](https://adventofcode.com/2021/day/2)  |   ⭐   |   ⭐   |
|  [Day 3](https://adventofcode.com/2021/day/3)  |   ⭐   |   ⭐   |
|  [Day 4](https://adventofcode.com/2021/day/4)  |   ⭐   |   ⭐   |
|  [Day 5](https://adventofcode.com/2021/day/5)  |   ⭐   |   ⭐   |
|  [Day 6](https://adventofcode.com/2021/day/6)  |   ⭐   |   ⭐   |
|  [Day 7](https://adventofcode.com/2021/day/7)  |   ⭐   |   ⭐   |
|  [Day 8](https://adventofcode.com/2021/day/8)  |   ⭐   |   ⭐   |
|  [Day 9](https://adventofcode.com/2021/day/9)  |   ⭐   |   ⭐   |
| [Day 10](https://adventofcode.com/2021/day/10) |   ⭐   |   ⭐   |
| [Day 11](https://adventofcode.com/2021/day/11) |   ⭐   |   ⭐   |
| [Day 12](https://adventofcode.com/2021/day/12) |   ⭐   |   ⭐   |
| [Day 13](https://adventofcode.com/2021/day/13) |   ⭐   |   ⭐   |
| [Day 14](https://adventofcode.com/2021/day/14) |   ⭐   |   ⭐   |
| [Day 15](https://adventofcode.com/2021/day/15) |   ⭐   |   ⭐   |
| [Day 16](https://adventofcode.com/2021/day/16) |   ⭐   |   ⭐   |
| [Day 17](https://adventofcode.com/2021/day/17) |   ⭐   |   ⭐   |
| [Day 18](https://adventofcode.com/2021/day/18) |   ⭐   |   ⭐   |
| [Day 19](https://adventofcode.com/2021/day/19) |   ⭐   |   ⭐   |
| [Day 20](https://adventofcode.com/2021/day/20) |   ⭐   |   ⭐   |
| [Day 21](https://adventofcode.com/2021/day/21) |   ⭐   |   ⭐   |
| [Day 22](https://adventofcode.com/2021/day/22) |   ⭐   |   ⭐   |
| [Day 23](https://adventofcode.com/2021/day/23) |   ⭐   |   ⭐   |
| [Day 24](https://adventofcode.com/2021/day/24) |   ⭐   |   ⭐   |
| [Day 25](https://adventofcode.com/2021/day/25) |   ⭐   |   ⭐   |

<!--- advent_readme_stars table --->

---

Generated with the [advent-of-code-rust](https://github.com/fspoettel/advent-of-code-rust) template.

## Commands

### Setup new day

```sh
# example: `./scripts/scaffold.sh 1`
./scripts/scaffold.sh <day>

# output:
# Created module `src/solutions/day01.rs`
# Created input file `src/inputs/day01.txt`
# Created example file `src/examples/day01.txt`
# Linked new module in `src/main.rs`
# Linked new module in `src/solutions/mod.rs`
# Done! 🎄
```

Every solution file has _unit tests_ referencing the example input file. You can use these tests to develop and debug your solution. When editing a solution file, `rust-analyzer` will display buttons for these actions above the unit tests.

### Download inputs for a day

```sh
# example: `./scripts/download.sh 1`
./scripts/download.sh <day>

# output:
# Invoking `aoc` cli...
# Loaded session cookie from "/home/foo/.adventofcode.session".
# Downloading input for day 1, 2021...
# Saving puzzle input to "/tmp/..."...
# Done!
# Wrote input to `src/inputs/day01.txt`...
# Done! 🎄
```

Puzzle inputs are not checked into git. [See here](https://old.reddit.com/r/adventofcode/comments/k99rod/sharing_input_data_were_we_requested_not_to/gf2ukkf/?context=3) why.

### Run solutions for a day

```sh
# example: `cargo run 1`
cargo run <day>

# output:
#     Running `target/debug/aoc 1`
# ----
#
# 🎄 Part 1 🎄
#
# 6 (elapsed: 37.03µs)
#
# 🎄 Part 2 🎄
#
# 9 (elapsed: 33.18µs)
#
# ----
```

To run an optimized version for benchmarking, use the `--release` flag or the alias `cargo rr <day>`.

### Run all solutions against example input

```sh
cargo test
```

### Format code

```sh
cargo fmt
```

### Lint code

```sh
cargo clippy
```
