import React, { useState } from "react";
import TableHeader from "./table-header";
import HistoryRow from "./history-row";
import { uuidv4 } from "../../action/app";
import "./styles.scss";
import Pagination from "../rwire-ui/rwire-pagination";
import ActionButtons from "./action-buttons";

const History = (props) => {
  const {
    data,
    totalRecordsCount,
    itemsPerPage,
    page,
    onGetPagination,
    onSetItemPerPage,
    onSetPage,
    onDeleteHistory,
    onFetchHistory,
    onBookmarkHistory,
    selectedRows,
    onSetSelectedRows,
    onSetExportSelected,
    onSetApp,
    selectedItemList,
    onRwireSearchAPI,
    onExportHistory,
    onUpdateQueryCount,
    setSelectedField,
    selectedRowsForCombine
  } = props;

  const [editQuery, setEditQuery] = useState("");


  const handleChange = (p) => {
    onSetPage(p);
    onFetchHistory();
  };

  return (
    <div>
      <div className={`table-wrapper normal-scroll-bar`}>
        <div className="table-inner">
          <TableHeader selectedRows={selectedRows} onSetSelectedRows={onSetSelectedRows} data={data} onSetExportSelected={onSetExportSelected}
            selectedItemList={selectedItemList} onSetItemPerPage={onSetItemPerPage} selectedRowsForCombine={selectedRowsForCombine}/>

          <div className="body_wrapper">
            {data && data.map((item) => (
              <HistoryRow
                key={uuidv4()}
                isBookmark={item.isBookmark}
                id={item.id}
                numberOfHits={item.numberOfHits}
                userSearchNumber={item.userSearchNumber}
                query={item.query}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                onDeleteHistory={onDeleteHistory}
                onFetchHistory={onFetchHistory}
                selectedRows={selectedRows}
                onBookmarkHistory={onBookmarkHistory}
                onSetSelectedRows={onSetSelectedRows}
                onSetExportSelected={onSetExportSelected}
                selectedItemList={selectedItemList}
                onSetApp={onSetApp}
                onRwireSearchAPI={onRwireSearchAPI}
                editQuery={editQuery}
                setEditQuery={setEditQuery}
                // setEditQueryId={setEditQueryId}
                {...props}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pagination-action-buttons">
        <div className="pagination-block">
          <div className="container">
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
          </div>
        </div>
        <div className="action-buttons-block">
          <div className="container">
            <ActionButtons
              selectedRows={selectedRows}
              onFetchHistory={onFetchHistory}
              onUpdateQueryCount={onUpdateQueryCount}
              data={data}
              onExportHistory={onExportHistory}
              setSelectedField={setSelectedField}
            />
          </div>
        </div>
      </div>
      <div>
      </div>

    </div>
  )
}

export default History;
