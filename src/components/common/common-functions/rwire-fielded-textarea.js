import React, { useEffect, useRef, useState } from "react";
import { getBottomBorder } from "../../../common/utils";

const RwireFieldedTextarea = (props) => {
  const {
    onChange,
    onKeyDown,
    value = "",
    item,
    index,
    parentHeight,
    parentClass,
    selectorId,
    className,
    isCountry = "",
    placeholder = "",
    heightSubtractor = 0,
    isCountryInput
  } = props;
  const [showTextarea, setShowTextarea] = useState(false);
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  //the textarea should be close when clicked outside
  useEffect(() => {
    const handleClick = (event) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowTextarea(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [textareaRef]);

  //onchange of value of inputs the HEIGHT of textarea should be adjusted automatically
  useEffect(() => {
    const textarea = document.getElementById(selectorId);
    textarea &&
      textarea.addEventListener("input", function (e) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + heightSubtractor + "px";
      });
    textarea &&
      textarea.addEventListener("focus", function (e) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + heightSubtractor + "px";
      });

    getBottomBorder(parentClass, selectorId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleFocus = () => {
    setShowTextarea(true);
    getBottomBorder(parentClass, selectorId);
  };
  // set the height of textarea according to its parent div
  const handleBlur = () => {
    const textarea = document.getElementById(selectorId);
    textarea.style.height = `${parentHeight}px`;
    setShowTextarea(false);
    getBottomBorder(parentClass, selectorId);

  };

  return (
    <>
      <textarea
        ref={textareaRef}
        rows={1}
        type="text"
        id={selectorId}
        spellCheck="false"
        className={`${className} ${
          showTextarea ? "focused-search-form-input" : ""
        }`}
        placeholder={placeholder ? placeholder : item.placeholder}
        onChange={(event) => onChange(event, index, isCountry)}
        onKeyDown={(e) => onKeyDown(e, isCountryInput)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={item.filedsinput !== " " ? item.filedsinput : ""}
      />
    </>
  );
};

export default RwireFieldedTextarea;
