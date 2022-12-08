const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
let height = 0;
let width = 0;
let count = 0; //all edges are  visible
let temp = 0;
let trees: Array<number>[] = [];
let visit: Array<number>[] = [];
input.split("\n").forEach((line) => {
  height++;
  if (width === 0) width = line.trimEnd().length;
  for (let i = 0; i < width; i++) {
    if (trees[height - 1] === undefined) trees[height - 1] = [];
    trees[height - 1][i] = +line[i];
  }
});
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (visit[i] === undefined) visit[i] = [];
    if (i === 0 || i === height - 1 || j === 0 || j === width - 1)
      visit[i][j] = 1;
    else visit[i][j] = 0;
  }
}
count = 2 * (height + width - 2);
//view from front
for (let i = 1; i < width - 1; i++) {
  temp = trees[0][i];
  for (let j = 1; j < height - 1; j++) {
    if (trees[i][j] > temp && visit[i][j] === 0) {
      count++;
      //   console.log(`${i} , ${j}`);
      visit[i][j] = 1;
    } else if (trees[i][j] === temp) continue;
    temp = trees[i][j];
  }
}
//view from back
for (let i = 1; i < width - 1; i++) {
  temp = trees[height - 1][i];
  for (let j = height - 1; j >= 0; j--) {
    if (trees[j][i] > temp && visit[j][i] === 0) {
      count++;
      //   console.log(`${j} , ${i}`);
      visit[j][i] = 1;
    } else if (trees[j][i] === temp) continue;
    temp = trees[j][i];
  }
}
//view from left
for (let i = 1; i <= height - 1; i++) {
  temp = trees[0][i];
  for (let j = 1; j < width; j++) {
    if (trees[i][j] > temp && visit[i][j] === 0) {
      count++;
      //   console.log(`${i} , ${j}`);
      visit[i][j] = 1;
    } else if (trees[i][j] === temp) continue;
    temp = trees[i][j];
  }
}
//view from right
for (let i = 1; i <= height - 1; i++) {
  temp = trees[width - 1][i];
  for (let j = width - 1; j >= 1; j--) {
    if (trees[i][j] > temp && visit[i][j] === 0) {
      count++;
      //   console.log(`${i} , ${j}`);
      visit[i][j] = 1;
    } else if (trees[i][j] === temp) continue;
    temp = trees[i][j];
  }
}
// console.log(trees);
// console.log(visit[0]);
console.log(count);
