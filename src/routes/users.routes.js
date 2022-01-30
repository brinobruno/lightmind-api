var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretToken = process.env.JWT_TOKEN

const User = require('../models/entities/user')

router.post('/register', async (request, response) => {
  const { name, email, password } = request.body
  const user = new User({ name, email, password })

  try {
    await user.save()
    response.status(201).json(user)
  } 
  
  catch (error) {
    response.status(500).json({ error: '500: Error on attempting to register new user' })
  }
})

router.post('/login', async (request, response) => {
  const { email, password } = request.body

  try {
    const user = await User.findOne({ email })

    if (!user)
      response.status(401).json({ error: 'Incorrect email or password' })

    else {
      user.isCorrectPassword(password, function(error, same) {
        if (!same)
          response.status(401).json({ error: 'Incorrect email or password' })

        else {
          const token = jwt.sign({ email }, secretToken, { expiresIn: '30d' })
          response.json({ user: user, token: token })
        }
      })
    }
  } 
  
  catch (error) {
    response.status(500).json({ error: '500: Internal error, please try again' })
  }
})

module.exports = router;
