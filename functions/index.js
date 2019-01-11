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

app.get('profiles', function(req, res) {
	res.send("Hello World!");
});

const api = functions.https.onRequest(app);

module.exports = {
	api
}
