import React, { useState } from "react";
import { FaHighlighter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Modal } from "rsuite";
import RwireHighlight from "../rwire-search-result/rwire-highlight";
import RwireCustomize from "../rwire-search-result/rwire-customize";

const RwireHighlightIcon = (props) => {

  const {
    totalHighlightedWords,
    queryKeywordsHighlightColor,
    onSetDetails
   } = props;


  const [highlightToggle, setHighlightToggle] = useState(false);
  const [isCustomizeModal, setCustomizeModal] = useState(false);

  const handleHighlightElastic = (
    filteredHighlightedWords = [],
    removedWord = "",
  ) => {
    let highlightData = [];
    highlightData = Array.from(
      document.getElementsByClassName("highlight-word"),
    );
    let wordsArray =
      filteredHighlightedWords && filteredHighlightedWords.length
        ? [...filteredHighlightedWords]
        : [...totalHighlightedWords];
    highlightData &&
      highlightData.forEach((i) => {
        let searchWord = i.textContent.toLocaleLowerCase();
        if (!wordsArray.includes(searchWord) && searchWord !== removedWord) {
          wordsArray.push(searchWord);
        }
        i.style.backgroundColor =
          queryKeywordsHighlightColor[[wordsArray.indexOf(searchWord)]];
      });
    onSetDetails({ totalHighlightedWords: wordsArray });
  };

  return (
    <>
      {highlightToggle && (
        <Modal
          className="modalClassFilter"
          static="static"
          keyboard={false}
          open={true}>
          <div
            className="highlight-modal-close-btn"
            onClick={() => setHighlightToggle(false)}>
            <IoMdClose className="modal__close" title="Close" />
          </div>
          <RwireHighlight
            {...props}
            onHandleHighlightElastic={handleHighlightElastic}
            setCustomizeModal={setCustomizeModal}
            isCustomizeModal={isCustomizeModal}
          />
        </Modal>
      )}
      {isCustomizeModal && (
        <Modal className="modalCustomizeFilter" open={true} static="static">
          <RwireCustomize
            {...props}
            onHandleHighlightElastic={handleHighlightElastic}
            setCustomizeModal={setCustomizeModal}
            isCustomizeModal={isCustomizeModal}
          />
        </Modal>
      )}

      <div className="notes-icon pe-2 cursor-pointer">
        <div className="text-center" onClick={() => setHighlightToggle(true)}>
          <FaHighlighter size={30} color="#435e99" />
        </div>
      </div>
    </>
  );
};

export default RwireHighlightIcon;
