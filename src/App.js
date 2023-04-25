import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const copy = [...persons];
    copy.push({ name: newName, number: newNumber });
    setPersons(copy);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          number: <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
        </div>
        <div>
          <button onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
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
