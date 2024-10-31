const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, pattern, ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution() {
  const findPattern = pattern.trim();
  const starIndex = findPattern.indexOf('*'); // 별표의 인덱스 찾기

  const startPattern = findPattern.slice(0, starIndex);
  const endPattern = findPattern.slice(starIndex + 1);

  input.forEach((word) => {
    const startsWithPattern = word.startsWith(startPattern);
    const endsWithPattern = word.endsWith(endPattern);

    if (
      startsWithPattern &&
      endsWithPattern &&
      word.length >= startPattern.length + endPattern.length
    ) {
      console.log('DA');
    } else {
      console.log('NE');
    }
  });
}

solution();
