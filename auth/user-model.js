const db = require('../database/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => findById(ids[0]));
}
