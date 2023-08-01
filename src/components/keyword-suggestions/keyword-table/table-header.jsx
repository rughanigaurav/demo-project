const TableHeader = ({ columnName }) => {
  return (
    <div className="header_wrapper table-row rwire-tableheader">
      <div className="form-check regular-checkbox table-column" />
      <div className="table-column definition justify-content-center">
        <div>Synonyms of "{columnName}"</div>
      </div>{" "}
    </div>
  );
};

export default TableHeader;
