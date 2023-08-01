import React, { useEffect, useState } from "react";
import HighLighter from "../../../common/highlightFunction";
import replaceSpecialChars from "../../../common/replace-special-chars";
import truncateText from "../../../common/truncate-text";

function RwireAbstract(props) {
  const {
    displayAbstract,
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
    index,
  } = props;
  const [abstract, setAbstract] = useState(displayAbstract);
  const [abstractToggle, setAbstractToggle] = useState(false);

  useEffect(() => {
    const button = document.querySelector(`.abstract_no_${index}`);
    button && button.addEventListener("click", handleAbstractToggle);
    return () => {
      button && button.removeEventListener("click", handleAbstractToggle);
    };
  });
  useEffect(() => {
    let tempAbstract = "";
    if (displayAbstract.length < 1000) {
      tempAbstract = HighLighter(
        replaceSpecialChars(displayAbstract),
        highlightword,
        isExact,
        queryKeywordsHighlightColor
      );
    } else if (abstractToggle) {
      // for ...less
      var span = `<span class="font-weight-bold cursor-pointer abstract_no_${index} ">  Less</span></p>`;
      tempAbstract = HighLighter(
        replaceSpecialChars(displayAbstract),
        highlightword,
        isExact,
        queryKeywordsHighlightColor
      );
      // replace last occurance of </p> with span
      tempAbstract = tempAbstract.replace(/(<\/p>)(?![\s\S]*<\/p>)/, span);
    } else {
      // for ...more
      tempAbstract =
        HighLighter(
          replaceSpecialChars(truncateText(displayAbstract)),
          highlightword,
          isExact,
          queryKeywordsHighlightColor
        ) +
        `<span class="font-weight-bold cursor-pointer abstract_no_${index} ">  More</span>`;
    }
    setAbstract(tempAbstract);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abstractToggle, displayAbstract, highlightword]);
  const handleAbstractToggle = () => {
    setAbstractToggle(!abstractToggle);
  };

  return (
    <td className="result-table-abstract">
      <div
        className="result-table-abstract dynamic-height"
        dangerouslySetInnerHTML={{
          __html: abstract,
        }}
      />
    </td>
  );
}

export default RwireAbstract;
