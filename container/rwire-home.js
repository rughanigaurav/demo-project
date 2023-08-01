import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setApp } from "../action/app";
import { setQuery } from "../action/search-query";
import { setClassesModal } from "../action/classes-suggestor";
import RwireHome from "../pages/rwire-home";


const Container = (props) => {
  return <RwireHome {...props} />;
};

const mapStateToProps = ({ app }) => ({
  ...app
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetApp: setApp,
      onSetQuery: setQuery,
      onSetClassesModal: setClassesModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
