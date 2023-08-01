import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RwireFooterButton from "../components/rwire-footer-button";
import {
  setClassesModal
} from "../action/classes-suggestor";
import {
  setKeyword
} from "../action/keyword-suggestor";

const Container = (props) => {
  return <RwireFooterButton {...props} />
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetClassesModal: setClassesModal,
      onSetKeywordModal: setKeyword
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
