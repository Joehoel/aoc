export default function (
  /** @type {import('npm:plop').NodePlopAPI} */
  plop
) {
  const date = new Date();
  const currentYear = date.getFullYear().toString();
  const currentDay = date.getDate().toString();

  plop.setHelper("pad", (s, size) => {
    return s.padStart(size, "0");
  });

  plop.setGenerator("day", {
    description: "Advent of Code day",
    prompts: [
      {
        type: "input",
        message: "Year",
        name: "year",
        default: currentYear,
        validate(input) {
          if (input.length !== 4) {
            return "Year must be 4 digits";
          }
          if (isNaN(parseInt(input))) {
            return "Year must be a number";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Day",
        name: "day",
        default: currentDay.padStart(2, "0"),
        validate(input) {
          if (input.length !== 2) {
            return "Day must be 2 digits";
          }
          if (isNaN(parseInt(input))) {
            return "Day must be a number";
          }
          return true;
        },
      },
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
        path: "{{year}}/{{pad day 2}}/example.txt",
      },
    ],
  });
}
