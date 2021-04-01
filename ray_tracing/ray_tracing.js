
let walls = [];

let collision;

let xoff = 1000;
let yoff = 4;
function setup() {
  createCanvas(displayWidth,displayHeight);


  for(let i=0;i<5;++i) {
    walls.push(new Wall(createVector(random(width),random(height)),createVector(random(width),random(height))));
  }
  walls.push(new Wall(createVector(0,0),createVector(0,height)));
  walls.push(new Wall(createVector(0,0),createVector(width,0)));
  walls.push(new Wall(createVector(0,height),createVector(width,height)));
  walls.push(new Wall(createVector(width,0),createVector(width,height)));
  collision = new Collision(createVector(width/2,height/2));

}


function draw() {
  background(0);
  for(let wall of walls) {
    wall.show();
  }

  // collision.lookAt(width*noise(xoff),height*noise(yoff));
  collision.lookAt(mouseX,mouseY);
  collision.show();
  collision.rayTracing(walls,xoff);
  xoff += 0.01;
  yoff += 0.01;
  
}
