export function handleHighlightElastic(
  queryKeywordsHighlightColor,
  totalHighlightedWords = [],
  onSetDetails
) {
  let highlightData = [];
  highlightData = Array.from(document.getElementsByClassName("highlight-word"));

  let wordsArray = [...totalHighlightedWords];

  // eslint-disable-next-line array-callback-return
  highlightData &&
    // eslint-disable-next-line array-callback-return
    highlightData.map((i, index) => {
      let searchWord = i.textContent.toLocaleLowerCase();
      if (!wordsArray.includes(searchWord)) {
        wordsArray.push(searchWord);
      }
      // i.classList.add(`highlight-${wordsArray.indexOf(searchWord)}`);
      i.style.backgroundColor =
        queryKeywordsHighlightColor[[wordsArray.indexOf(searchWord)]];
    });
  // onSetDetails({ esHighlightwords: wordsArray ? wordsArray : [] });
}
