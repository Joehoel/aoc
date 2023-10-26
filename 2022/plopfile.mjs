export default function (
  /** @type {import('npm:plop').NodePlopAPI} */
  plop
) {
  plop.setHelper("pad", (s, size) => {
    return s.padStart(size, "0");
  });

  plop.setGenerator("day", {
    description: "Advent of Code day",
    prompts: [
      { type: "input", message: "Year", name: "year" },
      { type: "input", message: "Day", name: "day" },
    ],
    actions: [
      {
        type: "add",
        path: "{{year}}/{{pad day 2}}/solution.ts",
        templateFile: "./templates/solution.hbs",
      },
      {
        type: "add",
        path: "{{year}}/{{pad day 2}}/solution.test.ts",
        templateFile: "./templates/solution.test.hbs",
      },
      {
        type: "add",
        path: "{{year}}/{{pad day 2}}/input.txt",
      },
      {
        type: "add",
        path: "{{year}}/{{pad day 2}}/example.txt",
      },
    ],
  });
}
