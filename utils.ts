export const sum = (n: number[]): number => n.reduce((sum, x) => sum + x, 0);

export const range = (start: number, end: number, step = 1): number[] =>
    [...Array(end - start).keys()].map(i => start + i * step).filter(x => x < end);

export const raw = (file: string): string[] => Deno.readTextFileSync(file).split("\n");

export const lines = (file: string): string[] =>
    raw(file)
        .map(x => x.trim())
        .filter(x => x);

export const groups = (file: string): string[][] => {
    const parts: string[][] = [[]];

    for (const line of raw(file)) {
        if (!line.trim().length) {
            parts.push([]);
        } else {
            parts[parts.length - 1].push(line);
        }
    }

    return parts.filter(x => x.length > 0);
};
