let input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
let arr = input[0];
let bomb = input[1];
let bomLen = bomb.length;
let stack = [];
let top = 0;

for (let i = 0; i < arr.length; i++) {
  stack.push(arr[i]);
  top = arr[i];
  if (top === bomb[bomLen - 1]) {
    let last = stack.slice(-bomLen);
    if (last.join('') === bomb) stack.splice(-bomLen);
  }
}
console.log(stack.length ? stack.join('') : 'FRULA');
