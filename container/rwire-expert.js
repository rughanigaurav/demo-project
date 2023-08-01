import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setApp } from "../action/app";
import { setQuery, setAllField } from "../action/search-query";
import RWireExpert from "../pages/rwire-expert";
import { updateQueryCount } from "../action/history";
import { rwireSearchAPI, validationQuery } from "../action/rwire-search-api";

const Container = (props) => {
  return <RWireExpert {...props} />;
};

const mapStateToProps = ({ app, searchQuery }) => ({
  ...app,
  ...searchQuery,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetQuery: setQuery,
      onSetApp: setApp,
      onRwireSearchAPI: rwireSearchAPI,
      validationQuery: validationQuery,
      onUpdateQueryCount: updateQueryCount,
      onSetAllField: setAllField,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
