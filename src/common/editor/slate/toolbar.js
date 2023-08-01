import React from "react";
import { useSlate } from "slate-react";

import { toggleBlock, isBlockActive, toggleMark, isMarkActive } from "./helper";
import Icon from "./icons";

const BlockButton = ({ format, icon, theme }) => {
  const editor = useSlate();

  const handleClick = (event) => {
    event.preventDefault();
    toggleBlock(editor, format);
  };

  const isActive = isBlockActive(editor, format);

  return (
    <span
      className={`editor-btn link-btn ${isActive ? "active" : ""}`}
      onMouseDown={handleClick}>
      <Icon icon={icon} theme={theme} />
    </span>
  );
};

const MarkButton = ({ format, icon, theme }) => {
  const editor = useSlate();

  const handleClick = (event) => {
    event.preventDefault();
    toggleMark(editor, format);
  };

  const isActive = isMarkActive(editor, format);

  return (
    <span
      className={`editor-btn ${isActive ? "active" : ""}`}
      onMouseDown={handleClick}>
      <Icon icon={icon} theme={theme} />
    </span>
  );
};

const Toolbar = ({ isDarkMode }) => {
  return (
    <div className="menu toolbar-menu">
      <MarkButton icon="bold" format="bold" theme={isDarkMode} />
      <MarkButton icon="italic" format="italic" theme={isDarkMode} />
      <MarkButton icon="underline" format="underline" theme={isDarkMode} />
      <BlockButton icon="orderedList" format="numbered-list" theme={isDarkMode} />
      <BlockButton icon="unorderedList" format="bulleted-list" theme={isDarkMode} />
    </div>
  );
};

export default Toolbar;
