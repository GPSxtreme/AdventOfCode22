const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
let size = input.split("\n")[0].trimEnd().length;
let count = 4 * size - 4;
let temp = 0;
let flag = 0;
let scenicScore = 0;
let trees: Array<number>[] = [];
input.split("\n").forEach((line) => {
  temp++;
  for (let i = 0; i < size; i++) {
    if (trees[temp - 1] === undefined) trees[temp - 1] = [];
    trees[temp - 1][i] = +line[i];
  }
});
//part-1
for (let column = 1; column < size - 1; column++) {
  for (let row = 1; row < size - 1; row++) {
    //front
    for (let i = row + 1; i <= size - 1; i++) {
      if (trees[row][column] <= trees[i][column]) {
        flag++;
        break;
      }
    }
    //back
    for (let i = row - 1; i >= 0; i--) {
      if (trees[row][column] <= trees[i][column]) {
        flag++;
        break;
      }
    }
    //right
    for (let i = column + 1; i <= size - 1; i++) {
      if (trees[row][column] <= trees[row][i]) {
        flag++;
        break;
      }
    }
    //left
    for (let i = column - 1; i >= 0; i--) {
      if (trees[row][column] <= trees[row][i]) {
        flag++;
        break;
      }
    }
    if (flag < 4) {
      count++;
    }
    flag = 0;
  }
}
console.log(`Trees visible from outside of the grid: ${count}`);
//part-2
let frontVT = 0;
let backVT = 0;
let rightVT = 0;
let leftVT = 0;
for (let column = 0; column < size - 1; column++) {
  for (let row = 0; row < size - 1; row++) {
    //front scenic number
    for (let i = row - 1; i >= 0; i--) {
      if (trees[i][column] >= trees[row][column]) {
        frontVT++;
        break;
      } else frontVT++;
    }
    //back scenic number
    for (let i = row + 1; i <= size - 1; i++) {
      if (trees[i][column] >= trees[row][column]) {
        backVT++;
        break;
      } else backVT++;
    }
    //right scenic number
    for (let i = column + 1; i <= size - 1; i++) {
      if (trees[row][i] >= trees[row][column]) {
        rightVT++;
        break;
      } else rightVT++;
    }
    //left scenic score
    for (let i = column - 1; i >= 0; i--) {
      if (trees[row][i] >= trees[row][column]) {
        leftVT++;
        break;
      } else leftVT++;
    }
    //calculate scenic score and reset variables
    const score = frontVT * backVT * rightVT * leftVT;
    if (score > scenicScore) scenicScore = score;
    frontVT = 0;
    backVT = 0;
    leftVT = 0;
    rightVT = 0;
  }
}
console.log(`The total scenic score is : ${scenicScore}`);
