/* jshint esnext:true*/
var http = require("http");
var server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello");
}); 

server.listen(5000);
console.log("server started....");

