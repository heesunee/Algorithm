const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('').sort();

function solution() {
  const charCount = {};

  // 각 문자의 개수 세기
  input.forEach((char) => {
    charCount[char] = (charCount[char] || 0) + 1;
  });

  let oddCount = 0;
  let oddChar = '';

  // 홀수 개수의 문자를 확인
  for (const char in charCount) {
    if (charCount[char] % 2 !== 0) {
      oddCount++;
      oddChar = char; // 홀수 문자를 저장
    }
  }

  // 홀수 개수의 문자가 1개 이상이면 팰린드롬 불가능
  if (oddCount > 1) {
    console.log("I'm Sorry Hansoo");
    return;
  }

  let halfPalindrome = '';

  // 팰린드롬의 반을 만들기
  for (const char in charCount) {
    halfPalindrome += char.repeat(charCount[char] / 2);
  }

  // 전체 팰린드롬 문자열 생성
  const palindrome =
    halfPalindrome + oddChar + halfPalindrome.split('').reverse().join('');
  console.log(palindrome);
}

solution();
