const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [A, B, C] = input[0].split(' ').map(Number);
const times = input.slice(1).map((line) => line.split(' ').map(Number));
const timeCount = Array(Math.max(...times.flat())).fill(0);
let totalCost = 0;

function solution() {
  times.forEach(([start, end]) => {
    for (let i = start; i < end; i++) {
      timeCount[i - 1] += 1;
    }
  });

  timeCount.forEach((count, index) => {
    if (count > 0) {
      if (count === 1) totalCost += count * A;
      else if (count === 2) totalCost += count * B;
      else if (count === 3) totalCost += count * C;
    }
  });

  console.log(totalCost);
}

solution();
