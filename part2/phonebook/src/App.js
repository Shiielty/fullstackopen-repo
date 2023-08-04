import { useState, useEffect } from "react";
import axios from "axios";
import personAPI from "./services/personAPI";

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
    personAPI.getAll().then((initialPerson) => {
      setPersons(initialPerson);
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

  const handleDelete = (id) => {
    console.log("check delete button");
    personAPI.deleteNote(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setFilteredPerson(filteredPerson.filter((person) => person.id !== id));
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkSameName(newName)) {
      const targetObj = persons.find((person) => person.name === newName);
      const id = targetObj.id;
      const newObj = { ...targetObj, number: newNumber };
      if (
        window.confirm(
          `${newName} is already aded to phonebook, replace the old number with a new one?`,
        )
      ) {
        personAPI.update(id, newObj).then((returnedResponse) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedResponse,
            ),
          );
        });
      }
      return;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personAPI.create(newPerson).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
