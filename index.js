const express = require("express");
const app = express();
// const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");



app.use(cors());
// app.use(morgan("tiny"));

app.use(express.static("dist"));

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
    if (result) {
      response.json(result);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Phonebook.findByIdAndDelete(id).then(result => {
    if(result){
      response.status(204).send({message: 'person deleted'});
    }else{
      response.status(404).send({error: 'person not found'});
    }
  })
  .catch(error => next(error))
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  Phonebook.find({}).then((persons) => {
    if (persons.find((p) => p.name === body.name)) {
      return response.status(400).json({
        error: "name must be unique",
      });
    } else {
      const person = new Phonebook({
        name: body.name,
        number: body.number,
      });

      person.save().then((result) => {
        response.json(result);
      })
      .catch(error => next(error))
    }
  });
});

app.get("/info", (request, response) => {
  Phonebook.find({}).then((result) => {
    const size = result.length;
  const date = new Date();
  response.send(`<div>
    <p>Phonebook has info for ${size} people</p>
    <p>${date}</p>
    </div>`);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  const {name, number} = request.body
  Phonebook.findById(id).then(result => {
    if (result) {
      result.name = name
      result.number = number
      result.save().then(updated => {
        response.json(updated)
      })
    }else{
      response.status(404).send({error: 'person not found'})
    }
  })
  .catch(error => next(error))
  
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler)
