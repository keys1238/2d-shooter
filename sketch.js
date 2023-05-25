var player = {
    x : 0,
    y: 50,
    w: 25,
    h: 25,
}

var val = 0

let obstacles = [];
let bullets = [];
let healers = [];
let scorers = [];
let s = 1;
let gameOver = false;

function setup(){
    createCanvas(windowWidth - 25, windowHeight - 25);
    val = width/4
}

function draw(){
  background(5);

  push();
  drawingContext.shadowColor = "white";
  drawingContext.shadowBlur = "20";
  rectMode(CENTER)
  rect(player.x,height - 50,25,25);
  pop(); 

  health(val)
  score(s)

  if (gameOver == false) {
    player.x = mouseX

    drawBullets()
    updateBullets()

    collide()
    obst()
    heal()
    scor()
  }

  if (gameOver == true) {
    // Draw game over message
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("Game Over", width/2, height/2);
    return; // Exit the function and pause the game
  }

  if(val < 0 || s < 0){ gameOver = true}
  if(val > width/2){ val-- }

}

function mousePressed(){
  let bullet = {
    x: mouseX,
    y: height - 50
  }
  bullets.push(bullet)
  if(gameOver === false){
    val = val - 5
  }
  if(gameOver === true){
    for(var i = 0; i < 10; i++){
      gameOver = false
      val = width/2 - width/4
      s = 1
    }
  }
}

function health(h){
    let healthValue = h;
    let bar = {
        x: width/2 - width/4,
        y: 90,
        w: width/2,
        h: 25,
        c: map(healthValue, 0, 100, 0, 200)
    }

    push()
    noStroke()
    rect(bar.x, bar.y, bar.w, bar.h);
    pop();

    push();
    drawingContext.shadowColor = "red"
    drawingContext.shadowBlur = "2"
    noStroke()
    rectMode(CORNER);
    fill(255, 0, 0);
    rect(bar.x, bar.y, bar.c, bar.h);
    pop()
}

function score(s){
    push()
    textSize(32);
    fill("white")
    //textAlign(CENTER, CENTER);
    text('SCORE : ' + s,  width/2 - width/10,height/9)
    pop()
}

function updateBullets() {
    // Move existing bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= 5;
  
      // Remove bullets that have gone off screen
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }
  }
  
  function drawBullets() {
    drawingContext.shadowColor = "white";
    drawingContext.shadowBlur = "20";
    for (let i = 0; i < bullets.length; i++) {
      rect(bullets[i].x, bullets[i].y, 5,10);
    }
  }

function heal(){

  push()
  if (random(0.1) < 0.001) { // Change 0.01 to adjust the frequency of obstacles
    let healer = {
      x: random(width),
      y: 0,
      w: 20, // Change 20 and 50 to adjust the width range of obstacles
      h: 20  // Change 20 and 50 to adjust the height range of obstacles
    }
    healers.push(healer);
  }

  // Draw obstacles
  for (let i = 0; i < healers.length; i++) {
    let healer = healers[i];
    fill("red")
    rect(healer.x, healer.y, healer.w, healer.h);
    healer.y += 5; // Change 5 to adjust the speed of obstacles
  }
  pop()

}

function scor(){

  push()
  if (random(0.1) < 0.001) { // Change 0.01 to adjust the frequency of obstacles
    let scorer = {
      x: random(width),
      y: 0,
      w: 20, // Change 20 and 50 to adjust the width range of obstacles
      h: 20  // Change 20 and 50 to adjust the height range of obstacles
    }
    scorers.push(scorer);
  }

  // Draw obstacles
  for (let i = 0; i < scorers.length; i++) {
    let scorer = scorers[i];
    fill("yellow")
    rect(scorer.x, scorer.y, scorer.w, scorer.h);
    scorer.y += 5; // Change 5 to adjust the speed of obstacles
  }
  pop()

}


function obst(){

  if (random(s + s/2) < s/8) { // Change 0.01 to adjust the frequency of obstacles
    let obstacle = {
      x: random(width),
      y: 0,
      w: 20, // Change 20 and 50 to adjust the width range of obstacles
      h: 20  // Change 20 and 50 to adjust the height range of obstacles
    }
    obstacles.push(obstacle);
  }

  // Draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    obstacle.y += 5; // Change 5 to adjust the speed of obstacles
  }
}

function collide(){
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    for (let j = 0; j < obstacles.length; j++) {
      let obstacle = obstacles[j];
      if (collideRectRect(bullet.x, bullet.y, 5, 10, obstacle.x, obstacle.y, obstacle.w, obstacle.h)) {
        bullets.splice(i, 1); // Remove the bullet
        obstacles.splice(j, 1); // Remove the obstacle
        s++; // Increment the score
      }
    }
  }

  for (let j = 0; j < obstacles.length; j++) {
    let obstacle = obstacles[j];
    if (collideRectRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h, player.x, height - 50, player.w, player.h)) {
      console.log('Collision detected between obsticle and player!');
      gameOver = true
    }
  }

  for (let j = 0; j < healers.length; j++) {
    let healer = healers[j];
    if (collideRectRect(healer.x, healer.y, healer.w, healer.h, player.x, height - 50, player.w, player.h)) {
      console.log('Collision detected between healer and player!');
      val = val + 1
      healers.splice(j, 1);
    }
  }

  for (let j = 0; j < scorers.length; j++) {
    let scorer = scorers[j];
    if (collideRectRect(scorer.x, scorer.y, scorer.w, scorer.h, player.x, height - 50, player.w, player.h)) {
      console.log('Collision detected between healer and player!');
      s = s + 1
      scorers.splice(j, 1);
    }
  }
  
}
