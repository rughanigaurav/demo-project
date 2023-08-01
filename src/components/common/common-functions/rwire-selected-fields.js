const selectFields = (fieldName, e, onSet) => {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = null;
  }
  document.getElementById(fieldName).style.display = "block";
  if (onSet && typeof onSet === "function") {
    onSet({ activeTab: fieldName });
  }
  document
    .querySelectorAll(".tablink")
    .forEach((el) => el.classList.remove("active-filed"));
  e.currentTarget.classList.add("active-filed");
};

export default selectFields;
