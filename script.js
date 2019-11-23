let M = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let CurrentImg = [];
let Images = [];
let Memory = [0, 0, 0];
Arr();
Build();
setTimeout(Hide, 1500);
function Arr() {
  for (let i = 0; i < 4; i++) {
    CurrentImg[i] = [];
    Images[i] = [];
    for (let j = 0; j < 4; j++) {
      let x = Math.floor(Math.random() * M.length);
      CurrentImg[i][j] = M[x];
      Images[i][j] = M[x];
      M.splice(x, 1);
    }
  }
}

function Click(i, j) {
  CurrentImg[i][j] = Images[i][j];
  Build();

  if (Memory[2] == 0) {
    Memory[0] = i;
    Memory[1] = j;
    Memory[2] = Images[i][j];
  } else {
    if (Memory[2] != Images[i][j] || (Memory[0] == i && Memory[1] == j)) {
      CurrentImg[i][j] = 0;
      CurrentImg[Memory[0]][Memory[1]] = 0;
      setTimeout(Build, 1000);
    }
    Memory[2] = 0;
  }
  Comparison();
}

function Comparison() {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (CurrentImg[i][j] == Images[i][j]) {
        count++;
      }
    }
  }
  if (count == 16) {
    setTimeout(function() {
      alert("You Win!");
    }, 1500);
  }
}

function Build() {
  let tbl = "";
  for (let i = 0; i < 4; i++) {
    tbl += "<tr>";
    for (let j = 0; j < 4; j++) {
      tbl += `<td><img onclick="Click(${i},${j})" src="img/${CurrentImg[i][j]}.png" /></td>`;
    }

    tbl += "</tr>";
  }
  document.getElementsByTagName("table")[0].innerHTML = tbl;
}

function Hide() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      CurrentImg[i][j] = 0;
    }
  }
  Build();
}