//Create variables here
var dog,happyDog,database,foodS,foodStock,bone2;
var food = 20;
function preload()
{
  dogImg = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")
  bone1 = loadImage("bone bowl.png")
  bg = loadImage("123.JPG")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  
dog = createSprite(250,250,10,10)
dog.addImage(dogImg)
dog.scale = 0.2

bone2 = createSprite(200,300,10,10)
bone2.addImage(bone1)
bone2.scale = 0.08
 bone2.visible =false;
  foodStock = database.ref("Food");
  foodStock.on("value",readStock)
}


function draw() {  
  background(bg)
textSize(25)
fill("black")
text("Food Remaining : "+food,130,400)
text ("Press UP_ARROW To Feed Drago Food",25,70)
  if(keyWentDown(UP_ARROW)){
    food =food-1
    writeStock(foodS)
    dog.addImage(happyDog)
    bone2.visible =true;
    
  }
  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    bone2.visible =false;
   }
if(food ==0){
  bone2.visible =false;
}

  drawSprites();
  //add styles here

}
function readStock (data){
foodS = data.val()
}
function writeStock (x){
if(x<= 0 ){
  x=0;
  bone2.visible =false;
}else{
  x=x-1;
  bone2.visible =true;
}
  database.ref('/').update({
    Food:x
  })

}

