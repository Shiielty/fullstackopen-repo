import Person from "./Person";

const Persons = ({ filter, persons, filteredPerson, handleDelete }) => {
  return (
    <>
      {filter === ""
        ? persons.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={() => handleDelete(person.id)}
            />
          ))
        : filteredPerson.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={() => handleDelete(person.id)}
            />
          ))}
    </>
  );
};

export default Persons;
