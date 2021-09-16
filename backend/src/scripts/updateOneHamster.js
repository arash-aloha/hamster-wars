const { connect } = require('../database.js');
const db = connect(); 

const hamsters = 'hamsters';

updateOneHamster()

async function updateOneHamster(id) {
    console.log('Update document...');
    const hamsterId = id || '0AWvVBVugJmqOHTURvTT';

    const update = {
        name: 'test'
    }

    const settings = { merge: true };
    await db.collection(hamsters).doc(hamsterId).set(update, settings)
    console.log('Updated.');
}

