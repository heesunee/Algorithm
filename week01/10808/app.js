const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('');
const unicodeInput = input.map((char) => char.charCodeAt(0)); //문자를 유니코드로 변환시켜 저장한 배열

let alphabetCount = Array(26).fill(0); //개수를 저장할 배열, 초기값은 0
const alphabet = Array.from({ length: 26 }, (_, i) => 97 + i); //알파벳의 유니코드 값이 저장된 배열

function solution() {
  unicodeInput.forEach((unicode) => {
    const index = alphabet.indexOf(unicode);

    if (index !== -1) {
      alphabetCount[index] += 1;
    }
  });

  console.log(...alphabetCount);
}

solution();
