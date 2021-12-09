import { lines } from "../utils.ts";

class Row {
    public row: number;
    public rowData: number[];

    constructor(row: number, rowData: number[]) {
        this.row = row;
        this.rowData = rowData;
    }

    public getAdjacent(index: number): number[] {
        const adjacent: number[] = [];
        // if (index > 0) {
        //     adjacent.push(this.rowData[index - 1]);
        // }
        // if (index < this.rowData.length - 1) {
        //     adjacent.push(this.rowData[index + 1]);
        // }
        return adjacent;
    }
}

const input = lines(`day-9/input.txt`)
    .map(line => line.split("").map(Number))
    .map((row, index) => new Row(index, row));

for (const row of input) {
}
