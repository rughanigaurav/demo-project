import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAllField } from "../action/search-query";
import RwireSearch from "../pages/rwire-search";
import { setApp } from "../action/app";
import { rwireSearchAPI, resetDetails } from "../action/rwire-search-api";

const Container = (props) => {
  return <RwireSearch {...props} />;
};

const mapStateToProps = ({
  app,
  resultTable,
  searchQuery: { tabWiseSearchQuery },
}) => ({
  ...app,
  ...resultTable,
  tabWiseSearchQuery,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetApp: setApp,
      onRwireSearchAPI: rwireSearchAPI,
      resetDetails: resetDetails,
      onSetAllField: setAllField,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
