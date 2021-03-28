const db = require("../../data/db-config.js");

function find() {
  return db("users");
}

function findById(id) {
  return db("users").first("*").where({ id });
}

function findPost(id) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "u.username", "p.contents")
    .where({ user_id: id });
}

function add(user) {
  return db("users").insert(user);
}

function update(id, changes) {
  return db("users").updated(changes).where({ id });
}

function remove(id) {
  return db("users").del().where({ id });
}

module.exports = {
  find,
  findById,
  findPost,
  add,
  update,
  remove,
};
