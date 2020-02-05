
let s = "";

for (let i = 0; i < 8; i++) {

  s += "\n";

  if (i%2 == 1) {
    s += " ";
  }

  for (let j = 0; j < 8; j++) {

    if (j%2 == 0) {
      s += "#";
    }
    else {
      s += " ";
    }

  }
}

console.log(s);
