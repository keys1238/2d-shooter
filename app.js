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

var b,g,ga,shoot

function preload(){
  b = loadSound('sound/blast.mp3');
  g = loadSound('sound/gaining.mp3');
  ga = loadSound('sound/gameOver.mp3');
  shoot = loadSound('sound/shooting.mp3');
}

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
    noLoop();
    ga.play()
    return; // Exit the function and pause the game
  }

  if(val < 0 || s < 0){ gameOver = true; ga.play()}
  if(val > width/2){ val-- }

}

function mousePressed(){
  let bullet = {
    x: mouseX,
    y: height - 50
  }
  bullets.push(bullet)
  shoot.play()
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