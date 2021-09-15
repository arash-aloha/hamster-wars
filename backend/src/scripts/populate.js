const { connect } = require('../database.js');
const db = connect(); 
//Import data
const data = require('../../data.json');

const hamsters = 'hamsters'

populate()

//async function to populate
async function populate() {
    data.forEach(object => {
        console.log('Uploading to database...')
        db.collection(hamsters).add(object);;
    })
    console.log('Database populated.')
}

