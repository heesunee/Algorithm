const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [T, ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const countZeros = (N) => {
  let count = 0;
  while (N > 5) {
    N = Math.floor(N / 5);
    count += N;
  }
  return count;
};

function solution() {
  const results = input.map(countZeros);
  console.log(results.join('\n'));
}

solution();
