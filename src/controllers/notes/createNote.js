const Note = require('../../models/entities/note')

const createNote = async (request, response) => {
  const { title, body } = request.body

  try {
    const note = new Note({ 
      title: title, 
      body: body, 
      author: request.user._id 
    })
    await note.save()
    response.status(201).json(note)
  } 
  
  catch (error) {
    response.status(500).json({ error: '500: Error on attempting to create a new note' })
  }
}

module.exports = createNote