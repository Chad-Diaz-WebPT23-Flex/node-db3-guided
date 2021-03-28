const db = require("../../data/db-config.js");

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findPost(id) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "u.username", "p.contents")
    .where({ user_id: id });
}

function findAllPosts() {
  return db("posts");
}

async function addPostById(id, post) {
  post.user_id = id;
  try {
    const result = await db("posts").insert(post);
    const newResult = await findPost(result);
    return newResult;
  } catch (err) {
    throw err;
  }
}
// REVIEW how would below work? and how would an update to postId work?

async function removePostById(postId) {
  post.user_id = id;
  postId = post.id;
  return await db("posts").where({ postId }).del();
}

async function add(user) {
  const count = await db("users").insert(user);
  return (newUser = await findById(count[0]));
}

async function update(id, changes) {
  try {
    await db("users").update(changes).where({ id });
    return await findById(id);
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  return await db("users").del().where({ id });
}

module.exports = {
  find,
  findById,
  findPost,
  add,
  update,
  remove,
  addPostById,
  removePostById,
  findAllPosts,
};
