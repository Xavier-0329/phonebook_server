const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://xavierlee0329_db_user:${password}@cluster0.skkzbuu.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const person = new Phonebook({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length > 3) {
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Phonebook.find({}).then((result) => {
    result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
    })
    mongoose.connection.close();
  });
}
