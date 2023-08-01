import React, { useEffect, useState } from "react";
import HighLighter from "../../../common/highlightFunction";
import replaceSpecialChars from "../../../common/replace-special-chars";
import truncateText from "../../../common/truncate-text";

function RwireClaims(props) {
  const {
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
    displayClaims,
    index,
  } = props;
  const [claims, setClaims] = useState(displayClaims.join(""));
  const [claimsToggle, setClaimsToggle] = useState(false);
  useEffect(() => {
    const button = document.querySelector(`.claims_no_${index}`);
    button && button.addEventListener("click", handleClaimsToggle);
    return () => {
      button && button.removeEventListener("click", handleClaimsToggle);
    };
  });
  useEffect(() => {
    let tempClaims = "";
    if (displayClaims.join("").length < 1000) {
      tempClaims = HighLighter(
        replaceSpecialChars(displayClaims.join("")),
        highlightword,
        isExact,
        queryKeywordsHighlightColor
      );
    } else if (claimsToggle) {
      // for ...less
      tempClaims =
        HighLighter(
          replaceSpecialChars(displayClaims.join("")),
          highlightword,
          isExact,
          queryKeywordsHighlightColor
        ) +
        `<span class="font-weight-bold cursor-pointer claims_no_${index} ">  Less</span></p>`;
    } else {
      // for ...more
      tempClaims =
        HighLighter(
          replaceSpecialChars(truncateText(displayClaims.join(""))),
          highlightword,
          isExact,
          queryKeywordsHighlightColor
        ) +
        `<span class="font-weight-bold cursor-pointer claims_no_${index} ">  More</span>`;
    }
    setClaims(tempClaims);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimsToggle, displayClaims, highlightword]);

  const handleClaimsToggle = () => {
    setClaimsToggle(!claimsToggle);
  };
  return (
    <td className="result-table-claims cursor-pointer dynamic-height">
      <div
        className="result-table-inner-div"
        dangerouslySetInnerHTML={{
          __html: claims,
        }}
      />
    </td>
  );
}

export default RwireClaims;
