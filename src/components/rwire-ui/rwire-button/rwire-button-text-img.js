import React from "react";
export default function RWireButtonTextImg(props) {
  return (
    <div className={props.cNameDiv}>
      <button
        disabled={props.disabled}
        className={props.buttonCName}
        onClick={props.onClick}
      >
        {props.name ? props.name : props.children}{" "}
        {props.buttonImg && (
          <img src={props.buttonImg} alt="" className={props.imgClassName} />
        )}
      </button>
    </div>
  );
}
