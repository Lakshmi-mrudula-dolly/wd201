const http=require("http");
const fs=require("fs");
const readline=require("readline");
let homecontent="";
let projectcontent="";
let registcontent="";
fs.readFile("home.html",(err,data)=>{
    if(err) throw err;
    homecontent=data;
});
fs.readFile("project.html",(err,data)=>{
    if(err) throw err;
    projectcontent=data;
});
fs.readFile("registration.html",(err,data)=>{
    if(err) throw err;
    registcontent=data;
});
let rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
rl.question("enter port number",(port)=>{
    http.createServer((request,response)=>{
        let url=request.url;
        response.writeHead(200,{"Content-Text":"text/html"});
        switch(url){
            case "/project":
                response.write(projectcontent);
                response.end();
                break;
            case "/registration":
                    response.write(registcontent);
                    response.end();
                    break;
             default:
                        response.write(homecontent);
                        response.end();
                        break;
        }
    }).listen(Number(port))
});