const fs = require('fs');
const [n, ...arr] = fs
  .readFileSync('./dev/stdin')
  .toString()
  .trim()
  .split('\n');

let clothes = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i].includes(' ')) {
    let temp = arr[i].split(' ');
    clothes[clothes.length - 1].push(temp);
  } else {
    clothes.push([]);
  }
}

clothes.forEach((arr) => {
  let cloth = {};
  arr.forEach((v) => {
    if (cloth.hasOwnProperty(v[1])) {
      cloth[v[1]]++;
    } else {
      cloth[v[1]] = 1;
    }
  });
  let clothArr = Object.entries(cloth);
  if (clothArr.length == 1) {
    console.log(clothArr[0][1]);
  } else {
    console.log(
      clothArr.reduce((r, v) => {
        return r * (v[1] + 1);
      }, 1) - 1
    );
  }
});
