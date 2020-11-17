const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
}

//----------------------------------------------------------------------------//
// find()
//----------------------------------------------------------------------------//
// method to return all users.
//----------------------------------------------------------------------------//
async function find() {
    try {
        return await db('users');
    } catch (err) {
        throw err;
    }
}

//----------------------------------------------------------------------------//
// findById()
//----------------------------------------------------------------------------//
// The .first() method provides a simple way to detect empty results. .where()
// returns an array, but it could be an empty array. Using .first() returns the
// first object in the array, and if the array is empty, the first object is
// "undefined", which can be an easy test for "not the data I was looking for".
//
// you could also test the length of the array, and there are other methods to
// determine that the query didn't return the right stuff.
//----------------------------------------------------------------------------//
async function findById(id) {
    try {
        const user = await db('users').where({ id }).first();
        return user;
    } catch (err) {
        throw err;
    }
}

//----------------------------------------------------------------------------//
// findPosts()
//----------------------------------------------------------------------------//
// Good example of using joins in knex. Take some time to look at the variety of
// parameter syntax options you have for the .join() method on the knexjs.org
// website.
//----------------------------------------------------------------------------//
async function findPosts(id) {
    try {
        const posts = await
            db('posts as p')
                .join('users as u', 'u.id', 'p.user_id')
                .where({ user_id: id })
                .select('p.id', 'u.username', 'p.contents');

        return posts;
    } catch (err) {
        throw err;
    }
}

//----------------------------------------------------------------------------//
// add()
//----------------------------------------------------------------------------//
// we can just use the findById() method to return the new object after it has
// been added. Knex returns an array of ID's of newly created objects. Since we
// are only creating a single object, we get an array with one value, and use it
// to search for the newly created record. 
//----------------------------------------------------------------------------//
async function add(userData) {
    try {
        const ids = await db('users').insert(userData);
        const newUser = await findById(ids[0]);
        return newUser;
    } catch (err) {
        throw err;
    }
}

//----------------------------------------------------------------------------//
// update()
//----------------------------------------------------------------------------//
// again, using findById() to find the object that we changed.
//----------------------------------------------------------------------------//
async function update(id, changes) {
    try {
        await db('users').where({ id }).update(changes);
        return await findById(id);
    } catch (err) {
        throw err;
    }
}

//----------------------------------------------------------------------------//
// remove()
//----------------------------------------------------------------------------//
// simply delete the right one... :)
//----------------------------------------------------------------------------//
async function remove(id) {
    try {
        return await db('users').del().where({ id });
    } catch (err) {
        throw err;
    }
}