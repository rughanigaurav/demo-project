import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import KeywordSuggestions from "../../components/keyword-suggestions";
import { setApp } from "../../action/patentAndPublication";
import {
  setKeyword, search,
  setSelectedRows,
} from "../../action/keyword-suggestor";
import { setClassesModal } from "../../action/classes-suggestor";
import { setAllField } from "../../action/search-query";

const Container = (props) => {
  return <KeywordSuggestions {...props} />
};

const mapStateToProps = ({
  keywordSuggestor,
  searchQuery,
  app: {
    searchQuery: existingQuery,
    activeTab,
  },
}) => ({
  ...keywordSuggestor,
  existingQuery,
  activeTab,
  ...searchQuery
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetKeywordModal: setKeyword,
      onSearch: search,
      onSetApp: setApp,
      onSetSelectedRows: setSelectedRows,
      onSetKeywordSelector: setKeyword,
      onSetAllField: setAllField,
      onSetClassesModal: setClassesModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
