import { lines as getLines } from "../utils.ts";

interface Point {
	x: number;
	y: number;
}

interface Line {
	start: Point;
	end: Point;
}

type Row = ("." | number)[];

const input = getLines("day-5/input.txt");

const lines: Line[] = input.map((line) => {
	const [start, end] = line.split(" -> ").map((part) => {
		const [x, y] = part.split(",").map(Number);

		return { x, y };
	});

	return { start, end };
});

// get the width and height of the diagram
const width = Math.max(
	...lines.map((line) => Math.max(line.start.x, line.end.x)),
);
const height = Math.max(
	...lines.map((line) => Math.max(line.start.y, line.end.y)),
);
const diagonal = Math.max(width, height);

const row: Row = Array.from({ length: diagonal + 1 }, () => ".");
const diagram: Row[] = Array.from({ length: diagonal + 1 }, () => [...row]);

// part 1
for (const line of lines) {
	// get all horizontal and vertical points between to other points
	const points: Point[] = [];

	if (line.start.x === line.end.x) {
		// vertical line
		const ys = [line.start.y, line.end.y];
		const minY = Math.min(...ys);
		const maxY = Math.max(...ys);

		for (let y = minY; y <= maxY; y++) {
			points.push({ x: line.start.x, y });
		}
	} else if (line.start.y === line.end.y) {
		// horizontal line
		const xs = [line.start.x, line.end.x];
		const minX = Math.min(...xs);
		const maxX = Math.max(...xs);

		for (let x = minX; x <= maxX; x++) {
			points.push({ x, y: line.start.y });
		}
	} // get diagonal points
	else {
		let x = line.start.x;
		let y = line.start.y;
		while (x != line.end.x) {
			points.push({ y, x });

			if (x > line.end.x) {
				x--;
			} else {
				x++;
			}
			if (y > line.end.y) {
				y--;
			} else {
				y++;
			}
		}
		points.push({ y, x });
	}

	for (const point of points) {
		if (diagram[point.y][point.x] === ".") {
			diagram[point.y][point.x] = 1;
		} else {
			const number = +diagram[point.y][point.x] + 1;
			diagram[point.y][point.x] = number;
		}
	}
}

// count the number of lines that overlap
const count = diagram.reduce(
	(sum, row) => sum + row.filter((x) => x >= 2).length,
	0,
);
console.log(count);
