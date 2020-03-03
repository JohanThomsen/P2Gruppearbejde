const http = require('http');
const fs=require("fs");
const path=require("path");
const querystring = require("querystring");

const hostname = '127.0.0.1';
const port = 3000;
let expensesObj = {
  expenses: []
};

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


const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let date=new Date();
  console.log("GOT: " + req.method + " " +req.url);

  if (req.method == "POST") {
      switch(req.url){
        case "/addExpense":
          console.log(req);
          let post = processPost(req, res);
          console.log(post);
          res.writeHead(301,
            {location: 'http://127.0.0.1:5500/RunningExcersize1.html'
          });   
          break;
        default:  
          console.log("Did Nothing");
        break;
      }
  }  

  if(req.method=="GET"){
    switch(req.url){
      case "/":    
       fileResponse("index.html",res);
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
      fs.readFileSync('expenseJson.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
      });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      fs.readFile('expenseJson.json', 'utf8',(err, data) => {
        if (err){
          console.log(err);
        } else {
          console.log('Reading JSON');
          let responseExpenseJson = JSON.parse(data);
          console.log(responseExpenseJson);
          res.write(JSON.stringify(responseExpenseJson));
          res.end('\n');
        }
      });
      //res.write(JSON.stringify(expenses));
      
  break;
    default:
      fileResponse(req.url,res);
      break;
    }//switch
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
/*let expenses=[
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
]*/

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function processPost (req, res) {
  console.log("In Process")
  if (req.method == "POST") {
    console.log("Processing Post")
    let body = "";
    req.on("data", (data) => {
      body += data;

      if (body.length > 1e6) {
        req.connection.destroy();
        console.log("Destroying POST")
      }
    });

    req.on("end", () => {
      let post = querystring.parse(body);
      console.log("Finishing POST")
      console.log(post);
      
      fs.readFile('expenseJson.json', 'utf8',(err, data) => {
        if (err){
          console.log(err);
        } else {
          console.log('Updating JSON');
          expensesObj = JSON.parse(data);
          console.log(expensesObj.expenses);
          expensesObj.expenses.push(post);
          console.log(expensesObj.expenses);
          let jsonExpense = JSON.stringify(expensesObj);
          fs.writeFile('expenseJson.json', jsonExpense, 'utf8', (err, data) => {
              if (err){
                  console.log(err);
              }
          });
        }
      });
      

      return post;
    })

    
  }
}

//https://www.w3schools.com/nodejs/nodejs_url.asp

