import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FilterModal from "../components/common/patents-result-common/rwire-filter-modal";
import { setFilterFields } from "../action/result-table";
import { getFiltersOptions, rwireSearchAPI } from "../action/rwire-search-api";
const Container = (props) => {
  return <FilterModal {...props} />;
};

const mapStateToProps = ({
  resultTable: {
    filterList,
    openedFilterName,
    filterOptionsData,
    filtersSearchText,
    filtersSelected,
    clickedOnClear,
    isLoadingFilterData,
  },
  app: { searchQuery },
}) => ({
  filterList,
  openedFilterName,
  filterOptionsData,
  filtersSearchText,
  filtersSelected,
  clickedOnClear,
  searchQuery,
  isLoadingFilterData,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      onSetFilter: setFilterFields,
      onRwireSearchAPI: rwireSearchAPI,
      onGetFiltersOptions: getFiltersOptions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
