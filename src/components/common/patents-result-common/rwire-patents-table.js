/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Pagination } from "rsuite";
import { useTranslation } from "react-i18next";
import RwirePatentInfo from "./rwire-patentinfo";
import { getImagePathFromPN } from "../../../common/images-functions";
import RwireAbstract from "./rwire-abstract";
import RwireClaims from "./rwire-claims";
import RwireTableTdComponent from "./rwire-table-td";
import RwireJumpPages from "./rwire-jump-pages";
import { throttle } from "../../../common/utils.js";

export default function Table(props) {
  const {
    highlightword,
    onRwireSearchAPI,
    columns,
    data,
    onSetResultTable,
    displayData,
    totalRecordsCount,
    dataSize,
    patentReamainingList,
    onSetFilter,
    setExportToggle,
    onSetSelectedRows,
    selectedRows,
    isRetreiveSelectedAll,
    isArrow,
    exportToggle,
    activePages,
    isExact,
    queryKeywordsHighlightColor,
    isImageCarouselModalOpen,
    setIsImageCarouselModalOpen,
    imagePath,
    setImagePath,
    onHandleHighlightElastic,
    isLoadingResult,
    isLoadingTable,
    onUpdateColumnWidth,
    columnWidths,
    handleJumpPage,
    jumpPage,
  } = props;
  const { t } = useTranslation();
  const uniqueHighlightword = [...new Set(highlightword)];

  useEffect(() => {
    onHandleHighlightElastic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayData]);

  const navigate = useNavigate();

  const onSetPatentLink = (e) => {
    const id = e.currentTarget.id;
    onSetFilter({ isViewPageModalOpen: false, isSmartReaderOpen: false });
    sessionStorage.setItem("patentId", id);
    navigate(`/en/patent-view`);
  };

  const handleSetPageSize = (value) => {
    onSetResultTable({ dataSize: value });
    onRwireSearchAPI().then((data) => {
      if (data) {
        navigate("/en/rwire-patents");
      } else {
        // eslint-disable-next-line no-console
        console.log("Error:", props.error);
      }
    });
  };
  const [prev] = useState(true);
  const [next] = useState(true);
  const [first] = useState(true);
  const [last] = useState(true);
  const [ellipsis] = useState(true);
  const [boundaryLinks] = useState(true);

  const [size] = useState("xs");
  const [maxButtons] = useState(5);
  const [layout] = useState(["pager"]);
  const [isChecked, setIsChecked] = useState();
  const [selectedRecords, setSelectedRecords] = useState(
    totalRecordsCount && totalRecordsCount
  );
  const [isShown, setIsShown] = useState(false);

  const handleChangePage = (e) => {
    onSetResultTable({
      dataFrom: (parseInt(e) - 1) * dataSize,
      activePages: e,
    });
    onRwireSearchAPI().then((data) => {
      if (data) {
        navigate("/en/rwire-patents");
      } else {
        // eslint-disable-next-line no-console
        console.log("Error:", props.error);
      }
    });
  };

  const handleClick = () => {
    setExportToggle(!exportToggle);
  };

  const selectAllChange = (event) => {
    let selectIds = [];
    // eslint-disable-next-line array-callback-return
    displayData.map((i) => {
      selectIds.push(i._id);
    });

    if (event.target.checked) {
      setIsChecked(true);
      onSetSelectedRows({ selectedRows: selectIds });
    } else {
      setIsChecked(false);
      const difference = selectedRows.filter((x) => !selectIds.includes(x));

      onSetSelectedRows({ selectedRows: difference });
    }
  };

  const handleChange = (e) => {
    let selectedId = [];
    selectedId = [...selectedRows, e.target.value];
    if (!e.target.checked) {
      selectedId = selectedId.filter((item) => {
        return item !== e.target.value;
      });
    }
    onSetSelectedRows({ selectedRows: selectedId });
  };

  useEffect(() => {
    setSelectedRecords(
      selectedRows.length > 0 ? selectedRows.length : totalRecordsCount
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows.length, totalRecordsCount]);

  // Render the UI for your table

  const handleOpenImagecarousel = (path) => {
    setIsImageCarouselModalOpen(!isImageCarouselModalOpen);
    setImagePath(path);
  };

  const getElementWidth = () => {
    const wrapperElem = document.getElementById("patent-details-table-wrapper");
    const tableElem = document.getElementById("patent-details-table");

    const scrollbarElem = document.getElementById("scrollbar");
    const innerScrollElem = document.getElementById("inner-scroll");
    let wrapperWidth,
      tableWidth = 0;
    wrapperWidth = wrapperElem && wrapperElem.getBoundingClientRect().width;
    tableWidth = tableElem && tableElem.getBoundingClientRect().width;

    scrollbarElem.setAttribute("style", `width: ${wrapperWidth - 10}px`);
    innerScrollElem.setAttribute("style", `width: ${tableWidth - 10}px`);
  };

  const handleScroll = (scrollId, tableId) => {
    const rect = document.getElementById(scrollId).scrollLeft;
    document.getElementById(tableId).scrollLeft = rect;
  };

  useEffect(() => {
    window.addEventListener("resize", getElementWidth);
    return () => {
      window.removeEventListener("resize", getElementWidth);
    };
  });
  setTimeout(() => {
    getElementWidth();
  }, 200);

  const handleMouseDown = (e, header, columnWidth, onResize) => {
    if (e.target.classList.contains("resize-handle")) return;
    e.preventDefault();
    const startX = e.clientX;
    const currentWidth = columnWidth;

    document.body.style.cursor = "col-resize";

    const onMouseMove = throttle((e) => {
      const newWidth = currentWidth + (e.clientX - startX);
      if (Math.abs(newWidth - currentWidth) >= 5) {
        onResize(header, newWidth);
      }
    }, 5);

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "auto";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleTouchStart = (e, header, columnWidth, onResize) => {
    if (e.target.classList.contains("resize-handle")) return;
    e.preventDefault();
    const touch = e.touches[0];
    const startX = touch.clientX;
    const currentWidth = columnWidth;

    document.body.style.cursor = "col-resize";

    const onTouchMove = throttle((e) => {
      const touch = e.touches[0];
      const newWidth = currentWidth + (touch.clientX - startX);
      if (Math.abs(newWidth - currentWidth) >= 5) {
        onResize(header, newWidth);
      }
    }, 5);

    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.body.style.cursor = "auto";
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  const onResize = (header, newWidth) => {
    document.body.style.cursor = "col-resize";
    const updatedColumnWidths = {
      ...columnWidths,
      [header]: newWidth,
    };
    onUpdateColumnWidth(header, newWidth);
  };

  return (
    <>
      <div
        id="patent-details-table-wrapper"
        onScroll={() =>
          handleScroll("patent-details-table-wrapper", "scrollbar")
        }
        className={`result-page-table  ${
          isArrow ? "full-height" : "partial-height"
        }`}
      >
        <table className="table table-striped" id="patent-details-table">
          <div
            className="sticy-scrollbar"
            onScroll={() =>
              handleScroll("scrollbar", "patent-details-table-wrapper")
            }
            id="scrollbar"
          >
            <div className="inside-scrollbar" id="inner-scroll"></div>
          </div>
          <thead>
            <tr>
              <th className="header-table-result-page">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  checked={isChecked || isRetreiveSelectedAll}
                  onChange={selectAllChange}
                />
              </th>
              {patentReamainingList &&
                // eslint-disable-next-line array-callback-return
                patentReamainingList.map((header, k) => {
                  if (typeof header !== "object") {
                    const columnWidth = columnWidths[header] || 100;
                    return (
                      <th
                        className="result-page-header resizable-column"
                        style={{ minWidth: columnWidth }}
                        key={header}
                      >
                        <div
                          className="header-wrapper"
                          style={{ userSelect: "none" }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, header, columnWidth, onResize)
                          }
                          onTouchStart={(e) =>
                            handleTouchStart(e, header, columnWidth, onResize)
                          }
                        >
                          {t([header])}
                          <div className="resize-handle">
                            <div className="resize-handle-icon"></div>
                          </div>
                        </div>
                      </th>
                    );
                  }
                })}
            </tr>
          </thead>
          <tbody className="table-body-result text-black">
            {displayData &&
              displayData.map((row, key) => {
                const displayTitle = row._source["TI_EN"];
                const displayAbstract = row._source["AB_EN"];
                const displayPN = row._source["PN_B"];
                const displayClaims = row._source["CL_EN"];

                // prepareRow(row);
                return (
                  <tr key={key}>
                    <td className="result-page-abstract">
                      <input
                        className="mx-1 cursor-pointer"
                        type="checkbox"
                        defaultChecked={
                          selectedRows.includes(`${row._id}`) ||
                          isRetreiveSelectedAll
                        }
                        checked={
                          selectedRows.includes(`${row._id}`) ||
                          isRetreiveSelectedAll
                        }
                        value={row._id}
                        onChange={handleChange}
                      />
                    </td>

                    {patentReamainingList &&
                      patentReamainingList.map((rows) => {
                        switch (rows) {
                          case "publication_no":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-pub-no dynamic-height-pubNo font-weight-bold menu"
                                htmlText={displayPN}
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                                isPubNumber={true}
                                onClick={onSetPatentLink}
                                tdId={row._source["PN_B"]}
                                patentStatus={row._source["ALD"]}
                                innerDivClassName="publication-no"
                                isAddHighlight={true}
                              />
                            );

                          case "patent_information":
                            return <RwirePatentInfo row={row} {...props} />;

                          case "title":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-title dynamic-height"
                                htmlText={
                                  displayTitle.charAt(0).toUpperCase() +
                                  displayTitle.slice(1).toLowerCase()
                                }
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                              />
                            );

                          case "abstract":
                            return (
                              <RwireAbstract
                                displayAbstract={displayAbstract}
                                highlightword={uniqueHighlightword}
                                isExact={isExact}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                                onHandleHighlightElastic={
                                  onHandleHighlightElastic
                                }
                                index={key}
                              />
                            );

                          case "Claims":
                            return displayClaims ? (
                              <RwireClaims
                                displayClaims={displayClaims}
                                highlightword={uniqueHighlightword}
                                isExact={isExact}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                                onHandleHighlightElastic={
                                  onHandleHighlightElastic
                                }
                                index={key}
                              />
                            ) : (
                              ""
                            );

                          case "ipc":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-ipc ipc dynamic-height "
                                htmlText={row._source["IPC"].join(", ")}
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                              />
                            );

                          case "cpc":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-ipc dynamic-height "
                                htmlText={row._source["CPC"].join(", ")}
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                              />
                            );

                          case "US Class":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-ipc dynamic-height"
                                htmlText={row._source["USM"].join(", ")}
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                              />
                            );

                          case "ECLA":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-ipc dynamic-height "
                                htmlText={row._source["ECL"].join(", ")}
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                              />
                            );
                          case "JP-FI/F-Terms":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-ipc dynamic-height "
                                htmlText={row._source["JCL"].join(", ")}
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                              />
                            );
                          case "Legal Status":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-ipc dynamic-height"
                                htmlText={row._source["LST"]}
                                highlightword={uniqueHighlightword}
                                isExact={uniqueHighlightword}
                                queryKeywordsHighlightColor={
                                  queryKeywordsHighlightColor
                                }
                              />
                            );

                          case "Images":
                            return (
                              <td className="result-table-images ">
                                <img
                                  align="center"
                                  width="100%"
                                  height="100%"
                                  src={getImagePathFromPN(row._source["PN_B"])}
                                  alt=""
                                  onClick={() =>
                                    handleOpenImagecarousel(
                                      getImagePathFromPN(row._source["PN_B"])
                                    )
                                  }
                                />
                              </td>
                            );

                          case "Relevancy Score":
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-score dynamic-height"
                                htmlText={row._score}
                              />
                            );

                          default:
                            return (
                              <RwireTableTdComponent
                                tdClassName="result-table-column"
                                header={rows}
                              />
                            );
                        }
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>

        {!isLoadingResult && !isLoadingTable && totalRecordsCount === 0 && (
          <p className="p-3 nrf-message">No Records Found</p>
        )}
      </div>
      {/*
          Pagination can be built however you'd like.
          This is just a very basic UI implementation:
        */}
      <div>
        <div className="search-result-pagination-main">
          <div className="pagination-next-previos">
            <div className="result-page">
              <span className="filter-font">Results / page</span>
              <select
                value={dataSize}
                onChange={(e) => {
                  handleSetPageSize(Number(e.target.value));
                }}
              >
                {[50, 100, 150, 200].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div></div>
            <Pagination
              layout={layout}
              size={size}
              prev={prev}
              next={next}
              first={first}
              last={last}
              ellipsis={ellipsis}
              boundaryLinks={boundaryLinks}
              total={totalRecordsCount > 10000 ? 10000 : totalRecordsCount}
              limit={dataSize}
              maxButtons={maxButtons}
              activePage={activePages}
              onChangePage={handleChangePage}
              jumpPage={jumpPage}
              onJumpPage={handleJumpPage}
            />
          </div>
          <RwireJumpPages
            onSetResultTable={onSetResultTable}
            onRwireSearchAPI={onRwireSearchAPI}
            dataSize={dataSize}
            totalRecordsCount={totalRecordsCount}
          />
          <div className="selected-count count-width">
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
      </div>
    </>
  );
}
