const solve = (N, input) => {
  const schedule = input
    .map((time) => time.split(' ').map((v) => +v))
    .sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] - b[0];
      } else return a[1] - b[1];
    });
  let i = 0;
  let count = 0;
  let curEnd = 0;
  while (i < N) {
    const [start, end] = schedule[i++];
    if (start >= curEnd) {
      curEnd = end;
      count++;
    }
  }
  console.log(count);
};

const [N, ...input] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
solve(N, input);
