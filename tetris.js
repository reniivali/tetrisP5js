var hidden = false;
var heightG = 20;
var widthG = 10;
var canHei = (heightG * 40) / 1.5;
var canWid = (widthG * 40) / 1.5;
var dGrav = 0.01;
var grav = 0.01;
var keyDown = false;
var sDgrav;
var SDF = 17;
var score = 0;
var lock = 0;
var keyLeft = false;
var keyRight = false;
var das = 0;
var dasA = 10;
var arr = 1;
var arrtmp = 1;
var bag = [];
var bag2 = [];
var ghostblock = [];
var stopped = true;
var heldP = 0;
var doHold = true;
var fallingBlock = [];
var defLoc;
var rainbowBlock = false;
var rainbowPlace = 15;
var board = ["d"];
var Tmino = [
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 6, y: -1 },
  { x: 7, y: 0 },
];
var Imino = [
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
];
var Smino = [
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 6, y: -1 },
  { x: 7, y: -1 },
];
var Zmino = [
  { x: 5, y: -1 },
  { x: 6, y: -1 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
];
var Jmino = [
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 5, y: -1 },
  { x: 5, y: -2 },
];
var Lmino = [
  { x: 5, y: 0 },
  { x: 5, y: -1 },
  { x: 5, y: -2 },
  { x: 6, y: 0 },
];
var Omino = [
  { x: 5, y: 0 },
  { x: 5, y: -1 },
  { x: 6, y: -1 },
  { x: 6, y: 0 },
];
var aTexTime = 0;

function jql(input) {
  $("#console").append("<p>" + input + "</p>");
}

function fillBoard() {
  for (let i = 0; i < heightG * widthG; i++) {
    board.push(0);
  }
}

function preload() {
  dv = loadFont("DejaVu.ttf");
  fillBoard();
  let tempH = parseInt(localStorage.getItem("boardH"));
  let tempW = parseInt(localStorage.getItem("boardW"));
  if (tempH >= 4 && tempH != null) {
    heightG = tempH;
  }
  if (tempW >= 4 && tempH != null) {
    widthG = tempW;
  }
  console.log("Actual Width, height: " + widthG + ", " + heightG);
  console.log("temp width, height: " + tempW + ", " + tempH);
  canHei = (heightG * 40) / 1.5;
  canWid = (widthG * 40) / 1.5;
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function findM(num) {
  if (num == 1) {
    return Tmino;
  }
  if (num == 2) {
    return Imino;
  }
  if (num == 3) {
    return Smino;
  }
  if (num == 4) {
    return Zmino;
  }
  if (num == 5) {
    return Jmino;
  }
  if (num == 6) {
    return Lmino;
  }
  if (num == 7) {
    return Omino;
  }
}

function colorPick(num) {
  if (!rainbowBlock) {
    if (num == 1) {
      return "rgb(150,0,150)";
    }
    if (num == 2) {
      return "rgb(0,150,150)";
    }
    if (num == 3) {
      return "rgb(150,0,0)";
    }
    if (num == 4) {
      return "rgb(0,150,0)";
    }
    if (num == 5) {
      return "rgb(204,102,0)";
    }
    if (num == 6) {
      return "rgb(0,0,150)";
    }
    if (num == 7) {
      return "rgb(150,200,0)";
    }
  } else {
    return "rgb("+ rainbowPlace +"0,0)";
  }
}

function colorG(num) {
  if (!rainbowBlock) {
    if (num == 1) {
      return "rgba(150,0,150,.5)";
    }
    if (num == 2) {
      return "rgba(0,150,150,.5)";
    }
    if (num == 3) {
      return "rgba(150,0,0,.5)";
    }
    if (num == 4) {
      return "rgba(0,150,0,.5)";
    }
    if (num == 5) {
      return "rgba(204,102,0,.5)";
    }
    if (num == 6) {
      return "rgba(0,0,150,.5)";
    }
    if (num == 7) {
      return "rgba(150,200,0,.5)";
    }
  } else {
    return "rgb("+ rainbowPlace +" 0,0)";
  }
}

function setup() {
  createCanvas(canWid, canHei);
  blockReset(true);

  if (widthG * 40 > 400) {
    let calc = (widthG * 40 - 400) / 1.5;
    calc += 930;
    defLoc = +calc;
    $("#defaultCanvas1").css("margin-left", calc + "px");
  }
}

function draw() {
  textFont(dv);
  if (!stopped) {
    drawBoard();
    gravity();

    //CALCULATE the SDF and apply it to the gravity if the down arrow is pressed
    sDgrav = dGrav * SDF;
    if (keyDown) {
      grav = sDgrav;
      score++;
    } else {
      grav = sDgrav / SDF;
    }

    //MOVE THE PEICES WHEN KEYS ARE PRESSED
    if (keyLeft) {
      das++;
      if (das > dasA) {
        if (arrtmp < arr) {
          arrtmp++;
        } else {
          arrtmp = 0;
          moveL();
        }
      }
    }
    if (keyRight) {
      das++;
      if (das > dasA) {
        if (arrtmp < arr) {
          arrtmp++;
        } else {
          arrtmp = 0;
          moveR();
        }
      }
    }

    drawPiece();
    drawGhost();
    
    if (rainbowBlock) {
      if (rainbowPlace < 255) {
        rainbowPlace++;
      } else {
        rainbowPlace = 15;
      }
    }
  } else {
    fill(10, 10, 10);
    rect(0, 0, canWid, canHei);
    fill(225, 225, 225);
    textSize(50);
    text("Paused", canWid / 2 - 100, canHei / 2);
  }
}

function drawBoard() {
  stroke(100);
  strokeWeight(3);
  let ind = 1;
  for (let i = 0; i < heightG; i++) {
    for (let j = 0; j < widthG; j++) {
      let rad;
      if (board[ind] >= 1) {
        fill(colorPick(board[ind]));
        rad = 5;
      }
      if (board[ind] == 0) {
        fill(10, 10, 10);
        rad = 5;
      }
      rect(
        (j * canWid) / widthG,
        (i * canHei) / heightG,
        canWid / widthG,
        canHei / heightG,
        rad,rad,rad,rad
      );
      ind++;
    }
  }
}

function drawPiece() {
  fill(colorPick(fallingBlock[5]));
  strokeWeight(5);
  stroke(100);
  for (let i = 0; i < 4; i++) {
    rect(
      ((fallingBlock[i].x - 1) * canWid) / widthG,
      ((fallingBlock[i].y - 1) * canHei) / heightG,
      canWid / widthG,
      canHei / heightG,
      5,5,5,5
    );
  }
}

function drawGhost() {
  ghostblock = Array(fallingBlock.length).fill();
  for (let i = 0; i < fallingBlock.length; i++) {
    ghostblock[i] = { x: fallingBlock[i].x, y: Math.floor(fallingBlock[i].y) };
  }
  let lowestY = Math.max(...ghostblock.slice(0, 4).map((x) => x.y));
  //console.log("gamer" + lowestY);
  outer: while (lowestY < heightG - 1) {
    for (let i = 0; i < 4; i++) {
      //console.log(`asda ${ghostblock[i].y} ${ghostblock[i].x}`);
      if (board[(ghostblock[i].y + 1) * widthG + ghostblock[i].x] >= 1)
        break outer;
    }
    for (let i = 0; i < 5; i++) {
      ghostblock[i].y++;
    }
    lowestY++;
  }
  fill(colorG(fallingBlock[5]));
  noStroke();
  for (i = 0; i < 4; i++) {
    rect(
      ((fallingBlock[i].x - 1) * canWid) / widthG,
      (ghostblock[i].y * canHei) / heightG,
      canWid / widthG,
      canHei / heightG,
      5,5,5,5
    );
  }
}

//GRAVITY
function gravity() {
  let doLock = false;
  for (i = 0; i < 5; i++) {
    fallingBlock[i].y += grav;
  }
  let dumBlock = [];
  for (i = 0; i < 4; i++) {
    const { x, y } = fallingBlock[i];
    dumBlock.push({ x, y });
  }
  for (i = 0; i < 5; i++) {
    let done = false;
    if (
      board[Math.floor(dumBlock[0].y) * widthG + dumBlock[0].x] >= 1 ||
      Math.floor(dumBlock[0].y) >= heightG
    ) {
      fallingBlock[i].y -= grav;
      doLock = true;
      done = true;
    }
    if (
      (board[Math.floor(dumBlock[1].y) * widthG + dumBlock[1].x] >= 1 &&
        !done) ||
      (Math.floor(dumBlock[1].y) == heightG && !done)
    ) {
      fallingBlock[i].y -= grav;
      doLock = true;
      done = true;
    }
    if (
      (board[Math.floor(dumBlock[2].y) * widthG + dumBlock[2].x] >= 1 &&
        !done) ||
      (Math.floor(dumBlock[2].y) == heightG && !done)
    ) {
      fallingBlock[i].y -= grav;
      doLock = true;
      done = true;
    }
    if (
      (board[Math.floor(dumBlock[3].y) * widthG + dumBlock[3].x] >= 1 &&
        !done) ||
      (Math.floor(dumBlock[3].y) == heightG && !done)
    ) {
      fallingBlock[i].y -= grav;
      doLock = true;
      done = true;
    }
  }
  if (doLock) {
    lock++;
  } else {
    lock = 0;
  }
  if (lock == 30) {
    let tSpin = false;
    if (
      (prevKey == 90 && fallingBlock[5] == 1) ||
      (prevKey == 88 && fallingBlock[5] == 1)
    ) {
      $("#tsp").show();
      aTexTime = 120;
      tSpin = true;
      score += 200;
    }
    let lines = 0;
    for (let i = 0; i < 4; i++) {
      board[Math.floor(fallingBlock[i].y) * widthG + fallingBlock[i].x] =
        fallingBlock[5];
    }
    blockReset(true);
    lock = 0;
    doHold = true;
    for (let i = 0; i < heightG; i++) {
      let lineClear = true;
      let line = [];
      for (let j = 1; j < widthG + 1; j++) {
        line.push(board[i * widthG + j]);
      }
      for (let j = 0; j < widthG; j++) {
        if (line[j] == 0) {
          lineClear = false;
        }
      }
      if (lineClear) {
        for (let j = 1; j < widthG + 1; j++) {
          board.splice(i * widthG + 1, 1);
        }
        for (let j = 0; j < widthG + 0; j++) {
          board.splice(j, 0, 0);
        }
        lines++;
      }
    }
    if (lines == 1) {
      score += 200;
      $("#sig").show();
      aTexTime = 120;
      if (tSpin) {
        score += 400;
      }
    }
    if (lines == 2) {
      score += 300;
      $("#dob").show();
      aTexTime = 120;
      if (tSpin) {
        score += 800;
      }
    }
    if (lines == 3) {
      score += 500;
      $("#trp").show();
      aTexTime = 120;
      if (tSpin) {
        score += 1600;
      }
    }
    if (lines == 4) {
      score += 1000;
      $("#qwd").show();
      aTexTime = 120;
    }
  }
}

function hardDrop() {
  let lines = 0;
  for (i = 0; i < 4; i++) {
    board[Math.floor(ghostblock[i].y) * widthG + fallingBlock[i].x] =
      fallingBlock[5];
  }
  let lowestY = Math.max(...ghostblock.slice(0, 4).map((x) => x.y));
  score += 100 / lowestY;
  blockReset(true);
  lock = 0;
  doHold = true;
  for (let i = 0; i < heightG; i++) {
    let lineClear = true;
    let line = [];
    for (let j = 1; j <= widthG; j++) {
      line.push(board[i * widthG + j]);
    }
    for (let j = 0; j < widthG; j++) {
      if (line[j] == 0) {
        lineClear = false;
      }
    }
    if (lineClear) {
      for (let j = 1; j <= widthG; j++) {
        board.splice(i * widthG + 1, 1);
      }
      for (let j = 0; j < widthG + 0; j++) {
        board.splice(j, 0, 0);
      }
      lines++;
    }
  }
  if (lines == 1) {
    score += 200;
    $("#sig").show();
    aTexTime = 120;
  }
  if (lines == 2) {
    score += 300;
    $("#dob").show();
    aTexTime = 120;
  }
  if (lines == 3) {
    score += 500;
    $("#trp").show();
    aTexTime = 120;
  }
  if (lines == 4) {
    score += 1000;
    $("#qwd").show();
    aTexTime = 120;
  }
}

function blockReset(m) {
  fallingBlock.splice(0, fallingBlock.length);
  if (bag.length > 0) {
    let pieceN = bag.splice(0, 1);
    switch (+pieceN) {
      case 1:
        for (i = 0; i < 4; i++) {
          const { x, y } = Tmino[i];
          fallingBlock.push({ x, y });
        }
        fallingBlock.push({ x: 6, y: 0 }, 1, 0);
        break;
      case 2:
        for (i = 0; i < 4; i++) {
          const { x, y } = Imino[i];
          fallingBlock.push({ x, y });
        }
        fallingBlock.push({ x: 5, y: -1 }, 2, 0);
        break;
      case 3:
        for (i = 0; i < 4; i++) {
          const { x, y } = Smino[i];
          fallingBlock.push({ x, y });
        }
        fallingBlock.push({ x: 5, y: 0 }, 3, 0);
        break;
      case 4:
        for (i = 0; i < 4; i++) {
          const { x, y } = Zmino[i];
          fallingBlock.push({ x, y });
        }
        fallingBlock.push({ x: 5, y: 0 }, 4, 0);
        break;
      case 5:
        for (i = 0; i < 4; i++) {
          const { x, y } = Jmino[i];
          fallingBlock.push({ x, y });
        }
        fallingBlock.push({ x: 5, y: 0 }, 5, 0);
        break;
      case 6:
        for (i = 0; i < 4; i++) {
          const { x, y } = Lmino[i];
          fallingBlock.push({ x, y });
        }
        fallingBlock.push({ x: 5, y: 0 }, 6, 0);
        break;
      case 7:
        for (i = 0; i < 4; i++) {
          const { x, y } = Omino[i];
          fallingBlock.push({ x, y });
        }
        fallingBlock.push({ x: 5.5, y: -0.5 }, 7, 0);
        break;
    }
    for (i = 0; i < 4; i++) {
      if (
        board[Math.floor(fallingBlock[i].y + 1) * 10 + fallingBlock[i].x] == 1
      ) {
        reset();
      }
    }
  } else {
    if (bag2.length == 0) {
      uniListGen(bag, 7, 1, 7);
      uniListGen(bag2, 7, 1, 7);
    } else {
      bag = bag2.splice(0, bag2.length);
      uniListGen(bag2, 7, 1, 7);
    }
    console.log("BAG: " + bag + " " + bag2);
    blockReset(m);
  }
}

function uniListGen(list, length, min, max) {
  let run = false;
  if (max + 1 - min < length) {
    console.log("too small you pleb");
  } else {
    run = true;
  }
  if (run) {
    let unfiltlist = [];
    for (let i = min; i < max + 1; i++) {
      unfiltlist.push(i);
    }
    for (let i = 0; i < length; i++) {
      let indexnum = randNum(0, unfiltlist.length - 1);
      list.push(unfiltlist[indexnum]);
      unfiltlist.splice(indexnum, 1);
    }
  }
  return list;
}

function reset() {
  bag = [];
  bag2 = [];
  board = ["d"];
  blockReset(true);
  fillBoard();
  drawBoard();
  score = 0;
  heldP = 0;
  stopped = true;
  alert("Game Over :(");
}

function moveL() {
  for (let i = 0; i < 5; i++) {
    fallingBlock[i].x--;
  }
  for (let i = 0; i < 4; i++) {
    if (
      board[Math.floor(fallingBlock[i].y) * widthG + fallingBlock[i].x] >= 1 ||
      fallingBlock[i].x <= 0
    ) {
      for (let i = 0; i < 5; i++) {
        fallingBlock[i].x++;
      }
    }
  }
  pieceCheck();
}

function moveR() {
  for (let i = 0; i < 5; i++) {
    fallingBlock[i].x++;
  }
  for (let i = 0; i < 4; i++) {
    if (
      board[Math.floor(fallingBlock[i].y) * widthG + fallingBlock[i].x] >= 1 ||
      fallingBlock[i].x >= widthG + 1
    ) {
      for (let i = 0; i < 5; i++) {
        fallingBlock[i].x--;
      }
    }
  }
  pieceCheck();
}

function rotClock() {
  const { x: rx, y: ry } = fallingBlock[4];
  for (let i = 0; i < 4; i++) {
    const { x, y } = fallingBlock[i];
    fallingBlock[i].x = -(y - ry) + rx;
    fallingBlock[i].y = x - rx + ry;
  }

  felA: for (let i = 0; i < 4; i++) {
    if (fallingBlock[i].x >= widthG + 1) {
      for (let i = 0; i < 4; i++) {
        fallingBlock[i].x--;
      }
    } else if (fallingBlock[i].x <= 0) {
      for (let i = 0; i < 4; i++) {
        fallingBlock[i].x++;
      }
    }
  }
}

function rotCount() {
  const { x: rx, y: ry } = fallingBlock[4];
  for (let i = 0; i < 4; i++) {
    const { x, y } = fallingBlock[i];
    fallingBlock[i].x = y - ry + rx;
    fallingBlock[i].y = -(x - rx) + ry;
  }

  for (let i = 0; i < 4; i++) {
    if (fallingBlock[i].x >= widthG + 1) {
      for (let i = 0; i < 4; i++) {
        fallingBlock[i].x--;
      }
    } else if (fallingBlock[i].x <= 0) {
      for (let i = 0; i < 4; i++) {
        fallingBlock[i].x++;
      }
    }
  }
}

function keyCheck(key, runfunk, eK, eR) {
  let allowed = true;
  if (eR != undefined) {
    allowed = !eR;
  }
  if (!allowed && prevKey == key) {
    return;
  }
  if (eK == key && !stopped) {
    runfunk();
  }
}

function pieceCheck() {
    out:for (let i = 0; i < 4; i++) {
        //check for collisions if there are, move left
        if (board[(Math.floor(fallingBlock[i].y)*10)+fallingBlock[i].x] >= 1 || fallingBlock[i].x >= 11) {
            for (let j = 0; j < 4; j++) {
                fallingBlock[j].x--;
            }
            if (!board[(Math.floor(fallingBlock[i].y)*10)+fallingBlock[i].x] >= 1 && !fallingBlock[i].x >= 11) {break out;}
            for (let j = 0; j < 4; j++) {
                fallingBlock[j].x++;
            }
        }

        if (board[(Math.floor(fallingBlock[i].y)*10)+fallingBlock[i].x] >= 1 || fallingBlock[i].x <= 0) {
            for (let j = 0; j < 4; j++) {
                fallingBlock[j].x++;
            }
            if (!board[(Math.floor(fallingBlock[i].y)*10)+fallingBlock[i].x] >= 1 && !fallingBlock[i].x <= 0) {break out;}
            for (let j = 0; j < 4; j++) {
                fallingBlock[j].x--;
            }
        }
    }
}

function hold() {
  if (doHold) {
    if (heldP == 0) {
      heldP = +fallingBlock[5];
      blockReset(true);
      doHold = false;
    } else {
      let tempH = heldP.valueOf();
      heldP = fallingBlock[5].valueOf();
      fallingBlock.splice(0, fallingBlock.length);
      switch (tempH) {
        case 1:
          for (i = 0; i < 4; i++) {
            const { x, y } = Tmino[i];
            fallingBlock.push({ x, y });
          }
          fallingBlock.push({ x: 6, y: 0 }, 1, 0);
          break;
        case 2:
          for (i = 0; i < 4; i++) {
            const { x, y } = Imino[i];
            fallingBlock.push({ x, y });
          }
          fallingBlock.push({ x: 5, y: -1 }, 2, 0);
          break;
        case 3:
          for (i = 0; i < 4; i++) {
            const { x, y } = Smino[i];
            fallingBlock.push({ x, y });
          }
          fallingBlock.push({ x: 5, y: 0 }, 3, 0);
          break;
        case 4:
          for (i = 0; i < 4; i++) {
            const { x, y } = Zmino[i];
            fallingBlock.push({ x, y });
          }
          fallingBlock.push({ x: 5, y: 0 }, 4, 0);
          break;
        case 5:
          for (i = 0; i < 4; i++) {
            const { x, y } = Jmino[i];
            fallingBlock.push({ x, y });
          }
          fallingBlock.push({ x: 5, y: 0 }, 5, 0);
          break;
        case 6:
          for (i = 0; i < 4; i++) {
            const { x, y } = Lmino[i];
            fallingBlock.push({ x, y });
          }
          fallingBlock.push({ x: 5, y: 0 }, 6, 0);
          break;
        case 7:
          for (i = 0; i < 4; i++) {
            const { x, y } = Omino[i];
            fallingBlock.push({ x, y });
          }
          fallingBlock.push({ x: 5.5, y: -0.5 }, 7, 0);
          break;
      }
      doHold = false;
    }
  }
}

function pD(sk, y, p, holdB) {
  if (p != 0) {
    let h = 20;
    let pie = findM(p);
    for (let i = 0; i < 4; i++) {
      sk.fill(colorPick(+p));
      if (!doHold && holdB) {
        sk.fill(30, 30, 30);
      }
      sk.rect((pie[i].x - 1.5) * h, (pie[i].y + 1 + y) * h, h, h);
    }
  }
}

function drawNextQ(sk) {
  let tempN = [];
  let j = 1.5;
  for (let i = 0; i < bag.length; i++) {
    tempN.push(bag[i]);
  }
  for (let i = 0; i < bag2.length; i++) {
    tempN.push(bag2[i]);
  }
  for (let i = 0; i < 6; i++) {
    pD(sk, j, tempN[i], false);
    j += 3.5;
  }
}

var prevKey = null;

$(document).ready(function () {
  $("#setHeight").click(function () {
    localStorage.setItem("boardH", $("#bHi").val());
  });

  $("#setWidth").click(function () {
    localStorage.setItem("boardW", $("#bWi").val());
  });

  $("#hideShow").click(function () {
    if (!hidden) {
      $(".descCanv").hide();
      $(".p5Canvas").css("margin-top", "20px");
      $("#defaultCanvas0").css("margin-left", "-425px");
      $("#defaultCanvas2").css("margin-left", "230px");
      $("#defaultCanvas1").css("margin-left", defLoc - 415 + "px");
      $("#actTxt").css("margin-left", "10px");
      hidden = true;
    } else {
      $(".descCanv").show();
      $(".p5Canvas").css("margin-top", "-500px");
      $("#defaultCanvas0").css("margin-left", "auto");
      $("#defaultCanvas2").css("margin-left", "650px");
      $("#defaultCanvas1").css("margin-left", defLoc + "px");
      $("#actTxt").css("margin-left", "435px");
      hidden = false;
    }
  });

  //DETECT KEYS
  window.onkeydown = function (e) {
    //console.log("You pressed key code: " + e.keyCode);
    if (e.keyCode == 40) {
      keyDown = true;
    }
    keyCheck(
      37,
      function () {
        keyLeft = true;
        moveL();
      },
      e.keyCode,
      e.repeat
    );
    keyCheck(
      39,
      function () {
        keyRight = true;
        moveR();
      },
      e.keyCode,
      e.repeat
    );
    keyCheck(
      32,
      function () {
        hardDrop();
      },
      e.keyCode,
      e.repeat
    );
    keyCheck(
      90,
      function () {
        rotClock();
      },
      e.keyCode,
      e.repeat
    );
    keyCheck(
      88,
      function () {
        rotCount();
      },
      e.keyCode,
      e.repeat
    );
    keyCheck(
      67,
      function () {
        hold();
      },
      e.keyCode,
      e.repeat
    );

    prevKey = e.keyCode;
  };
  window.onkeyup = function (e) {
    if (e.keyCode == 40) {
      keyDown = false;
    }
    if (e.keyCode == 37) {
      keyLeft = false;
      das = 0;
      arrtmp = arr;
    }
    if (e.keyCode == 39) {
      keyRight = false;
      das = 0;
      arrtmp = arr;
    }
  };

  function updateText() {
    $("#score").html("Score: " + Math.floor(score).toLocaleString("de"));
    if (aTexTime > 0) {
      aTexTime--;
    } else {
      $("#tsp").hide();
      $("#sig").hide();
      $("#dob").hide();
      $("#trp").hide();
      $("#qwd").hide();
    }
  }
  setInterval(updateText, 1000 / 60);

  const s = (sket) => {
    sket.setup = () => {
      sket.createCanvas(200, 100);
    };
    sket.draw = () => {
      if (!stopped) {
        sket.background(10);
        sket.fill(200);
        sket.textFont(dv);
        sket.textSize(20);
        sket.noStroke();
        sket.text("Hold", 10, 20);
        sket.stroke(100);
        sket.strokeWeight(3);
        pD(sket, 1.5, heldP, true);
      } else {
        sket.fill(10, 10, 10);
        sket.rect(0, 0, 200, 100);
      }
    };
  };

  let holdQ = new p5(s, "holdQ");

  const s2 = (sket) => {
    sket.setup = () => {
      sket.createCanvas(200, 450);
    };
    sket.draw = () => {
      if (!stopped) {
        sket.background(10);
        sket.fill(200);
        sket.textFont(dv);
        sket.textSize(20);
        sket.noStroke();
        sket.text("Next", 10, 20);
        sket.stroke(100);
        sket.strokeWeight(3);
        drawNextQ(sket);
      } else {
        sket.fill(10, 10, 10);
        sket.rect(0, 0, 200, 500);
      }
    };
  };

  let nextQ = new p5(s2, "nextQ");
});
