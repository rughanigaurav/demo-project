import React, { useEffect } from "react";
import noteIcon from "../../assets/images/note.svg";
import noteIconActive from "../../assets/images/note-active.svg";

const RwireNotes = (props) => {
  const { onSetNotes, notes, onGetNotes } = props;
  useEffect(() => {
    onGetNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="notes-icon pe-2 cursor-pointer">
      <div className="text-center">
        <img
          src={
            !notes || notes === '<p style=""></p>' ? noteIcon : noteIconActive
          }
          width="30"
          alt=""
          onClick={() => onSetNotes({ isNotesModalOpen: true })}
        />
      </div>
    </div>
  );
};

export default RwireNotes;
