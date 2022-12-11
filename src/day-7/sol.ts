const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
//variables
const dirOrder: string[] = [];
let pwd: string;
let allDirs = new Map<string, Array<any>>();
let ansPA = 0;
//function to check if a char is an integer or not
//collecting data from input
input.split("\n").forEach((line) => {
  const cmd = line.trim().split(" ");
  if (cmd[0] === "$") {
    if (cmd[1] === "ls") return;
    else if (cmd[2] === "..") {
      dirOrder.pop();
      return;
    } else if (cmd[1] === "cd" && cmd[2] !== "..") {
      pwd = `${
        dirOrder.length != 0 ? `${dirOrder[dirOrder.length - 1]}-` : ""
      }${cmd[2]}`;
      dirOrder.push(cmd[2]);
      return;
    }
  } else {
    const arr = allDirs.get(pwd) === undefined ? [] : allDirs.get(pwd);
    if (cmd[0] === "dir") {
      allDirs.set(pwd, [
        ...arr,
        `${pwd[2] === undefined ? pwd[0] : pwd.split("-")[1]}-${cmd[1]}`,
      ]);
    } else {
      allDirs.set(pwd, [...arr, +cmd[0]]);
    }
  }
});
const getDirSize = (path: string): number => {
  const dir = allDirs.get(path);
  if (!dir) return;
  let size = 0;
  for (const item of dir) {
    if (typeof item === "number") {
      size += item;
      continue;
    }
    const dirSize = getDirSize(item);
    size += dirSize;
    allDirs.set(
      path,
      allDirs.get(path)?.map((i) => (i === item ? dirSize : i))
    );
  }
  return size;
};

for (const [path] of allDirs) {
  const size = getDirSize(path);
  if (size < 100000) ansPA += size;
}
console.log(`Sum of the total sizes of directories less than 100k: ${ansPA}`);

//part-2
const TOTAL_STORAGE_SPACE = 70000000;
const REQUIRED_FREE_SPACE = 30000000;
let availableStorageSpace = 0;
const dirsGreaterThanRequired = [];
let dirSizeTree = new Map<string, number>();
for (const [path, fileSizes] of allDirs) {
  let size = 0;
  for (let i = 0; i < fileSizes.length; i++) {
    size += fileSizes[i];
    dirSizeTree.set(path, size);
  }
}

availableStorageSpace = TOTAL_STORAGE_SPACE - dirSizeTree.get("/");
const neededFileSizeToRemove = REQUIRED_FREE_SPACE - availableStorageSpace;
for (const [path] of allDirs) {
  if (path === "/") continue;
  const size = dirSizeTree.get(path);
  if (size >= neededFileSizeToRemove) dirsGreaterThanRequired.push(size);
}
console.log(dirsGreaterThanRequired);
const minSizeToDel = Math.min(...dirsGreaterThanRequired);
console.log(minSizeToDel - REQUIRED_FREE_SPACE);
console.log(`Minimum size of directory to be removed: ${minSizeToDel}`);
