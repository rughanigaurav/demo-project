import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RWireSearchLoader from "../components/common/search-loader";

const Container = (props) => {
  return <RWireSearchLoader {...props} />;
};

const mapStateToProps = ({ resultTable: { isLoadingResult } }) => ({
  isLoadingResult,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Container);
