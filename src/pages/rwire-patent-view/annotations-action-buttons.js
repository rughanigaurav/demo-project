import React from "react";
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";

const AnnotationsActionButtons = (props) => {
  const { removeHighlight, onSetFullView, handleUpdateComment } = props;

  return (
    <>
      <div
        className="remove-highlight"
        onClick={removeHighlight}
        title="Remove Highlights"
      >
        <RiDeleteBin6Fill
          style={{
            fontSize: "15px",
            margin: "3px",
          }}
        />
      </div>

      <div className="remove-comment d-flex gap-2 ">
        <div
          title="Remove Comment"
          onClick={() => {
            handleUpdateComment(true);
          }}
        >
          <RiDeleteBin6Fill
            style={{
              fontSize: "18px",
              margin: "3px",
            }}
            id="annote-icon"
          />
        </div>
        <div
          title="Edit Comment"
          onClick={() => {
            onSetFullView({ isEditingComment: true, openTextarea: true });
          }}
          id="edit-comment-btn"
        >
          <RiEdit2Fill
            id="annote-icon"
            style={{
              fontSize: "18px",
              margin: "3px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AnnotationsActionButtons;
