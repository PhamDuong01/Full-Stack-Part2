import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterList, setFilterList] = useState(persons);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
      setFilterList(response);
    });
  }, []);

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

  function handleAddNew(e) {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personInfo = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    personService.createPerson(personInfo).then((res) => {
      setPersons(persons.concat(res));
      setFilterList(persons.concat(res));
      setNewName("");
      setNewNumber("");
    });
  }

  const handleForm = {
    onSetName: function handleSetNewName(e) {
      setNewName(e.target.value);
    },
    onSetNumber: function handleSetNewNumber(e) {
      setNewNumber(e.target.value);
    },
    onAddNew: handleAddNew,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilter={handleFilter} name={filterName} />
      <h2>add a new</h2>
      <PersonsForm name={newName} number={newNumber} handleForm={handleForm} />
      <h2>Numbers</h2>
      <Persons persons={filterList} />
    </div>
  );
};

export default App;
