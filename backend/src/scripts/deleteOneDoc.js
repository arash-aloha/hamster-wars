const { connect } = require('../database.js');
const db = connect(); 

const hamsters = 'hamsters'

deleteOneDoc()

async function deleteOneDoc(id) {
    console.log('Deleting a document...');
    const hamsterId = id || 'VHHQTVjo4yShftzJsF4I';

    const hamstersRef = db.collection(hamsters).doc(hamsterId);
    await hamstersRef.delete();

}

module.exports = { deleteOneDoc };