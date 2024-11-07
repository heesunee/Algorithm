const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const nums = input.map((v) => v.split(' ').map((v) => +v));
const n = nums[0].shift();
const c = nums[0].shift();

let array = [];

for (let i = 0; i < n; i++) array.push(nums[1][i]);

let map = new Map();
for (let i = 0; i < n; i++) {
  if (!map.has(array[i])) map.set(array[i], 1);
  else map.set(array[i], map.get(array[i]) + 1); //맵에 있으면 원래 value 값에 +1
}
let mapToArray = [];
map.forEach((value, key) => {
  mapToArray.push([key, value]); //[][0]에는 key값,[][1]에는 value값
});
mapToArray.sort((a, b) => {
  return b[1] - a[1];
});

let answer = '';
for (let i = 0; i < mapToArray.length; i++) {
  answer += Array(mapToArray[i][1]).fill(mapToArray[i][0]).join(' ') + ' ';
}

console.log(answer);
