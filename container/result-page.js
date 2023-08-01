import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Modal } from "rsuite";
import ResultPage from "../pages/rwire-search-result";
import RWireFielded from "./search-query";
import { setFilterFields } from "../action/result-table";
import { sortDropdown } from "../action/result-table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setApp } from "../action/app";
import { setQuery, setAllField } from "../action/search-query";
import {
  fetchIncrementalQueryDetails,
  setIncremental,
} from "../action/incremental-query";
import { setDetails } from "../action/result-table";
import {
  inputValidationQuery,
  getFiltersOptions,
  rwireSearchAPI,
  validationQuery,
  setResultTable,
} from "../action/rwire-search-api";

const Container = (props) => {
  const navigate = useNavigate();
  const {
    isEditModalOpen,
    onSetApp,
    onSetAllField,
    isActiveEditModal,
    searchQuery,
    searchedVisibleQuery,
  } = props;

  const handleClick = () => {
    onSetApp({
      isEditModalOpen: !isEditModalOpen,
      isActiveEditModal: !isActiveEditModal,
    });
    onSetAllField({ syntaxqueryError: "", syntaxqueryCorrect: "" });
  };
  useEffect(() => {
    if (searchQuery === "" && searchedVisibleQuery === "") {
      navigate("/en");
    } else if (searchQuery === "" && searchedVisibleQuery !== "") {
      onSetApp({ searchQuery: searchedVisibleQuery });
    }
  });

  return (
    <>
      {searchedVisibleQuery !== "" ? (
        <div>
          <ResultPage {...props} onEditModalClick={handleClick} />
          {isEditModalOpen && (
            <Modal
              className="modal-class edit-field-modal"
              size="full"
              backdrop="true"
              keyboard={false}
              open={true}
              onClose={() => handleClick()}
            >
              <Modal.Body>
                <RWireFielded
                  fromSearchPage={true}
                  onCloseModal={handleClick}
                  isUpdateModal={true}
                />
              </Modal.Body>
            </Modal>
          )}
        </div>
      ) : (
        navigate("/en")
      )}
    </>
  );
};

const mapStateToProps = ({
  resultTable,
  app,
  searchQuery,
  incrementalQuery: {
    data,
    lastQueryString,
    displayQueryIncremental,
    mpdalQuery,
  },
}) => ({
  ...resultTable,
  ...app,
  ...searchQuery,
  historyData: data,
  lastQueryString,
  displayQueryIncremental,
  mpdalQuery,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      onSortDropdown: sortDropdown,
      onSetFilter: setFilterFields,
      onRwireSearchAPI: rwireSearchAPI,
      onSetApp: setApp,
      validationQuery: validationQuery,
      onSetQuery: setQuery,
      onSetDetails: setDetails,
      onFetchIncrementalQueryDetails: fetchIncrementalQueryDetails,
      onSetIncremental: setIncremental,
      onSetAllField: setAllField,
      onSetResultTable: setResultTable,
      onGetFiltersOptions: getFiltersOptions,
      inputValidationQuery: inputValidationQuery,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
