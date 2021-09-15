//return database
const database = require('./database.js');
const connect = database.connect;
const db = connect(); 


console.log('Retrieving all documents from database...')