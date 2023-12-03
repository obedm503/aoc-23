let total = 0;

for await (const line of console) {
  if (!line) {
    continue;
  }

  const [_name, results] = line.split(": ");

  let red = 0;
  let green = 0;
  let blue = 0;

  for (const numbers of results.split("; ")) {
    for (const count of numbers.split(", ")) {
      const n = parseInt(count);
      if (count.endsWith(" red") && n > red) {
        red = n;
      } else if (count.endsWith(" green") && n > green) {
        green = n;
      } else if (count.endsWith(" blue") && n > blue) {
        blue = n;
      }
    }
  }

  const power = (red || 1) * (green || 1) * (blue || 1);
  total += power;
}

console.log(total);
