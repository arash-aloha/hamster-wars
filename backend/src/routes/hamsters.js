const { response } = require('express');
const express = require('express');
const router = express.Router();
const { connect } = require('../database.js');
const db = connect(); 
const HAMSTERS = 'hamsters'

const { isHamsterObject, returningObjects } = require('../validate/validate.js');

//ENDPOINTS GET
router.get('/', async (req, res) => {
    const hamsterArray = await getAllHamsters();
    res.send(hamsterArray);
})

//ENDPOINT CUTEST
router.get('/cutest', async (req, res) => {
    const lookingForCuteness = await hamsterStats();
    if( !lookingForCuteness ) {
        res.sendStatus(400)
    }
    res.status(200).send(lookingForCuteness)
    return
})

//ENDPOINT RANDOM
router.get('/random', async (req, res) => {
    const hamstersArray = await getAllHamsters()
    let randomHamster = hamstersArray[Math.floor(Math.random()*hamstersArray.length)];
    res.status(200).send(randomHamster);
})

//ENDPOINTS GET ONE
router.get('/:id', async (req, res) => {
    const findHamster = await getOneHamster(req.params.id);
    if( !findHamster.exists ) {
        res.sendStatus(404);
        return
    }
    const hamster = await findHamster.data()
    res.status(200).send(hamster);
})

//ENDPOINTS PUT
router.put('/:id', async (req, res) => {
    //const checkBody = req.body;
    let updateHamster = await getOneHamster(req.params.id);
    if( !updateHamster.exists ) {
        res.sendStatus(404)
        return
    };
    if( !returningObjects(req.body) ) {
        res.status(400).send('The request is not a Hamster Object.')
        return
    };                  
    await updateOne(req.params.id, req.body);
    res.sendStatus(200)
    return
})

//ENDPOINTS POST
router.post('/', async (req, res) => {
    if( !isHamsterObject(req.body) ) {
        res.status(400).send('Bad request');
        return
    } 
    let postHamster = await addOneHamster(req.body);
    res.status(200).send(postHamster);
    // await addOneHamster(bo
})

//ENDPOINT
router.delete('/:id', async (req, res) => {
    let index = req.params.id;
    let removedHamster = await getOneHamster(req.params.id);
    if( !removedHamster.exists ) {
        res.sendStatus(404)
        return
    }
    else {
        await deleteOneHamster(index);
        res.sendStatus(200);
    }
})


/*********************
 * F U N C T I O N S * 
 *********************/

//SCRIPT GET ALL
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

//SCRIPT GET CUTEST / WINNER / LOOSER
const hamsterStats = async () => {
    let allHamsters = await getAllHamsters()
    let cutestHamster = [];
    let winners = [];

    allHamsters.forEach(hamster => {
        if (hamster.games > 0 && hamster.wins > 0) {
            winners.push(hamster)
        }
    })

    winners.forEach(hamster => {
        procent = hamster.wins / hamster.games * 100
        hamster.procent = procent;
        cutestHamster.push(hamster);

    })
    console.log("outside foreach", cutestHamster)
    return cutestHamster
    
}

//SCRIPT GET ONE
async function getOneHamster(id) {
    const hamstersRef = db.collection(HAMSTERS).doc(id);
    const hamstersSnapshot = await hamstersRef.get();
    return hamstersSnapshot;
}

//ASYNC SCRIPT PUT
async function updateOne(id, object) {
    const hamstersRef = db.collection(HAMSTERS).doc(id);
    const settings = { merge: true };
    return hamstersRef.set(object, settings);
}

//ASYNC SCRIPT POST
async function addOneHamster(object) {
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
        return hamstersSnapshot.id
    }
    hamstersRef.delete();
}

module.exports = router;
