const TableRow = ({
  item,
  selectedRows = [],
  onSetKeywordSelector,
}) => {
  let selectedId = [];
  const handleCheckbox = (e) => {
    selectedId = [...selectedRows, item];
    if (!e.target.checked) {
      selectedId = selectedId.filter((i) => {
        return `${i}` !== `${item}`;
      });
    }
    onSetKeywordSelector({
      selectedRows: selectedId,
    });
  };

  return (
    <div className="table-row">
      <div className="table-column regular-checkbox form-check regular-checkbox">
        <input
          className={`form-check-input cursor-pointer`}
          type="checkbox"
          defaultChecked={selectedRows.includes(item)}
          value={`${item}`}
          checked={selectedRows.includes(item)}
          onChange={handleCheckbox}
        />
      </div>
      <div className="table-column definition text-start">{item}</div>
    </div>
  );
};

export default TableRow;
