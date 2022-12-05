const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
let calorieCount = 0;
let elfCalorieCounts: number[] = [];
let answerA = 0;
let answerB = 0;
//part 1
input.split("\n").forEach((line) => {
  if (Number(line) === 0 && calorieCount != 0) {
    if (answerA < calorieCount) answerA = calorieCount;
    elfCalorieCounts.push(calorieCount);
    calorieCount = 0;
  } else calorieCount += Number(line);
});

console.log(answerA); //top elf calorie count

//part 2 (top 3)
elfCalorieCounts = elfCalorieCounts.filter((a) => a !== answerA);
answerB += answerA;
let temp = 0;
let k = 0;
do {
  for (let i = 0; i < elfCalorieCounts.length; i++) {
    if (elfCalorieCounts[i] > temp) {
      temp = elfCalorieCounts[i];
    }
  }
  elfCalorieCounts = elfCalorieCounts.filter((a) => a !== temp);
  answerB += temp;
  temp = 0;
  k++;
} while (k <= 1);

console.log(answerB);
