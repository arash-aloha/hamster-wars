const { connect } = require('../database.js');
const db = connect(); 

const hamsters = 'hamsters'

clear()

async function clear() {
    hamstersRef = db.collection(hamsters);
    const hamstersSnapshot = await hamstersRef.get();
    console.log('Initializing Clearing...')
    //check if snapshot empty
    if( hamstersSnapshot.empty ) {
        console.log('Nothing to clear, collection is empty.')
        return
    }
    //if snapshot populated ->
    hamstersSnapshot.forEach(docRef => {
        hamstersRef.doc(docRef.id).delete()
    });
    console.log('Clearing is done.')
}