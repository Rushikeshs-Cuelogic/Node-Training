'use strict';
const Hapi = require('hapi');
var fs = require('fs');
// Create a server with a host and port
const server = new Hapi.Server();
server.connection(
    {
        host: 'localhost',
        port: 8000
    });

// Add the route

// get 
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (req, res) {
        res('Hello,' + encodeURIComponent(req.params.name) + '!');
    }
});


server.route({
    method: 'GET',
    path: '/hapiListUsers',
    handler: function (req, res) {
        fs.readFile(__dirname + "/" + "User.json", 'UTF-8', function (err, data) {
            console.log(data);
            res(data);
        });
    }
});


var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

server.route({
    method: 'POST',
    path: '/hapiAddUser',
    handler: function (req, res) {
        fs.readFile(__dirname + "/" + "User.json", 'UTF-8', function (err, data) {
            data = JSON.parse(data);
            data["user4"] = user["user4"];
            console.log(data);
            res(JSON.stringify(data));
        });
    }
});


server.route(
    {
        method: 'DELETE',
        path: '/hapiDeleteUser',
        handler: function (req, res) {
            // First read existing users.
            fs.readFile(__dirname + "/" + "User.json", 'utf8', function (err, data) {
                data = JSON.parse(data);
                delete data["user" + 2];
                console.log(data);
                res(JSON.stringify(data));
            });
        }

    });


server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hapiGetHtmlPage',
        handler: function (request, reply) {
            reply.file('./lib/Sign up for Facebook _ Facebook.html');
        }
    });
});

// Start the server 

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});