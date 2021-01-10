//global variables
var towerImg, tower;
var candleImg, candle, candleGroup;
var waxImg, wax, waxsGroup;
var bird, birdImg;
var invisibleBlockGroup, invisibleBlock, ibGroup;
var gameState = "play"

function preload(){
  towerImg = loadImage("background for bird game.jpg");
  candleImg = loadImage("candle.png");
  birdImg = loadImage("bird.png");
}

function setup(){
  createCanvas(600,600);
  
  waxsGroup = new Group();
  ibGroup = new Group();
  candlesGroup = new Group();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 6;
  
  bird = createSprite(200,200,50,50);
  bird.addImage(birdImg);
  bird.scale = 0.4;
}


function draw(){
 background("cyan");
 if(gameState === "play"){
  if(tower.y > 400){
   tower.y = 200;
 }
  
 if(keyDown("up")){
   bird.velocityY = -4;
 }
  
 if(keyDown("left")){
   bird.x-= 3;
 }
  
 if(keyDown("right")){
   bird.x+= 3;
 }
  
  //to add gravity
  bird.velocityY+= 0.8;
  
  if(bird.isTouching(candlesGroup)){
    bird.velocityY = 0;
  }
  
  if(bird.isTouching(ibGroup)||bird.y > 600){
    bird.destroy();
    gameState = "end";
  }
    
    camera.x = bird.x
    camera.y = bird.y
    spawnCandles();
    drawSprites();
 }
  if(gameState === "end"){
    textSize(28);
    fill("blue");
    text("Game Over",200,300);
  }
}

function spawnCandles() {
  //write code here to spawn the doors in the tower
  if (frameCount % 80 === 0) {
    
    var candle = createSprite(200,-50);
      candle.addImage(candleImg);
    candle.x = Math.round(random(120,400))
    candle.velocityY = 1;
    candle.lifetime = 800;
    candle.scale = 0.5;
    bird.depth = candle.depth;
    bird.depth+= 1;
    
    
    
    var wax = createSprite(200,10);
    //wax.addImage(waxImg);
    
    wax.x = candle.x;
    wax.velocityY = 1;
    wax.lifetime = 800;
    wax.scale = 1;
    wax.visible = false;
    
    var ib = createSprite(200,15);
    ib.x = candle.x;
    ib.width = wax.width;
    ib.height = 2;
    ib.velocityY = 1;
    ib.lifetime = 800;
    ib.debug = true;
    ib.visible = false;
    
    //add the group
     candlesGroup.add(candle);
     waxsGroup.add(wax);
     ibGroup.add(ib);
  }
}
