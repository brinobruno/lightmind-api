const Note = require('../../models/entities/note')

const searchNotes = async (request, response) => {
  const { query } = request.query

  try {
    let notes = await Note
    .find({ author: request.user._id })
    .find({ $text: { $search: query }})
  
    response.json(notes)
  } 
  
  catch (error) {
    response.status(500).json({ error: error })
  }
}

module.exports = searchNotes