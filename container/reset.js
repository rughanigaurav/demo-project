import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setReset, setSubmitReset, checkResetToken } from "../action/forgot";
import RwireReset from "../pages/rwire-forgot/reset";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const Container = (props) => {
  const { token } = useParams();

  useEffect(() => {
    props.onCheckResetToken(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RwireReset {...props} />;
};


const mapStateToProps = ({ app, reset }) => ({
  ...app,
  ...reset

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSubmitReset: setSubmitReset,
      onSetReset: setReset,
      onCheckResetToken: checkResetToken
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
