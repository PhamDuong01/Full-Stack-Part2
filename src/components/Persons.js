const Persons = (props) => {
  //   const persons = props.persons;

  return (
    <div>
      {props.persons.map((person) => {
        return (
          <div key={person.name}>
            <p>
              {person.name} {person.number}{" "}
              <button
                onClick={(e) => {
                  props.onDelete(e.target.dataset.id);
                }}
                data-id={person.id}
              >
                delete
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
