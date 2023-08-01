import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setApp } from "../action/app";
import InactiveScreen from "../pages/rwire-inactive-screen/InactiveScreen";

const Container = (props) => {

  return <InactiveScreen {...props} />
};

const mapStateToProps = ({app: { isInActiveUser }}) => ({
  isInActiveUser
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetApp: setApp
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
