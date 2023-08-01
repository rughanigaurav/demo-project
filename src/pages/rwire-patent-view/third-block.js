import React, { useRef } from "react";
import RwireViewPatentInfo from "./rwire-view-patent-info";
import RwireViewImageSection from "./rwire-view-image-section";
import {
  applyMultipleHighlights,
  removeTagNames,
} from "../../action/patent-view";
import HighLighter from "../../common/highlightFunction";

function Thirdblock(props) {
  const {
    abstractText = "",
    totalHighlightedWords: highlightword,
    languageSelected = "EN",
    userAnnotations = [],
    queryKeywordsHighlightColor,
    isExact
  } = props;
  const containerRef = useRef(null);
  const newAbstractText = abstractText
    ? removeTagNames(abstractText).replace(/(<([^>]+)>)/gi, "")
    : "";
  const finalText = applyMultipleHighlights(
    newAbstractText,
    userAnnotations && userAnnotations[`AB_${languageSelected}`]
  );
  return (
    <div className="view-third-block d-flex  mt-4">
      <div className="abstract-block">
        <h5 className="mb-2">Abstract</h5>
        {newAbstractText ? (
          <p
            ref={containerRef}
            className={`AB_${languageSelected} text-justify highlighted-component-abs`}
            dangerouslySetInnerHTML={{
              __html: HighLighter(
                finalText,
                highlightword,
                isExact,
                queryKeywordsHighlightColor
              ),
            }}
          />
        ) : (
          <p className="pt-2">Data not available</p>
        )}
      </div>
      <div className="patent-details-block d-flex flex-column">
        <h5 className="mb-2">Patent Information </h5>
        <RwireViewPatentInfo {...props} />
      </div>

      <RwireViewImageSection {...props} />
    </div>
  );
}

export default Thirdblock;
