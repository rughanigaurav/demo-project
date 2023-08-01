import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { LangParser } from "./language-parser";
import { EditorView } from "@codemirror/view";
import { getBeatifyedQuery } from "./query-beautify";
import "./styles.scss";

const myTheme = createTheme({
  dark: "light",
  settings: {
    background: "#ffffff",
    foreground: "#4D4D4C",
    caret: "#AEAFAD",
    selection: "#D6D6D6",
    selectionMatch: "transparent",
    gutterBackground: "#FFFFFF",
    gutterForeground: "#4D4D4C",
    gutterBorder: "#ddd",
    gutterActiveForeground: "",
    lineHighlight: "#EFEFEF",
    lineNumbers: false,
    keyword: ["and"],
  },
  styles: [
    { tag: t.comment, color: "#787b80" },
    { tag: t.typeName, color: "#194a7b" },
    {
      tag: t.keyword,
      color: "#000000",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    { tag: t.bracket, color: "#000000" },
  ],
});

const ContentEditable = ({
  value,
  height = "500px",
  onChange,
  isReadOnly = false,
  isShowDummyWrapper = false
}) => {
  return (
    <div className="res-codemirror">
      {isShowDummyWrapper && (
        <div className="content-wrapper">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: getBeatifyedQuery(value) }}
          />
        </div>
      )}
      <CodeMirror
        value={value}
        theme={myTheme}
        onChange={(val) => {
          onChange(val);
        }}
        readOnly={isReadOnly}
        basicSetup={{
          lineNumbers: false,
          highlightActiveLineGutter: false,
          highlightActiveLine: false,
          foldGutter: false,
        }}
        extensions={[LangParser(), EditorView.lineWrapping]}
      />
    </div>
  );
};

export default ContentEditable;
