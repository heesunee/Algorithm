const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

// 계산 함수
function calc(oper, a, b) {
  if (oper === '+') {
    return a + b;
  } else if (oper === '-') {
    return a - b;
  } else {
    return a * b;
  }
}

function solution(input) {
  const N = Number(input[0]); // 수식의 길이
  const arr = input[1].split(''); // 수식 배열

  let nums = []; // 숫자 배열
  let opers = []; // 연산자 배열

  for (let i = 0; i < N; i++) {
    if (i % 2 === 0) {
      nums.push(Number(arr[i])); // 숫자
    } else {
      opers.push(arr[i]); // 연산자
    }
  }

  let ans = -Infinity; // 최댓값을 저장할 변수

  const check = (here, number) => {
    // nums = [3, 8, 7, 9 ,2]
    // opers = [ +, *, -, * ]
    // ans = -Infinity
    if (here === nums.length - 1) {
      ans = Math.max(ans, number); // 최댓값 갱신
      return;
    }

    // 다음 숫자와 계산
    check(here + 1, calc(opers[here], number, nums[here + 1]));

    // 두 번째 괄호를 고려한 계산
    if (here + 2 <= nums.length - 1) {
      const temp = calc(opers[here + 1], nums[here + 1], nums[here + 2]);
      check(here + 2, calc(opers[here], number, temp));
    }
  };

  check(0, nums[0]); // 첫 번째 숫자부터 시작
  return ans; // 최종 결과 반환
}

// 입력 데이터를 기반으로 솔루션 실행
console.log(solution(input));
