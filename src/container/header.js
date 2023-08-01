import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setQuery, setAllField } from "../action/search-query";
import { deleteUserAnnotations, setApp } from "../action/app";
import RWireHeader from "../components/rwire-ui/rwire-header";
import { rwireSearchAPI, validationQuery } from "../action/rwire-search-api";
import { setFullView } from "../action/patent-view";

const Container = (props) => {
  return <RWireHeader {...props} />;
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
      setAllField: setAllField,
      onSetFullView: setFullView,
      onDeleteUserAnnotations: deleteUserAnnotations,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
