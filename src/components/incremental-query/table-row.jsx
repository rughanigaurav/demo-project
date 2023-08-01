const TableRow = (props) => {
  const {
    isBookmark,
    id,
    numberOfHits,
    query,
    selectedRows = [],
    userSearchNumber,
    onSetIncremental,
    modalQuery,
  } = props;

  let selectedId = [];
  let newDisplayValue = [...modalQuery];

  const handleCheckbox = (e) => {
    const val = e.target.value.split("__");
    selectedId = [...selectedRows, id];
    if (!e.target.checked) {
      selectedId = selectedId.filter((item) => {
        return `${item}` !== `${id}`;
      });
      newDisplayValue = modalQuery.filter((i) => `${i.id}` !== `${val[0]}`);
    } else {
      newDisplayValue.push({ id: parseInt(val[0]), query: val[1] });
    }
    onSetIncremental({
      selectedRows: selectedId,
      modalQuery: [...newDisplayValue]
    });
  };
  return (
    <div className={`table-row ${isBookmark ? "active" : ""}`}>
      <div className="table-column regular-checkbox form-check regular-checkbox">
        <input
          className={`form-check-input cursor-pointer`}
          key={id}
          id={id}
          type="checkbox"
          defaultChecked={selectedRows.includes(id)}
          value={`${id}__${query}`}
          checked={selectedRows.includes(id)}
          onChange={handleCheckbox}
        />
      </div>
      <div className="table-column  numbers">{userSearchNumber}</div>
      <div className="table-column  records">{numberOfHits}</div>
      <div className="table-column  search-query query-column" title={query}>
        {query}
      </div>
    </div>
  );
};

export default TableRow;
