import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "rsuite";
import RwireViewModalHeader from "../rwire-view-modal-header";
import RwireModalBody from "./rwire-modal-body";
import "./rwire-view-modal.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { handleHighlightElastic } from "../../../common/handle-highlight-elastic";
import Tooltip from "../tooltip";
import AnnotationsActionButtons from "../annotations-action-buttons";

function RwireViewModal(props) {
  const {
    onSetFilter,
    isSmartReaderOpen,
    prevId,
    nextId,
    queryKeywordsHighlightColor,
    onSetDetails,
    selection,
    toolRef,
    setToolRef,
    handleClose,
    handleApplyHighlights,
    removeHighlight,
    totalHighlightedWords,
    isViewPageModalOpen,
    onSetFullView,
    handleUpdateComment,
    elementToRemoveHighlight,
    languageSelected,
    detailsData,
    isExact,
    userAnnotations,
    setField,
    setSelectionIndex,
    setSelection,
  } = props;
  const navigate = useNavigate();
  const handlePrevious = () => {
    sessionStorage.setItem("patentId", prevId);
    onSetFilter({ isViewPageModalOpen: false, isSmartReaderOpen: true });
    navigate(`/en/patent-view`);
  };
  const handleNext = () => {
    sessionStorage.setItem("patentId", nextId);
    onSetFilter({ isViewPageModalOpen: false, isSmartReaderOpen: true });
    navigate(`/en/patent-view`);
  };

  useEffect(() => {
    setTimeout(() => {
      handleHighlightElastic(
        queryKeywordsHighlightColor,
        totalHighlightedWords,
        onSetDetails
      );
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    onSetFilter({
      isViewPageModalOpen: false,
      isSmartReaderOpen: false,
    });
    if (props.isNotesModalOpen) {
      props.onSetNotes({ isNotesModalOpen: false });
    }
  };

  return (
    <Modal
      className="smart-reader-modal position-relative"
      open={true}
      static="static"
    >
      <AnnotationsActionButtons
        isSmartReaderOpen={isSmartReaderOpen}
        isViewPageModalOpen={isViewPageModalOpen}
        removeHighlight={removeHighlight}
        onSetFullView={onSetFullView}
        handleUpdateComment={handleUpdateComment}
      />

      <Tooltip
        setIsSelection={setSelection}
        isSelection={selection}
        tool={toolRef}
        setToolRef={setToolRef}
        onClose={handleClose}
        onApplyHighlights={handleApplyHighlights}
        isOpenInModal={true}
        openTextarea={props.openTextarea}
        onSetFullView={props.onSetFullView}
        onApplyComments={props.onApplyComments}
        elementToRemoveHighlight={elementToRemoveHighlight}
        setSelectionIndex={setSelectionIndex}
        setField={setField}
      />

      <div className="view-modal-close-btn">
        <IoMdClose
          className="modal__close"
          title="Close"
          onClick={handleCloseModal}
        />
      </div>
      {isSmartReaderOpen && (
        <div className="footer d-flex justify-content-between">
          <div className="prev d-flex justify-content-between">
            {prevId !== "" && prevId !== undefined && (
              <button onClick={handlePrevious}>
                <MdArrowBackIosNew className="icon" />{" "}
                <span className="pub-no">{prevId}</span>
              </button>
            )}
          </div>
          <div className="next d-flex justify-content-between">
            {nextId !== "" && nextId !== undefined && (
              <button onClick={handleNext} className="next">
                <span className="pub-no">{nextId}</span>{" "}
                <MdArrowForwardIos className="icon" />
              </button>
            )}
          </div>
        </div>
      )}
      <Modal.Header className="header">
        <RwireViewModalHeader
          {...props}
          detailsData={detailsData}
          onSetFilter={onSetFilter}
          totalHighlightedWords={totalHighlightedWords}
          isExact={isExact}
          queryKeywordsHighlightColor={queryKeywordsHighlightColor}
          languageSelected={languageSelected}
          userAnnotations={userAnnotations}
        />
      </Modal.Header>
      <Modal.Body>
        <RwireModalBody {...props} languageSelected={languageSelected} />
      </Modal.Body>
    </Modal>
  );
}

export default RwireViewModal;
