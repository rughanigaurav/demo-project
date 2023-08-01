import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setLogin, setSubmit } from "../action/login";
import RwireLogin from "../pages/rwire-login";


const Container = (props) => {

  return <RwireLogin {...props} />;
};


const mapStateToProps = ({ app, login }) => ({
  ...app,
  ...login
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSubmit: setSubmit,
      onSetLogin: setLogin,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
