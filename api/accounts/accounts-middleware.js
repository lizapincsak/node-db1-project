const Account = require("./accounts-model");

const checkAccountPayload = (req, res, next) => {
  if(!req.body.name || !req.body.budget){
    res.status(400).json({message: "name and budget are required"})
  } else if (typeof req.body.name !== 'string') {
    res.status(400).json({message: "name of account must be a string"})
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100){
    res.status(400).json({message: "name of account must be between 3 and 100"})
  } else if (typeof req.body.budget !== 'number'){
    res.status(400).json({message: "budget of account must be a number"})
  } else if (req.body.budget < 0 || req.body.budget > 1000000){
    res.status(400).json({message: "budget of account is too large or too small"})
  } else {
    req.body.name = req.body.name.trim()
    next()
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  try{
    const account = await Account.getAll()
    const name = req.body.name.trim()
    const results = account.filter(item => {
      if(item.name === name){
        return item
      }
    })
    if(results.length > 0){
      return res.status(400).json({message: "that name is taken"})
    } else {
      next()
    }
  }
  catch(err){
    next(err)
  }  
}

const checkAccountId = async(req, res, next) => {
  try{
    const id = await Account.getById(req.params.id)
    if(!id){
      res.status(404).json({message: "account not found"})
    } else {
      req.id = id 
      next()
    }
  } 
  catch(err){
    next(err)
  }
}

module.exports = {
  checkAccountPayload, checkAccountNameUnique, checkAccountId
}