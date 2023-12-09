let total = 0;

for await (const line of console) {
  if (!line) {
    continue;
  }

  const [_name, values] = line.split(": ");
  const [left, right] = values.split(" | ");
  const winning = left.split(" ").filter(Boolean);
  const own = right.split(" ").filter(Boolean);

  const winners = own.filter((n) => winning.includes(n));
  const count = winners.length;
  if (count) {
    const points = 2 ** (count - 1);
    total += points;
  }
}

console.log(total);
