import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "rsuite";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";

const QuickViewFooter = (props) => {
  const {
    onRwireSearch,
    onSetResultTable,
    totalRecordsCount,
    dataSize,
    setExportToggle,
    selectedRows,
    exportToggle,
    activePages,
  } = props;

  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const handleSetPageSize = (value) => {
    onSetResultTable({ dataSize: value });
    onRwireSearch().then((data) => {
      if (data) {
        navigate("/en/quick-view");
      } else {
        // eslint-disable-next-line no-console
        console.log("Error:", props.error);
      }
    });
    setPageSize(value);
  };
  const [prev] = useState(true);
  const [next] = useState(true);
  const [first] = useState(true);
  const [last] = useState(true);
  const [ellipsis] = useState(true);
  const [boundaryLinks] = useState(true);
  const [size] = useState("xs");
  const [maxButtons] = useState(4);
  const [layout] = useState(["pager"]);
  const [selectedRecords, setSelectedRecords] = useState(
    totalRecordsCount && totalRecordsCount
  );

  const handleChangePage = (e) => {
    onSetResultTable({
      dataFrom: (parseInt(e) - 1) * dataSize,
      activePages: e,
    });
    onRwireSearch().then((data) => {
      if (data) {
        navigate("/en/quick-view");
      } else {
        // eslint-disable-next-line no-console
        console.log("Error:", props.error);
      }
    });
  };

  const handleClick = () => {
    setExportToggle(!exportToggle);
  };

  useEffect(() => {
    setSelectedRecords(
      selectedRows.length > 0 ? selectedRows.length : totalRecordsCount
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows.length, totalRecordsCount]);

  return (
    <>
      <div className="d-flex">
        <div className="result-page">
          <span className="filter-font ps-3">Results / page</span>
          <select
            value={pageSize}
            onChange={(e) => {
              handleSetPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <Pagination
          layout={layout}
          size={size}
          prev={prev}
          next={next}
          first={first}
          last={last}
          ellipsis={ellipsis}
          boundaryLinks={boundaryLinks}
          total={totalRecordsCount}
          limit={pageSize}
          maxButtons={maxButtons}
          activePage={activePages}
          onChangePage={handleChangePage}
        />
      </div>
      <div className="d-flex">
        <div className="selected-count">
          {selectedRecords} / {totalRecordsCount} Selected{" "}
        </div>
        <div className="inside-highlight-result-page">
          <RWireButton
            cNameDiv={`search-query ${
              totalRecordsCount === 0 ? "button-disabled" : ""
            }`}
            buttonCName="input-button-text-form export-button"
            name="Export"
            buttonImg={RWIRE_IMAGES.RwireExportIcon}
            onClick={handleClick}
            disabled={totalRecordsCount === 0}
          />
          <Link to={`${totalRecordsCount === 0 ? "" : "/en/cognizance"}`}>
            <RWireButton
              cNameDiv={`search-query ${
                totalRecordsCount === 0 ? "button-disabled" : ""
              }`}
              buttonCName="input-button-text-form chart-btn"
              name="Insights"
              buttonImg={RWIRE_IMAGES.RwireInsideIcon}
              disabled={totalRecordsCount === 0}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuickViewFooter;
