const [x, ...board] = require('fs')
  .readFileSync('./dev/stdin')
  .toString()
  .trim()
  .split('\n');
const paper = board.map((v) => v.trim().split('').map(Number));

console.log(solve(paper));

function solve(paper) {
  const r = paper.length;
  const c = paper[0].length;
  if (r == 1) {
    return rowSum(paper);
  } else if (c == 1) {
    return columnSum(paper);
  } else if (r > 1 && c > 1) {
    const caseA = straight(paper);
    let caseB = 0;
    let caseC = 0;
    if (c > 2) {
      const { left, lbody } = leftKill(paper);
      const case1 = solve(left) + solve(lbody);
      const { right, rbody } = rightKill(paper);
      const case2 = solve(right) + solve(rbody);
      caseB = Math.max(case1, case2);
    }
    if (r > 2) {
      const { head, hbody } = headKill(paper);
      const case1 = solve(head) + solve(hbody);
      const { tail, tbody } = tailKill(paper);
      const case2 = solve(tail) + solve(tbody);
      caseC = Math.max(case1, case2);
    }
    return Math.max(caseA, caseB, caseC);
  }
}

// 제일 위쪽 가로로 한 줄 떼고 나머지.
function headKill(arr) {
  const head = arr.filter((v, i) => i == 0);
  const hbody = arr.filter((v, i) => i != 0);
  return { head, hbody };
}

// 제일 아래쪽 가로로 한 줄 떼고 나머지.
function tailKill(arr) {
  const tail = arr.filter((v, i) => i == arr.length - 1);
  const tbody = arr.filter((v, i) => i != arr.length - 1);
  return { tail, tbody };
}

// 제일 왼쪽 세로로 한 줄 떼고 나머지.
function leftKill(arr) {
  const left = arr.map((r) => {
    return r.filter((_, i) => i == 0);
  });
  const lbody = arr.map((r) => {
    return r.filter((_, i) => i != 0);
  });
  return { left, lbody };
}

// 제일 오른쪽 세로로 한 줄 떼고 나머지.
function rightKill(arr) {
  const right = arr.map((r) => {
    return r.filter((_, i) => i == r.length - 1);
  });
  const rbody = arr.map((r) => {
    return r.filter((_, i) => i != r.length - 1);
  });
  return { right, rbody };
}

//가로 한줄짜리 합
function rowSum(arr) {
  const L = arr[0].length;
  return arr[0].reduce((r, v, i) => {
    return r + v * 10 ** (L - i - 1);
  }, 0);
}

// 세로 한줄짜리 합.
function columnSum(arr) {
  const L = arr.length;
  return arr
    .map((x) => x[0])
    .reduce((r, v, i) => {
      return r + v * 10 ** (L - i - 1);
    }, 0);
}

///쭉쭉 찢은 거  가로로 쭉쭉 찢고 또, 세로로 쭉쭉 찢은 다음 두개 중에 큰 값
function straight(paper) {
  const r = paper.length;
  const c = paper[0].length;
  let row = 0;
  for (let i = 0; i < r; i++) {
    let sum = 0;
    for (let j = 0; j < c; j++) {
      sum += paper[i][j] * 10 ** (c - j - 1);
    }
    row += sum;
  }

  let column = 0;
  for (let j = 0; j < c; j++) {
    let sum = 0;
    for (let i = 0; i < r; i++) {
      sum += paper[i][j] * 10 ** (r - i - 1);
    }
    column += sum;
  }

  return Math.max(row, column);
}
