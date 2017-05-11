// used for small asynchronous synchronous process
var exec=require("child_process").exec;
exec("xdg-open http://www.linkedin.com");

// for longer ongoing process, large data 
// var spawn = require("child_process").spawn;
// var cp = spawn("spawn", ["callback"]);
// cp.stdout.on("data", function (data) {
//     console.log(`test: ${data.toString()}`);
// });

// cp.on("close", function () {
//     process.exit();
// });

// setTimeout(function () {
//     cp.stdin.write("stop");
// }, 1000);