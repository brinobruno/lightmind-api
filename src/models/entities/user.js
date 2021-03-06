const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default:Date.now },
  updated_at: { type: Date, default:Date.now }
})

//mongoose middleware
userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10,
      (error, hashedPassword) => {
        if (error)
          next(error)

        else {
          this.password = hashedPassword
          next()
        }
      }
    )
  }
})

userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function(error, same) {
    if(error)
      callback(error)
    
    else 
      callback(error, same)
  })
}

module.exports = mongoose.model('User', userSchema)