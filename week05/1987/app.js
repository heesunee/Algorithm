const input = require('fs')
  .readFileSync('./dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.trim());
const [N, M] = input[0].split(' ').map(Number);

let board = input.slice(1).map((v) => v.split(''));
const dir = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

let start = 1 << (board[0][0].charCodeAt(0) - 65);
let answer = 1;
solve([0, 0], 1, start);
console.log(answer);

function solve(pos, cnt, used) {
  const [r, c] = pos;
  dir.forEach((v) => {
    const [x, y] = v;
    if (
      r + x >= 0 &&
      c + y >= 0 &&
      r + x < N &&
      c + y < M &&
      !(used & (1 << (board[r + x][y + c].charCodeAt(0) - 65)))
    ) {
      answer = Math.max(cnt + 1, answer);
      solve(
        [r + x, c + y],
        cnt + 1,
        used | (1 << (board[r + x][y + c].charCodeAt(0) - 65))
      );
    }
  });
}
