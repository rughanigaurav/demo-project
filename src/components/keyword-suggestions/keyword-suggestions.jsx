import { Modal } from "rsuite";
import KeywordTable from "./keyword-table";
import KeywordForm from "./keyword-form";

import "./keyword-suggestions.scss";
import KeywordAction from "./action-button";
import { uuidv4 } from "../../action/app";
import { useState } from "react";

const KeywordSuggestions = (props) => {
  const {
    isOpenKeywordSuggestorModal,
    onSetKeywordModal,
    onSearch,
    tableData = [],
    selectedRows,
    onSetSelectedRows,
    onSetKeywordSelector,
    existingQuery,
    onSetApp,
    onSetAllField,
    tabWiseSearchQuery,
    activeTab,
    onSetClassesModal,
  } = props;

  const [queryField, setQueryField] = useState({
    title: "Title",
    code: "TI",
  });

  const handleApply = () => {
    const query = queryField.code + "=(" + selectedRows.join(" OR ") + ")";
    const selectedKeywords = existingQuery
      ? existingQuery + " OR " + query
      : query;
    onSetApp({ searchQuery: selectedKeywords });

    onSetAllField({
      tabWiseSearchQuery: {
        ...tabWiseSearchQuery,
        [activeTab]: selectedKeywords,
      },
    });
    onSetClassesModal({
      fromClasssSuggestor: true,
    });
    onSetKeywordModal({
      isOpenKeywordSuggestorModal: false,
      selectedRows: [],
      tableData: [],
    });
  };

  const handleClear = () => {
    onSetKeywordModal({
      selectedRows: [],
    });
  };

  return (
    <Modal
      className="modalClassFilter keyword-suggestor-modal"
      static="static"
      keyboard={false}
      open={isOpenKeywordSuggestorModal}
      onClose={() =>
        onSetKeywordModal({ isOpenKeywordSuggestorModal: false, tableData: [] })
      }>
      <div className="modal-title">
        <p className="modal-title-heading">Keyword Suggestions</p>
        <p
          className="modal-title-heading"
          onClick={() =>
            onSetKeywordModal({
              isOpenKeywordSuggestorModal: false,
              tableData: [],
            })
          }>
          X
        </p>
      </div>
      <div className="classes-suggestor-modal__wrapper">
        <KeywordForm
          onSearch={onSearch}
          onSetQueryField={setQueryField}
          queryField={queryField}
        />
        <div className="search_reault_wrapper">
          {!tableData.length ? (
            <div className="no-records-found">No Records found</div>
          ) : (
            tableData.map((item) => (
              <KeywordTable
                key={uuidv4()}
                tableData={item}
                selectedRows={selectedRows}
                onSetSelectedRows={onSetSelectedRows}
                onSetKeywordSelector={onSetKeywordSelector}
              />
            ))
          )}
        </div>
        <KeywordAction
          isDisable={selectedRows.length ? false : true}
          onClear={handleClear}
          onApply={handleApply}
        />
      </div>
    </Modal>
  );
};

export default KeywordSuggestions;
