import React, { useCallback, useEffect, useState } from "react";
import { isHotkey } from "./is-hotkey";
import { Editable, Slate } from "slate-react";
import { Range, Editor } from "slate";
import { RenderElement, RenderMark, getSlateValue, toggleMark } from "./helper";
import Toolbar from "./toolbar";
import slateHtml from "./slateHtml";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const initialValue = [{ type: "paragraph", children: [{ text: " " }] }];

const SlateEditor = ({
  onChange,
  name,
  editorValue,
  readOnly,
  autoFocus,
  spellCheck,
  placeholder,
  isToken,
  isShowAfterInit = true,
  isDarkMode,
  editor,
}) => {
  const [isMounted, setMounted] = useState(false);
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <RenderMark {...props} />, []);

  const [target, setTarget] = useState();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const slateValue = getSlateValue(editorValue);
    setValue(slateValue);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeydown = useCallback(
    (event) => {
      handleKeydownHotkey(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, search, target],
  );

  const handleKeydownHotkey = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const handleChange = (newValue) => {
    const htmlString = slateHtml.serialize(newValue);
    onChange({ value: htmlString, name }); // Set to field
    setValue(newValue); // Set on slate editor

    if (!isToken) {
      return;
    }

    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: "word" });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      // eslint-disable-next-line no-useless-escape
      const beforeMatchRegex = /^[@\[]([\s\S]+)$/; // match start with @ or [
      const beforeMatch = beforeText && beforeText.match(beforeMatchRegex);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatchRegex = /^(\s|$)/;
      const afterMatch = afterText.match(afterMatchRegex);

      if (beforeMatch && afterMatch) {
        // Replace if search with @ to [
        const matchText = beforeMatch[0]
          ? beforeMatch[0].replace("@", "[")
          : "";
        setTarget(beforeRange);
        setSearch(matchText);
        setIndex(0);
        return;
      }
    }

    setTarget(null);
  };

  if (!isMounted && isShowAfterInit) {
    return "";
  }
  return (
    <div className="slate-editor">
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <Toolbar isDarkMode={isDarkMode} />
        <div className={`editor ? ${isDarkMode ? "dark-theme" : ""}`}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={handleKeydown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            readOnly={readOnly}
            spellCheck={spellCheck}
          />
        </div>
      </Slate>
    </div>
  );
};

export default SlateEditor;
