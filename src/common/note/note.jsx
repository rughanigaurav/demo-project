import React, { useState, useMemo } from "react";
import { withReact } from "slate-react";
import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { withHtml, withLinks } from "../editor/slate/helper";
import SlateEditor from "../editor";
import "./style.scss";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";

const RwireNote = (props) => {
  const { onSetNotes, isNotesModalOpen, onAddNote, notes, isDarkMode } = props;
  const [note, setNote] = useState(notes);
  const handleChange = (value) => {
    setNote(value);
  };

  const handleAddNote = () => {
    onAddNote(note);
  };
  const editor = useMemo(
    () => withHtml(withLinks(withHistory(withReact(createEditor())))),
    [],
  );
  const handleClear = () => {
    // loop delete all
    editor.children.forEach((item) => {
      Transforms.delete(editor, { at: [0] });
    });

    // reset init
    editor.children = [
      {
        type: "p",
        children: [{ text: "" }],
      },
    ];
  };
  return (
    <div className={`${isNotesModalOpen ? "open" : "close"} note-modal `}>
      <div
        className="close-icon"
        onClick={() => onSetNotes({ isNotesModalOpen: false })}>
        X
      </div>
      <div className="note-modal-body">
        <div className="full-loader">
          <SlateEditor
            name="notes"
            value={note}
            onChange={handleChange}
            isDarkMode={isDarkMode}
            editor={editor}
          />
        </div>

        <div className="__footer">
          <RWireButton
            cNameDiv="search-query ps-3"
            buttonCName="input-button-text-form"
            name="Clear"
            onClick={handleClear}
          />
          <RWireButton
            cNameDiv="search-query ps-3"
            buttonCName={`input-button-text-form`}
            name="Save"
            onClick={handleAddNote}
          />
        </div>
      </div>
    </div>
  );
};

export default RwireNote;
