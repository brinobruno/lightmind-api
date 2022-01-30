const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/lightmind_api_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to database'))
  .catch((error) => console.log(error))