import { useState } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";

const ClassesTable = (props) => {
  const {
    tableData = [],
    selectedItemList,
    selectedRows,
    onSetItemPerPage,
    onSetSelectedRows,
    onSetClassesSelector,
  } = props;

  const [fullDefinationText, setFullDefinationText] = useState(false);

  return (
    <div className={`table-wrapper normal-scroll-bar`}>
      <div className="table-inner">
        <TableHeader
          onSetFullDefinationText={setFullDefinationText}
          fullDefinationText={fullDefinationText}
        />
        <div className="body_wrapper">
          {!tableData.length ? (
            <div className="no-records-found">No Records found</div>
          ) : (
            tableData.map((item) => (
              <TableRow
                key={item._id}
                code={item._source.code}
                type={item._source.type}
                definition={item._source.definition}
                selectedRows={selectedRows}
                onSetSelectedRows={onSetSelectedRows}
                data={tableData}
                selectedItemList={selectedItemList}
                onSetItemPerPage={onSetItemPerPage}
                onSetClassesSelector={onSetClassesSelector}
                fullDefinationText={fullDefinationText}
                onSetFullDefinationText={setFullDefinationText}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesTable;
