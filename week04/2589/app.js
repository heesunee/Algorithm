const input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().trim().split(' ').map(Number);
const board = input.map((v) => v.trim().split(''));
const Land = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] == 'L') {
      Land.push([i, j]);
    }
  }
}

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

let answer = 0;
Land.forEach((v) => {
  let visited = Array.from(Array(N), () => Array(M).fill(0));
  visited[v[0]][v[1]] = true;
  let q = [];
  let max = 0;
  q.push([v[0], v[1], 0]);
  while (q.length > 0) {
    const [x, y, cnt] = q.shift();
    max = Math.max(max, cnt);
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        board[nx][ny] == 'L' &&
        visited[nx][ny] == false
      ) {
        visited[nx][ny] = true;
        q.push([nx, ny, cnt + 1]);
      }
    }
  }
  answer = Math.max(max, answer);
});

console.log(answer);
