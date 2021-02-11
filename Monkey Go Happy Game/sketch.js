var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, obstacleGroup;

var score = 0;

var survivalTime = 0;

var gameState;

var END=0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1
                  
  ground = createSprite(200,370,1200,70);
  
  console.log(ground.x)
  
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background("cyan")
  
    text("Score: "+ score, 500,50);
  
  
    text("Survival Time: "+survivalTime , 250,100);
      survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  
  
  if(gameState == PLAY){
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(keyDown("space") && monkey.y >= 304) {
      monkey.velocityY = -13;
      

    }
      spawnObstacles();
     spawnBanana();
    ground.velocityX= -4;
    
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
      
          if(monkey.isTouching(FoodGroup)){   
            
              FoodGroup.destroyEach();
            score = score+1;
          }
      if(monkey.isTouching(obstacleGroup)){    
        gameState = END;
      }
  }
  
  
  if (gameState == END){
    
    monkey.veclocityX = 0;
    FoodGroup.destroyEach();
    ground.velocityX = 0
    obstacleGroup.destroyEach();
  }
  
  
    monkey.collide(ground);
    monkey.collide(obstacleGroup);
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
obstacle = createSprite(800,320,10,40); 
obstacle.velocityX = -10; 
  
obstacle.addImage(obstaceImage); obstacle.scale=0.15; 
obstacle.lifetime = 300; 
              
obstacleGroup.add(obstacle); 
  }
 }

function spawnBanana(){
  
  if (World.frameCount%100===0){
  
  banana=createSprite(600,100,20,20);
  banana.addImage(bananaImage)
  banana.y=Math.round(random(100,300));
  banana.velocityX=-5
  banana.setLifetime = 50
  banana.scale=0.2
    
  FoodGroup.add(banana);
  }
}