const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const iterator = input[Symbol.iterator]();
const offset = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const output = [];

const dfs = (start, M, N, farm) => {
  const stack = [start];
  while (stack.length) {
    const [x, y] = stack.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + offset[i][0];
      const ny = y + offset[i][1];
      if (nx >= 0 && nx < M && ny >= 0 && ny < N && farm[nx][ny]) {
        farm[nx][ny] = 0;
        stack.push([nx, ny]);
      }
    }
  }
};

iterator.next();
while (true) {
  const { value, done } = iterator.next();
  if (done) {
    break;
  }
  const [M, N, K] = value.split(' ').map(Number);
  const farm = [...Array(M)].map(() => Array(N).fill(0));
  for (let i = 0; i < K; i++) {
    const [x, y] = iterator.next().value.split(' ').map(Number);
    farm[x][y] = 1;
  }
  let count = 0;
  for (let x = 0; x < M; x++) {
    for (let y = 0; y < N; y++) {
      if (farm[x][y]) {
        farm[x][y] = 0;
        dfs([x, y], M, N, farm);
        count++;
      }
    }
  }
  output.push(count);
}

console.log(output.join('\n'));
