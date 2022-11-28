import { lines } from "../utils.ts";

class HeightMap {
    public rows: number[][];

    constructor(lines: string[]) {
        this.rows = lines.map(line => line.split("").map(Number));
        console.log(this.rows);
    }

    public getAdjacent(row: number, col: number): number[] {
        // get all numbers adjacent to the given row and column
        const adjacent: number[] = [];
        if (row > 0) {
            adjacent.push(this.rows[row - 1][col]);
        }
        if (row < this.rows.length - 1) {
            adjacent.push(this.rows[row + 1][col]);
        }
        if (col > 0) {
            adjacent.push(this.rows[row][col - 1]);
        }
        if (col < this.rows[row].length - 1) {
            adjacent.push(this.rows[row][col + 1]);
        }

        return adjacent;
    }
}

const input = lines(`day-9/input.txt`);

const heightMap = new HeightMap(input);

console.log(heightMap.getAdjacent(4, 5));
