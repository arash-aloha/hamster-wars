const admin = require("firebase-admin");
const serviceAccount = require('./secrets/firebase-key.json');


function connect() {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });    
    const db = admin.firestore();
    return db;
}

/*
let privateKey;
if( process.env.PRIVATE_KEY ) {
    privateKey = JSON.parse(process.env.PRIVATE_KEY)
} else {
    privateKey = require('./example-private-key.json)
}
*/

module.exports = { connect }