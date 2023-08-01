import React, { useState, useEffect, useRef } from "react";
import HighlightColorBox from "./highlight-color-box";
import { FaComment } from "react-icons/fa";
const Tooltip = (props) => {
  const {
    elementToRemoveHighlight,
    isSelection,
    onApplyHighlights,
    setToolRef,
    onClose,
    isOpenInModal = false,
    openTextarea,
    onSetFullView,
    onApplyComments,
    isEditingComment,
    handleUpdateComment,
    setIsSelection,
    setSelectionIndex,
    setField,
  } = props;
  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(false);
  const [selection, setSelection] = useState(null);
  const [leftSpace, setLeftSpace] = useState(0);
  const [TopSpace, setTopSpace] = useState(0);
  const [commentText, setCommentText] = useState("");

  const ref = useRef();
  const commentRef = useRef();

  useEffect(() => {
    const handleEditButtonClick = () => {
      const modalWidth = 400;

      let leftSpace =
        elementToRemoveHighlight.target.getBoundingClientRect().x +
        elementToRemoveHighlight.target.getBoundingClientRect().width / 2 -
        10;
      let topSpace =
        elementToRemoveHighlight.target.getBoundingClientRect().y +
        elementToRemoveHighlight.target.getBoundingClientRect().height +
        10;

      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;

      const rightDistance = viewportWidth - (leftSpace + modalWidth);

      if (rightDistance < 0) {
        leftSpace += rightDistance;
      }
      if (isOpenInModal) {
        leftSpace -= modalRect.x;
        topSpace -= modalRect.y - 10;
      }
      setLeftSpace(leftSpace);
      setTopSpace(topSpace);

      setCommentText(elementToRemoveHighlight.target.title);
    };

    const editButton = document.getElementById("edit-comment-btn");
    if (editButton) {
      editButton.addEventListener("click", (e) =>
        handleEditButtonClick(e, elementToRemoveHighlight)
      );
    }

    return () => {
      // Clean up the event listener when ComponentA is unmounted
      if (editButton) {
        editButton.removeEventListener("click", (e) =>
          handleEditButtonClick(e, elementToRemoveHighlight)
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementToRemoveHighlight]);

  const toggleSidebar = () => {
    onSetFullView({ openTextarea: true });

    const modalWidth = 400;
    const modalHeight = 150;
    const selectionRect = selection?.getRangeAt(0).getBoundingClientRect();
    let leftSpace = selectionRect.left + selectionRect.width / 2 - 20;
    let topSpace = selectionRect.top + selectionRect.height + 10;
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const rightDistance = viewportWidth - (leftSpace + modalWidth);
    const bottomDistance = viewportHeight - (topSpace + modalHeight);
    if (rightDistance < 0) {
      leftSpace += rightDistance;
    }
    if (bottomDistance < 0) {
      topSpace += bottomDistance;
    }
    if (isOpenInModal) {
      leftSpace -= modalRect.x;
      topSpace -= modalRect.y;
    }
    setLeftSpace(leftSpace);
    setTopSpace(topSpace);
    onApplyComments();
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseUp = (e) => {
    if (
      (commentRef.current && !commentRef.current.contains(e.target)) ||
      (ref.current && !ref.current.contains(e.target))
    ) {
      onSetFullView({ openTextarea: false, isEditingComment: false });
      setCommentText("");
    }
    var selection = window.getSelection();
    var selectedRange = selection.getRangeAt(0);

    // Check if the selected range intersects with any 'span' elements
    var highlightKeywords = document.getElementsByClassName("annoted-text");
    var intersects = false;

    for (var i = 0; i < highlightKeywords.length; i++) {
      var spanElement = highlightKeywords[i];
      var spanRange = document.createRange();
      spanRange.selectNode(spanElement);
      if (selectedRange.intersectsNode(spanElement)) {
        intersects = true;
        break;
      }
    }
    if (!intersects) {
      const closestElement = getClosestElementForSelection();
      const selectedText = window.getSelection().toString();
      if (selectedText !== "" && !selectedText.includes("\n")) {
        const closestElement = getClosestElementForSelection();
        if (closestElement) {
          const range = window.getSelection().getRangeAt(0);
          const preSelectionRange = range.cloneRange();
          preSelectionRange.selectNodeContents(closestElement);
          preSelectionRange.setEnd(range.startContainer, range.startOffset);
          const startOffset = preSelectionRange.toString().length;

          const pureText = closestElement.textContent;
          const startIndex = pureText.indexOf(selectedText, startOffset);
          const endIndex = startIndex + selectedText.length - 1;
          setIsSelection({ start: startIndex, end: endIndex });
          setSelectionIndex({ start: startIndex, end: endIndex });
          setField(closestElement.className.split(" ")[0]);
        }
      }
      const isActionButtons = e.target.parentElement.id === "annote-icon";

      if (closestElement || isActionButtons) {
        const selectedText = window.getSelection().toString();
        const hasSelection = selectedText.length > 0;

        setIsFloatingButtonVisible(
          hasSelection && !selectedText.includes("\n")
        );
        setSelection(hasSelection ? window.getSelection() : null);
      } else {
        setIsFloatingButtonVisible(false);
        setIsSelection(null);
      }
    } else {
      setIsFloatingButtonVisible(false);
    }
  };
  function getClosestElementForSelection() {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
      return null; // No selection or empty selection
    }

    const range = selection.getRangeAt(0);
    const commonAncestorContainer = range.commonAncestorContainer;

    // If the common ancestor is the text node, get its parentElement
    let closestElement =
      commonAncestorContainer.nodeType === Node.TEXT_NODE
        ? commonAncestorContainer.parentElement
        : commonAncestorContainer;

    const classNameRegex = /highlighted-component/;

    while (closestElement) {
      if (closestElement.classList) {
        for (const className of closestElement.classList) {
          if (className.match(classNameRegex)) {
            return closestElement;
          }
        }
      }
      closestElement = closestElement.parentElement;
    }

    return null; // If no element with the desired classname is found
  }

  const handleHighlightClick = (color) => {
    onApplyHighlights(color);
    hideFloatingButton();
  };

  const hideFloatingButton = () => {
    setIsFloatingButtonVisible(false);
    setSelection(null);
    setToolRef(null);
    onClose();
  };
  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSaveClick = () => {
    if (isEditingComment) {
      handleUpdateComment(false, commentText);
    } else {
      onApplyComments(commentText);
    }
    onSetFullView({ openTextarea: false, isEditingComment: false });
    setCommentText("");
    document.querySelector(".popup")?.classList.remove("visible");
  };
  const modalRect = document
    .querySelector(".smart-reader-modal")
    ?.getBoundingClientRect();

  return (
    <>
      {openTextarea && (
        <div
          className={`sidebar `}
          style={{ left: leftSpace, top: TopSpace }}
          ref={ref}
        >
          <textarea
            type="textarea"
            className="comment-textarea"
            value={commentText}
            name="textValue"
            onSelect={(e) => e.preventDefault()}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-end pe-0">
            <button
              className="save-comment-button px-4"
              title="Save Comment"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {isFloatingButtonVisible &&
        isSelection &&
        selection &&
        selection.rangeCount === 1 && (
          <div
            style={{
              position: "absolute",
              top: isOpenInModal
                ? selection?.getRangeAt(0).getBoundingClientRect().top -
                  modalRect.y -
                  40
                : selection?.getRangeAt(0).getBoundingClientRect().top +
                  window.pageYOffset -
                  80,
              left: isOpenInModal
                ? selection?.getRangeAt(0).getBoundingClientRect().left -
                  modalRect.x +
                  selection?.getRangeAt(0).getBoundingClientRect().width / 2 -
                  10
                : selection?.getRangeAt(0).getBoundingClientRect().left +
                  window.pageXOffset +
                  selection?.getRangeAt(0).getBoundingClientRect().width / 2 -
                  10,
            }}
            className="d-flex highlight-tooltip-box"
          >
            <div className="d-flex justify-content-between text-white flex-wrap gap-3 px-1">
              <div ref={commentRef}>
                <FaComment
                  className="annotations-icons unselectable commentBtn cursor-pointer"
                  onClick={toggleSidebar}
                  id="annote-icon"
                  title="Add a Comment"
                />
              </div>

              <HighlightColorBox
                onClick={handleHighlightClick}
                onClose={onClose}
                selection={isSelection}
                isOpenInModal={isOpenInModal}
              />
            </div>
          </div>
        )}
    </>
  );
};

export default Tooltip;
