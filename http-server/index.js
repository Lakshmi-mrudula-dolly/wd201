const http=require("http");
const fs=require("fs");
const min = require("minimist");
const pt=min(process.argv.slice(2))
let homecontent="";
let projectcontent="";
let registcontent="";
fs.readFile("home.html",(err,home)=>{
    if(err) throw err;
    homecontent=home;
});
fs.readFile("project.html",(err,project)=>{
    if(err) throw err;
    projectcontent=project;
});
fs.readFile("registration.html",(err,registration)=>{
    if(err) throw err;
    registcontent=registration;
});

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
    }).listen(pt.port);
    