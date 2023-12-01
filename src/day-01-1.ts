let total = 0;

for await (const line of console) {
  const chars = line.split('');
  const digits = chars.filter((c) => !Number.isNaN(parseInt(c)));
  const first = digits.at(0)!;
  const last = digits.at(-1)!;
  total += parseInt(first + last);
}

console.log(total);
