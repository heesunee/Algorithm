const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const word = fs.readFileSync(filePath).toString().trim();

const middle = word.length / 2;
const left = word.slice(0, parseInt(middle));
const right = word.slice(
  Number.isInteger(middle) ? middle : parseInt(middle) + 1
);

function solution() {
  if (left === right.split('').reverse().join('')) console.log(1);
  else console.log(0);
}

solution();
