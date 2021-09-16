const express = require('express');
const router = express.Router();

const { connect } = require('../database.js');
const db = connect(); 
const HAMSTERS = 'hamsters'

/* * * * * * * * * * * * * * *
ENDPOINTS GET
* * * * * * * * * * * * * * * */
router.get('/', async (req, res) => {
    let hamsterArray = await getAllHamsters();
    res.send(hamsterArray);
})

/* * * * * * * * * * * * * * *
ENDPOINTS GET ONE
* * * * * * * * * * * * * * * */
router.get('/:id', async (req, res) => {
    const findHamster = await getOneHamster(req.params.id);
    res.send(findHamster);
})


/* * * * * * * * * * * * * * *
async script GET ALL
* * * * * * * * * * * * * * * */

async function getAllHamsters() {
    console.log('Retrieving all documents from database...');
    const hamstersRef = db.collection(HAMSTERS);
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

/* * * * * * * * * * * * * * *
async script GET ONE
* * * * * * * * * * * * * * * */

async function getOneHamster(id) {
    const hamstersRef = db.collection(HAMSTERS).doc(id);
    const hamstersSnapshot = await hamstersRef.get();

    if( hamstersSnapshot.exists ) {
        return await hamstersSnapshot.data()
    } else {
        return null
    }
}



module.exports = router;
