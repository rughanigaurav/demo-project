export const getBeatifyedQuery = (str) => {
  var _word = " AND ";
  var _word1 = " OR ";
  var _word2 = " ADJ ";
  var _word3 = " SAME ";
  var _word4 = " NEAR";
  var _word5 = " NOT ";
  var _word6 = " S ";

  var res =
    str &&
    str
      .replace(new RegExp(_word, "gi"), () => {
        return (
          '<span class="cm-atom" style="color:black;font-weight: bold">' +
          " AND " +
          "</span>"
        );
      })
      .replace(new RegExp(_word1, "gi"), () => {
        return (
          '<span class="cm-atom" style="color:black;font-weight: bold">' +
          " OR " +
          "</span>"
        );
      })
      .replace(new RegExp(_word2, "gi"), () => {
        return (
          '<span class="cm-atom" style="color:black;font-weight: bold">' +
          " ADJ " +
          "</span>"
        );
      })
      .replace(new RegExp(_word3, "gi"), () => {
        return (
          '<span class="cm-atom" style="color:black;font-weight: bold">' +
          " SAME " +
          "</span>"
        );
      })
      .replace(new RegExp(_word4, "gi"), () => {
        return (
          '<span class="cm-atom" style="color:black;font-weight: bold">' +
          " NEAR" +
          "</span>"
        );
      })
      .replace(new RegExp(_word5, "gi"), () => {
        return (
          '<span class="cm-atom" style="color:black;font-weight: bold">' +
          " NOT " +
          "</span>"
        );
      })
      .replace(new RegExp(_word6, "gi"), () => {
        return (
          '<span class="cm-atom" style="color:black;font-weight: bold">' +
          " S " +
          "</span>"
        );
      });

  return `<div> ${res} </div>`;
};
