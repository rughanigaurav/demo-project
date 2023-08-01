import React from "react";
import { getMostRelevantHighlights } from "../../common/get-most-relevant-highlights";
import HighLighter from "../../common/highlightFunction";
import replaceSpecialChars from "../../common/replace-special-chars";

const SingleResultPatent = (props) => {
  const {
    result = {},
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
    onSetPatentLink,
    setSelectedIndex,
    index,
    selectedIndex,
  } = props;

  return (
    <div
      className={`px-2 py-1 mb-2 single-result-patent cursor-pointer ${
        selectedIndex === index ? "selected" : ""
      }`}
      onClick={() => setSelectedIndex(index)}
    >
      <div
        onClick={() => onSetPatentLink(result?._source?.PN_B)}
        className="fw-bold pub-no"
        dangerouslySetInnerHTML={{
          __html: HighLighter(
            replaceSpecialChars(result?._source?.PN_B),
            highlightword,
            isExact,
            queryKeywordsHighlightColor
          ),
        }}
      />
      <div
        className="twoLinesEllipse details-text"
        dangerouslySetInnerHTML={{
          __html: HighLighter(
            replaceSpecialChars(
              getMostRelevantHighlights(
                result?.highlight ? result.highlight : []
              )
            ),
            highlightword,
            isExact,
            queryKeywordsHighlightColor
          ),
        }}
      />
    </div>
  );
};

export default SingleResultPatent;
