import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RwireHighlightIcon from "../pages/rwire-patent-view/rwire-highlight-icon";
import { setDetails, setFilterFields } from "../action/result-table";
const mapStateToProps = ({
  resultTable: {
    queryKeywordsHighlightColor,
    totalHighlightedWords,
    highlightword,
    isExact
  }
 }) => ({
  totalHighlightedWords,
  queryKeywordsHighlightColor,
  highlightword,
  isExact
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      onSetDetails: setDetails,
      onSetFilter: setFilterFields
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RwireHighlightIcon);
