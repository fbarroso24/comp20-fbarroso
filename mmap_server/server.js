// Initialization
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js
var app = express();
var errMsg = {"error":"Whoops, something is wrong with your data!"};

// Enable Cross-Origin Resource Sharing (otherwise, other clients won't be able to send their location)
// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//  });

// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo initialization and connect to database
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/hw3';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.post('/sendLocation', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	var user = request.body.login;
	var rlat = request.body.lat;
	var rlng = request.body.lng;

	var badRequest = !validator.isAlphanumeric(user) || !validator.isFloat(rlat) || !validator.isFloat(rlng);
	if (badRequest) {
		response.statusCode = 400;
		response.send(JSON.stringify(errMsg));
	} else {
		var query = {"login": user};
		db.collection('locations').find(query).toArray(function(err, docs){
				if(err){
					console.log("An error occurred trying to run the following query: " + query);
				} else {
					if (docs.length == 0) {
						console.log("No user found with that name, inserting new one");
						insertDocument(user, rlat, rlng, response);
					} else {
						console.log("Found an entry for user " + user);
						updateDocument(user, rlat, rlng, response); 
					}
				}
		});
	}
});

app.get('/location.json', function(request, response) {
	response.set('Content-Type', 'text/html');
	var user = request.param("login");

	db.collection('locations', function(er, collection) {
		collection.find({"login":user}).toArray(function(err, cursor) {
			if (!err) {
				response.statusCode = 200;
				if(cursor.length !=0)
					response.send(cursor[0]);
				else
					response.send({});
			} else {
				response.statusCode = 500;
				response.send('Whoops, something went terribly wrong!');
			}
		});
	});
});

app.get('/', function(request, response) {
	response.set('Content-Type', 'text/html');

	db.collection('locations', function(er, collection) {
		collection.find().sort({"created_at":-1}).toArray(function(err, cursor) {
			if (!err) {
				response.statusCode = 200;
				var indexPage = "<!DOCTYPE HTML><html><head><title>Marauder's Map Directory</title><style>body{background-color:beige;} table, th, td{border: 1px solid black; border-collapse: collapse;} th,td {padding: 5px;} th {text-align: left;}</style></head><body><h1>Geolocation Status</h1>";
				indexPage += "<table style='width:100%'><tr><th>Username</th><th>Latitude</th><th>Longitude</th><th>Timestamp</th></tr>";
				for (var i =0; i < cursor.length; i++){
					indexPage += "<tr><td>" + cursor[i].login + "</td><td>" + cursor[i].lat + "</td><td>" + cursor[i].lng + "</td><td>" + cursor[i].created_at + "</td></tr>";
				}
				indexPage += "</body></html>";
				response.send(indexPage);
			} else {
				response.statusCode = 500;
				response.send('Whoops, something went terribly wrong!');
			}
		});
	});
});

var insertDocument = function (user, newLat, newLng, response) {
	// insert new entry
	var toInsert = {
		"login": user,
		"lat":  parseFloat(newLat),
		"lng": parseFloat(newLng),
		"created_at": new Date()
	};
	db.collection('locations', function(error1, coll) {
		var id = coll.insert(toInsert, function(error2, result) {
			if (error2) {
				response.statusCode = 500;
				response.send("Internal Server Error trying to insert a new GPS location into db");
			} else {
				console.log("Successfully created a new document for: " + user);
				db.collection('locations').find().toArray(function(err, docs){
					response.statusCode = 200;
					response.send(docs);
				});
			}
		});
	});
}

var updateDocument = function(login, newLat, newLng, response) {
	var collection = db.collection('locations');
	collection.update({"login":login}, { $set: {"lat" : parseFloat(newLat), "lng": parseFloat(newLng), "created_at": new Date()}}, function(err, result){
		if(err) {
			console.log("Failed updating " + login + " with longitude: " + newLng + " and latitude: " + newLat);
			response.send(500);
		} else {
			console.log("Updated the " + login + " with longitude: " + newLng + " latitude: " + newLat + " and new timestamp " + new Date());
			db.collection('locations').find().toArray(function(err, docs){
				response.statusCode = 200;
				response.send(docs);
			});
		}
	});	
}

// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 3000);
