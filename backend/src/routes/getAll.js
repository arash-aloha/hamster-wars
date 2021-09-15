const ref
const snapshot

if( snapshot.empty ) {
    res.status(200).send([]);
    return
}
let items = []
snapshot.forEach( doc => {
    items.push(doc.data() )
    res.status(200).send(items);
})

