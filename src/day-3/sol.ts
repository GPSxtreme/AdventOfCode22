const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

//part a
const refSmall = "abcdefghijklmnopqrstuvwxyz";
const refCapital = refSmall.toLocaleUpperCase();
const ref = refSmall + refCapital;
let resultA = 0;

input.split("\n").forEach((line) => {
  let halfA = line.slice(0, line.length / 2);
  let halfB = line.slice(line.length / 2);
  let commonChar: string;
  for (let i = 0; i < line.length; i++) {
    if (halfA.includes(halfB[i])) {
      commonChar = halfB[i];
      break;
    }
  }
  for (let i = 0; i < ref.length; i++) {
    if (commonChar === ref[i]) {
      resultA += i + 1;
      break;
    }
  }
});

console.log(`part a result ${resultA}`);

//part b
let temp1: string = "";
let temp2: string = "";
let temp3: string = "";
let resultB = 0;

input.split("\n").forEach((line) => {
  if (temp1 && temp2) {
    let commonChar: string;
    temp3 = line;
    for (let i = 0; i < temp1.length; i++) {
      if (temp2.includes(temp1[i]) && temp3.includes(temp1[i])) {
        commonChar = temp1[i];
        break;
      }
    }
    for (let i = 0; i < ref.length; i++) {
      if (commonChar === ref[i]) {
        resultB += i + 1;
        break;
      }
    }
    temp1 = "";
    temp2 = "";
  } else if (!temp1) temp1 = line;
  else if (!temp2) temp2 = line;
});

console.log(`part b result ${resultB}`);
