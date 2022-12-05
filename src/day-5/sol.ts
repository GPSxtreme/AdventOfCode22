const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let stacksA: Array<string>[] = [];
let stacksB: Array<string>[] = [];
//creating and storing stacks
input.split("\n").forEach((line) => {
  let t = 0;
  if (line[0] === "m") return;
  for (let i = 1; i <= 33 && t <= 8; i += 4) {
    if (line[i] && line[i] !== " ") {
      if (stacksA[t] === undefined) stacksA[t] = [];
      stacksA[t].push(line[i]);
      if (stacksB[t] === undefined) stacksB[t] = [];
      stacksB[t].push(line[i]);
    }
    t++;
  }
});
//reversing stacks of ease
for (let i = 0; i < 9; i++) {
  stacksA[i] = stacksA[i].reverse();
  stacksB[i] = stacksB[i].reverse();
}
//for part - 2
//following the move instructions
input.split("\n").forEach((line) => {
  if (line[0] !== "m") return;
  const instructionArr = line.trim().split(" ");
  const elementsCountToMove = +instructionArr[1];
  const sourceStack = +instructionArr[3] - 1;
  const destinationStack = +instructionArr[5] - 1;
  //part-1
  for (let i = 0; i < elementsCountToMove; i++) {
    stacksA[destinationStack].push(stacksA[sourceStack].pop());
  }
  //part-2
  const toMoveElements = stacksB[sourceStack].splice(
    stacksB[sourceStack].length - elementsCountToMove,
    stacksB[sourceStack].length
  );
  stacksB[destinationStack] = stacksB[destinationStack].concat(toMoveElements);
});
console.log("----------answer part-1----------");
for (let i = 0; i < 9; i++) {
  console.log(stacksA[i].pop());
}
console.log("----------answer part-2----------");
for (let i = 0; i < 9; i++) {
  console.log(stacksB[i].pop());
}
