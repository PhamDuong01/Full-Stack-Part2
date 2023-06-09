import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterList, setFilterList] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);

  const [state, setState] = useState("error");
  //Extract the code that handles the communication with the backend into its own module by following the example shown earlier in this part of the course material.

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
      const personId = persons.filter((person) => person.name === newName);
      const personUpdate = {
        name: newName,
        number: newNumber,
        id: personId[0].id,
      };
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        personService.updatePerson(personId[0].id, personUpdate).then((res) => {
          const copy = persons.filter((person) => {
            return person.id !== personId[0].id;
          });
          setPersons(copy.concat(res));
          setFilterList(copy.concat(res));
          setErrorMessage(`Edit ${newName}`);
          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      }
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

      setErrorMessage(`Added ${newName}`);
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  }

  function handleDelete(id) {
    const searchResults = persons.filter((person) => {
      return person.id === Number(id);
    });
    const copy = persons.filter((person) => {
      return person.id !== Number(id);
    });
    if (window.confirm(`Delete ${searchResults[0].name}?`)) {
      personService
        .deletePerson(id)
        .then((res) => {
          setPersons(copy);
          setFilterList(copy);
          setErrorMessage(`Delete ${searchResults[0].name}`);
        })
        .catch((error) => {
          setState("error failed");
          setErrorMessage(`${searchResults[0].name} was already removed from server`);
          setPersons(copy);
          setFilterList(copy);
        });

      setTimeout(() => {
        setErrorMessage(null);
        setState("error");
      }, 5000);
    }
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
      <Notification message={errorMessage} state={state} />
      <Filter onFilter={handleFilter} name={filterName} />
      <h2>add a new</h2>
      <PersonsForm name={newName} number={newNumber} handleForm={handleForm} />
      <h2>Numbers</h2>
      <Persons persons={filterList} onDelete={(e) => handleDelete(e)} />
    </div>
  );
};

export default App;
