const fs = require('fs');
const input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');
const [N, L, R] = input.shift().trim().split(' ').map(Number);
let board = input.map((v) => v.trim().split(' ').map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let cnt = 0;
let flag = true;
while (flag) {
  flag = false;

  let visited = Array.from(Array(N), () => Array(N).fill(false));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        let united = [];
        let q = [];
        united.push([i, j]);
        let sum = board[i][j];
        q.push([i, j]);
        visited[i][j] = true;
        while (q.length > 0) {
          const [x, y] = q.shift();
          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[nx][ny]) {
              const diff = Math.abs(board[x][y] - board[nx][ny]);
              if (diff >= L && diff <= R) {
                visited[nx][ny] = true;
                united.push([nx, ny]);
                q.push([nx, ny]);
                sum += board[nx][ny];
              }
            }
          }
        }
        if (united.length > 1) {
          flag = true;
          let result = Math.floor(sum / united.length);
          united.forEach((v) => {
            const [x, y] = v;
            board[x][y] = result;
          });
        }
      }
    }
  }
  // console.log('============')
  // console.log(cnt, board)
  // console.log('============')
  if (flag) cnt++;
}

console.log(cnt);
