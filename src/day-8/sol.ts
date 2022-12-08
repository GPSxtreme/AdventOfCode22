const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
let size = input.split("\n")[0].trimEnd().length;
let count = 4 * size - 4;
let temp = 0;
let trees: Array<number>[] = [];
let visit: Array<number>[] = [];
input.split("\n").forEach((line) => {
  temp++;
  for (let i = 0; i < size; i++) {
    if (trees[temp - 1] === undefined) trees[temp - 1] = [];
    trees[temp - 1][i] = +line[i];
  }
});
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (visit[i] === undefined) visit[i] = [];
    if (i === 0 || i === size - 1 || j === 0 || j === size - 1) visit[i][j] = 1;
    else visit[i][j] = 0;
  }
}
for (let i = 1; i <= size - 1; i++) {
  //view from front
  temp = trees[0][i];
  for (let j = 1; j < size - 1; j++) {
    if (trees[i][j] > temp && !visit[i][j]) {
      count++;
      visit[i][j] = 1;
    }
    temp = trees[i][j];
  }
  //view from back
  temp = trees[size - 1][i];
  for (let j = size - 1; j >= 0; j--) {
    if (trees[j][i] > temp && !visit[j][i]) {
      count++;
      visit[j][i] = 1;
    }
    temp = trees[j][i];
  }
  //view from left
  temp = trees[0][i];
  for (let j = 1; j < size; j++) {
    if (trees[i][j] > temp && !visit[i][j]) {
      count++;
      visit[i][j] = 1;
    }
    temp = trees[i][j];
  }
  //view from right
  temp = trees[size - 1][i];
  for (let j = size - 1; j >= 1; j--) {
    if (trees[i][j] > temp && !visit[i][j]) {
      count++;
      visit[i][j] = 1;
    }
    temp = trees[i][j];
  }
}
// console.log(visit);
console.log(size * size);
console.log(count);
