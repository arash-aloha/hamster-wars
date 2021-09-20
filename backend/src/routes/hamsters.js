const express = require('express');
const router = express.Router();

const { connect } = require('../database.js');
console.log('Före connect')
const db = connect(); 
const HAMSTERS = 'hamsters'

const { isHamsterObject, isCorrectIndex } = require('../validate/validate.js');

//ENDPOINTS GET
router.get('/', async (req, res) => {
    let hamsterArray = await getAllHamsters();
    res.send(hamsterArray);
})

//lägg in random*

//ENDPOINTS GET ONE
//kontrollera varför !findhamster ger fel i console
router.get('/:id', async (req, res) => {
    const findHamster = await getOneHamster(req.params.id);
    if( findHamster ) {
        const hamster = await findHamster.data()
        res.send(hamster);
    }
    if( !findHamster.exists ) {
        res.sendStatus(404);
    }
})

//ENDPOINTS PUT
router.put('/:id', async (req, res) => {
    //const checkBody = req.body;
    let updateHamster = await getOneHamster(req.params.id);
    if( !updateHamster.exists ) {
        res.sendStatus(404)
        return
    }

    if( !isHamsterObject(req.body) ) {
        res.status(400).send('The request is not a Hamster Object.')
        return
    }                   
    await updateOne(req.params.id, req.body);
    res.sendStatus(200)
    return
})

//ENDPOINTS POST
router.post('/', async (req, res) => {
    //let body = req.body
    //let test = await addOneHamster(body)
    if( !isHamsterObject(req.body) ) {
        res.status(400).send('Bad request');
        return
    } 
    //uppdatera nedan
    let test = await addOneHamster(req.body)
    res.status(200).send(test)
    // await addOneHamster(body);
    
})

//ENDPOINT
router.delete('/:id', async (req, res) => {
    //let index = req.params.id;
    res.send('test')
    //let deleteHamsterFromArray = await deleteOneHamster(index);
    
    





    // if( deleteHamsterFromArray ) {
    //     res.sendStatus(404);
    // } 
    // else {
    //     res.sendStatus(200);
    // }


    // if( index !== hamstersSnapshot[index] ) {
    //     res.status(400).send('Does not exists.')
    //     return
    // } else {
    //     res.send('Exits', )
    // }

    
    // let deleteHamsterFromArray = await deleteOneHamster(index);

})




//ASYNC SCRIPT GET ALL
const getAllHamsters = async () => {
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
    return hamsterArray;
}


//ASYNC SCRIPT GET ONE
async function getOneHamster(id) {
    const hamstersRef = db.collection(HAMSTERS).doc(id);
    const hamstersSnapshot = await hamstersRef.get();

    // if( hamstersSnapshot.exists ) {
    //     return hamstersSnapshot.data()
    // } 
    // else {
    //     return null
    // }

    return hamstersSnapshot;
}

//ASYNC SCRIPT PUT
async function updateOne(id, object) {
    const hamstersRef = db.collection(HAMSTERS).doc(id);
    const settings = { merge: true };
    
    hamstersRef.set(object, settings);
}

//ASYNC SCRIPT POST
async function addOneHamster(object) {
    //console.log('Add a new document...');
    const hamstersRef = await db.collection(HAMSTERS).add(object);
    const newHamster = { id: hamstersRef.id };
    return newHamster;
}

//ASYNC SCRIPT DELETE
async function deleteOneHamster(id) {

    const hamsterId = id;
    const hamstersRef = db.collection(HAMSTERS).doc(hamsterId);
    const hamstersSnapshot = await hamstersRef.get();
    console.log('Document exits? ', hamstersSnapshot.exists)
    if( !hamstersSnapshot.exists ) {
        return null
    }
    hamstersRef.delete();
}

module.exports = router;
