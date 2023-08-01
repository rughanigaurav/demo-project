import React, { useRef } from "react";
import { applyMultipleHighlights } from "../../action/patent-view";
import HighLighter from "../../common/highlightFunction";
import ClearAnnotationsActions from "./clear-annotations-actions";
import RwireNoteIcon from "./rwire-notes-icon";
import RwireHighlightIcon from "../../container/rwire-highlight";

const ViewTitleSection = (props) => {
  const {
    detailsData,
    languageSelected,
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
    isLoadingPdf,
    loaderGIF,
    downloadPdfIcon,
    downloadPdf,
    isPdfAvailable,
    userAnnotations,
    onSetNotes,
    isNotesModalOpen,
    onGetNotes,
    notes,
    onSetFullView,
    stringsComments,
    stringsHighlights,
    onUpdateUserAnnotations,
  } = props;
  const containerRef = useRef(null);
  const titleText = Array.isArray(detailsData[`TI_${languageSelected}`])
    ? detailsData[`TI_${languageSelected}`][0]
    : detailsData[`TI_${languageSelected}`];
  const finalText = applyMultipleHighlights(
    titleText,
    userAnnotations && userAnnotations[`TI_${languageSelected}`]
  );
  return (
    <div className="d-flex justify-content-between">
      {detailsData[`TI_${languageSelected}`] ? (
        <div
          ref={containerRef}
          className={`TI_${languageSelected} patent-title highlighted-component-title`}
          dangerouslySetInnerHTML={{
            __html: HighLighter(
              finalText,
              highlightword,
              isExact,
              queryKeywordsHighlightColor
            ),
          }}
        ></div>
      ) : (
        <p>Data not available</p>
      )}
      <div className="d-flex gap-2">
        <div className="d-flex ">
          <RwireHighlightIcon />
          <RwireNoteIcon
            onSetNotes={onSetNotes}
            isNotesModalOpen={isNotesModalOpen}
            onGetNotes={onGetNotes}
            notes={notes}
          />
          <div className="download-pdf-icon">
            <div className="text-center">
              <img
                src={isLoadingPdf ? loaderGIF : downloadPdfIcon}
                width="30"
                alt=""
                onClick={() => downloadPdf(detailsData["PN_B"])}
              />
            </div>
            <div className="text-danger">
              {isPdfAvailable === false ? "Pdf not available" : ""}
            </div>
          </div>
        </div>
        <ClearAnnotationsActions
          onSetFullView={onSetFullView}
          stringsComments={stringsComments}
          stringsHighlights={stringsHighlights}
          onUpdateUserAnnotations={onUpdateUserAnnotations}
          detailsData={detailsData}
        />
      </div>
    </div>
  );
};

export default ViewTitleSection;
