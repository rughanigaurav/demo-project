import RWireButton from "../rwire-ui/rwire-button/rwire-button";
import Pagination from "../rwire-ui/rwire-pagination";

const ActionButton = ({ onApply, onClear, isDisable }) => {
  return (
    <div className="model-footer-buttons">
      <RWireButton
        cNameDiv="search-query ps-3"
        buttonCName="input-button-text-form"
        name="Clear"
        onClick={() => onClear()}
      />
      <RWireButton
        cNameDiv="search-query ps-3"
        buttonCName={`input-button-text-form ${isDisable ? "disabled" : ""}`}
        name="Apply"
        onClick={onApply}
      />
    </div>
  );
};

const Actions = (props) => {
  const {
    onSetItemPerPage,
    onGetPagination,
    totalRecordsCount,
    itemsPerPage,
    page,
    onSetClassesModal,
    selectedRows,
    onSetApp,
    existingQuery,
    activeTab,
    onSetAllField,
    tabWiseSearchQuery,
    onSetPage,
    classesType,
    onClassesSearch,
    onSetClassesSelector,
  } = props;

  const handleApply = () => {
    const queryFields = classesType === "us" ? "usc" : classesType;
    const query =
      queryFields.toUpperCase() + "=(" + selectedRows.join(" OR ") + ")";
    const selectedClasses = existingQuery
      ? existingQuery + " OR " + query
      : query;
    onSetApp({ searchQuery: selectedClasses });

    onSetAllField({
      tabWiseSearchQuery: {
        ...tabWiseSearchQuery,
        [activeTab]: selectedClasses,
      },
    });
    onSetClassesModal({
      fromClasssSuggestor: true,
      isOpenClassesSuggestorModal: false,
    });
  };

  const handleClear = () => {
    onSetClassesSelector({
      selectedRows: [],
    });
  };

  const handleChange = (p) => {
    onSetClassesSelector({
      dataFrom: (parseInt(p) - 1) * 10,
    });
    onSetPage(p);
    onClassesSearch();
  };

  return (
    <div>
      <div className="pagination-action-buttons">
        <div className="pagination-block">
          <div className="container d-flex align-items-center justify-content-between">
            <Pagination
              {...props}
              onSetItemPerPage={onSetItemPerPage}
              onGetPagination={onGetPagination}
              total={totalRecordsCount ? totalRecordsCount : 0}
              itemsPerPage={itemsPerPage}
              page={page}
              onSetPage={handleChange}
              isResultFetch={false}
            />
            <ActionButton
              onSetClassesModal={onSetClassesModal}
              isDisable={selectedRows && selectedRows.length ? false : true}
              onApply={handleApply}
              onClear={handleClear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
