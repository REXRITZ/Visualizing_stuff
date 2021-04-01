

class Collision {

	constructor(pos) {
		this.pos  = pos;
		this.rays = [];
		for(let i=0;i<360;i+=0.5) {
			this.rays.push(new Ray(pos,radians(i)));
		}
	}


	lookAt(x,y) {
		this.pos.set(x,y);
	}

	show() {
		fill(255);
		ellipse(this.pos.x, this.pos.y, 14);
		for (let ray of this.rays) {
		  ray.show();
		}
  	}

	rayTracing(walls,off) {

		for (let i =0 ;i<this.rays.length;++i) {
			let ray = this.rays[i];
			let closestWall = null;
			let d = Infinity;
			for (let wall of walls) {
				let pnt = ray.detectWall(wall);
				if(pnt) {
					let dist = p5.Vector.dist(this.pos,pnt);
					if(d > dist) {
						d = dist;
						closestWall = pnt;
					}
				}
			}
			
			if(closestWall) {

				let s = map(noise(xoff),0,1,0,255);
				xoff += 0.01;
				stroke(s,50,s,200);
				strokeWeight(1);
				line(this.pos.x,this.pos.y,closestWall.x,closestWall.y);
			}
		}
	}

}