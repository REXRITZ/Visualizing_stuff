var openSet = [];
var closedSet = [];
var path = [];
var start,end;
let row = 30;
let col = 30;
var w,h;
let grid;
let button;
let weWon = 0;
function setup() {
  createCanvas(600,600);
  background(255);
  stroke(0);
  frameRate(6);
  w = width/row;
  h = height/col;
  button = createButton('Start');
  button.mousePressed(A_star);
  grid = new Array(row);
  for(let i=0;i<col;++i) {
    grid[i] = new Array(col);
  }

  for(let i=0;i<row;++i) {
    for(let j=0;j<col;++j) {
      grid[i][j] = new Spot(i,j);
    }
  }
  for(let i=0;i<row;++i) {
    for(let j=0;j<col;++j) {
      grid[i][j].AssignNeighbours(grid);
    }
  }
  for(let i=0;i<=row;++i) {
    line(i*h,0,i*h,height);
  }
  for(let i=0;i<=col;++i) {
    line(0,i*w,width,i*w);
  }
}


function A_star() {
	openSet.push(start);
	//find lowest f score value in openSet
	let ind = 0;
	while(openSet.length > 0) {
		for(let i=0;i<openSet.length;++i) {
			if(openSet[i].f < openSet[ind].f) {
				ind = i;
			}
		}
		var current = openSet[ind];
		if(current == end) {
			weWon = 1;
			break;
		}
		//remove from openSet
		//removeFromArray(openSet, current);
		openSet.splice(ind,1);
		closedSet.push(current);
		var neighbours = current.neighbour;
		for(let i=0;i<neighbours.length;++i) {
			var neigh = neighbours[i];
			
			if(!closedSet.includes(neigh) && !neigh.isWall) {
				var tentative_gScore = current.g + heuristic(neigh,current);
			
				var isNewPath = false;
				if(openSet.includes(neigh)) {
					if(tentative_gScore < neigh.g) {
						neigh.h = tentative_gScore;
						isNewPath = true;
					}
				}
				else {
					neigh.g = tentative_gScore;
					isNewPath = true;
					openSet.push(neigh);
				}
				
				if(isNewPath) {
					neigh.h = heuristic(neigh,end);
					neigh.f = neigh.g + neigh.h;
					neigh.parent = current;
				}
			}
		}
		
	}
	if(weWon == 1) {
		console.log('Done');
	}
	else {
		console.log('fs in the chat');
	}
	DrawPath(current);
	
}

function DrawPath(current) {
    var temp = current;
		path.push(temp);
		while (temp.parent) {
		path.push(temp.parent);
		temp = temp.parent;
		}

		noFill();
		stroke(255, 0, 200);
		//strokeWeight(w / 2);
    beginShape();
  	for (var i = 0; i < path.length; i++) {
			vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
		}
		endShape();
}

function Spot(i,j) {
  this.i = i;
  this.j = j;

  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.isWall = false;
  this.neighbour = [];
  this.parent = undefined;

  this.AssignNeighbours = function(grid) {
    var i = this.i;
    var j = this.j;

    if(i > 0) {
      this.neighbour.push(grid[i-1][j]);
    }
    if(i < row-1) {
      this.neighbour.push(grid[i+1][j]);
    }
    if(j > 0) {
      this.neighbour.push(grid[i][j-1]);
    }
    if(j < col-1) {
      this.neighbour.push(grid[i][j+1]);
    }
  }

  this.show = function(c) {
    if(this.isWall) {
      fill(0);
    }
    else if(c){
      fill(c);
    }
    rect(this.i*w,this.j*h,w,h);
  }
}

var flag = 0;
function mousePressed() {
  let temp = FindPos(mouseX,mouseY);
  if(temp.length > 0) {
    if(flag == 0) {
      start = grid[temp[0]][temp[1]];
      start.show(color(0,255,0));
      grid[temp[0]][temp[1]].isWall = false;
      flag = 1;
    }
    else if(flag == 1) {
      end = grid[temp[0]][temp[1]];
      end.show(color(255,0,0));
      grid[temp[0]][temp[1]].isWall = false;
      flag = 2;
    }
  }
}



function mouseDragged() {
  let temp = FindPos(mouseX,mouseY);
  if(temp.length > 0) {
    if(flag == 2) {
      grid[temp[0]][temp[1]].show();
      grid[temp[0]][temp[1]].isWall = true;
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);

  return d;
}
function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function FindPos(x,y) {
  for(let i=0;i<row;++i) {
    for(let j=0;j<col;++j) {
      if(x>=i*w && x<=i*w+w && y>=j*h && y<=j*h+h) {
        return [i,j];
      }
    }
  }
  return [];
}