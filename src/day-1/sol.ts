const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
let calorieCount = 0;
let elfCalorieCounts: number[] = [];
let answer = 0;

input.split("\n").forEach((line) => {
  if (Number(line) === 0 && calorieCount != 0) {
    if (answer < calorieCount) answer = calorieCount;
    elfCalorieCounts.push(calorieCount);
    calorieCount = 0;
  } else calorieCount += Number(line);
});

console.log(answer);
