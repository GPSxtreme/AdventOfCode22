import { dir } from "console";

const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
//variables
const dirOrder: string[] = [];
let dirTree: object = {};
let dirTreeWithSize: object = {};
let dirSizeTree: object = {};
let pwd: string;
let answer = 0;
//function to check if a char is an integer or not
function isNumeric(n: string) {
  return !isNaN(parseFloat(n));
}
//collecting data from input
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
      dirTree[pwd].push(cmd[0]);
      dirTreeWithSize[pwd].push(cmd[0]);
    }
  }
});
//recursive function to find size of dir
function sizeOfDir(dir: string, subDir: string) {
  let hasNoDirs = false;
  dirTreeWithSize[subDir].map((e: string) => {
    if (!isNumeric(e)) {
      hasNoDirs = false;
      if (dirSizeTree[subDir] === 0) return sizeOfDir(subDir, e);
    } else hasNoDirs = true;
  });
  if (hasNoDirs && dirTreeWithSize[dir].includes(subDir)) {
    dirTreeWithSize[subDir].map((e: string) => {
      dirSizeTree[subDir] += +e;
    });
    dirTreeWithSize[dir] = dirTreeWithSize[dir].filter(
      (item: string) => item !== subDir
    );
    dirTreeWithSize[dir].push(dirSizeTree[subDir]);
  }
}
//traverse
const dirs = Object.keys(dirTree);
// for (let i = 0; i < dirs.length; i++) {
//   let hasNoDirs = false;
//   dirTreeWithSize[dirs[i]].map((subDir: string) => {
//     if (!isNumeric(subDir)) {
//       hasNoDirs = false;
//       return sizeOfDir(dirs[i], subDir);
//     } else hasNoDirs = true;
//   });
//   if (hasNoDirs) {
//     dirTreeWithSize[dirs[i]].map((fileSize: string) => {
//       dirSizeTree[dirs[i]] += +fileSize;
//     });
//   }
// }
let hasNoDirs = false;
dirTreeWithSize[dirs[0]].map((subDir: string) => {
  if (!isNumeric(subDir)) {
    hasNoDirs = false;
    return sizeOfDir(dirs[0], subDir);
  } else hasNoDirs = true;
});
if (hasNoDirs) {
  dirTreeWithSize[dirs[0]].map((fileSize: string) => {
    dirSizeTree[dirs[0]] += +fileSize;
  });
}

//find total size of each dir and if it is less than 100k add it to result(bottom up)
for (let dir = dirs.length - 1; dir >= 0; dir--) {
  dirSizeTree[dirs[dir]] = 0;
  dirTreeWithSize[dirs[dir]].map((fileSize: string) => {
    dirSizeTree[dirs[dir]] += +fileSize;
  });
  if (dirSizeTree[dirs[dir]] < 100000) {
    answer += dirSizeTree[dirs[dir]];
  }
}
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
