import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([...persons]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then(setPersons(persons.concat(newPerson)));
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
