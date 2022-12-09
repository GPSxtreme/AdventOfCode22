const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let dirTree;

input.split("\n").forEach((line) => {
  const cmd = line.trimEnd().split(" ");
  if (cmd[0] === "$") {
    if (cmd[1] === "cd") {
      if (cmd[2] != "..") {
        //push dir to stack
      } else {
        //pop dir from stack
      }
    }
  } else if (cmd[0] === "dir") {
  } else {
  }
});
