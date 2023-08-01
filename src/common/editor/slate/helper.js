import React from "react";
import {
  Editor,
  Transforms,
  Range,
  Element as SlateElement,
} from "slate";
import isUrl from "is-url";
import { isHotkey } from "./is-hotkey";
import slateHtml from "./slateHtml";

/**
 * Define the default node type.
 *
 * @type {String}
 */
export const DEFAULT_NODE = "paragraph"

export const initialValue = "<p></p>";

/**
 * Define hotkey matchers.
 */
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
}

/**
* On key down, if it's a formatting command toggle a mark.
*
* @param {Event} event
* @return {Change}
*/
export const onKeyDown = (event) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault()
      // const mark = HOTKEYS[hotkey]
      // toggleMark(editor, mark)
    }
  }
}

/**
* Render a Slate node.
*
* @param {Object} props { attributes, children, element }
* @return {Element}
*/
export const RenderElement = (props) => {
  const { attributes, children, element } = props;
  const textAlign = element.align;
  const color = element.color;
  let style = {};

  if (textAlign) {
    style.textAlign = textAlign;
  }

  if (color) {
    style.color = color;
  }

  switch (element.type) {

    case "block-quote":
      return <blockquote {...attributes} style={style}>{children}</blockquote>
    case "bulleted-list":
      return <ul {...attributes} style={style}>{children}</ul>
    case "heading-one":
      return <h1 {...attributes} style={style}>{children}</h1>
    case "heading-two":
      return <h2 {...attributes} style={style}>{children}</h2>
    case "list-item":
      return <li {...attributes} style={style}>{children}</li>
    case "numbered-list":
      return <ol {...attributes} style={style}>{children}</ol>
    case "link":
      const href = element.url;
      return (
        <a {...attributes} href={href} style={style}>
          {children}
        </a>
      )
    case "token":
      return (
        <span {...attributes} style={{ color: "green" }}>
          {children}
        </span>
      )
    default:
      return (
        <div {...attributes} style={style}>
          {children}
        </div>
      )
  }
}


/**
* Render a Slate mark.
*
* @param {Object} props
* @return {Element}
*/
export const RenderMark = ({ attributes, children, leaf }) => {

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

// Get html string to slate object
export const getSlateValue = (value = "<p></p>") => {
  let document = new DOMParser().parseFromString(initialValue, 'text/html')

  if (typeof value === "string" && value.length > 0) {
    document = new DOMParser().parseFromString(value, 'text/html')
  }

  return slateHtml.deserialize(document.body);
}

export const withLinks = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Object} editor editor object
 * @param {String} url
 */

export const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Object} editor editor object
 */
export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}


/**
 * A change helper to standardize wrapping token.
 *
 * @param {Change} change
 * @param {String} text
 */

export const wrapToken = (change, text) => {
  change.wrapInline({
    type: 'token',
    data: { text },
  })

  change.collapseToEnd()
}

/**
 * A change helper to standardize unwrapping token.
 *
 * @param {Change} change
 */
export const unwrapToken = (change) => {
  change.unwrapInline('token');
}


const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  })
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

export const withHtml = editor => {
  const { insertData, isInline, isVoid } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const html = data.getData('text/html')

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html')
      const fragment = slateHtml.deserialize(parsed.body)
      Transforms.insertFragment(editor, fragment)
      return
    }

    insertData(data)
  }

  return editor
}
