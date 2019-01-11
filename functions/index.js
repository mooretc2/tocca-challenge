const functions = require('firebase-functions'),
	admin = require('firebase-admin'),
	express = require('express'),
	app = express();
	
// Initialize admin with firebase config
admin.initializeApp(functions.config().firebase);
const database = admin.database();

/**
 * Responds with all profiles with keys from $start to $end.
 * If $end - $start > 50 or if $end < $start, returns 400 status.
 * If there is a db error, returns 500 status.
 */
app.get('/:start/:end', (req, res) => {
	let start = req.params.start,
		end = req.params.end;
	
	if(end < start || end - start > 50){
		res.status(400).send("Invalid start/end values");
	}
	database.ref('user_profile').orderByKey().startAt(`${start}`).endAt(`${end-1}`).once("value")
		.then((result) => {return res.json(result)})
		.catch((error) => {res.status(500).send(error)});
});

/**
 * Responds with the first 50 profiles ordered by key.
 * If there is a db error, returns 500 status.
 */
app.get('/', (req, res) => {
	database.ref('user_profile').orderByKey().startAt('0').endAt('49').once("value")
		.then((result) => {return res.json(result)})
		.catch((error) => {res.status(500).send(error)});
});

// Tell default firebase handler to use Express.
const profiles = functions.https.onRequest(app);

module.exports = {
	profiles
}
