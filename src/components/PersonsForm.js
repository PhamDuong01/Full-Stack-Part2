const PersonsForm = (props) => {
  const handleForm = props.handleForm;
  return (
    <form onSubmit={handleForm.onAddNew}>
      <div>
        name: <input onChange={handleForm.onSetName} value={props.name} />
      </div>
      <div>
        number: <input onChange={handleForm.onSetNumber} value={props.number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
