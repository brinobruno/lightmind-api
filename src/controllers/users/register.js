const User = require('../../models/entities/user')

const registerUser = async (request, response) => {
  const { name, email, password } = request.body
  const user = new User({ name, email, password })

  try {
    await user.save()
    response.status(201).json(user)
  } 
  
  catch (error) {
    response.status(500).json({ error: '500: Error on attempting to register new user' })
  }
}

module.exports = registerUser