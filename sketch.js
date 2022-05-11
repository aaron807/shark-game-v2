var shark,bigSark
var orangeFish,blueFish
var boat,fastBoat
var net
var ocean
var blueFishGroup
var chance=1
var gameState=1
var speedTime
var orangeFishGroup=[]
var blueFishGroup=[]
var boatGroup=[]
var netGroup=[]

function preload(){
  oceanImg=loadImage("images/oceanCrop.jpg");
  sharkImg=loadImage("images/shark.png");
  bigSharkImg=loadImage("images/bigShark.jpg");
  orangeFishImg=loadImage("images/orange fish.png");
  blueFishImg=loadImage("images/blue fish.png");
  boatImg=loadImage("images/boat.png");
  fastBoatImg=loadImage("images/fast boat.png");
  //netImg=loadImage("images/");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  edges=createEdgeSprites();

  shark = createSprite(200,600,10,10);
  shark.addImage(sharkImg);
  shark.scale=0.4

  orangeFishGroup=createGroup();
  blueFishGroup=createGroup();

}

function draw() {
  background(oceanImg); 
  //console.log(frameRate())

if(gameState===1){
  if(keyDown("W")&&shark.y>350){
    shark.y+=-5
  }
  if(keyDown("S")&&shark.y<750){
    shark.y+=5
  }
  if(keyDown("A")&&shark.x>50){
    shark.x+=-5
  }
  if(keyDown("D")&&shark.x<windowWidth-50){
    shark.x+=5
  }
}
if(gameState===2){
  speedTime=frameCount
  console.log(speedTime)

  if(keyDown("W")&&shark.y>350){
    shark.y+=-10
  }
  if(keyDown("S")&&shark.y<750){
    shark.y+=10
  }
  if(keyDown("A")&&shark.x>50){
    shark.x+=-10
  }
  if(keyDown("D")&&shark.x<windowWidth-50){
    shark.x+=10
  }

  if(frameCount===speedTime+300){
    gameState=1
  }
}
for(i=0;i<orangeFishGroup.length;i++){
  if(orangeFishGroup[i].isTouching(shark)){
    orangeFishGroup[i].remove();
  }
}

for(i=0;i<blueFishGroup.length;i++){
  if(blueFishGroup[i].isTouching(shark)){
    blueFishGroup[i].remove();
    gameState=2 
  }
}

  spawnOrangeFish()
  spawnBlueFish()
  spawnBoat()

  drawSprites();
} 

function spawnOrangeFish(){
  if(frameCount%120===0){
    orangeFish=createSprite(windowWidth,round(random(350,750)),10,10);
    orangeFish.addImage(orangeFishImg);
    orangeFish.scale=0.1
    orangeFish.velocityX=-3

    orangeFishGroup.push(orangeFish);
   // orangeFishGroup.add(orangeFish);
  }
}

function spawnBlueFish(){
  if(frameCount%240===0){
    chance=round(random(1,2))
    console.log(chance)
    if(chance===1){
    blueFish=createSprite(windowWidth,round(random(350,750)),10,10);
    blueFish.addImage(blueFishImg);
    blueFish.scale=0.2
    blueFish.velocityX=-3

    blueFishGroup.push(blueFish);
    }
  }
}

function spawnBoat(){
  net=createSprite(windowWidth,230,50,50);
  netGroup.push(net)
  net.velocityX=-2
  
  net.visible=false
  for(i=0;i<netGroup.length;i++){
    if(netGroup[i].x<shark.x+100&&netGroup[i].x>shark.x-100){
      netGroup[i].velocityY=3
      netGroup[i].bounceOff(edges[2]);
    }
  }

  if(frameCount%450==0){
    boat=createSprite(windowWidth,230,10,10);
    boat.addImage(boatImg);
    boat.scale=0.2
    boat.velocityX=-2

    net.visible=true

    console.log(net.x)
    console.log(shark.x)
    //net.addImage(netImg);
    //net.scale=02
  }

}
