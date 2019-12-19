const db = require('../data/dbConfig')

module.exports = {
    add,
    findBy,
    findById
}

async function add(user){
    const [id] = await db('accounts')
    .insert(user, 'id')

    return db('accounts').where({id}).first()
}

function findBy(user){
    return db('accounts').where(user)
}

function findById(id){
    return db('accounts')
    .where({id})
    .first();
}