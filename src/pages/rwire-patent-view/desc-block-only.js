import React, { useRef } from "react";
import { applyMultipleHighlights } from "../../action/patent-view";
import HighLighter from "../../common/highlightFunction";
import { applyMappings } from "./desc-block";

function DescBlockOnly({
  description = "",
  highlightword,
  isExact,
  userAnnotations = {},
  queryKeywordsHighlightColor,
  languageSelected,
}) {
  const containerRef = useRef(null);

  const finalText = applyMultipleHighlights(
    applyMappings(description),
    userAnnotations && userAnnotations[`DESC_${languageSelected}`]
  );
  return (
    <>
      <h5 className="me-4 mt-4">Description</h5>

      {description ? (
        <div className="mt-2 text-justify desc-only-block">
          <div
            ref={containerRef}
            className={`DESC_${languageSelected} highlighted-component-desc`}
            dangerouslySetInnerHTML={{
              __html: HighLighter(
                finalText,
                highlightword,
                isExact,
                queryKeywordsHighlightColor
              ),
            }}
          ></div>
        </div>
      ) : (
        <p className="pt-2">Data not available</p>
      )}
    </>
  );
}

export default DescBlockOnly;
