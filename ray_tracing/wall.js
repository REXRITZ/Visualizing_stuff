
class Wall {

  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  
  
  show() {
    stroke(255);
    strokeWeight(2);
    line(this.a.x,this.a.y,this.b.x,this.b.y);
  };
}
