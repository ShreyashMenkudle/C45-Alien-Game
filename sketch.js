var PLAY=1;
var END =0;
var WIN =2;
var gameState=PLAY;

var score=0;

var alien,grass, ground,germ;
var edges;

var alienImg,grassImg;
var bg,germImg;

var grassGroup,germGroup;

function preload(){
  alienImg = loadImage("image/alien1.png");
  grassImg = loadImage("image/grass.png");

  germImg  = loadAnimation("image/germ1.png","image/germ2.png");
  bg       = loadImage("image/bg.png");
}

function setup() {
  createCanvas(600, displayHeight);
  
  ground= createSprite(300,displayHeight-100,1000,30);
  ground.shapeColor="green";
  
  alien = createSprite(200, displayHeight-displayHeight+50);
  alien.addImage(alienImg);
  alien.scale = 0.3;

  grassGroup = createGroup();
  germGroup = createGroup();
}

function draw() {
  background(bg);
  
  edges = createEdgeSprites();
  alien.bounceOff(edges[0]);
  alien.bounceOff(edges[1]);
  
if(gameState===1){
  if(keyDown("RIGHT_ARROW")){
      alien.velocityX=6;
    }
  if(keyDown("LEFT_ARROW")){
    alien.velocityX=-6;
  }
  
  stroke("black");
  textSize(22);
  fill("white");
  text("Score: " +score,10,displayHeight-displayHeight+50);

  spawnGrass();
  spawnGerm();
  
}else if(gameState === 0){
  grassGroup.setVelocityYEach(0);
  grassGroup.setLifetimeEach(-1);

  germGroup.setVelocityYEach(0);
  germGroup.setLifetimeEach(-1);

  alien.setVelocityX = 0;
  stroke("white");
  textSize(22);
  fill("red");
  text("You Lose!",300,displayHeight/2-50);
}

if(alien.isTouching(grassGroup)){
  score=score+10;
  grassGroup[0].destroy();
}

if(alien.isTouching(germGroup)){
  gameState=0;
}

  drawSprites();
}

function spawnGrass(){
  if (frameCount % 100 === 0) {
    grass = createSprite(600,displayHeight-50,40,10);
    grass.x = Math.round(random(50,575));
    grass.addImage(grassImg);
    grass.scale = 0.3;
    grass.velocityY = -5;
    
     //assign lifetime to the variable
    grass.lifetime = 200;
    
    grassGroup.add(grass);

  }
}

function spawnGerm(){
  if (frameCount % 60 === 0) {
    germ = createSprite(600,displayHeight-50,20,20);
    germ.x = Math.round(random(50,575));
    germ.addAnimation("alien",germImg);
    germ.scale = 0.1;
    germ.velocityY = -5;
    
     //assign lifetime to the variable
    germ.lifetime = 200;
    
    germGroup.add(germ);

  }
}