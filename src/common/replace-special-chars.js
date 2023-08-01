const replaceSpecialChars = (str) => {
  return str
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;lt;", "<")
    .replaceAll("&amp;gt;", ">")
    .replaceAll("&<span class='highlight-word'>lt</span>;", "<")
    .replaceAll("&<span class='highlight-word'>gt</span>;", ">");
};

export default replaceSpecialChars;
