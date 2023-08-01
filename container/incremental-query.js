import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getPagination,
  setPage,
  setSelectedRows,
  setIncremental,
  fetchIncrementalQueryDetails
} from "../action/incremental-query";
import IncrementalQuery from "../components/incremental-query";
import { setApp } from "../action/patentAndPublication";

const Container = (props) => {
  return (
    <IncrementalQuery {...props} />
  )
}

const mapStateToProps = ({
  incrementalQuery
}) => ({
  ...incrementalQuery
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onGetPagination: getPagination,
      onSetPage: setPage,
      onSetApp: setApp,
      onSetSelectedRows: setSelectedRows,
      onSetItemPerPage: setIncremental,
      onFetchIncrementalQueryDetails: fetchIncrementalQueryDetails,
      onSetIncremental: setIncremental
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Container);
