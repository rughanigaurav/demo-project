import React, { useRef } from "react";
import { applyMultipleHighlights } from "../../action/patent-view";
import HighLighter from "../../common/highlightFunction";
import { mappings } from "./tags-mappings";
export const applyMappings = (text = "") => {
  let replacedText = text ? text : "";
  for (const [tag, replacement] of Object.entries(mappings)) {
    const regex = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "gi");
    const matches = replacedText.match(regex);
    if (matches !== null) {
      replacedText = replacedText.replace(
        regex,
        `<${replacement} $1>$2</${replacement}>`
      );
    }
  }
  return `<div class="mapped-text">${replacedText}</div>`;
};

function DescBlock(props) {
  const {
    description,
    queryKeywordsHighlightColor,
    isExact,
    highlightword,
    userAnnotations = {},
    languageSelected,
  } = props;
  const containerRef = useRef(null);
  const finalText = applyMultipleHighlights(
    applyMappings(description),
    userAnnotations && userAnnotations[`DESC_${languageSelected}`]
  );
  return (
    <div className="claims-block mt-2">
      <div className="d-flex sticky-claims ">
        <h5 className="me-4">Description</h5>
      </div>
      {description ? (
        <div className={`mt-2 text-justify fixed-height-claims`}>
          {applyMappings(description) && (
            <div
              ref={containerRef}
              className={`DESC_${languageSelected} highlighted-component-modal-desc`}
              dangerouslySetInnerHTML={{
                __html: HighLighter(
                  finalText,
                  highlightword,
                  isExact,
                  queryKeywordsHighlightColor
                ),
              }}
            ></div>
          )}
        </div>
      ) : (
        <p className="pt-2">Data not available</p>
      )}
    </div>
  );
}

export default DescBlock;
