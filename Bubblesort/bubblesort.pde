float arr[];
int i=0,j=0;
void setup() {
  size(1300,700);
  arr = new float[width/10];
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
    rect(in*10,height,10,-arr[in]);
  }
  i++;
}
