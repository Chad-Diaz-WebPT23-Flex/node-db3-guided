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

async function addPostById(id, post) {
  post.user_id = id;
  const result = await db("posts").insert(post);
  return result;
}

async function add(user) {
  const count = await db("users").insert(user);
  return (newUser = await findById(count[0]));
}

async function update(id, changes) {
  await db("users").update(changes).where({ id });
  return await findById(id);
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
};
