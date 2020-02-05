let s = ["katte", "hunde", "aber", "MegetStortDyr"];
let sum = 0;

for (let i = 0; i < s.length; i ++){
  sum += s[i].length;
}

//for (x in s){
//  sum += s[x].length;
//}

//s.forEach(a=>sum+=a.length)

let avg = sum / s.length;

//s.map(a=>a+"H");

console.log(s);
console.log(avg);
