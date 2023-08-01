import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setForgot, setSubmitForgot } from "../action/forgot";
import RwireForgot from "../pages/rwire-forgot";


const Container = (props) => {

  return <RwireForgot {...props} />;
};


const mapStateToProps = ({ app, forgot }) => ({
  ...app,
  ...forgot

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSubmitForgot: setSubmitForgot,
      onSetForgot: setForgot,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
