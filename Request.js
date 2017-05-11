var https = require("https");
var fs = require("fs");

var option = {
    hostname: "en.wikipedia.org",
    port: 443,
    path: "/wiki/George_Washington",
    method: "GET"
};
var responseBody = "";
var req = https.request(option, function (res) {
    console.log(`Server status:${res.statusCode}`);
    //console.log(`Response Headers:%j`, res.headers);
    res.setEncoding("UTF-8");

    res.on("data", function (chunk) {
        console.log(`---chunk---${chunk.length}`);
        responseBody += chunk;
    });
    
    res.on("end", function () {
        fs.writeFile("George.html", responseBody, function (err) {
            if (err)
            { throw err; }
        });
    });

});
req.on("error", function(err){
          console.log("Something goes wrong..");
});

req.end();