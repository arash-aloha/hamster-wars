const { connect } = require('../database.js');
const db = connect(); 
const hamsters = 'hamsters'

getAllHamsters();

// async function getAllHamsters() {
//     console.log('Retrieving all documents from database...');
//     const hamstersRef = db.collection(hamsters);
//     const hamstersSnapshot = await hamstersRef.get();

//     if( hamstersSnapshot.empty ) {
//         console.log('No documents in collection.')
//         return
//     }

//     const hamsterArray = [];

//     await hamstersSnapshot.forEach(async docRef => {
//         const data = await docRef.data();    
//         data.id = docRef.id;
//         hamsterArray.push(data);
//         console.log(hamsterArray);
//     })
//     console.log('All documents have been received.')
//     return hamsterArray;
// }

async function getAllHamsters() {
    console.log('Retrieving all documents from database...');
    const hamstersRef = db.collection(hamsters);
    const hamstersSnapshot = await hamstersRef.get();

    if( hamstersSnapshot.empty ) {
        return []
    }

    const hamsterArray = [];

    await hamstersSnapshot.forEach(async docRef => {
        const data = await docRef.data();    
        data.id = docRef.id;
        hamsterArray.push(data);
    })
    console.log('All documents have been received.')
    return hamsterArray;
}

module.exports = getAllHamsters