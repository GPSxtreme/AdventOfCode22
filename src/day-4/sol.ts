const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
//both p-1 and p-2 included
let fullyRangePairs = 0; //part - 1 answer
let overLappingPairs = 0; //part - 2 answer
let totalPairs = 0;

input.split("\n").forEach((line) => {
  totalPairs++;
  const pairs = line.split(",");
  const pair1 = pairs[0];
  const pair2 = pairs[1];
  const pair1Limits = pair1.split("-");
  const pair2Limits = pair2.split("-");
  const pair1Ll = +pair1Limits[0];
  const pair1Ul = +pair1Limits[1];
  const pair2Ll = +pair2Limits[0];
  const pair2Ul = +pair2Limits[1];
  if (
    (pair2Ul >= pair1Ul && pair1Ll >= pair2Ll) ||
    (pair1Ul >= pair2Ul && pair2Ll >= pair1Ll)
  ) {
    fullyRangePairs++;
  }
  if (
    (pair1Ll >= pair2Ll && pair1Ul <= pair2Ul) ||
    (pair1Ul >= pair2Ll && pair1Ul <= pair2Ul) ||
    (pair2Ll >= pair1Ll && pair2Ll <= pair1Ul) ||
    (pair2Ul >= pair1Ll && pair2Ul <= pair1Ul)
  ) {
    overLappingPairs++;
  }
});
console.log(`total pairs : ${totalPairs}`);
console.log(`fully range pairs : ${fullyRangePairs}`);
console.log(`overlapping pairs :${overLappingPairs}`);
