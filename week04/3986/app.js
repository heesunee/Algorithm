const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

  /**
   * 입력
   * 3
   * ABAB
   * AABB
   * ABBA
   */
  
const N = Number(input[0]); // 단어의 수

function isGoodWord(word) {
  const stack = []; // 짝을 맞출 때 사용할 스택
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    if (ch === 'A') {
      stack.push('A'); // A가 나오면 스택에 넣기
    } else if (ch === 'B') {
      if (stack.length > 0 && stack[stack.length - 1] === 'A') {
        stack.pop(); // B가 나오면 스택에서 A와 짝을 지어 pop
      } else {
        return false; // 짝이 맞지 않으면 false 리턴
      }
    }
  }
  return stack.length === 0; // 모든 문자가 짝이 맞으면 스택이 비어야 함
}

function solution(input) {
  let goodWordCount = 0; // 좋은 단어의 개수
  for (let i = 1; i <= N; i++) {
    if (isGoodWord(input[i])) {
      goodWordCount++; // 좋은 단어이면 개수 증가
    }
  }
  return goodWordCount;
}

console.log(solution(input)); // 결과 출력
