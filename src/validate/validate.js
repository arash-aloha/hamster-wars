function isHamsterObject(checkBody) {
    if( (typeof checkBody) !== 'object') {
        return false
    }

    let keys = Object.keys(checkBody)
    if( !keys.includes('age') ||
        !keys.includes('imgName') || 
        !keys.includes('favFood') || 
        !keys.includes('games') || 
        !keys.includes('wins') ||
        !keys.includes('defeats') ||
        !keys.includes('name') ||
        !keys.includes('loves')
        ) {
        return false
    } 
        return true
}

function returningObjects(checkBody) {
    if( (typeof checkBody) !== 'object') {
        return false
    }

    let keys = Object.keys(checkBody)
    if( 
        !keys.includes('games') || 
        !keys.includes('wins')
    ) {
        return false
    } 
        return true
}



module.exports = { isHamsterObject, returningObjects };