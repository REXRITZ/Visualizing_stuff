
class Ray {

  constructor(pos,angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }
    
  
  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }
  
  
  detectWall(wall) {
    
    let x1 = wall.a.x;
    let x2 = wall.b.x;
    let y1 = wall.a.y;
    let y2 = wall.b.y;

    let x3 = this.pos.x;
    let x4 = this.dir.x + this.pos.x;
    let y3 = this.pos.y;
    let y4 = this.dir.y + this.pos.y; 

    let den = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);

    if(den == 0) return;

    let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4))/den;
    let u = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/den;

    if(t >= 0 && t <= 1 && u >= 0) {
      let x = x1 + t*(x2 - x1);
      let y = y1 + t*(y2-y1);
      return createVector(x,y);
    }
    return;

  }
  
  
  
}
