const Note = require('../../models/entities/note')

const listNotes = async (request, response) => {
  try {
    const notes = await Note.find({ author: request.user._id })
    response.json(notes)
  } 
  
  catch (error) {
    response.status(500).json({ error: error })
  }
}

module.exports = listNotes