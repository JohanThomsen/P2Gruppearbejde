const http = require('http');
const fs=require("fs");
const path=require("path");

const hostname = '127.0.0.1';
const port = 3000;


//https://blog.todotnet.com/2018/11/simple-static-file-webserver-in-node-js/
//https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http

const publicResources="node/PublicResources/";
//secture file system access as described on 
//https://nodejs.org/en/knowledge/file-system/security/introduction/
const rootFileSystem=process.cwd();
function securePath(userPath){
  if (userPath.indexOf('\0') !== -1) {
    // could also test for illegal chars: if (!/^[a-z0-9]+$/.test(filename)) {return undefined;}
    return undefined;

  }
  userPath= publicResources+userPath;

  let p= path.join(rootFileSystem,path.normalize(userPath)); 
  //console.log("The path is:"+p);
  return p;
}

/* more accurate error codes should be sent to client */

function fileResponse(filename,res){
  const sPath=securePath(filename);
  console.log("Reading:"+sPath);
  fs.readFile(sPath, (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode=404;
      res.setHeader('Content-Type', 'text/txt');
      res.write("File Error:"+String(err));
      res.end("\n");
    }else {
      res.statusCode = 200;
      res.setHeader('Content-Type', guessMimeType(filename));
      res.write(data);
      res.end('\n');
    }
  })
}
const server = http.createServer( async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let date=new Date();
  console.log("GOT: " + req.method + " " +req.url);
  if(req.method=="GET"){
    switch(req.url){
      case "/":    
        fileResponse("RunningExcersize1.html",res);
        break;
      case "/date": 
        date=new Date();
        console.log(date);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(date));
        res.end('\n');
        break;
      case "/expenses": 
        date=new Date();
        console.log(JSON.stringify(date));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(expenses));
        res.end('\n');
        break;
      default:
        fileResponse(req.url, res);
        break;
    }//switch
  } else if (req.method=="POST"){
    
    await req.on("data", chunk => {
      let data = chunk.toString();
      console.log(data);
    });
    fs.appendFile("./log.txt", data + "\n", function(err){
      if (err) throw err;
    });
  }

});

//better alternative: use require('mmmagic') library
function guessMimeType(fileName){
  const fileExtension=fileName.split('.').pop().toLowerCase();
  console.log(fileExtension);
  const ext2Mime ={ //Aught to check with IANA spec
    "txt": "text/txt",
    "html": "text/html",
    "ico": "image/ico", // CHECK x-icon vs image/vnd.microsoft.icon
    "js": "text/javascript",
    "json": "application/json", 
    "css": 'text/css',
    "png": 'image/png',
    "jpg": 'image/jpeg',
    "wav": 'audio/wav',
    "mp3": 'audio/mpeg',
    "svg": 'image/svg+xml',
    "pdf": 'application/pdf',
    "doc": 'application/msword',
    "docx": 'application/msword'
   };
    //incomplete
  return (ext2Mime[fileExtension]||"text/plain");
}

//
let expenses=[
  {
      name:"Brian",
      topic:"Coca Cola",
      date: "2020-02-13",
      amount: 95.4,
      currency: "KR"
  },
  {
      name: "Michele",
      topic: "Expresso",
      date: "2020-02-14",
      amount: 6,
      currency: "EURO"
    },
  {
      name: "Brian",
      topic: "Americano",
      date: "2020-02-15",
      amount: 7,
      currency: "EURO"
    }
  //name, topic, date, amount, and currency. 
  //Thu Feb 13 2020 11:08:44 GMT+0100 (GMT+01:00)
]

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//https://www.w3schools.com/nodejs/nodejs_url.asp

