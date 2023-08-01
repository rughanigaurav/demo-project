import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setQuery, setAllField } from "../action/search-query";
import { setNumber } from "../action/number";
import { setApp } from "../action/app";
import RWireNumber from "../pages/rwire-number";
import { updateQueryCount } from "../action/history";
import { rwireSearchAPI, validationQuery } from "../action/rwire-search-api";

const Container = (props) => {
  return <RWireNumber {...props} />;
};

const mapStateToProps = ({ app, searchQuery, number }) => ({
  ...app,
  ...searchQuery,
  ...number,
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
      onSetNumber: setNumber,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
