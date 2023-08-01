const truncateText = (text) => {
  if (text.length <= 1000) {
    return text;
  }
  const truncatedPassage = text.substring(0, 1000);
  const lastSpaceIndex = truncatedPassage.lastIndexOf(" ");

  return truncatedPassage.substring(0, lastSpaceIndex);
};

export default truncateText;
