const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

/*
1 for Rock, 2 for Paper, and 3 for Scissors
This strategy guide predicts and recommends the following:

In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.
In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6)
*/
//algorithm
const rock = 1;
const paper = 2;
const scissors = 3;
const win = 6;
const draw = 3;
const loss = 0;

const scoreReturner = (move: string): number => {
  switch (move) {
    case "A":
    case "X":
      return rock;
      break;
    case "B":
    case "Y":
      return paper;
      break;
    case "C":
    case "Z":
      return scissors;
  }
};
const movesCalc = (a: number, b: number): string => {
  if ((a === 1 && b === 3) || (a === 2 && b === 1) || (a === 3 && b === 2))
    return "win";
  if ((a === 1 && b === 2) || (a === 2 && b === 3) || (a === 3 && b === 1))
    return "loose";
  if (a === b) return "draw";
};
//part - 1
let totalScoreA = 0;
let opp = 0;
let me = 0;

input.split("\n").forEach((line) => {
  me = scoreReturner(line[2]);
  opp = scoreReturner(line[0]);
  totalScoreA += me;
  if (movesCalc(me, opp) === "win") {
    totalScoreA += win;
  } else if (movesCalc(me, opp) === "loose") {
    totalScoreA += loss;
  } else {
    totalScoreA += draw;
  }
});

console.log(`part a score ${totalScoreA}`);

//part - 2
/* 
X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
*/
me = 0;
opp = 0;
let totalScoreB = 0;

const myCharParser = (char: string): string => {
  if (char === "X") return "loose";
  if (char === "Y") return "draw";
  if (char === "Z") return "win";
};
const returnMyMove = (condition: string, oppMove: number): number => {
  if (condition === "win") return (oppMove + 1) % 3 || 3;
  else if (condition === "loose") return (oppMove - 1) % 3 || 3;
  else return oppMove;
};

input.split("\n").forEach((line) => {
  opp = scoreReturner(line[0]);
  me = returnMyMove(myCharParser(line[2]), opp);
  totalScoreB += me;
  if (movesCalc(me, opp) === "win") {
    totalScoreB += win;
  } else if (movesCalc(me, opp) === "loose") {
    totalScoreB += loss;
  } else {
    totalScoreB += draw;
  }
});

console.log(`part b score ${totalScoreB}`);
