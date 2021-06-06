
var bg, backgroundImg;
var iron,ironmanImg;
var stoneImg,stoneGroup;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironmanImg = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  
}

function setup() {
  createCanvas(1000, 600);
  //background image
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;
  bg.velocityY = 10;
  //iron man
  iron = createSprite(200,500);
  iron.addImage(ironmanImg);
  iron.scale = .3;
  iron.debug = true;
  iron.setCollider("rectangle",100,0,200,400)
  //platform
  platform = createSprite(200,600,2000,10)
  //a stone group
  stoneGroup = new Group();
  //diamond group
  diamondGroup = new Group();
}

function draw() {
    //gravity to ironman
  iron.velocityY = iron.velocityY + 1;
  //ironman on platform
  iron.collide(platform)
  if (keyDown("up")) {
    iron.velocityY = -10;
  }
  if (keyDown("left")) {
    iron.x = iron.x - 5
  }
  if (keyDown("right")) {
    iron.x = iron.x + 5
  }
  iron.velocityY = iron.velocityY + 0.5;
  //illusion for background
  if (bg.y >  725){
    console.log(bg.height,"height of bg")
    bg.y = bg.height / 4 ;
    
  }
  //infinite stones
  getStones()
  //interacting with stones
  for(var i  = 0;i<stoneGroup.length;i++){
    var temp = stoneGroup.get(i);
    if(temp.isTouching(iron)){
      iron.collide(temp);
    }
  }
  
    
  
  //a bug
  if(iron.x < 200){
    iron.x = 200;
  }
  if(iron.y < 50){
    iron.y = 50;
  }
drawSprites();
}

function getStones(){
  if (frameCount % 70 === 0){
    var stone = createSprite(random(100,900),250,40,40);
    stone.lifetime = 250;
    stone.addImage(stoneImg);
    stone.scale = .5;
    stone.velocityY = 5;
    stoneGroup.add(stone);
  }
}

