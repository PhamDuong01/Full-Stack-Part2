import { useState } from "react";
import Filter from "./Filter";
import PersonsForm from "./PersonsForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterList, setFilterList] = useState(persons);

  function handleSubmit(e) {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const copy = [...persons];
    copy.push({ name: newName, number: newNumber });
    setPersons(copy);
    setFilterList(copy);
  }

  function handleFilter(e) {
    setFilterName(e.target.value);
    if (e.target.value === "") {
      setFilterList(persons);
    } else {
      const searchResults = persons.filter((person) => {
        return person.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setFilterList(searchResults);
    }
  }
  const handleForm = {
    onSetName: function handleSetNewName(e) {
      setNewName(e.target.value);
    },
    onSetNumber: function handleSetNewNumber(e) {
      setNewNumber(e.target.value);
    },
    onSubmit: handleSubmit,
    newName,
    newNumber,
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilter={handleFilter} name={filterName} />
      <h2>add a new</h2>
      <PersonsForm handleForm={handleForm} />
      <h2>Numbers</h2>
      <Persons persons={filterList} />
    </div>
  );
};

export default App;
