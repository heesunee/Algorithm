const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

let answer = 0;
const [N, M] = input.shift().split(' ').map(Number);
const graph = input.map((line) => line.split(' ').map(Number));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function isValid(x, y) {
  return x >= 0 && x < N && y >= 0 && y < M;
}

function spreadVirus() {
  const queue = [];
  const temp = graph.map((line) => [...line]);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (temp[i][j] === 2) queue.push([i, j]);
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (!isValid(nx, ny)) continue;

      if (temp[nx][ny] === 0) {
        temp[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (temp[i][j] === 0) count++;
    }
  }
  answer = Math.max(answer, count);
}

function installWall(count) {
  if (count === 3) {
    spreadVirus();
    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 0) {
        graph[i][j] = 1;
        installWall(count + 1);
        graph[i][j] = 0;
      }
    }
  }
}

installWall(0);
console.log(answer);
