const Note = require('../../models/entities/note')
const isAccountOwner = require('../../middlewares/isAccountOwner')

const updateNote = async (request, response) => {
  const { id } = request.params
  const { title, body } = request.body

  try {
   let note = await Note.findById(id)
   if(isAccountOwner(request.user, note)) {
    let note = await Note.findByIdAndUpdate(id,
      { $set: { title: title, body:body } },
      { upsert: true, 'new': true } //to return the actual updated note and not to fall on default
    )

    response.json(note)
   }

   else {
    response.status(403).json({ error: '403: Forbidden - Permission denied' })
   }
  } 
  
  catch (error) {
    response.status(500).json({ error: '500: Could not update note' })
  }
}

module.exports = updateNote