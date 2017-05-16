'use strict';
const Hapi = require('hapi');
var Joi = require('joi');
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
    path: '/',
    handler: function (req, res) {
        res('Hello,' + req.query.name); //encodeURIComponent(req.params.name) + '!');
    },
    config: {
        validate: {
            query: {
                name: Joi.string().required()
            }
        }
    }
});
const internals = {};


const schema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required().label('User Email'),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation' } }).label('This label is not used because language.label takes precedence'),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().optional()
});


const data = {
    email: 'rds@gmail.com',
    password: 'abcd1234',
    password_confirmation: 'abcd1234',
    first_name: 'Joe',
    last_name: 'Doe'
};

Joi.assert(data, schema);

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