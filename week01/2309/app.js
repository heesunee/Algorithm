const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const findNotDwarf = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        arr.splice(j, 1);
        arr.splice(i, 1);
        return arr; //
      }
    }
  }
  return arr;
};

function solution() {
  const total = input.reduce((acc, cur) => acc + cur, 0);
  const notDwarf = total - 100;

  const result = findNotDwarf(input, notDwarf);
  const sortedResult = result.sort((a, b) => a - b);

  sortedResult.forEach((num) => console.log(num));
}

solution();
