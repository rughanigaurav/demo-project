import React, { useState, useEffect } from "react";
import { Input, InputGroup } from "rsuite";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import { Checkbox } from "rsuite";

export const containsSpecialCharacters = (str) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /[!@#$%^&*()_+\-=\[\]{}'"\\:<>\/?~]/g;
  return regex.test(str);
};

function RwireHighlight(props) {
  const {
    setCustomizeModal,
    isCustomizeModal,
    isExact,
    onSetFilter,
    onHandleHighlightElastic,
    queryKeywordsHighlightColor,
    totalHighlightedWords,
    onSetDetails
  } = props;

  const [highlightData, setHighlightData] = useState(
    localStorage.getItem("highlightWords")
      ? localStorage
          .getItem("highlightWords")
          .trim()
          .split(/\s*[,|;" "]\s*/)
      : []
  );
  const [highlightText, setHighlightText] = useState();

  const highlightChange = (e) => {
    if (!containsSpecialCharacters(e)) {
      setHighlightText(e);
    } else {
      const alertData = "`~!@#$%&^*_=-[]{}()'+?/:<> Symbols are not permitted";
      // eslint-disable-next-line no-alert
      alert(alertData);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("highlightWords")) {
      setHighlightText(localStorage.getItem("highlightWords"));
      setHighlightData(
        localStorage
          .getItem("highlightWords")
          .trim()
          .split(/\s*[,|;" "]\s*/)
      );
    }
    window.onload = function () {
      onSetDetails({
        highlightword: [],
      });
      setHighlightText("");
      setHighlightData([]);
      localStorage.removeItem("highlightWords");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (highlightText == "") {
      onSetDetails({
        highlightword: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightText]);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (highlightData.length > 0) {
      setHighlightText(highlightData.join(","));
    } else {
      setHighlightText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightData]);

  const highlightClear = () => {
    onSetDetails({
      highlightword: [],
    });
    setHighlightText("");
    setHighlightData([]);
    localStorage.removeItem("highlightWords");

    setTimeout(() => {
      onHandleHighlightElastic();
    }, 100);
  };

  const highlightApply = () => {
    const searchWords = highlightText
      ? highlightText
        .trim()
        .split(/\s*[,|;" "]\s*/)
        .filter((word) => word)
      : [];

    onSetDetails({
      highlightword: searchWords,
    });
    setHighlightData(searchWords);
    localStorage.setItem("highlightWords", searchWords);
    setTimeout(() => {
      onHandleHighlightElastic();
    }, 100);
  };

  const handleKeyPress = (event) => {
    const alertData = "`~!@#$%&^*_=-[]{}()'+?/:<> Symbols are not permitted";
    if (
      event.key === "$" ||
      event.key === "^" ||
      event.key === "(" ||
      event.key === ")" ||
      event.key === "+" ||
      event.key === "?" ||
      event.key === "/" ||
      event.key === "*" ||
      event.key === "." ||
      event.key === '"' ||
      event.key === "'" ||
      event.key === "]" ||
      event.key === "[" ||
      event.key === "!" ||
      event.key === "@" ||
      event.key === "#" ||
      event.key === "%" ||
      event.key === "&" ||
      event.key === "-" ||
      event.key === "_" ||
      event.key === "=" ||
      event.key === ":" ||
      event.key === ">" ||
      event.key === "<" ||
      event.key === "{" ||
      event.key === "}" ||
      event.key === "`" ||
      event.key === "~"
    ) {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log(alertData);
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      if (!highlightText) {
        return false;
      }

      highlightApply();
    }

    return;
  };

  const handleRemove = async (e) => {
    const arr = highlightData.filter(i => i !== e);
    const arr2 = totalHighlightedWords.filter(i => i !== e);

    await onSetDetails({
      highlightword: arr,
      totalHighlightedWords: arr2
    });

    setHighlightData(arr);
    localStorage.setItem("highlightWords", arr);
    onHandleHighlightElastic(arr2, e);
  };

  const handleChange = () => {
    onSetFilter({ isExact: !isExact });
    setTimeout(() => {
      onHandleHighlightElastic();
    }, 100);
  };

  return (
    <div>
      <div className="">
        <div className="d-flex highlight-keyword">
          <p className="text-left w-100">Highlight keywords</p>
          <div
            onClick={() => {
              setCustomizeModal(!isCustomizeModal);
            }}
            className="d-flex"
          >
            <p className="text-right mt-0 cursor-pointer">Customize </p>
            <img
              src={RWIRE_IMAGES.RwireEditIcon}
              className="ml-2 cursor-pointer"
              alt="cutomize_img"
            />
          </div>
        </div>

        <div className="highlight-modal-input mt-2">
          <InputGroup inside>
            <Input
              placeholder="Add a keywords"
              value={highlightText}
              onKeyPress={handleKeyPress}
              onChange={highlightChange}
              onKeyDown={handleEnter}
            />
          </InputGroup>
        </div>

        <div className="d-flex flex-wrap">
          {highlightData.map((item, index) => {
            if (item) {
              return (
                // eslint-disable-next-line eqeqeq
                highlightText == "" ? (
                  setHighlightData([])
                ) : (
                  <button
                    className={`item-color  mx-2 mt-2 px-1 `}
                    style={{
                      backgroundColor:
                      queryKeywordsHighlightColor[
                          [totalHighlightedWords.indexOf(item)]
                        ],
                    }}
                    key={index}
                  >
                    {item}
                    <img
                      alt=""
                      src={RWIRE_IMAGES.RwireCloseIcon}
                      className="cross-img"
                      onClick={() => handleRemove(item)}
                    />
                  </button>
                )
              );
            } else {
              return (
                <button className="item-color" key={index}>
                  {item}
                </button>
              );
            }
          })}
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <div className="d-flex">
          <Checkbox onChange={handleChange} checked={isExact}></Checkbox>
          <p className="syntax-check text-box highlight-checkbox pb-0 highlight-top">
            Exatch Match
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <h6
            className="pr-4 menu highlight-top"
            style={{ color: "#000000", fontSize: "14px" }}
            onClick={highlightClear}
          >
            Clear All
          </h6>
          <button className="apply-highlight-button" onClick={highlightApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default RwireHighlight;
