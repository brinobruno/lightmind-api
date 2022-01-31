const Note = require('../../models/entities/note')
const isAccountOwner = require('../../middlewares/isAccountOwner')

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

module.exports = downloadNote