import React, { useRef } from "react";
import { applyMultipleHighlights } from "../../action/patent-view";
import HighLighter from "../../common/highlightFunction";

function RwireViewModalHeader(props) {
  const {
    detailsData,
    onSetFilter,
    totalHighlightedWords,
    isExact,
    queryKeywordsHighlightColor,
    languageSelected,
    userAnnotations,
  } = props;
  const containerRef = useRef(null);
  const titleText = Array.isArray(detailsData[`TI_${languageSelected}`])
    ? detailsData[`TI_${languageSelected}`][0]
    : detailsData[`TI_${languageSelected}`];
  const finalText = applyMultipleHighlights(
    titleText,
    userAnnotations && userAnnotations[`TI_${languageSelected}`]
  );

  const handleClose = () => {
    onSetFilter({ isViewPageModalOpen: false, isSmartReaderOpen: false });
  };
  return (
    <div className="view-modal-header d-flex flex-column">
      <div className="d-flex justify-content-between">
        <div className="pub-no d-flex">
          <div>
            {detailsData[`PN_B`] ? (
              detailsData[`PN_B`]
            ) : (
              <p>Data not available</p>
            )}
          </div>
          {detailsData.ALD && (
            <>
              <span className="pub-no-dot"></span>
              <div
                className={`${
                  detailsData.ALD.toLowerCase() === "dead"
                    ? "pub-status-red"
                    : "pub-status-green"
                }`}
              >
                {detailsData.ALD.toUpperCase()}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        {detailsData[`TI_${languageSelected}`] ? (
          <div
            ref={containerRef}
            className={`TI_${languageSelected} patent-title highlighted-component--modal-title`}
            dangerouslySetInnerHTML={{
              __html: HighLighter(
                finalText,
                totalHighlightedWords,
                isExact,
                queryKeywordsHighlightColor
              ),
            }}
          ></div>
        ) : (
          <p>Data not available</p>
        )}
        <button className="view-page-btn px-3 py-1" onClick={handleClose}>
          Default view
        </button>
      </div>
    </div>
  );
}

export default RwireViewModalHeader;
