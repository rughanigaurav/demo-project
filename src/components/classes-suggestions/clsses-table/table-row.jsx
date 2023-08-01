const TableRow = ({
  code,
  definition,
  selectedRows = [],
  onSetClassesSelector,
  fullDefinationText,
  onSetFullDefinationText
}) => {
  let selectedId = [];

  const handleCheckbox = (e) => {
    const selectedCode = code[0];
    selectedId = [...selectedRows, selectedCode];
    if (!e.target.checked) {
      selectedId = selectedId.filter((item) => {
        return `${item}` !== `${selectedCode}`;
      });
    }
    onSetClassesSelector({
      selectedRows: selectedId,
    });
  };

  const handleExpand = () => {
    if (!fullDefinationText) {
      onSetFullDefinationText(!fullDefinationText)
    }
  }

  return (
    <div className="table-row">
      <div className="table-column regular-checkbox form-check regular-checkbox">
        <input
          className={`form-check-input cursor-pointer`}
          type="checkbox"
          defaultChecked={selectedRows.includes(code[0])}
          value={`${code[0]}`}
          checked={selectedRows.includes(code[0])}
          onChange={handleCheckbox}
        />
      </div>
      <div className="table-column class">{code.join(", ")}</div>
      <div className="table-column definition text-start">
        <div
          className={`${
            !fullDefinationText ? "text-truncate text-reverse" : ""
          }`}
          onClick={handleExpand}
          title={fullDefinationText}
          >
          {fullDefinationText ? definition : definition.split("").reverse().join("")}
        </div>
      </div>
    </div>
  );
};

export default TableRow;
