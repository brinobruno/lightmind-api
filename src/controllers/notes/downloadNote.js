const Note = require('../../models/entities/note')

const downloadNote = async (request, response) => {
  try {
    const { id } = request.params
    const note = await Note.findById(id)
    if(isAccountOwner(request.user, note))
      response.json(note)
    else
      response.status(403).json({ error: '403: Forbidden - Permission denied' })
  } 
  
  catch (error) {
    response.status(500).json({ error: '500: Error on attempting to get a note' })
  }
}

const isAccountOwner = (user, note) => {
  if(JSON.stringify(user._id) == JSON.stringify(note.author._id))
    return true
  
  else
    return false
}

module.exports = downloadNote