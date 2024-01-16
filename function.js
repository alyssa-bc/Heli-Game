// FUNCTIONS

// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

function runGame() {
  //LOGIC
  moveHeli();
  moveWalls();
  checkCollisions();
  distance++;

  // DRAW
  drawGame();
}

function moveHeli() {
  //Accelerate upward if mouse pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  //Apply Gravity (accel)
  heli.speed += heli.accel;

  //Contrasin Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move Heli by its speed
  heli.y += heli.speed;
}

function moveWalls() {
  //Wall 1
  wall1.x += -wall1.speed;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }
  //Wall2
  wall2.x += -wall2.speed;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }
  //Wall3
  wall3.x += -wall3.speed;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }

  //Wall Speed
  if (distance < 500) {
    wall1.speed = 3;
    wall2.speed = 3;
    wall3.speed = 3;
  } else if (distance < 1000) {
    wall1.speed = 5;
    wall2.speed = 5;
    wall3.speed = 5;
  } else if (distance < 1500) {
    wall1.speed = 7;
    wall2.speed = 7;
    wall3.speed = 7;
  } else if (distance < 2500) {
    wall1.speed = 9;
    wall2.speed = 9;
    wall3.speed = 9;
  } else if (distance < 3500) {
    wall1.speed = 11;
    wall2.speed = 11;
    wall3.speed = 11;
  } else if (distance < 4500) {
    wall1.speed = 13;
    wall2.speed = 13;
    wall3.speed = 13;
  } else if (distance < 6500) {
    wall1.speed = 15;
    wall2.speed = 15;
    wall3.speed = 15;
  }
}

function checkCollisions() {
  //Collision with Top and Bottom Green Bars
  if (heli.y < 50) {
    gameOver();
  } else if (heli.y + heli.h > cnv.height - 50) {
    gameOver();
  }
  //Collision with the Walls
  if (
    heli.x + 80 > wall1.x &&
    heli.x < wall1.x + 50 &&
    heli.y + 40 > wall1.y &&
    heli.y < wall1.y + 100
  ) {
    gameOver();
    console.log("collide");
  } else if (
    heli.x + 80 > wall2.x &&
    heli.x < wall2.x + 50 &&
    heli.y + 40 > wall2.y &&
    heli.y < wall2.y + 100
  ) {
    gameOver();
  } else if (
    heli.x + 80 > wall3.x &&
    heli.x < wall3.x + 50 &&
    heli.y + 40 > wall3.y &&
    heli.y < wall3.y + 100
  ) {
    gameOver();
  }
}

function gameOver() {
  explosion.play();
  state = "gameover";

  setTimeout(reset, 3000);

  if (distance > bestDistance) {
    bestDistance = distance + 1;
  }
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

//Helper Functions
function reset() {
  state = "start";
  //Global Variables (Reset)
  state = "start";
  distance = 0;
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.7,
  };

  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
    speed: 3,
  };

  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
    speed: 3,
  };

  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
    speed: 3,
  };
}

function drawWalls() {
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${bestDistance}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}

// if (distance < 500) {
//   wall1.speed = wall1.speed;
//   wall2.speed = wall2.speed;
//   wall3.speed = wall3.speed;
// } else if (distance < 1000) {
//   wall1.speed = wall1.speed + 1;
//   wall2.speed = wall2.speed + 1;
//   wall3.speed = wall3.speed + 1;
// } else if (distance < 1500) {
//   wall1.speed = wall1.speed + 3;
//   wall2.speed = wall2.speed + 3;
//   wall3.speed = wall3.speed + 3;
// } else if (distance < 2500) {
//   wall1.speed = wall1.speed + 5;
//   wall2.speed = wall2.speed + 5;
//   wall3.speed = wall3.speed + 5;
// } else if (distance < 3500) {
//   wall1.speed = wall1.speed + 7;
//   wall2.speed = wall2.speed + 7;
//   wall3.speed = wall3.speed + 7;
// } else if (distance < 4500) {
//   wall1.speed = wall1.speed + 9;
//   wall2.speed = wall2.speed + 9;
//   wall3.speed = wall3.speed + 9;
// }
