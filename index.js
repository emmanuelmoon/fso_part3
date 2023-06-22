const express = require("express");

const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people </p>
  <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.send(person);
  } else {
    response.sendStatus(404);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);
  response.status(204).end();
});

const getId = () => {
  return Math.floor(Math.random() * 10000000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    response.json({ error: "name not submitted" });
  } else if (!body.number) {
    response.json({ error: "number not submitted" });
  } else {
    const match = persons.find((person) => person.name === body.name);
    if (match) {
      response.json({ error: "name must be unique" });
    } else {
      const person = {
        id: getId(),
        name: body.name,
        number: body.number,
      };

      persons = persons.concat(person);
      response.json(persons);
    }
  }
});
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Phonebook app listening on port ${PORT}`);
});
