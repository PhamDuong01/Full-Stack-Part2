const Filter = (props) => {
  const onFilter = props.onFilter;
  return (
    <div>
      filter shown with <input onChange={onFilter} value={props.name} />
    </div>
  );
};

export default Filter;
