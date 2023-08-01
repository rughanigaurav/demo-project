import React from "react";
export default function RWireButton(props) {
  return (
    <div className={props.cNameDiv}>
      <button
        disabled={props.disabled}
        className={props.buttonCName}
        onClick={props.onClick}
      >
        {props.buttonImg && (
          <img src={props.buttonImg} alt="" className={props.imgClassName} />
        )}{" "}
        {props.name ? props.name : props.children}
      </button>
    </div>
  );
}
