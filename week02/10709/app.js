const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [H, W] = input.shift().split(' ').map(Number);
const cloudCheck = input.map((line) => line.trim().split(''));
console.log(cloudCheck);

// H * W의 배열을 -1로 초기화
let cloudMap = Array.from({ length: H }, () => Array(W).fill(-1));
console.log(cloudMap);

// 각 행에 대해 구름 위치와 시간을 계산
for (let i = 0; i < H; i++) {
  let time = -1; // 구름이 도달하는 시간을 계산할 변수

  for (let j = 0; j < W; j++) {
    if (cloudCheck[i][j] === 'c') {
      time = 0; // 구름 시작 지점
      cloudMap[i][j] = time; // 현재 위치에 구름이 있으면 0으로 설정
    } else if (time !== -1) {
      // 구름이 오른쪽으로 이동할 때만 시간 증가
      time += 1;
      cloudMap[i][j] = time;
    }
  }
}

// 결과 출력
cloudMap.forEach((row) => console.log(row.join(' ')));
