var express = require('express');
var fs = require('fs');
var app = express();

var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

app.get(
    '/:name?', function (req, res) {
        var name = req.params.name;
        res.end('Hello ' + name);
    }
);

app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "User.json", 'UTF-8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});


app.post('/addUser', function (req, res) {
    fs.readFile(__dirname + "/" + "User.json", 'UTF-8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "User.json", 'utf8', function (err, data) {
        users = JSON.parse(data);
        var user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

app.delete('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "User.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["user" + 2];

        console.log(data);
        res.end(JSON.stringify(data));
    });
})


app.listen(8000);