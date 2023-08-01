import React, { useState } from "react";
import HighLighter from "../../common/highlightFunction";
import replaceSpecialChars from "../../common/replace-special-chars";
import SingleResultPatent from "./single-result-patent";
import { IoIosFunnel } from "react-icons/io";
import { getImagePathFromPN } from "../../common/images-functions";
import { useNavigate } from "react-router-dom";
import RWireButton from "../rwire-ui/rwire-button/rwire-button";
import RwireAppliedFilters from "../common/filters/rwire-applied-filters";
import SingleHighlightedFieldData from "./single-highlighted-field-data";

const QuickViewBody = (props) => {
  const {
    displayData = [],
    hideQueryToggle = true,
    totalHighlightedWords: highlightword,
    isExact,
    queryKeywordsHighlightColor,
    setIsImageCarouselModalOpen,
    isImageCarouselModalOpen,
    setImagePath,
    setIsFilterModalOpen,
    onSetFilter,
  } = props;
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpenImagecarousel = (path) => {
    setIsImageCarouselModalOpen(!isImageCarouselModalOpen);
    setImagePath(path);
  };

  const onSetPatentLink = (id) => {
    onSetFilter({ isViewPageModalOpen: false, isSmartReaderOpen: false });
    sessionStorage.setItem("patentId", id);
    navigate(`/en/patent-view`);
  };
  let HighlightFields = Object.keys(
    displayData.length > 0 &&
      displayData[selectedIndex] &&
      displayData[selectedIndex].highlight
  );
  return (
    <div className="d-flex quick-view-body pt-2 h-100">
      <div className="col-md-5 ps-0 pe-2">
        <div className="view-boxes blue-bg h-100">
          <div className="px-2 py-1 match-header vertical-center justify-content-center position-relative">
            <div className="text px-2 py-1">Results</div>
            <div
              className="cursor-pointer px-1 mx-2 filter-btn py-1 d-flex gap-1"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <div className="vertical-center">Filters</div>
              <div className="vertical-center">
                <IoIosFunnel />
              </div>
            </div>
          </div>
          <div
            className={`${
              hideQueryToggle ? "partial-results-list" : "full-results-list"
            } borderSect px-2`}
          >
            {displayData &&
              displayData.map((result, index) => (
                <SingleResultPatent
                  result={result}
                  highlightword={highlightword}
                  isExact={isExact}
                  queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                  onSetPatentLink={onSetPatentLink}
                  setSelectedIndex={setSelectedIndex}
                  index={index}
                  selectedIndex={selectedIndex}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="col-md-7 ps-2 pe-0 d-flex flex-column">
        <RwireAppliedFilters {...props} />
        <div className="view-boxes quick-view-body gray-bg px-2 d-flex flex-column">
          <div className="match-header d-flex justify-content-between align-items-end">
            <div className="py-1 d-flex gap-2">
              <div
                className="text px-2 py-1 cursor-pointer"
                onClick={() =>
                  onSetPatentLink(displayData?.[selectedIndex]?._source?.PN_B)
                }
              >
                {displayData?.[selectedIndex]?._source?.PN_B}
              </div>
              <div
                className={`text px-2 py-1 ${
                  displayData?.[selectedIndex]?._source?.ALD.toLowerCase() ===
                  "dead"
                    ? "pub-status-red"
                    : "pub-status-green"
                }`}
              >
                {displayData?.[selectedIndex]?._source?.ALD}
              </div>
            </div>
            <div className="quick-btn">
              <RWireButton
                buttonCName="match-btn header-table-result-page"
                onClick={() => {
                  navigate("/en/rwire-patents");
                }}
                name="Quick"
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <div
              className={`${
                hideQueryToggle ? "partial-results-list" : "full-results-list"
              } borderSect details-sect h-100`}
            >
              {displayData.length > 0 && (
                <>
                  <div className="cursor-pointer" title="View Image">
                    <img
                      id="image"
                      src={getImagePathFromPN(
                        displayData?.[selectedIndex]?._source?.PN_B
                      )}
                      alt=""
                      onClick={() =>
                        handleOpenImagecarousel(
                          getImagePathFromPN(
                            displayData?.[selectedIndex]?._source?.PN_B
                          )
                        )
                      }
                      className="clip-image"
                    />
                  </div>
                  <div
                    className="fw-bold text-black title-text px-2 py-1"
                    dangerouslySetInnerHTML={{
                      __html: HighLighter(
                        replaceSpecialChars(
                          displayData?.[selectedIndex]?._source?.TI_EN
                        ),
                        highlightword,
                        isExact,
                        queryKeywordsHighlightColor
                      ),
                    }}
                  />

                  {HighlightFields &&
                    HighlightFields.length > 0 &&
                    HighlightFields.map((field, index) => (
                      <SingleHighlightedFieldData
                        displayData={displayData}
                        selectedIndex={selectedIndex}
                        field={field}
                        highlightword={highlightword}
                        isExact={isExact}
                        queryKeywordsHighlightColor={
                          queryKeywordsHighlightColor
                        }
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewBody;
