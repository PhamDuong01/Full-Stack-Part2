const Persons = (props) => {
  //   const persons = props.persons;
  return (
    <div>
      {props.persons.map((person) => {
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

export default Persons;
