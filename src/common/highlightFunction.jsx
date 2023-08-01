const getRegEx = (prePostRegx, newHighlightRegex) =>
  new RegExp(
    `${prePostRegx}((?:${newHighlightRegex
      .join("|")
      .replaceAll("?", "[a-zA-Z0-9]")
      .replaceAll("*", "\\w*")}))${prePostRegx}`,
    "gi"
  );

const HighLighter = (
  text,
  highlight = [],
  isExact = true,
  queryKeywordsHighlightColor = [],
  span = ""
) => {
  if (highlight && !highlight.length) return text;
  let newhighlight = highlight;
  newhighlight = highlight && highlight.map((v) => `${v.toLowerCase()}`);
  let newHighlightRegex = newhighlight;
  let prePostRegx = "\\b";
  if (!isExact) {
    prePostRegx = "";
  }

  const regularExpresionForMatchWords = getRegEx(
    prePostRegx,
    newHighlightRegex
  );

  const parts =
    highlight && highlight.length > 0
      ? text && text.split(regularExpresionForMatchWords)
      : [text];

  let combineArray = [];
  // eslint-disable-next-line array-callback-return
  parts &&
    parts
      .filter((i) => i)
      .forEach((part, i) => {
        let partLowerOrNot = "";
        partLowerOrNot = part && part.toLowerCase();
        newHighlightRegex &&
        part &&
        highlight &&
        highlight.length > 0 &&
        regularExpresionForMatchWords.test(partLowerOrNot.trim())
          ? combineArray.push(
              part.replaceAll(
                part.trim(),
                `<span class="highlight-word" key="${i}" style="background-color: ${
                  queryKeywordsHighlightColor[
                    [newhighlight.indexOf(partLowerOrNot.trim())]
                  ]
                }">${part.trim()}</span>`
              )
            )
          : combineArray.push(`${part}`);
      });
  return combineArray.join("").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
};

export default HighLighter;
