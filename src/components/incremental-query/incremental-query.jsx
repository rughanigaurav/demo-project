import React from "react";
import ContentEditable from "../../components/common/content-editable";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import { uuidv4 } from "../../action/app";
import Pagination from "../rwire-ui/rwire-pagination";
import { useTranslation } from "react-i18next";
import RWireButton from "../rwire-ui/rwire-button/rwire-button";
import { useEffect } from "react";
let count = 1;
const IncrementalQuery = (props) => {
  const { t } = useTranslation();
  const {
    onCloseModal,
    data,
    onSetSelectedRows,
    selectedRows,
    onSetItemPerPage,
    onGetPagination,
    totalRecordsCount,
    itemsPerPage,
    onSetPage,
    page,
    onFetchIncrementalQueryDetails,
    onQueryChange,
    onSetIncremental,
    modalQuery,
  } = props;
  const handleChange = (p) => {
    onSetPage(p);
    onFetchIncrementalQueryDetails();
  };

  let newDisplayValue = [];
  modalQuery && modalQuery.map((item) => newDisplayValue.push(item.query));
  const handleApply = () => {
    onSetIncremental({ displayQueryIncremental: modalQuery });
    onCloseModal(false);
  };

  useEffect(() => {
    if (count < 4) {
      const selectedId = modalQuery[0] && modalQuery[0].id;
      onSetSelectedRows({ selectedRows: [selectedId] });
      count++;
    }
  });
  const value = `(${newDisplayValue.join(" OR ")})`;
  return (
    <div className="history-details">
      <div className="close-modal" onClick={() => onCloseModal(false)}>x</div>
      <div className="query_modal">
        <div className="query_heading">Previous Query</div>
        <ContentEditable
          value={value}
          height="50px"
          width="100%"
          onChange={() => {}}
          isReadOnly={true}
        />
        <div className="query_string">{}</div>
      </div>
      <div className="history_heading">
        Select to Insert from search history
      </div>
      <div className="px-3">
        <div className="table-inner">
          <TableHeader />
          <div className="body_wrapper">
            {data &&
              data.map((item) => (
                <TableRow
                  key={uuidv4()}
                  isBookmark={item.isBookmark}
                  id={item.id}
                  numberOfHits={item.numberOfHits}
                  userSearchNumber={item.userSearchNumber}
                  query={item.query}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  selectedRows={selectedRows}
                  onQueryChange={onQueryChange}
                  modalQuery={modalQuery}
                  onSetIncremental={onSetIncremental}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="pagination-action-buttons">
        <div className="pagination-block">
          <div className="container d-flex align-items-center justify-content-between">
            <Pagination
              {...props}
              onSetItemPerPage={onSetItemPerPage}
              onGetPagination={onGetPagination}
              total={totalRecordsCount ? totalRecordsCount : 0}
              itemsPerPage={itemsPerPage}
              page={page}
              onSetPage={handleChange}
              isResultFetch={false}
            />
            <RWireButton
              cNameDiv="search-query"
              buttonCName="input-button-text-form"
              name={t("incremental-apply")}
              onClick={handleApply}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncrementalQuery;
