const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config()

app.use(cors());
app.use(morgan("tiny"));

app.use(express.static('dist'))

app.use(express.json());

const Phonebook = require("./models/phonebook");


app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Phonebook.findById(id).then((result) => {
    response.json(result);
  })
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  
  Phonebook.find({}).then((persons) => {if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else {
    const person = new Phonebook({
      name: body.name,
      number: body.number,
    })

    person.save().then((result) => {
      response.json(result);
    })
  }})
});

app.get("/info", (request, response) => {
  const size = persons.length;
  const date = new Date();
  response.send(`<div>
    <p>Phonebook has info for ${size} people</p>
    <p>${date}</p>
    </div>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
