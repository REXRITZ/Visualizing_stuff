int ang = 120;
int ang2 = 45;
void setup() {
  //size(400,400);
  fullScreen();
}

void draw() {
  background(0);
  stroke(83,49,24);
  translate(width/2,height);
  factree(180,5);
}

void factree(float len,float weight) {
  if(len < 20)
    stroke(82,107,45);
  strokeWeight(weight);
  line(0,0,0,-len);
  translate(0,-len);
  if(len > 5) {
    push();
    rotate(ang2);
    factree(len*0.73,weight*0.8);
    pop();
    push();
    rotate(-ang);
    factree(len*0.73,weight*0.8);
    pop();
  }
  //if(weight <= 1)
  //  weight = 1;
  //else
  //  weight = weight *0.8;
}
