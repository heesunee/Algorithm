const fs = require('fs');
const input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

function main2(input) {
  const N = +input.shift();
  let board = input.map((v) => v.trim().split(''));
  let answer = Infinity;

  const changeRow = (i) => {
    board[i] ^= (1 << N) - 1;
  };

  board = board.map((v) => {
    let num = 0;
    for (let i = 0; i < N; i++) {
      if (v[i] == 'H') {
        num |= 1 << i;
      }
    }
    return num;
  });

  const check = () => {
    let cnt = 0;
    for (let i = 0; i < N; i++) {
      let temp = 0;
      for (let j = 0; j < N; j++) {
        if (board[j] & (1 << i)) {
          temp++;
        }
      }
      cnt += Math.min(temp, N - temp);
    }
    return cnt;
  };

  for (let i = 0; i < 1 << N; i++) {
    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        changeRow(j);
      }
    }

    let res = check();
    if (res < answer) answer = res;

    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        changeRow(j);
      }
    }
  }
  console.log(answer);
}
main2(input);
