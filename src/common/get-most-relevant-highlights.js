export const getMostRelevantHighlights = (highlightedData = []) => {
  if (highlightedData && highlightedData.length === 0) return "";

  let mostRelevantField = null;
  let highestRelevance = 0;

  for (const field in highlightedData) {
    if (highlightedData.hasOwnProperty(field)) {
      const highlights = highlightedData[field];

      // Calculated the relevance measure based on the number of <em> tags in the highlights
      const relevance = highlights.reduce((count, highlight) => {
        const emTagsCount = (highlight.match(/<em>/g) || []).length;
        return count + emTagsCount;
      }, 0);

      // Update the most relevant field if the current relevance is higher
      if (relevance > highestRelevance) {
        mostRelevantField = field;
        highestRelevance = relevance;
      }
    }
  }

  // Retrieve the most relevant field's highlights
  const relevantHighlights = highlightedData[mostRelevantField];

  let mostRelevantHighlight = "";
  let mostEmTagsCount = 0;

  for (const highlight of relevantHighlights) {
    const emTagsCount = (highlight.match(/<em>/g) || []).length;
    if (emTagsCount > mostEmTagsCount) {
      mostRelevantHighlight = highlight;
      mostEmTagsCount = emTagsCount;
    }
  }

  return mostRelevantHighlight;
};
