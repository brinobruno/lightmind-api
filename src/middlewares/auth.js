require('dotenv').config()
const secretToken = process.env.JWT_TOKEN

const jwt = require('jsonwebtoken')

const User = require('../models/entities/user')

const WithAuth = (request, response, next) => {
  const token = request.headers['x-access-token']

  if(!token)
    response.status(401).json({ error: 'Unauthorized: no token provided or available' })

  else {
    jwt.verify(token, secret, (error, decode) => {
      if(error)
        response.status(401).json({ error: 'Unauthorized: token not valid' })

      else {
        request.email = decode.email
        User.findOne({ email: decode.email })
        .then(user => {
          request.user = user
          next()
        })

        .catch(error => {
          response.status(401).json({ error: error })
        })
      }
    })
  }
}

module.exports = WithAuth