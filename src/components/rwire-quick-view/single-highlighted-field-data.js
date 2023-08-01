import React from "react";
import HighLighter from "../../common/highlightFunction";
import { headingMapping } from "../../common/qv-heading-map";
import replaceSpecialChars from "../../common/replace-special-chars";

const SingleHighlightedFieldData = (props) => {
  const {
    displayData = [],
    selectedIndex = 0,
    field = "",
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
  } = props;
  return (
    <div>
      {field && headingMapping[field] && (
        <>
          <p className="px-3 fw-bold text-black py-1">
            {headingMapping[field]}
          </p>
          <ul>
            {displayData?.[selectedIndex]?.highlight?.[field].map((str) => (
              <li class="text-black">
                <div
                  className="details-text details-desc"
                  dangerouslySetInnerHTML={{
                    __html: HighLighter(
                      replaceSpecialChars(str),
                      highlightword,
                      isExact,
                      queryKeywordsHighlightColor
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SingleHighlightedFieldData;
