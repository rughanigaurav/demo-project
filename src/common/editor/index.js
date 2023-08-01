import React from "react";
import Slate from "./slate";

const SlateEditorWrapper = ({
  name,
  value,
  onChange,
  className = "",
  isShowAfterInit,
  isDarkMode,
  editor
}) => {
  const handleChange = ({ value }) => {
    onChange(value);
  };

  return (
    <div className={`form-control ${className}`}>
      <Slate
        name={name}
        editorValue={value || null}
        onChange={handleChange}
        isShowAfterInit={isShowAfterInit}
        isDarkMode={isDarkMode}
        editor={editor}
      />
    </div>
  );
};

export default SlateEditorWrapper;
