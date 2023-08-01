import { connect } from "react-redux";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import {
  fetchHistory,
  getPagination,
  setHistory,
  setPage,
  deleteHistory,
  bookmarkHistory,
  exportHistory,
  setSelectedRows,
  updateQueryCount,
} from "../action/history";
import QueryHistory from "../pages/rwire-history";
import { setApp } from "../action/patentAndPublication";
import { setAllField, setQuery } from "../action/search-query";

import { rwireSearchAPI, validationQuery, inputValidationQuery } from "../action/rwire-search-api";
import { setClassesModal } from "../action/classes-suggestor";

const Container = (props) => {
  const handleFetchHistory = async () => {
    await props.onFetchHistory();
  };

  useEffect(() => {
    handleFetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <QueryHistory {...props} />;
};

const mapStateToProps = ({ historyTable, searchQuery, app, classesSuggestor: { fromClasssSuggestor } }) => ({
  ...historyTable,
  ...app,
  ...searchQuery,
  fromClasssSuggestor
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onFetchHistory: fetchHistory,
      onGetPagination: getPagination,
      onSetItemPerPage: setHistory,
      onSetPage: setPage,
      onDeleteHistory: deleteHistory,
      onBookmarkHistory: bookmarkHistory,
      onSetApp: setApp,
      onExportHistory: exportHistory,
      onSetSelectedRows: setSelectedRows,
      onSetExportSelected: setHistory,
      onUpdateQueryCount: updateQueryCount,
      onRwireSearchAPI: rwireSearchAPI,
      validationQuery: validationQuery,
      onSetAllField: setAllField,
      onSetQuery: setQuery,
      inputValidationQuery: inputValidationQuery,
      onSetClassSuggestor: setClassesModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
