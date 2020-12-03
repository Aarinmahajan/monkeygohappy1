var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var invisibleGround,ground;


function preload(){
  
 monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",
 "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
 //createCanvas(600, 200);

  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.1;
  
  
  banana = createSprite();
  banana.addAnimation(bananaImage);

  banana.scale = 0.5;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;
  
  score = 0;
  ground.x=ground.width/2;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
   if(keyDown("space")) {
        monkey.velocityY = -12;
      console.log("check") 
    }
  
  if(gameState === PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
    //jump when the space key is pressed
   
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnBananas();
    
   // if(obstaclesGroup.isTouching(monkey)){
     //   gameState = END;
    //}
  } 
  
  else if (gameState===END){
    monkey.velocityY = 0;
    bananasGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }
      
      monkey.collide(ground);
  
     if(ground.x<0){
       ground.x=ground.width/2;
     }
     
      //set lifetime of the game objects so that they are never destroyed
    //obstaclesGroup.setLifetimeEach(-1);
   //obstaclesGroup.setVelocityXEach(0);
     
   
    drawSprites();
}


function spawnObstacles(){
 // console.log("text");
 if (frameCount % 80 === 0){
   var obstacle = createSprite(800,320,20,20);
   obstacle.velocityX = -6;     
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
   
 } 
 }

 function spawnBananas(){
  //console.log("text");
 if (frameCount % 80 === 0){
   var banana = createSprite(800,180,20,20);
   banana.velocityX = -6;     
   banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.lifetime = 300;
   
   //add each banana to the group
    bananasGroup.add(banana);
  
   
 } 
 }