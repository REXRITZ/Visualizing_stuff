float arr[];
int i=0,j=0;
void setup() {
  //size(400,600);
  fullScreen(P2D);
  arr = new float[width];
  for(int i=0;i<arr.length;i++){
    arr[i]=random(height);
  }
}

void draw() {
  background(0);
  if(i<arr.length) {
    for(int j=0;j<arr.length-1-i;j++) {
      if(arr[j] > arr[j+1]) {
        float temp=arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=temp;
      }
    }
  }
  else
    noLoop();
   for(int in=0;in<arr.length;in++) {
    stroke(255);
    line(in,height,in,height-arr[in]);
  }
  i++;
}
