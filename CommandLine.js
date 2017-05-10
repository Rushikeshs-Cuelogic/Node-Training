// Pass command line arguments 
	
// There are number of ways you can pass command line arguments in your NodeJS application and they are :
// 	1.Using process.argv
// 	2.Using yargs module
// 		var argv = require('yargs').argv;
// 		console.log('First : ' + argv.first);
// 		console.log('Second : ' + argv.second);.
	
// 		RUN :node example2.js --first=5 --second=10 

// 	3.Using minimist module

// command line
var x=process.argv.slice(2)
console.log(x);

// yargs to parse command line argv
var argv = require('yargs').argv;
console.log('First : ' + argv.first);
console.log('Second : ' + argv.second);
// minimist to parse command line argv
var args=require('minimist')(process.argv.slice(2));
console.log(argv);