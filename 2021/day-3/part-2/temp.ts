const input = Deno.readTextFileSync("day-3/input.txt")
    .split("\n")
    .map(string => string.trim())
    .filter(string => string.length > 0);

type computeRatesResponse = {
    epsilonRate: number;
    gammaRate: number;
};

function binaryArrayToNumber(input: string[]): number {
    let binary: string = input.join("");
    return parseInt(binary, 2);
}

function computeRates(input: string[]): computeRatesResponse {
    let epsilonBits: string[] = [];
    let gammaBits: string[] = [];
    const bitLength: number = input[0].length;
    for (let i = 0; i < bitLength; i++) {
        let numZeroes = input.filter((x: string) => x[i] === "0").length;
        if (numZeroes > input.length / 2) {
            epsilonBits.push("0");
            gammaBits.push("1");
        } else {
            epsilonBits.push("1");
            gammaBits.push("0");
        }
    }
    return {
        epsilonRate: binaryArrayToNumber(epsilonBits),
        gammaRate: binaryArrayToNumber(gammaBits),
    };
}

type BitIdentifier = (numZeroes: number, inputLength: number) => string;

type computeRatingsResponse = {
    oxygenGeneratorRating: number;
    carbonDioxideScrubberRating: number;
};

function computeRating(input: string[], keepBitFn: BitIdentifier, bitNum: number = 0): number {
    if (input.length === 1) {
        return parseInt(input[0], 2);
    }

    let numZeroes = input.filter((x: string) => x[bitNum] === "0").length;
    let keepBit = keepBitFn(numZeroes, input.length);
    let keepValues: string[] = input.filter((x: string) => x[bitNum] === keepBit);

    return computeRating(keepValues, keepBitFn, bitNum + 1);
}

function computeRatings(input: string[]): computeRatingsResponse {
    const oxygenGeneratorBitIdentifier: BitIdentifier = (numZeroes: number, inputLength: number): string => {
        return numZeroes > inputLength / 2 ? "0" : "1";
    };
    const carbonDioxideBitIdentifier: BitIdentifier = (numZeroes, inputLength) => {
        return numZeroes <= inputLength / 2 ? "0" : "1";
    };
    return {
        oxygenGeneratorRating: computeRating(input, oxygenGeneratorBitIdentifier),
        carbonDioxideScrubberRating: computeRating(input, carbonDioxideBitIdentifier),
    };
}

let { epsilonRate, gammaRate } = computeRates(input);
console.log(`Part 1 Result = ${epsilonRate * gammaRate}`);

let { oxygenGeneratorRating, carbonDioxideScrubberRating } = computeRatings(input);
console.log(`Part 2 Result = ${oxygenGeneratorRating * carbonDioxideScrubberRating}`);
export {};
