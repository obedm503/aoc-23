let total = 0;

const red = 12;
const green = 13;
const blue = 14;

for await (const line of console) {
  if (!line) {
    continue;
  }

  const [name, results] = line.split(": ");
  const id = parseInt(name.slice(5));

  const isGamePossible = results.split("; ").every((numbers) => {
    for (const count of numbers.split(", ")) {
      if (count.endsWith(" red") && parseInt(count) > red) {
        return false;
      } else if (count.endsWith(" green") && parseInt(count) > green) {
        return false;
      } else if (count.endsWith(" blue") && parseInt(count) > blue) {
        return false;
      }
    }
    return true;
  });
  if (isGamePossible) {
    total += id;
  }
}

console.log(total);
