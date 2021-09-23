const { connect } = require('../database.js');
const db = connect(); 

const HAMSTERS = 'hamsters'

deleteOneHamster()

async function deleteOneHamster(id) {

    const hamsterId = id || '274btE9Kw4zk0DoFi8wc';
    const hamstersRef = db.collection(HAMSTERS).doc(hamsterId);
    const hamstersSnapshot = await hamstersRef.get();
    console.log('Document exits? ', hamstersSnapshot.exists)
    if( !hamstersSnapshot.exists ) {
        return null
    }
    hamstersRef.delete();
}

module.exports = deleteOneHamster;