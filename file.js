var fs = require("fs");
var path = require("path");


var files = fs.readdir('./lib', function (err, files) {
    if (err) {
        throw err;
    }
    files.forEach(function (fileName) {
        var file = path.join(__dirname, "lib", fileName);
        var stats = fs.statSync(file);
        if (stats.isFile()) {
            fs.readFile(file, "UTF-8", function (err, contents) {
                if (err) {
                    console.log(err);
                }
                console.log(contents);
            });
        }
    }
    );

    // Create file and write it
    var md = `
            Created a file
        ===================
        * Line1
        * line 2
        * line 3
        `;
    fs.writeFile("sample.md", md.trim(), function (err) {
        console.log("file created");

        fs.appendFile("sample.md", "\n\n Appended Text \n");
    });
});
// end Create file and write it

// Create dir
if (fs.existsSync("directoryOne")) {
    console.log("Already exist.");
} else {
    fs.mkdir("directoryOne", function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("directory created");
        }
    });
}
// end Create dir

// remove and rename file
if (fs.existsSync("./lib/rename.js")) {
    fs.renameSync("./lib/rename.js", "./lib/rename.json");
    console.log("file name changed");
}

if (fs.existsSync("./lib/remove.js")) {
    fs.rename("./lib/remove.js", "remove.js", function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("file moved.");
        }
    });
}
else {
    console.log("Already removed.");
}

// End remove and rename file

// readable file stream 
var stream=fs.createReadStream("./sample.md", "UTF-8");
console.log(stream);

