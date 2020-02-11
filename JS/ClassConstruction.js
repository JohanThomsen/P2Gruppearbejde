class vec{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  plus = function (vec){
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
  };
  minus = function (vec){
    this.x = this.x - vec.x;
    this.y = this.y - vec.y;
  }
  length = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}

let vecOne = new vec(1,2);
let vecTwo = new vec(2,3);
console.log(vecOne);

vecOne.minus(vecTwo);
console.log(vecOne);

console.log(vecTwo.length());
//console.log(new Vec(3, 4).length);

// → [1, 2, 3, 4, 5, 6]