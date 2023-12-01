const wordDigits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numberDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function findStart(line: string): number | undefined {
  let found: number | undefined;
  let foundIndex: number | undefined = undefined;

  for (const digit of wordDigits) {
    const index = line.indexOf(digit);
    if (
      index >= 0 &&
      (typeof foundIndex === "undefined" || index < foundIndex)
    ) {
      foundIndex = index;
      found = wordDigits.indexOf(digit);
    }
  }

  for (const digit of numberDigits) {
    const index = line.indexOf(digit);
    if (
      index >= 0 &&
      (typeof foundIndex === "undefined" || index < foundIndex)
    ) {
      foundIndex = index;
      found = numberDigits.indexOf(digit);
    }
  }

  return found;
}

function findEnd(line: string): number | undefined {
  let found: number | undefined;
  let foundIndex: number | undefined = undefined;

  for (const digit of wordDigits) {
    const index = line.lastIndexOf(digit);
    if (
      index >= 0 &&
      (typeof foundIndex === "undefined" || index > foundIndex)
    ) {
      foundIndex = index;
      found = wordDigits.indexOf(digit);
    }
  }

  for (const digit of numberDigits) {
    const index = line.lastIndexOf(digit);
    if (
      index >= 0 &&
      (typeof foundIndex === "undefined" || index > foundIndex)
    ) {
      foundIndex = index;
      found = numberDigits.indexOf(digit);
    }
  }

  return found;
}

let total = 0;

for await (const line of console) {
  if (line) {
    const first = findStart(line)!;
    const last = findEnd(line)!;
    total += parseInt(first.toString() + last.toString());
  }
}

console.log(total);
