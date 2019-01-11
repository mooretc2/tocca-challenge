const functions = require('firebase-functions'),
	admin = require('firebase-admin'),
	express = require('express'),
	app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

app.get('/:start/:end', function(req, res) {
	let start = req.params.start,
		end = req.params.end;
	
	if(end < start || end - start > 50){
		res.sendStatus(400).send("Invalid start/end values")
	}
	res.send(start+" "+end);
});

app.get('/', function(req, res) {
	res.send("Hello World!");
});

const profiles = functions.https.onRequest(app);

module.exports = {
	profiles
}
