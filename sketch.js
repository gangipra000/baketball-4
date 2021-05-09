const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
const Constraint=Matter.Constraint;
const Render=Matter.Render
var movingBasketball, movingBasketballImg;
var basket,basketballHoopImg;
var star, starImg;
var crowd,crowdImg;
var spike,spikeImg;
var flotingFloor,floatingFloorImg;
var brickwall, brickwallImg;
var engine, world;
var ground;
var slingshot;
var star1,star2
var state=1

function preload(){
  movingBasketballImg = loadImage("moving basketball.gif");
  basketballHoopImg = loadImage("basketball hoop.png");
  starImg = loadImage("star.gif");
  crowdImg = loadImage("cheering background.gif");
  spikeImg = loadImage("spike obstacle.png");
  floatingFloorImage = loadImage("floating floor.png");
  brickwallImg = loadImage("brick wall.jpg");
}

function setup(){
  createCanvas(displayWidth-20,displayHeight-30);

  engine=Engine.create();
  world=engine.world;

  ground = new Ground(displayWidth/2,900,1600,500);
  brickWall=new Brick(displayWidth-100,displayHeight/2+150,1000,200)
  basket=new Basket(displayWidth-150,displayHeight/4,200,200)
  basketball = new Basketball(displayWidth/4,displayHeight/2,70);
  slingshot = new SlingShot(basketball.body,{x:displayWidth/4,y: displayHeight/2})
 star1=new Star(displayWidth/2,displayHeight/2,50)
 star2=new Star(displayWidth/2+150,displayHeight/2-150,50)


 var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 1300,
    height: 600,
    wireframes: false
  }
});

}
function draw(){
  background(255)
  Engine.update(engine);
  ground.display();
  if(state===1){
  brickWall.display()

  
  basket.display()
  basketball.display()
  slingshot.display()
  star1.display()
  star2.display()
  
   detectCollision(basketball,star1)
   detectCollision(basketball,star2)
   
  
 if(dist(basketball.body.position.x,basketball.body.position.y,basket.body.position.x,basketball.body.position.y) <= basketball.r+basket.width){
   state =2;
   console.log(state);
 } 
}
else if(state === 2){
spike = new Spike(displayWidth-100,displayHeight/2+150,1000,600); 
spike.display();

}
}

function mouseDragged(){
  Matter.Body.setPosition(basketball.body,{x:mouseX,y:mouseY})
}

function mouseReleased(){
  slingshot.fly();
}


function detectCollision(a,b){
	/*var collision = Matter.SAT.collides(lstone,lmango);
	if(collision.collided){
		console.log("collided");
		Matter.Body.setStatic(lmango,false);	
	}*/
  
  starBodyPosition=b.body.position
  basketballBodyPosition=a.body.position
  
  var distance=dist(basketballBodyPosition.x, basketballBodyPosition.y, starBodyPosition.x, starBodyPosition.y)
  //console.log(distance)
 // console.log(lmango.r+lstone.r)
  	if(distance<=a.r+b.r)
    {
      
  	  Matter.Body.setStatic(b.body,false);
     
    }

    

  }