import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RwireExport from "../pages/rwire-export";
import {
  setSelectedField,
  setSortedRecords,
  exportMailRecord,
  setExport
} from "../action/export";

const Container = (props) => {

  return <RwireExport {...props} />;
};

const mapStateToProps = ({
  exportField,
  resultTable: { totalRecordsCount, selectedRows }
}) => ({
  totalRecordsCount,
  selectedRows,
  ...exportField,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetSelectedField: setSelectedField,
      onSetSortedRecords: setSortedRecords,
      onExportMailRecord: exportMailRecord,
      onSetExport: setExport
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
