const functions = require('firebase-functions'),
	admin = require('firebase-admin'),
	express = require('express'),
	app = express();
	
admin.initializeApp(functions.config().firebase);
const database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

app.get('/:start/:end', (req, res) => {
	let start = req.params.start,
		end = req.params.end;
	
	if(end < start || end - start > 50){
		res.status(400).send("Invalid start/end values");
	}
	database.ref('tocca-project/user_profile').startAt(start).endAt(end-1)
		.then((result) => {res.json(result)};
});

app.get('/', (req, res) => {
	database.ref('tocca-project/user_profile').startAt(0).endAt(49)
		.then((result) => {res.json(result)};
});

const profiles = functions.https.onRequest(app);

module.exports = {
	profiles
}
