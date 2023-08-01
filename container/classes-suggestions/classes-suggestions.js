import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ClassesSuggestions from "../../components/classes-suggestions";
import { setApp } from "../../action/patentAndPublication";
import {
  setClassesModal, searchForClassAndKeyword,
  getPagination,
  setPage,
  setSelectedRows,
} from "../../action/classes-suggestor";
import { setAllField } from "../../action/search-query";

const Container = (props) => {
  return <ClassesSuggestions {...props} />
};

const mapStateToProps = ({
  classesSuggestor,
  searchQuery,
  app: {
    searchQuery: existingQuery,
    activeTab,
  },
}) => ({
  ...classesSuggestor,
  existingQuery,
  activeTab,
  ...searchQuery
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetClassesModal: setClassesModal,
      onClassesSearch: searchForClassAndKeyword,
      onGetPagination: getPagination,
      onSetPage: setPage,
      onSetApp: setApp,
      onSetSelectedRows: setSelectedRows,
      onSetItemPerPage: setClassesModal,
      onSetClassesSelector: setClassesModal,
      onSetAllField: setAllField,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
