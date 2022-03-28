//javascript for the TETRIS side of the game
var hidden = false;
var bg;
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
var lockRot = 10;
var clearLines = 0;
var clearLinesD = 0;
var level = 1;
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
var zoneCharge = 0;
var zoneTT = 60;
var zone = false;
var zoneLines = 0;
var zoneLT = 0;
var zoneFac;
var gravD;
var ghostColor = true;
var boardStroke = 100;
var backfire = false;
var garboMulti = 1;
var smooth = false;
var selectKey = 0;
var keyML = 37;
var keyMR = 39;
var key1R = 65;
var keyHD = 32;
var keySD = 40;
var keyHL = 67;
var keyZN = 83;
var keyPZ = 80;
var keyRCC = 90;
var keyRCL = 88;
var pushReady = false;
var board = ["d"];
var garbPushL = [];
var garbQ = [];
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
var Lmino = [
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: -1 },
  { x: 6, y: 0 },
];
var Jmino = [
  { x: 4, y: 0 },
  { x: 4, y: -1 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
];
var Omino = [
  { x: 5, y: 0 },
  { x: 5, y: -1 },
  { x: 6, y: -1 },
  { x: 6, y: 0 },
];
var aTexTime = 0;

//mostly redundant logging function for printing things to an HTML element for debugging without an inspect menu
function jql(input) {
  $("#console").append("<p>" + input + "</p>");
}

//fill the board with a grid, so the game actually works.
function fillBoard() {
  for (i = 0; i < heightG * widthG; i++) {
    board.push(0);
  }
}

//run this function before ANYTHING loads
function preload() {
  dv = loadFont("DejaVu.ttf");
  fillBoard();
  //grab our board height and width from localstorage
  let tempH = parseInt(localStorage.getItem("boardH"));
  let tempW = parseInt(localStorage.getItem("boardW"));
  //if they exist, and are both greater than four, set them to the grabbed local variables
  if (tempH >= 4 && tempH != null) {
    heightG = tempH;
  }
  if (tempW >= 4 && tempH != null) {
    widthG = tempW;
  }
  canHei = (heightG * 40) / 1.5;
  canWid = (widthG * 40) / 1.5;

  zoneFac = 0.2 / (widthG / 10);

  //load our background image into the bg variable
  bg = loadImage("assets/water.jpg");

  //load the locally stored keybinds
  let tempML = parseInt(localStorage.getItem("keyML"));
  let tempMR = parseInt(localStorage.getItem("keyMR"));
  let temp1R = parseInt(localStorage.getItem("key1R"));
  let tempHD = parseInt(localStorage.getItem("keyHD"));
  let tempSD = parseInt(localStorage.getItem("keySD"));
  let tempHL = parseInt(localStorage.getItem("keyHL"));
  let tempZN = parseInt(localStorage.getItem("keyZN"));
  let tempPZ = parseInt(localStorage.getItem("keyPZ"));
  let tempRCC = parseInt(localStorage.getItem("keyRCC"));
  let tempRCL = parseInt(localStorage.getItem("keyRCL"));

  //if they exist, and are not null, set them to the grabbed local variables
  if (tempML != NaN && tempML != undefined) {
    keyML = tempML;
  }
  if (tempMR != NaN && tempMR != undefined) {
    keyMR = tempMR;
  }
  if (temp1R != NaN && temp1R != undefined) {
    key1R = temp1R;
  }
  if (tempHD != NaN && tempHD != undefined) {
    keyHD = tempHD;
  }
  if (tempSD != NaN && tempSD != undefined) {
    keySD = tempSD;
  }
  if (tempHL != NaN && tempHL != undefined) {
    keyHL = tempHL;
  }
  if (tempZN != NaN && tempZN != undefined) {
    keyZN = tempZN;
  }
  if (tempPZ != NaN && tempPZ != undefined) {
    keyPZ = tempPZ;
  }
  if (tempRCC != NaN && tempRCC != undefined) {
    keyRCC = tempRCC;
  }
  if (tempRCL != NaN && tempRCC != undefined) {
    keyRCL = tempRCL;
  }

  setKeyDisp();

  //load the saved settings
  let tempBackfire = +localStorage.getItem("backfire");
  let tempSmooth = +localStorage.getItem("smooth");
  let tempGarboMulti = +localStorage.getItem("garboMulti");
  let tempGhostColor = +localStorage.getItem("ghostColor");

  //if they exist, and are not null, set them to the grabbed local variables
  if (tempBackfire != null) {
    if (tempBackfire == 0) {
      backfire = false;
    } else {
      backfire = true;
    }
  }
  if (tempSmooth != null) {
    if (tempSmooth == 0) {
      smooth = false;
    } else {
      smooth = true;
    }
  }
  if (tempGhostColor != null) {
    if (tempGhostColor == 0) {
      ghostColor = false;
    } else {
      ghostColor = true;
    }
  }
  if (tempGarboMulti != null) {
    garboMulti = tempGarboMulti;
  }

  $("#garbBack").attr("value", garboMulti);
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
      return "rgb(186, 0, 211)";
    }
    if (num == 2) {
      return "rgb(0, 229, 229)";
    }
    if (num == 3) {
      return "rgb(3, 221, 0)";
    }
    if (num == 4) {
      return "rgb(219, 0, 0)";
    }
    if (num == 5) {
      return "rgb(229, 133, 0)";
    }
    if (num == 6) {
      return "rgb(53, 0, 178)";
    }
    if (num == 7) {
      return "rgb(255, 255, 0)";
    }
    if (num == 8) {
      return "rgb(195, 138, 204)";
    }
    if (num == 9) {
      return "rgb(139, 221, 221)";
    }
    if (num == 10) {
      return "rgb(171, 226, 170)";
    }
    if (num == 11) {
      return "rgb(229, 169, 169)";
    }
    if (num == 12) {
      return "rgb(224, 192, 150)";
    }
    if (num == 13) {
      return "rgb(174, 158, 214)";
    }
    if (num == 14) {
      return "rgb(255, 255, 183)";
    }
    if (num == 15) {
      return "rgb(125,125,125)";
    }
    if (num == 22) {
      return "rgb(50,50,50)";
    }
  } else {
    let tempS = "rgb(";
    tempS += JSON.stringify(rainbowPlace);
    tempS += ",0,0)";
    return tempS;
  }
}

function colorG(num) {
  if (!rainbowBlock) {
    if (num == 1) {
      return "rgba(186,0,211,.5)";
    }
    if (num == 2) {
      return "rgba(0,229,229,.5)";
    }
    if (num == 3) {
      return "rgba(3,221,0,.5)";
    }
    if (num == 4) {
      return "rgba(219,0,0,.5)";
    }
    if (num == 5) {
      return "rgba(229,113,0,.5)";
    }
    if (num == 6) {
      return "rgba(53,0,178,.5)";
    }
    if (num == 7) {
      return "rgba(255,255,0,.5)";
    }
  } else {
    let tempS = "rgb(";
    tempS += rainbowPlace;
    tempS += ",0,0,.5)";
  }
}

//set up the board canvas
function setup() {
  createCanvas(canWid + 20, canHei);
  //call a block reset so we actually have a block to start with
  blockReset(true);
  //calculate where the next queue should be, set it to the margin, and store it for later use.
  let calc = (widthG * 40 - 400) / 1.5;
  calc += 545;
  defLoc = +calc;
  $("#defaultCanvas1").css("margin-left", calc + "px");
}

function draw() {
  //use the custom font loaded in preload()
  textFont(dv);
  if (!stopped) {
    saveSettings();

    //draw the background image
    image(bg, -1740 / 2, 0, 3480 / 2, 2160 / 2);
    drawBoard();
    gravity();

    //CALCULATE the SDF and apply it to the gravity if the down arrow is pressed
    sDgrav = dGrav * SDF;
    if (keyDown) {
      grav = sDgrav;
      score++;
    } else if (!zone) {
      grav = sDgrav / SDF;
    }

    //move the falling block when keys are pressed, in accordance with the set ARR
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

    drawGhost();
    drawPiece();

    //somewhat broken code for animating block colors
    if (rainbowBlock) {
      if (rainbowPlace < 255) {
        rainbowPlace++;
      } else {
        rainbowPlace = 15;
      }
    }

    //ZONE
    //if our charge timer is running, subtract from it
    if (zoneTT > 0) {
      zoneTT -= 1;
    }

    if (zone) {
      let lines = 0;
      //check to see if our zone charge is out; if it's not, subtract from it, if it is, clear the zone lines and update the score.
      if (zoneCharge >= zoneFac && zoneTT == 0) {
        zoneCharge -= zoneFac;
      } else if (zoneCharge < zoneFac) {
        zoneCharge = 0;
        for (let i = 0; i < heightG; i++) {
          let lineClear = true;
          let line = [];
          for (let j = 1; j < widthG + 1; j++) {
            line.push(board[i * widthG + j]);
          }
          for (let j = 0; j < widthG; j++) {
            if (line[j] < 8) {
              lineClear = false;
            }
          }
          if (lineClear) {
            for (let j = 1; j < widthG + 1; j++) {
              board.splice(i * widthG + 1, 1);
            }
            for (let j = 0; j < widthG + 0; j++) {
              board.splice(1, 0, 0);
            }
            lines++;
          }
        }
        let scoreAD = 0;
        for (let i = 0; i < lines; i++) {
          scoreAD += 1000;
        }
        score += scoreAD;
        zone = false;
        grav = gravD;
        zoneLines = 0;
        zoneLT = 600;
      }
    }

    //if the zone 1s timer is over, restart it
    if (zoneTT == 0) {
      zoneTT = 60;
    }

    //prevent the zone charge from going above 4 (the 'max' value)
    if (zoneCharge >= 4) {
      zoneCharge = 4;
    }

    //if the cleared lines equals 10, double the gravity, and add 10 to the display cleared lines
    if (clearLines >= 10) {
      clearLines -= 10;
      clearLinesD += 10;
      level++;
      grav += 0.01;
      dGrav += 0.01;
    }

    garbCheck();
    drawGarbQ();
  } else {
    //draw a paused signifier over the board if the game is stopped.
    image(bg, -1740 / 2, 0, 3480 / 2, 2160 / 2);
    fill(32, 32, 32);
    textSize(50);
    text("Paused", canWid / 2 - 100, canHei / 2);
  }
}

function drawBoard() {
  //animate board border color change when zone mode is activated or deactivated
  if (zone && boardStroke < 150) {
    boardStroke++;
  }
  if (!zone && boardStroke > 100) {
    boardStroke--;
  }

  stroke(boardStroke);
  strokeWeight(3);
  let ind = 1;
  for (let i = 0; i < heightG; i++) {
    for (let j = 0; j < widthG; j++) {
      noFill();
      rect(
        (j * canWid) / widthG,
        (i * canHei) / heightG,
        canWid / widthG,
        canHei / heightG
      );
      let rad;
      if (board[ind] >= 1) {
        fill(colorPick(board[ind]));
        rad = 5;
      }
      if (board[ind] == 0) {
        fill("rgba(10, 10, 10, .7)");
        rad = 5;
      }
      rect(
        (j * canWid) / widthG,
        (i * canHei) / heightG,
        canWid / widthG,
        canHei / heightG,
        rad,
        rad,
        rad,
        rad
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
    if (!smooth) {
      rect(
        ((fallingBlock[i].x - 1) * canWid) / widthG,
        (Math.ceil(fallingBlock[i].y - 1) * canHei) / heightG,
        canWid / widthG,
        canHei / heightG,
        5,
        5,
        5,
        5
      );
    } else {
      rect(
        ((fallingBlock[i].x - 1) * canWid) / widthG,
        ((fallingBlock[i].y - 1) * canHei) / heightG,
        canWid / widthG,
        canHei / heightG,
        5,
        5,
        5,
        5
      );
    }
  }
}

function drawGhost() {
  ghostblock = Array(fallingBlock.length).fill();
  for (let i = 0; i < fallingBlock.length; i++) {
    ghostblock[i] = { x: fallingBlock[i].x, y: Math.floor(fallingBlock[i].y) };
  }
  //get the lowest y of the current ghostblock
  let lowestY = Math.max(...ghostblock.slice(0, 4).map((x) => x.y));
  outer: while (lowestY < heightG - 1) {
    for (let i = 0; i < 4; i++) {
      if (board[(ghostblock[i].y + 1) * widthG + ghostblock[i].x] >= 1)
        //if our ghostblock is on top of something, prevent it from going further down.
        break outer;
    }
    for (let i = 0; i < 5; i++) {
      ghostblock[i].y++;
    }
    lowestY++;
  }

  //draw the actual ghost block
  if (ghostColor) {
    fill(colorG(fallingBlock[5]));
  } else {
    fill("rgba(125,125,125,.5)");
  }
  noStroke();
  for (i = 0; i < 4; i++) {
    rect(
      ((fallingBlock[i].x - 1) * canWid) / widthG,
      (ghostblock[i].y * canHei) / heightG,
      canWid / widthG,
      canHei / heightG,
      5,
      5,
      5,
      5
    );
  }
}

//GRAVITY
function gravity() {
  let doLock = false;
  //apply gravity
  for (i = 0; i < 5; i++) {
    fallingBlock[i].y += grav;
  }
  //create a copy block on that position
  let dumBlock = [];
  for (i = 0; i < 4; i++) {
    const { x, y } = fallingBlock[i];
    dumBlock.push({ x, y });
  }
  for (i = 0; i < 5; i++) {
    //if the dummyblock hits something, move it up
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
    //if we are locking in, add to the lock value
    lock++;
  } else {
    lock = 0;
    lockRot = 10;
  }
  if (lock == 90) {
    //if the piece has fully locked in, put it into the board, and look for line clears.
    let tSpin = false;
    if (
      (prevKey == keyRCC && fallingBlock[5] == 1) ||
      (prevKey == keyRCL && fallingBlock[5] == 1) ||
      (prevKey == key1R && fallingBlock[5] == 1)
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
    let tempZonePush = [];
    let boardSPCVS = [];
    for (let i = 0; i < heightG; i++) {
      let lineClear = true;
      let line = [];
      for (let j = 1; j < widthG + 1; j++) {
        line.push(board[i * widthG + j]);
      }
      for (let j = 0; j < widthG; j++) {
        if (line[j] == 0 || (line[j] > 7 && line[j] < 15)) {
          lineClear = false;
        }
      }
      if (lineClear) {
        for (let j = 1; j < widthG + 1; j++) {
          if (!zone) {
            board.splice(i * widthG + 1, 1);
          } else {
            boardSPCVS.push(i * widthG + j);
          }
        }
        if (!zone) {
          for (let j = 0; j < widthG + 0; j++) {
            board.splice(1, 0, 0);
          }
          clearLines++;
          zoneCharge += 0.125;
        } else {
          let LL = +line.length;
          for (let j = 0; j < LL; j++) {
            tempZonePush.push(+line.splice(0, 1) + 7);
          }
          zoneLines++;
        }
        lines++;
      }
    }
    for (i = boardSPCVS.length - 1; i >= 0; i--) {
      board.splice(boardSPCVS[i], 1);
    }
    let TZPL = tempZonePush.length;
    for (i = 0; i < TZPL; i++) {
      board.push(+tempZonePush.splice(0, 1));
    }

    if (lines == 1) {
      score += 200 * level;
      $("#sig").show();
      aTexTime = 120;
      if (tSpin) {
        score += 400 * level;
        el_Garbagio(2, randNum(0, widthG - 1));
      }
    }
    if (lines == 2) {
      score += 300 * level;
      $("#dob").show();
      aTexTime = 120;
      if (tSpin) {
        score += 800 * level;
        el_Garbagio(4, randNum(0, widthG - 1));
      } else {
        el_Garbagio(1, randNum(0, widthG - 1));
      }
    }
    if (lines == 3) {
      score += 500 * level;
      $("#trp").show();
      aTexTime = 120;
      if (tSpin) {
        score += 1600 * level;
        el_Garbagio(6, randNum(0, widthG - 1));
      } else {
        el_Garbagio(2, randNum(0, widthG - 1));
      }
    }
    if (lines == 4) {
      score += 1000 * level;
      $("#qwd").show();
      aTexTime = 120;
      el_Garbagio(4, randNum(0, widthG - 1));
    }

    garbPush();
  }
}

function hardDrop() {
  //refer to LOCK section of the gravity function
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
  let tempZonePush = [];
  let boardSPCVS = [];
  for (let i = 0; i < heightG; i++) {
    let lineClear = true;
    let line = [];
    for (let j = 1; j <= widthG; j++) {
      line.push(board[i * widthG + j]);
    }
    for (let j = 0; j < widthG; j++) {
      if (line[j] == 0 || (line[j] > 7 && line[j] < 15)) {
        lineClear = false;
      }
    }
    if (lineClear) {
      for (let j = 1; j <= widthG; j++) {
        if (!zone) {
          board.splice(i * widthG + 1, 1);
        } else {
          boardSPCVS.push(i * widthG + j);
        }
      }
      if (!zone) {
        for (let j = 0; j < widthG + 0; j++) {
          board.splice(1, 0, 0);
        }
        clearLines++;
        zoneCharge += 0.125;
      } else {
        let LL = +line.length;
        for (let j = 0; j < LL; j++) {
          tempZonePush.push(+line.splice(0, 1) + 7);
        }
        zoneLines++;
      }
      lines++;
    }
  }
  for (i = boardSPCVS.length - 1; i >= 0; i--) {
    board.splice(boardSPCVS[i], 1);
  }
  let TZPL = tempZonePush.length;
  for (i = 0; i < TZPL; i++) {
    board.push(+tempZonePush.splice(0, 1));
  }
  if (lines == 1) {
    score += 200 * level;
    $("#sig").show();
    aTexTime = 120;
  }
  if (lines == 2) {
    score += 300 * level;
    $("#dob").show();
    aTexTime = 120;
    el_Garbagio(1, randNum(0, widthG - 1));
  }
  if (lines == 3) {
    score += 500 * level;
    $("#trp").show();
    aTexTime = 120;
    el_Garbagio(2, randNum(0, widthG - 1));
  }
  if (lines == 4) {
    score += 1000 * level;
    $("#qwd").show();
    aTexTime = 120;
    el_Garbagio(4, randNum(0, widthG - 1));
  }

  garbPush();
}

function blockReset(m) {
  fallingBlock.splice(0, fallingBlock.length);
  if (bag.length > 0) {
    //find the correct piece index
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
  } else {
    //add new bags when we run out
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
  //Check for game over
  let lines = 0;
  zoneCOut: for (i = 0; i < 4; i++) {
    if (
      board[Math.floor(fallingBlock[i].y + 1) * 10 + fallingBlock[i].x] == 1
    ) {
      if (!zone) {
        reset();
      } else {
        //if we're in the zone when we game over, end zone mode, don't game over
        zoneCharge = 0;
        zone = false;
        zoneTT = 60;
        for (let i = 0; i < heightG; i++) {
          let lineClear = true;
          let line = [];
          for (let j = 1; j < widthG + 1; j++) {
            line.push(board[i * widthG + j]);
          }
          for (let j = 0; j < widthG; j++) {
            if (line[j] < 8) {
              lineClear = false;
            }
          }
          if (lineClear) {
            for (let j = 1; j < widthG + 1; j++) {
              board.splice(i * widthG + 1, 1);
            }
            for (let j = 0; j < widthG + 0; j++) {
              board.splice(1, 0, 0);
            }
            lines++;
          }
        }
        grav = +gravD;
        zoneLT = 600;
        let scoreAD = 0;
        for (let i = 0; i < lines; i++) {
          scoreAD += 2000;
        }
        score += scoreAD;
        break zoneCOut;
      }
    }
  }
}

//generate a unique list of random numbers, with no repeats
//used for bag generation
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
  zoneCharge = 0;
  zone = false;
  zoneTT = 60;
  clearLines = 0;
  clearLinesD = 0;
  lines = 0;
  grav = 0.01;
  level = 1;
  gravD = 0.01;
  dGrav = grav;
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
  if (lockRot > 0) {
    lock = 0;
    lockRot -= 1;
  }
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
  if (lockRot > 0) {
    lock = 0;
    lockRot -= 1;
  }
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

function rot180() {
  if (lockRot > 0) {
    lock = 0;
    lockRot--;
  }
  const { x: rx, y: ry } = fallingBlock[4];
  for (let i = 0; i < 4; i++) {
    const { x, y } = fallingBlock[i];
    fallingBlock[i].x = y - ry + rx;
    fallingBlock[i].y = -(x - rx) + ry;
  }
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
  //function for overriding browser DAS, so we can use our own.
  let allowed = true;
  let justRan = false;
  if (eR != undefined) {
    allowed = !eR;
  }
  if (!allowed && prevKey == key) {
    return;
  }
  if (eK == key && !stopped) {
    runfunk();
    justRan = true;
  }
  if (!justRan && key == 80 && stopped) {
    runfunk();
  }
}

function pieceCheck() {
  out: for (let i = 0; i < 4; i++) {
    //check for collisions if there are, move left
    if (
      board[Math.floor(fallingBlock[i].y) * 10 + fallingBlock[i].x] >= 1 ||
      fallingBlock[i].x >= 11
    ) {
      for (let j = 0; j < 4; j++) {
        fallingBlock[j].x--;
      }
      if (
        !board[Math.floor(fallingBlock[i].y) * 10 + fallingBlock[i].x] >= 1 &&
        !fallingBlock[i].x >= 11
      ) {
        break out;
      }
      for (let j = 0; j < 4; j++) {
        fallingBlock[j].x++;
      }
    }

    if (
      board[Math.floor(fallingBlock[i].y) * 10 + fallingBlock[i].x] >= 1 ||
      fallingBlock[i].x <= 0
    ) {
      for (let j = 0; j < 4; j++) {
        fallingBlock[j].x++;
      }
      if (
        !board[Math.floor(fallingBlock[i].y) * 10 + fallingBlock[i].x] >= 1 &&
        !fallingBlock[i].x <= 0
      ) {
        break out;
      }
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

//function for drawing preset pieces in a hold/nextQ format.
function pD(sk, y, p, holdB) {
  if (p != 0) {
    let h = 20;
    let pie = findM(p);
    for (let i = 0; i < 4; i++) {
      sk.fill(colorPick(+p));
      if (!doHold && holdB) {
        sk.fill(30, 30, 30);
      }
      sk.rect((pie[i].x - 1.5) * h, (pie[i].y + 1 + y) * h, h, h, 5, 5, 5, 5);
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
    j += 2.5;
  }
}

var prevKey = null;

function el_Garbagio(CLL, openSpot) {
  let actual = Math.floor(CLL * garboMulti);
  if (garbQ.length > 0 && !zone) {
    if (garbQ.length >= actual) {
      for (i = 0; i < actual; i++) {
        garbQ.splice(0, 1);
      }
      actual = 0;
    } else {
      for (i = 0; i < garbQ.length; i++) {
        garbQ.splice(0, 1);
        actual--;
      }
    }
  }
  if (backfire && !zone) {
    for (i = 0; i < actual; i++) {
      garbQ.push({ os: openSpot, t: 120 });
    }
  }
}

function drawGarbQ() {
  noStroke();
  fill("rgba(10, 10, 10, .7)");
  rect(canWid, 0, 20, canHei);
  fill(200, 0, 0);
  if (garbQ.length > 0) {
    rect(
      canWid,
      canHei - (garbQ.length * canHei) / heightG,
      20,
      (garbQ.length * canHei) / heightG,
      5,
      5,
      5,
      5
    );
  }
  noFill();
  stroke(boardStroke);
  strokeWeight(3);
  rect(canWid, 0, 20, canHei);
  rect(canWid, 0, 20, canHei, 5, 5, 5, 5);
}

function garbCheck() {
  for (i = 0; i < garbQ.length; i++) {
    if (garbQ[i].t > 0) {
      garbQ[i].t--;
    } else {
      pushReady = true;
      garbPushL.push(i);
    }
  }
}

function garbPush() {
  if (pushReady) {
    for (i = 0; i < garbPushL.length; i++) {
      let os = garbQ[0].os;
      for (j = 0; j < widthG; j++) {
        board.splice(1, 1);
        if (j != os) {
          board.push(15);
        } else {
          board.push(0);
        }
      }
      garbQ.splice(0, 1);
      garbPushL.splice(0, 1);
      pushReady = false;
    }
  }
}

function keySetStart(key) {
  selectKey = key;
  $("#KL" + key).html("Setting...");
}

function keySBR() {
  $(".setKY").html("Set New");
}

function setKeyDisp() {
  if (keyML != 37) {
    $("#KD1").html("Left: " + keyML);
  } else {
    $("#KD1").html("Left: Left Arrow");
  }
  if (keyMR != 39) {
    $("#KD2").html("Right: " + keyMR);
  } else {
    $("#KD2").html("Right: Right Arrow");
  }
  if (key1R != 65) {
    $("#KD7").html("Rotate 180: " + key1R);
  } else {
    $("#KD7").html("Rotate 180: A");
  }
  if (keyHD != 32) {
    $("#KD4").html("Hard Drop: " + keyHD);
  } else {
    $("#KD4").html("Hard Drop: Space");
  }
  if (keySD != 40) {
    $("#KD3").html("Soft Drop: " + keySD);
  } else {
    $("#KD3").html("Soft Drop: Down Arrow");
  }
  if (keyHL != 67) {
    $("#KD9").html("Hold: " + keyHD);
  } else {
    $("#KD9").html("Hold: C");
  }
  if (keyZN != 83) {
    $("#KD8").html("Enter Zone Mode: " + keyZN);
  } else {
    $("#KD8").html("Enter Zone Mode: S");
  }
  if (keyPZ != 80) {
    $("#KD10").html("Pause: " + keyPZ);
  } else {
    $("#KD10").html("Pause: P");
  }
  if (keyRCC != 90) {
    $("#KD5").html("Rotate Counter-Clockwise: " + keyRCC);
  } else {
    $("#KD5").html("Rotate Counter-Clockwise: Z");
  }
  if (keyRCL != 88) {
    $("#KD6").html("Rotate Clockwise: " + keyRCL);
  } else {
    $("#KD6").html("Rotate Clockwise: X");
  }
}

function saveSettings() {
  //smooth - backfire - garbomulti - ghostcolor
  if (smooth) {
    localStorage.setItem("smooth", "1");
  } else {
    localStorage.setItem("smooth", "0");
  }

  if (backfire) {
    localStorage.setItem("backfire", "1");
  } else {
    localStorage.setItem("backfire", "0");
  }

  if (ghostColor) {
    localStorage.setItem("ghostColor", "1");
  } else {
    localStorage.setItem("ghostColor", "0");
  }

  localStorage.setItem("garboMulti", garboMulti);
}

//this is the javascript for the CLICKER side of the game
//vars
var open = false;
//functs
//onclick handlers
function openClick() {
  if (!open) {
    $(this).css("margin-top", "2px;");
    open = true;
  }
}

function closeClick() {
  $("#clickContain").css("margin-top", "-400px;");
  open = false;
}

//updating elements
function update1F() {
  if (open) {
    $("#clickClose").show();
  } else {
    $("#clickClose").hide();
  }
}

//ON LOAD (both sides)
$(document).ready(function () {
  //call functions required by the clicker
  setInterval(update1F, 1000 / 60);

  //click/change functions for things;
  $("#setHeight").click(function () {
    localStorage.setItem("boardH", $("#bHi").val());
    alert("board height set!");
  });

  $("#setWidth").click(function () {
    localStorage.setItem("boardW", $("#bWi").val());
    alert("board width set!");
  });

  $("#garbBack").on("input", function () {
    garboMulti = +$("#garbBack").val();
  });

  $("#das").on("input", function () {
    dasA = $("#das").val();
  });

  $("#arr").on("input", function () {
    arr = $("#arr").val();
    arrtemp = $("#arr").val();
  });

  $("#sdf").on("input", function () {
    SDF = $("#sdf").val();
  });

  //DETECT KEYS
  window.onkeydown = function (e) {
    //console.log("You pressed key code: " + e.keyCode);
    if (selectKey == 0) {
      if (e.keyCode == keySD) {
        keyDown = true;
      }
      //180 rotate key check
      keyCheck(
        key1R,
        function () {
          rot180();
        },
        e.keyCode,
        e.repeat
      );
      //move left key check
      keyCheck(
        keyML,
        function () {
          keyLeft = true;
          moveL();
        },
        e.keyCode,
        e.repeat
      );
      //move right keycheck
      keyCheck(
        keyMR,
        function () {
          keyRight = true;
          moveR();
        },
        e.keyCode,
        e.repeat
      );
      //hard drop keycheck
      keyCheck(
        keyHD,
        function () {
          hardDrop();
        },
        e.keyCode,
        e.repeat
      );
      //rotate clockwise keycheck
      keyCheck(
        keyRCL,
        function () {
          rotClock();
        },
        e.keyCode,
        e.repeat
      );
      //rotate counter-clockwise keycheck
      keyCheck(
        keyRCC,
        function () {
          rotCount();
        },
        e.keyCode,
        e.repeat
      );
      //hold keycheck
      keyCheck(
        keyHL,
        function () {
          hold();
        },
        e.keyCode,
        e.repeat
      );
      //zone mode keycheck
      keyCheck(
        keyZN,
        function () {
          if (!zone && zoneCharge > 0) {
            zone = true;
            gravD = +grav;
            grav = 0;
            zoneLines = 0;
          }
        },
        e.keyCode,
        e.repeat
      );
      //pause keychcek
      keyCheck(
        keyPZ,
        function () {
          if (!stopped) {
            stopped = true;
          } else {
            stopped = false;
          }
        },
        e.keyCode,
        e.repeat
      );
    } else {
      switch (selectKey) {
        case 1:
          keyML = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyML", keyML);
          break;
        case 2:
          keyMR = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyMR", keyMR);
          break;
        case 3:
          keySD = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keySD", keySD);
          break;
        case 4:
          keyHD = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyHD", keyHD);
          break;
        case 5:
          keyRCC = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyRCC", keyRCC);
          break;
        case 6:
          keyRCL = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyRCL", keyRCL);
          break;
        case 7:
          key1R = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("key1R", key1R);
          break;
        case 8:
          keyZN = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyZN", keyZN);
          break;
        case 9:
          keyHL = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyHL", keyHL);
          break;
        case 10:
          keyPZ = e.keyCode;
          selectKey = 0;
          keySBR();
          localStorage.setItem("keyPZ", keyPZ);
          break;
      }
      setKeyDisp();
    }

    prevKey = e.keyCode;
  };

  //key up events for left, right, and down
  window.onkeyup = function (e) {
    if (e.keyCode == keySD) {
      keyDown = false;
    }
    if (e.keyCode == keyML) {
      keyLeft = false;
      das = 0;
      arrtmp = arr;
    }
    if (e.keyCode == keyMR) {
      keyRight = false;
      das = 0;
      arrtmp = arr;
    }
  };

  function updateText() {
    //update text and elements in the HTML
    $("#score").html("Score: " + Math.floor(score).toLocaleString("de"));
    $("#zoneChargeMet").attr("value", zoneCharge);
    $("#level").html("Level: " + level.toLocaleString("de"));

    $("#lines").html(
      "Lines: " + (clearLinesD + clearLines).toLocaleString("de")
    );

    if (ghostColor) {
      $("#colorBut").html("Disable");
    } else {
      $("#colorBut").html("Enable");
    }

    if (backfire) {
      $("#backBut").html("Disable");
    } else {
      $("#backBut").html("Enable");
    }

    if (smooth) {
      $("#smoothBut").html("Disable");
    } else {
      $("#smoothBut").html("Enable");
    }

    if (aTexTime > 0) {
      aTexTime--;
    } else {
      $("#tsp").hide();
      $("#sig").hide();
      $("#dob").hide();
      $("#trp").hide();
      $("#qwd").hide();
    }

    if (zone) {
      $("#zoneL").show();
      $("#zoneL").html("Zone Lines: " + zoneLines);
    } else {
      if (zoneLT < 1) {
        $("#zoneL").hide();
      } else {
        zoneLT--;
      }
    }
  }
  setInterval(updateText, 1000 / 60);

  //create and use hold sketch
  const s = (sket) => {
    sket.setup = () => {
      sket.createCanvas(200, 100);
    };
    sket.draw = () => {
      sket.image(bg, 0, -900, 3480 / 2, 2160 / 2);
      if (!stopped) {
        sket.fill("rgba(10,10,10,.7)");
        sket.rect(0, 0, 300, 550);
        sket.fill(200);
        sket.textFont(dv);
        sket.textSize(20);
        sket.noStroke();
        sket.text("Hold", 10, 20);
        sket.stroke(100);
        sket.strokeWeight(3);
        pD(sket, 1.5, heldP, true);
      }
    };
  };

  let holdQ = new p5(s, "holdQ");

  //create and use next sketch
  const s2 = (sket) => {
    sket.setup = () => {
      sket.createCanvas(200, 450);
    };
    sket.draw = () => {
      sket.image(bg, 0, 0, 3480 / 2, 2160 / 2);
      if (!stopped) {
        sket.fill("rgba(10,10,10,.7)");
        sket.rect(0, 0, 300, 550);
        sket.fill(200);
        sket.textFont(dv);
        sket.textSize(20);
        sket.noStroke();
        sket.text("Next", 10, 20);
        sket.stroke(100);
        sket.strokeWeight(3);
        drawNextQ(sket);
      }
    };
  };

  let nextQ = new p5(s2, "nextQ");
});
