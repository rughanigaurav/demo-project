import React from "react";
import HighLighter from "../../../common/highlightFunction";
import "../../../assets/css/columns.scss";

const RwireTableTdComponent = (props) => {
  const {
    tdClassName = "",
    innerDivClassName = "",
    htmlText = "",
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
    isPubNumber = false,
    onClick,
    tdId = "",
    patentStatus = "",
    isAddHighlight = false,
  } = props;
  if (isAddHighlight) {
    return (
      <td className={tdClassName}>
        <div className={innerDivClassName} id={tdId} onClick={onClick}>
          {htmlText}
        </div>
        {isPubNumber && (
          <div
            className={`d-flex ${
              patentStatus.toLowerCase() === "dead"
                ? "pub-status-red"
                : "pub-status-green"
            }`}
          >
            {patentStatus.toUpperCase()}
            {/* <RwireTooltipButton id={tdId} /> */}
          </div>
        )}
      </td>
    );
  }

  return (
    <td className={tdClassName} id={tdId} onClick={onClick}>
      <div
        dangerouslySetInnerHTML={{
          __html:
            typeof htmlText === "number"
              ? htmlText
              : HighLighter(
                  htmlText,
                  highlightword,
                  isExact,
                  queryKeywordsHighlightColor
                ),
        }}
        className={innerDivClassName}
      />
      {isPubNumber && (
        <div
          className={`d-flex ${
            patentStatus.toLowerCase() === "dead"
              ? "pub-status-red"
              : "pub-status-green"
          }`}
        >
          {patentStatus.toUpperCase()}
        </div>
      )}
    </td>
  );
};

export default RwireTableTdComponent;
