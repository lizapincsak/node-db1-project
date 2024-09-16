const db = require("../../data/db-config.js")

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts")
  .where("id", id)
  .first()
}

async function create (account) {
    const [id] = await db("accounts").insert(account)
    return getById(id)
}

async function updateById (id, account){
  await db("accounts").where("id", id).update(account)
  return getById(id)
}

function deleteById (id) {
    return db("accounts").where("id", id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
