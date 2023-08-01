import ChartFilterPopup from "./chart-filter-popup";

const FilterList = (props) => {
    const { isFilterOpen, onSetAnalyze, getResult, handleClearFilters } = props;


    const handleClick = () => {
        onSetAnalyze({ isFilterOpen: false })
    }

    return (
        <div>
            <div className={`analyze-filter-list cursor-pointer ${isFilterOpen ? "active" : ""}`} >
                <div className="card">
                    <div className="card-header" onClick={handleClick}>
                        Filter box
                    </div>
                    <div className="card-body">
                        <ChartFilterPopup {...props}
                            onGetResult={getResult} onHandleClearFilters={handleClearFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterList;
