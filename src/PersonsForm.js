const PersonsForm = (props) => {
  const handleForm = props.handleForm;
  return (
    <form>
      <div>
        name: <input onChange={handleForm.onSetName} value={props.newName} />
      </div>
      <div>
        number: <input onChange={handleForm.onSetNumber} value={props.newNumber} />
      </div>
      <div>
        <button onClick={handleForm.onSubmit}>add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
