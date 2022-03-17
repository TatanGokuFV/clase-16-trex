var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver;
var gameOverImg;
var restart;
var restartImg;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImg;
var score;
var obstacle;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");

  groundImage = loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  
}

function setup() {

  createCanvas(600,200)
  
  //crear sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("rectangle",0,0,400,trex.height);
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generar números aleatorios
  var rand =  Math.round(random(1,100))
  console.log(rand)
  score=0;

  //Grupos de objetos 
  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  //objeto restart
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.5;

  //objeto game over
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
}

function draw() {
  //establecer color de fondo
  background(180);
  text("score: "+score,500,50);
  gameOver.visible=false;
  restart.visible=false;
  if(gameState === PLAY){
    ground.velocityX = -(4+score/100);
    score=score+Math.round(frameCount/60);
  if(score> 0 && score% 100===0){

    checkpointSound.play();

  }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("UP_ARROW") && trex.y >=160) {
      trex.velocityY = -10;
      jumpSound.play();
    }
    
    trex.velocityY = trex.velocityY + 0.8

  spawnObstacles();
  spawnClouds()
  if(obstaclesGroup.isTouching(trex)){
    trex.velocityY=-12;
    jumpSound.play();
//gameState=END;
//dieSound.play();
//trex.changeAnimation("collided",trex_collided);
}
   
  } else if(gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityY=0
    gameOver.visible=true;
  restart.visible=true;
  }
  
  
  
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
 if(frameCount%60===0){
 cloud=createSprite(600,100,40,10);
 cloud.addImage("cloud",cloudImg);
 cloud.scale=random(0.4,0.6);
 cloud.y=Math.round(random(20,90));
 cloud.velocityX=-3;
 cloud.lifetime=210;
 cloud.depth=trex.depth;
 trex.depth=trex.depth+1;
 cloudsGroup.add(cloud);
 }
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
  obstacle=createSprite(600,165,10,40);
  obstacle.velocityX=-(6+score/100);
  var rand=Math.round(random(1,6));
  switch(rand){
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
    default:break;

}
obstacle.scale=0.4;
obstacle.lifetime=210;
obstaclesGroup.add(obstacle);
  }
  }
  