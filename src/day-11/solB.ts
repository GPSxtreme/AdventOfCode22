const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let monkeys: {}[] = [];
let monkey = -1;
input.split("\n").forEach((line) => {
  if (line.length === 0) return;
  if (line.trim().startsWith("Monkey")) {
    monkey++;
    monkeys[monkey] = new Object();
  } else {
    if (line.includes("Starting")) {
      const itemsString = line.split(":")[1].trim().split(",");
      let items: number[] = [];
      for (let i = 0; i < itemsString.length; i++)
        items.push(+itemsString[i].trim());
      monkeys[monkey]["items"] = items;
    } else if (line.includes("Operation")) {
      const opCode = line.split("=")[1].trim();
      monkeys[monkey]["opCode"] = opCode;
    } else if (line.includes("Test")) {
      const testCondition = line.split(":")[1].trim().split(" ")[2];
      monkeys[monkey]["test"] = new Object();
      monkeys[monkey]["test"]["divBy"] = +testCondition;
    } else {
      const condition = line.includes("If true") ? true : false;
      const throwTo = line.trim().split(" ")[5];
      if (monkeys[monkey]["test"]["statements"] === undefined)
        monkeys[monkey]["test"]["statements"] = new Object();
      monkeys[monkey]["test"]["statements"][condition] = +throwTo;
    }
  }
});
let divisor = 1;
for (const monkey of monkeys) {
  divisor *= monkey["test"]["divBy"];
}
console.log(`divisor: ${divisor}`);
//part 2
for (let round = 1; round <= 10000; round++) {
  for (const monkey of monkeys) {
    for (const item of monkey["items"]) {
      if (monkey["visited"] === undefined) monkey["visited"] = 0;
      const worryLvl = eval(monkey["opCode"].replaceAll("old", item)) % divisor;
      if (worryLvl % monkey["test"]["divBy"] === 0)
        monkeys[monkey["test"]["statements"][true]]["items"].push(worryLvl);
      else monkeys[monkey["test"]["statements"][false]]["items"].push(worryLvl);
      monkey["visited"]++;
    }
    monkey["items"] = [];
  }
}
//calculate part-2 answer
let allVisited = [];
for (const monkey of monkeys) {
  console.log(monkey["visited"]);
  allVisited.push(monkey["visited"]);
}
const a = Math.max(...allVisited);
allVisited = allVisited.filter((el) => el !== a);
const b = Math.max(...allVisited);
console.log(`level of monkey business after 10000 rounds ${a * b}`);
console.log(`${a},${b}`);
