const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let chars: Array<string> = [];
let answer = 0;
input.trim();
const partA = 4;
const partB = 14;
//to check duplicates
function hasDuplicates(array: string[]) {
  return new Set(array).size !== array.length;
}
//push input in array of characters
for (let i = 0; i < input.length; i++) {
  chars.push(input[i]);
}
//solution(change the starting of iteration value to partA or partB to get desired answer)
for (let i = partA; i <= input.length; i++) {
  const t = chars.slice(i - partA, i);
  const temp = t.splice(t.length - partA, t.length);
  if (!temp.includes(input[i]) && !hasDuplicates(temp)) {
    answer = i;
    break;
  }
}
console.log("----------answer-----------");
console.log(answer);
//part-a answer = 1582
//part-b answer = 3588
