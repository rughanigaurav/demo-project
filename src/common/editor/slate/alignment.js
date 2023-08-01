import React from "react";

const AlignBtn = ({ onMouseDown, name }) => {
  const handleClick = () => onMouseDown(name);

  return (
    <li onMouseDown={handleClick}>
      <i className={`fa fa-align-${name}`} />
    </li>
  );
};

const Alignment = () => {
  const isActive = false;

  const handleClick = (align) => {
    // wrapAlign(editor, align)
  };

  return (
    <ul className="alignment-list">
      {isActive && <li>AC</li>}
      <AlignBtn onMouseDown={handleClick} name="justify" />
      <AlignBtn onMouseDown={handleClick} name="center" />
      <AlignBtn onMouseDown={handleClick} name="left" />
      <AlignBtn onMouseDown={handleClick} name="right" />
    </ul>
  );
};

export default Alignment;
