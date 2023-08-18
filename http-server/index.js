const http=require("http");
const fs=require("fs");
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
const portFlagIndex = process.argv.indexOf("--port");

let port = 5000;
if (portFlagIndex !== -1 && process.argv[portFlagIndex + 1]) {
    port = Number(process.argv[portFlagIndex + 1]);
}
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
    }).listen(port);
    