const db = require("../../data/db-config.js")

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts")
  .where("id", id)
  .first()
}

function create (account) {
  if(account){
    return db("accounts").insert(account)
    .then(([id]) => {
      return getById(id)
    })
  }
}

async function updateById (id, account){
  await db("accounts").where("id", id).update(account)
  return getById(id)
}

async function deleteById (id) {
  const deletedAccount = await getById(id)
  await db("accounts").where("id", id).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
