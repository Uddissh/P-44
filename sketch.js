var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexIMG, trex;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score, back1, back2;

var gameOver
var reStart
function preload(){
  
  trexIMG = loadImage("bike.png");

  back1 = loadImage("First.jpg");

  back2 = loadImage("Second.jpg");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obs1.jpeg");
  obstacle2 = loadImage("obs1.jpeg");
  obstacle3 = loadImage("obs1.jpeg");
  obstacle4 = loadImage("obs1.jpeg");
  obstacle5 = loadImage("obs1.jpeg");
  obstacle6 = loadImage("obs1.jpeg");
  
  gameOverImg = loadImage("gameOver.png");
  reStartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addImage(trexIMG);
  trex.scale = 0.15;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(0, 100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  reStart = createSprite(300, 150);
  reStart.addImage(reStartImg);
  reStart.scale = 0;
  reStart.visible = false;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  camera.x = trex.x - 20;
  camera.y = trex.y - 20;
}

function draw() {
  background(back1);
  text("Score: "+ score, 0,70);
  if (gameState === PLAY) {
   ground.velocityX = -(6+3*score/100);
      
  
  score = score + Math.round(getFrameRate()/60);
  
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    if (obstaclesGroup.isTouching(trex)) {
     gameState = END;   
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    reStart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(reStart)) {
    reset();
  }
  
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}