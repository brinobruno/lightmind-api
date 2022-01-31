const Note = require('../../models/entities/note')
const isAccountOwner = require('../../middlewares/isAccountOwner')

const deleteNote = async (request, response) => {
  const { id } = request.params

  try {
   let note = await Note.findById(id)

   if(isAccountOwner(request.user, note)) {
     await note.delete()
     response.json({ message: 'OK: Note deleted' }).status(204)
   }

   else
    response.status(403).json({ error: '403: Forbidden - Permission denied' })
  } 
  
  catch (error) {
    response.status(500).json({ error: '500: Could not delete note' })
  }
}

module.exports = deleteNote