'use strict'
//SEE: https://javascript.info/strict-mode


function showDate(data){

    let p=document.getElementById("id1");
    let d=document.createElement("pre");
    d.innerHTML=String(data);
    p.parentNode.appendChild(d);
   
}
  
/*  promise based variant with simple error handling
function jsonFetch(url,f){
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
      return f(myJson);
  }).catch((err=>console.log("PLEASE HANDLE ME CORRECTLY"+err)));
}
*/

/* 
*/// Simple async variant
async function jsonFetch(url,f){
   let response = await fetch(url);
   let myJson=await response.json();
   console.log(myJson);
   return await f(myJson);
}
//ToDo Variant with exception handling


console.log("JS er klar!");

jsonFetch("http://127.0.0.1:3000/date", showDate).catch(e=>console.log(e));

jsonFetch("http://zzz.org", showDate).catch(e=>console.log("AUCH: "+e));


//SHOW CORS ISSUES
// simpleFetch('https://www.cs.aau.dk');



//simpleFetch("https://geek-jokes.sameerkumar.website/api");
//simpleFetch("https://eloquentjavascript.net/img/cover.jpg");
//simpleFetch("http://wumo.com/wumo/2020/02/12");
//simpleFetch('http://httpbin.org/get');
//https://developers.google.com/web/updates/2015/03/introduction-to-fetch
