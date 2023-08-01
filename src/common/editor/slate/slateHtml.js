import escapeHtml from "escape-html";
import { Text } from "slate";
import { jsx } from "slate-hyperscript";

const ELEMENT_TAGS = {
  A: (el) => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "block-quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  IMG: (el) => ({ type: "image", url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  DIV: () => ({ type: "paragraph" }), // Use div as P tag for copy/paste on editor
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" }),
};

// Inline marks
const serializeInlineNode = {
  bold: "strong",
  underline: "u",
  italic: "em",
  code: "code",
  strikethrough: "del",
};

// Get inline flag from html tag
const getInlineMarkFlag = (element = {}) => {
  let inlineMarks = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(serializeInlineNode).map((mrk) => {
    const hasMark = element.getAttribute(mrk) === "true";
    if (hasMark) {
      inlineMarks[mrk] = true;
    }
  });

  return inlineMarks;
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: (el) => ({ code: true, ...getInlineMarkFlag(el) }),
  DEL: (el) => ({ strikethrough: true, ...getInlineMarkFlag(el) }),
  EM: (el) => ({ italic: true, ...getInlineMarkFlag(el) }),
  I: (el) => ({ italic: true, ...getInlineMarkFlag(el) }),
  S: (el) => ({ strikethrough: true, ...getInlineMarkFlag(el) }),
  STRONG: (el) => ({ bold: true, ...getInlineMarkFlag(el) }),
  U: (el) => ({ underline: true, ...getInlineMarkFlag(el) }),
};

export const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  let children = Array.from(parent.childNodes).map(deserialize);
  if (!children || children.length === 0) {
    children = [{ text: "" }];
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

export const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);

    // Set multiple mark at inline
    const nestedInlineMark = Object.keys(node);
    const tagArgs = nestedInlineMark
      .map((nodeKey) => {
        const markTagName = serializeInlineNode[nodeKey];
        if (markTagName && node[nodeKey]) {
          return `${nodeKey}="true"`;
        }
        return "";
      })
      .join(" ");

    if (node.bold) {
      string = `<strong ${tagArgs}>${string}</strong>`;
    } else if (node.underline) {
      string = `<u ${tagArgs}>${string}</u>`;
    } else if (node.italic) {
      string = `<em ${tagArgs}>${string}</em>`;
    } else if (node.code) {
      string = `<code ${tagArgs}>${string}</code>`;
    } else if (node.strikethrough) {
      string = `<del ${tagArgs}>${string}</del>`;
    }
    return string;
  } else if (Array.isArray(node)) {
    return node.map(serialize).join("");
  }

  const children = node.children.map(serialize).join("");
  let style = "";
  // const align = node.textAlign || "";
  // if (align) {
  //   style += `text-align: ${align};`;
  // }
  if (node.color) {
    style += `color: ${node.color};`;
  }

  switch (node.type) {
    // Listing and item
    case "bulleted-list":
      return `<ul style="${style}">${children}</ul>`;
    case "list-item":
      return `<li style="${style}">${children}</li>`;
    case "numbered-list":
      return `<ol style="${style}">${children}</ol>`;

    case "heading-one":
      return `<h1 style="${style}">${children}</h1>`;
    case "heading-two":
      return `<h2 style="${style}">${children}</h2>`;

    case "block-quote":
      return `<blockquote style="${style}">${children}</blockquote>`;

    case "paragraph":
      return `<p style="${style}">${children}</p>`;
    case "link":
      return `<a style="${style}" href="${escapeHtml(
        node.url,
      )}">${children}</a>`;

    case "bold":
      return `<strong style="${style}">${children}</strong>`;
    case "code":
      return `<code style="${style}">${children}</code>`;
    case "italic":
      return `<em style="${style}">${children}</em>`;
    case "underline":
      return `<u style="${style}">${children}</u>`;

    default:
      return children;
  }
};

// Get html string to slate object
export const getSlateValue = (value = "<p></p>") => {
  let document = new DOMParser().parseFromString(value, "text/html");

  if (typeof value === "string" && value.length > 0) {
    document = new DOMParser().parseFromString(value, "text/html");
  }

  return deserialize(document.body);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deserialize,
  serialize,
};
