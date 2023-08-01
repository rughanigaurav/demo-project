import React, { useEffect } from "react";
import RwireFieldedTextarea from "./rwire-fielded-textarea";

const RwireFieldedInputTextarea = (props) => {
  const { onChange, onKeyDown, item, index } = props;

  const getWidth = () => {
  // calculated and set the WIDTH of textarea according to its parent div
  const parentDiv = document.querySelector(".check-status");
  const textarea = document.getElementById(`txt_${index}`);
  const parentWidth = parentDiv && parentDiv.offsetWidth + 1.5;
  textarea && (textarea.style.maxWidth = `${parentWidth}px`);

  // calculated the height of parent div
  const parentHeight = parentDiv && parentDiv.offsetHeight;
  return parentHeight;
  }

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  });
  setTimeout(() => {
    getWidth();
  }, 200);


  return (
    <RwireFieldedTextarea
      parentClass=".check-status"
      parentHeight={getWidth()}
      selectorId={`txt_${index}`}
      className="search-form-input"
      item={item}
      onChange={(event) => onChange(event, index)}
      onKeyDown={onKeyDown}
      value={item.filedsinput !== " " ? item.filedsinput : ""}
      heightSubtractor={-2}
    />
  );
};

export default RwireFieldedInputTextarea;
