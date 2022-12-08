const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

function isNumeric(n: string) {
  return !isNaN(parseFloat(n));
}

const dirOrder: string[] = [];
let dirTree: object = {};
let dirTreeWithSize: object = {};
let dirSizeTree: object = {};
let pwd: string;
let answer = 0;
input.split("\n").forEach((line) => {
  const cmd = line.trim().split(" ");
  if (cmd[1] === "ls" && cmd[0] === "$") {
    return;
  } else if (cmd[0] === "$") {
    if (cmd[2] === "..") {
      dirOrder.pop();
    } else if (cmd[1] === "cd" && cmd[2] !== "..") {
      dirOrder.push(cmd[2]);
      pwd = cmd[2];
    }
  } else {
    if (dirTree[pwd] === undefined) dirTree[pwd] = [];
    if (dirTreeWithSize[pwd] === undefined) dirTreeWithSize[pwd] = [];
    if (dirSizeTree[pwd] === undefined) dirSizeTree[pwd] = 0;
    if (cmd[0] === "dir") {
      dirTree[pwd].push(cmd[1]);
      dirTreeWithSize[pwd].push(cmd[1]);
    } else {
      dirSizeTree[pwd] += +cmd[0];
      dirTree[pwd].push(cmd[0]);
      dirTreeWithSize[pwd].push(cmd[0]);
    }
  }
});
function sizeOfDir(dir: string, subDir: string) {
  dirTreeWithSize[subDir].map((e: string) => {
    if (!isNumeric(e)) {
      if (dirSizeTree[e] === 0) sizeOfDir(subDir, e);
      else return;
    }
  });
  if (dirTreeWithSize[dir].includes(subDir)) {
    if (dirSizeTree[subDir]) {
      dirTreeWithSize[dir] = dirTreeWithSize[dir].filter(
        (item: string) => item !== subDir
      );
      dirSizeTree[dir] += dirSizeTree[subDir];
      dirTreeWithSize[dir].push(dirSizeTree[subDir]);
    }
  }
}
//traverse
const keys = Object.keys(dirTreeWithSize);
for (let i = 0; i < dirTreeWithSize["/"].length; i++) {
  for (let i = 0; i < keys.length; i++) {
    dirTreeWithSize[keys[i]].map((subDir: string) => {
      if (!isNumeric(subDir)) {
        sizeOfDir(keys[i], subDir);
      }
    });
  }
}
Object.keys(dirSizeTree).forEach((key) => {
  dirSizeTree[key] = 0;
  dirTreeWithSize[key].map((fileSize: string) => {
    dirSizeTree[key] += +fileSize;
  });
  if (dirSizeTree[key] < 100000) {
    answer += dirSizeTree[key];
  }
});
//checking if root dir size matches with all children dirs size
const rootDirSize = dirSizeTree["/"];
let childDirSize = 0;
Object.keys(dirSizeTree).forEach((key) => {
  if (key === "/") return;
  else {
    childDirSize += dirSizeTree[key];
  }
});
console.log(
  `rootDir size :${rootDirSize} , childDir size : ${childDirSize} , conditionMet? : ${
    rootDirSize >= childDirSize
  }`
);
console.log(dirTree);
console.log(dirTreeWithSize);
console.log(dirSizeTree);
console.log(answer);
