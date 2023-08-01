import React, { useRef } from "react";
import {
  applyMultipleHighlights,
  transformedString,
} from "../../action/patent-view";
import HighLighter from "../../common/highlightFunction";

function SingleClaim({
  claim,
  highlightword,
  isExact,
  userAnnotations,
  queryKeywordsHighlightColor,
  claimNo = "",
  claimClass = "",
}) {
  const containerRef = useRef(null);
  const finalText = applyMultipleHighlights(
    transformedString(claim),
    userAnnotations && userAnnotations[`${claimNo}`]
  );
  return (
    <li className="mb-2 pe-2 single-claim-li">
      {claim && (
        <div
          ref={containerRef}
          className={`${claimNo} ${claimClass}`}
          dangerouslySetInnerHTML={{
            __html: HighLighter(
              finalText,
              highlightword,
              isExact,
              queryKeywordsHighlightColor
            ),
          }}
        />
      )}
    </li>
  );
}

export default SingleClaim;
