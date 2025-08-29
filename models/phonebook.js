require('dotenv').config()

const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false);
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Phonebook = mongoose.model('Phonebook', phonebookSchema)

module.exports = Phonebook