import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ResultTable from "../components/common/patents-result-common/rwire-patents-table";
import { rwireSearchAPI } from "../action/rwire-search-api";
import {
  setDetails,
  setFilterFields,
  setSelectedRows,
  updateColumnWidth,
} from "../action/result-table";
import { searchForClassAndKeyword } from "../action/patent-view";
const mapStateToProps = ({ resultTable, app: { isLoadingTable } }) => ({
  ...resultTable,
  isLoadingTable,
  highlightword: [
    ...resultTable.esHighlightwords,
    ...resultTable.highlightword,
  ],
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      onSetResultTable: setDetails,
      onRwireSearchAPI: rwireSearchAPI,
      onSetFilter: setFilterFields,
      onSetSelectedRows: setSelectedRows,
      onSearchForClassAndKeyword: searchForClassAndKeyword,
      onUpdateColumnWidth: (header, width) =>
        dispatch(updateColumnWidth(header, width)),
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
