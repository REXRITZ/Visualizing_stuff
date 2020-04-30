let time = 0;
let wave = [];
let slider;
function setup() {
  createCanvas(1100,500);
  slider = createSlider(1,250,1); // createSlider(start_position,end_position,value)
}

function draw() {
  background(51);
  stroke(255);
  translate(150,250);
  
  let x = 0;
  let y = 0;
  for(let i=1;i<=slider.value();++i) {

    let n = i;
    let xi = x;
    let yi = y;
    let radius = 150*2/(Math.pow(-1,n)*n*PI);
    x += radius*cos(n*time);
    y += radius*sin(n*time);
    
    noFill();
    stroke(255,90);
    ellipse(xi,yi,radius*2);
    stroke(255);
    line(xi,yi,x,y);
    fill(255);
    ellipse(x,y,4);
  }
  translate(400,0);
  line(x-400,y,0,wave[0]);
  
  wave.unshift(y);
  beginShape();
    noFill();
    for(let i=0;i<wave.length;++i) {
      vertex(i,wave[i]);
    }
    endShape();
  time += 0.03;
}
