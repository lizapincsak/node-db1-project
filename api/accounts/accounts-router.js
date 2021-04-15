const express= require("express");
const Account = require("./accounts-model");
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require("./accounts-middleware")

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  }
  catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    try{
      const newAccount = await Account.create({name: req.body.name.trim(), budget: req.body.budget})
      res.status(201).json(newAccount)
    }
    catch(err){
      next(err)
    }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try{
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.json(updatedAccount)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }
  catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
