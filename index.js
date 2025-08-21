const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(morgan("tiny"));

app.use(express.static('dist'))

app.use(express.json());

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "1",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "2",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "3",
  },
  {
    id: "4",
    name: "Xavier Lee",
    number: "1234577",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else {
    body.id = Math.floor(Math.random() * 10000000000);
    response.json(body);
    persons = persons.concat(body);
  }
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
