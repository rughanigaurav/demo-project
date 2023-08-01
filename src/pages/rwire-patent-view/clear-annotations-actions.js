import React, { useRef, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import useClickOutside from "../../components/common/common-functions/useClickoutside";
const ClearAnnotationsActions = (props) => {
  const {
    onSetFullView,
    stringsComments,
    stringsHighlights,
    onUpdateUserAnnotations,
    detailsData,
  } = props;
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClickOutsideModal = () => {
    setMenuOpen(false);
  };
  useClickOutside(menuRef, handleClickOutsideModal);
  const handleClearHighlights = () => {
    onSetFullView({
      userAnnotations: stringsComments,
      stringsHighlights: [],
    });
    onUpdateUserAnnotations({
      body: "",
      publication_number: `${detailsData[`PN_B`]}`,
      type: "highlight",
    });
    setMenuOpen(false);
  };
  const handleClearComments = () => {
    onSetFullView({
      userAnnotations: stringsHighlights,
      stringsComments: [],
    });
    onUpdateUserAnnotations({
      body: "",
      publication_number: `${detailsData[`PN_B`]}`,
      type: "comment",
    });
    setMenuOpen(false);
  };
  const handleClearAnnotations = () => {
    onSetFullView({
      userAnnotations: [],
      stringsHighlights: [],
      stringsComments: [],
    });
    onUpdateUserAnnotations({
      body: "",
      publication_number: `${detailsData[`PN_B`]}`,
      type: "comment",
    });
    onUpdateUserAnnotations({
      body: "",
      publication_number: `${detailsData[`PN_B`]}`,
      type: "highlight",
    });
    setMenuOpen(false);
  };
  return (
    <div className="pt-1 position-relative">
      <div onClick={() => setMenuOpen(true)}>
        <BiDotsVertical className="more-options-button cursor-pointer" />
      </div>
      {menuOpen && (
        <div
          ref={menuRef}
          className="position-absolute py-1 d-flex flex-column clear-buttons-menu"
        >
          <div
            className="clear-button px-1 py-2 cursor-pointer"
            onClick={handleClearHighlights}
          >
            Clear Highlights
          </div>
          <div
            className="clear-button px-1 py-2 cursor-pointer"
            onClick={handleClearComments}
          >
            Clear Comments
          </div>
          <div
            className="clear-button px-1 py-2 cursor-pointer"
            onClick={handleClearAnnotations}
          >
            Clear Annotations
          </div>
        </div>
      )}
    </div>
  );
};

export default ClearAnnotationsActions;
