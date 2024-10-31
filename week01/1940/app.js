const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, M, input] = fs.readFileSync(filePath).toString().trim().split('\n');

const material = input.split(' ').map(Number);
let total = 0;

function solution() {
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (material[i] + material[j] === Number(M)) {
        total += 1;
      }
    }
  }

  console.log(total);
}

solution();
