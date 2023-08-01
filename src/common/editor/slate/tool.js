import React from 'react';
import { useSlate } from "slate-react";
import { isMarkActive } from "./helper";

const Tool = ({ onMouseDown, icon, format }) => {
    const editor = useSlate();
    const isActive = isMarkActive(editor, format)
    const handleClick = event => {
        event.preventDefault();
        onMouseDown(event, format);
    }

    return (
        <span
            className={`editor-btn ${isActive? 'active': ''}`}
            onMouseDown={handleClick}
         >
            <span className={`fa ${icon}`}></span>
        </span>
    )
}

export default Tool;
