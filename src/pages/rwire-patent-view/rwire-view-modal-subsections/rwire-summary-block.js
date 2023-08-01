import React, { useRef } from "react";
import HighLighter from "../../../common/highlightFunction";
import RwireViewPatentInfo from "../rwire-view-patent-info";
import {
  applyMultipleHighlights,
  removeTagNames,
} from "../../../action/patent-view";

function RwireSummaryBlock(props) {
  const {
    detailsData,
    languageSelected,
    highlightword,
    // isExact,
    queryKeywordsHighlightColor,
    userAnnotations,
  } = props;
  const containerRef = useRef(null);
  const isExact = true;
  const abstract =
    detailsData[`AB_${languageSelected}`]
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replace(/(<([^>]+)>)/gi, "");
  const newAbstractText = detailsData[`AB_${languageSelected}`]
    ? removeTagNames(detailsData[`AB_${languageSelected}`]).replace(
      /(<([^>]+)>)/gi,
      ""
    )
    : "";

  const finalText = applyMultipleHighlights(
    newAbstractText,
    userAnnotations && userAnnotations[`AB_${languageSelected}`]
  );

  return (
    <>
      <div className="abstract-block-modal mt-2">
        <h5 className="mb-2">Abstract</h5>
        {abstract ? (
          <p
            ref={containerRef}
            className={`AB_${languageSelected} text-justify highlighted-component-modal-abs`}
            dangerouslySetInnerHTML={{
              __html: HighLighter(
                finalText,
                highlightword,
                isExact,
                queryKeywordsHighlightColor
              ),
            }}
          ></p>
        ) : (
          <p className="pt-2">Data not available</p>
        )}
      </div>
      <div className="modal-patent-info mt-3">
        <h5>Patent Information</h5>
        <RwireViewPatentInfo {...props} />
      </div>
    </>
  );
}

export default RwireSummaryBlock;
