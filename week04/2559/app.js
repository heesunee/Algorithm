const fs = require('fs');
const [NK, num] = fs
  .readFileSync('./dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number));
const [N, K] = NK;
let sum = 0;
const answer = [];
for (let i = 0; i < K; i++) {
  sum += num[i];
}
answer.push(sum);

for (let i = K; i < N; i++) {
  sum = sum - num[i - K] + num[i];
  answer.push(sum);
}
console.log(Math.max(...answer));
