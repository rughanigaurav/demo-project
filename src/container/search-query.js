import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setQuery, setAllField } from "../action/search-query";
import RWireFielded from "../components/rwire-todo-list/rwire-fielded";
import { setApp } from "../action/app";

import { rwireSearchAPI, validationQuery, inputValidationQuery } from "../action/rwire-search-api";
import { setClassesModal } from "../action/classes-suggestor";

const Container = (props) => {
  return <RWireFielded {...props} />;
};

const mapStateToProps = ({ app, searchQuery, classesSuggestor: { fromClasssSuggestor } }) => ({
  ...app,
  ...searchQuery,
  fromClasssSuggestor
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetQuery: setQuery,
      onSetApp: setApp,
      onRwireSearchAPI: rwireSearchAPI,
      validationQuery: validationQuery,
      onSetAllField: setAllField,
      inputValidationQuery: inputValidationQuery,
      onSetClassSuggestor: setClassesModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
