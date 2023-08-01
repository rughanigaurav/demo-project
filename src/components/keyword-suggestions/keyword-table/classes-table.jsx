import { useState } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import { uuidv4 } from "../../../action/app";

const KeywordTable = (props) => {
  const {
    tableData = [],
    selectedItemList,
    selectedRows,
    onSetItemPerPage,
    onSetSelectedRows,
    onSetKeywordSelector,
  } = props;

  const [fullDefinationText, setFullDefinationText] = useState(false);

  return (
    <div className={`table-wrapper normal-scroll-bar`}>
      <div className="table-inner mb-2">
        <TableHeader
          onSetFullDefinationText={setFullDefinationText}
          fullDefinationText={fullDefinationText}
          columnName={Object.keys(tableData)[0]}
        />
        <div className="body_wrapper">
          {Object.values(tableData).map((item) => {
            return !item.length ? (
              <div className="text-center p-2 fw-bold no-results-found">No Records found</div>
            ) : (
              item.map((i) => (
                <TableRow
                  key={uuidv4()}
                  item={i}
                  selectedRows={selectedRows}
                  onSetSelectedRows={onSetSelectedRows}
                  data={tableData}
                  selectedItemList={selectedItemList}
                  onSetItemPerPage={onSetItemPerPage}
                  onSetKeywordSelector={onSetKeywordSelector}
                  fullDefinationText={fullDefinationText}
                />
              ))
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KeywordTable;
