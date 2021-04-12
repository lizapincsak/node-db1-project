const express= require("express");
const Account = require("./accounts-model");
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require("./accounts-middleware")

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try{
    const data = await Account.getAll()
    res.json(data)
  }
  catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res) => {
  res.status(200).json(req.id)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
    Account.create(req.body)
    .then(acc => {
      res.status(201).json(acc)
      acc.trim()
    })
  .catch(err => {
    next(err)
  })
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try{
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    const deletedAccount = await Account.deleteById(req.params.id)
    res.status(200).json(deletedAccount)
  }
  catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
