import { useState } from "react";

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

  function handleSetNewName(e) {
    setNewName(e.target.value);
  }
  function handleSetNewNumber(e) {
    setNewNumber(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilter} value={filterName} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input onChange={handleSetNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleSetNewNumber} value={newNumber} />
        </div>
        <div>
          <button onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterList.map((person) => {
        return (
          <div key={person.name}>
            <p>
              {person.name} {person.number}{" "}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
