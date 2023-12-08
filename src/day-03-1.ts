const symbols = ["*", "$", "/", "+", "-", "=", "&", "#", "@", "%"];

const lines: string[] = [];

for await (const line of console) {
  if (!line) {
    continue;
  }

  lines.push(line);
}

function coordinatesToCheck(row: number, col: number): Array<[number, number]> {
  const coords: Array<[number, number]> = [
    [row, col],
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  return coords;
}

function isDigit(char: string) {
  return !Number.isNaN(parseInt(char));
}

function getNumber(line: string, col: number): number {
  for (let i = col; i < line.length; i++) {
    if (!isDigit(line[i + 1])) {
      return i;
    }
  }

  return col;
}

let total = 0;

for (let row = 0; row < lines.length; row++) {
  const line = lines[row];

  for (let col = 0; col < line.length; col++) {
    const char = line[col];

    if (!char || char === "." || !isDigit(char)) {
      continue;
    }

    const lastDigitCol = getNumber(line, col);
    const chunk = line.slice(col, lastDigitCol + 1);

    const neighbors = chunk
      .split("")
      .flatMap((c, i) => coordinatesToCheck(row, col + i))
      .map(([r, c]) => lines[r]?.[c])
      .filter((c) => symbols.includes(c));

    if (neighbors.length) {
      const n = parseInt(chunk);
      total += n;
      // move col to last digit in number
      col = lastDigitCol;
    }
  }
}

console.log(total);
