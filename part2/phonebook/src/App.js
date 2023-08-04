import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([...persons]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const query = event.target.value.toLowerCase();
    const regex = RegExp(query);
    console.log(regex);
    const matches = persons.filter((person) =>
      person.name.toLowerCase().match(regex),
    );
    setFilteredPerson(matches);
  };

  const checkSameName = (name) => {
    return persons.some((person) => person.name === name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkSameName(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }),
      );
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        filter={filter}
        persons={persons}
        filteredPerson={filteredPerson}
      />
    </div>
  );
};

export default App;
