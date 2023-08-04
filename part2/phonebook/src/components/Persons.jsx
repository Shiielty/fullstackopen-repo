import Person from "./Person";

const Persons = ({ filter, persons, filteredPerson }) => {
  return (
    <>
      {filter === ""
        ? persons.map((person) => (
            <Person key={person.name} person={person} />
          ))
        : filteredPerson.map((person) => (
            <Person key={person.name} person={person} />
          ))}
    </>
)}


export default Persons;
