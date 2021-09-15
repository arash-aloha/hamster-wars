const { connect } = require('../database.js');
const db = connect(); 

const hamsters = 'hamsters'

addOneDoc()

async function addOneDoc() {
    console.log('Add a new document...');

    const object = {
        name: 'test1',
        favFood: 'test2'
    };

    const docRef = await db.collection(hamsters).add(object);
    console.log('added document with the id ' + docRef.id);
}