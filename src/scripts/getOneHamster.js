const { connect } = require('../database.js');
const db = connect(); 

const hamsters = 'hamsters';

getOneHamster()

async function getOneHamster(id) {
    console.log('Looking for hamster...');
    const hamsterId = id;

    hamstersSnapshot = await 
    db.collection(hamsters).doc(hamsterId).get();

    if( !hamstersSnapshot.exists ) {
        console.log('Could not find the hamster.');
        return
    }

    const data = await hamstersSnapshot.data();
    console.log('Found: ', data);
}

module.exports = getOneHamster;