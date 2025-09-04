require('dotenv').config()

const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false);
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate:{
      validator: function(v) {
        return /^\d{2,3}-\d+{6,}$/.test(v);
      },
    },
    required: true
  },
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