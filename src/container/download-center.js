import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RwireDownloadCenter from "../pages/rwire-download-center";
import {
  fetchDownloadCenterData,
  getPagination,
  setPage,
  deleteDownloadCenter,
  getDownloadCenterDetails,
  setDownloadCenter,
} from "../action/download-center";
import { exportMailRecord } from "../action/export";

const Container = (props) => {
  return <RwireDownloadCenter {...props} />;
};

const mapStateToProps = ({ downloadCenter }) => ({
  ...downloadCenter,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onGetPagination: getPagination,
      onSetPage: setPage,
      onSetItemPerPage: setDownloadCenter,
      onGetDownloadCenterDetails: getDownloadCenterDetails,
      onDeleteDownloadCenter: deleteDownloadCenter,
      onFetchDownloadCenterData: fetchDownloadCenterData,
      onExportMailRecord: exportMailRecord,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
