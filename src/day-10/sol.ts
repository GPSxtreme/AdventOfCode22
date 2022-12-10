const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let cycle = 0;
let regX = 1;
let signalStrength = 0;
let neededCycles = {
  20: 0,
  60: 0,
  100: 0,
  140: 0,
  180: 0,
  220: 0,
};

//function to add to needed cycles
function addToNeededCycles(cycle: number, regX: number) {
  if (neededCycles[cycle] != undefined && neededCycles[cycle] === 0) {
    neededCycles[cycle] += cycle * regX;
  }
}
//parse input file and solve part-1 ;
input.split("\n").forEach((line) => {
  const cmd = line.trimEnd().split(" ");
  addToNeededCycles(cycle, regX);
  if (cmd[0] === "addx") {
    cycle += 2;
    addToNeededCycles(cycle - 1, regX);
    addToNeededCycles(cycle, regX);
    regX += +cmd[1];
  } else {
    cycle++;
    addToNeededCycles(cycle, regX);
  }
  //   console.log(cycle);
});
//calculate answer
const neededCycleKeys = Object.keys(neededCycles);
for (let i = 0; i < neededCycleKeys.length; i++)
  signalStrength += neededCycles[neededCycleKeys[i]];
//print part-1 answer
console.log(`The sum of signal strengths is : ${signalStrength}`);
//part-2
regX = 0;
let spritePos: number[] = [0, 1, 2];
let screenOp: string[][] = [];
const screenWidth = 39;
let row = 0;
let column = 0;
function moveSprite(startOffset: number) {
  for (let i = 0; i <= 2; i++) spritePos[i] = startOffset + i + 1;
}
function writeToScreen() {
  if (column > screenWidth) {
    row++;
    column = 0;
  }
  if (screenOp[row] === undefined) screenOp[row] = [];
  spritePos.includes(column)
    ? (screenOp[row][column] = "#")
    : (screenOp[row][column] = ".");
  column++;
}
input.split("\n").forEach((line) => {
  const cmd = line.trimEnd().split(" ");
  if (cmd[0] === "addx") {
    writeToScreen();
    writeToScreen();
    regX += +cmd[1];
    moveSprite(regX - 1);
  } else {
    writeToScreen();
  }
});
//print answer
for (let i = 0; i < screenOp.length; i++) {
  let temp: string = " ";
  for (let j = 0; j <= screenWidth; j++) temp += `${screenOp[i][j]}`;
  console.log(temp);
}
