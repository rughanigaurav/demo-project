export const handleListScroll = () => {
  const items = Array.from(document.getElementsByClassName("rs-dropdown-menu"));
  document.getElementsByClassName("fields-form")[0].addEventListener("scroll", () => {
    const allNode = Array.from(
      document.getElementsByClassName("rs-dropdown-menu"),
    );

    allNode.forEach((element) => {
      element.setAttribute("hidden", true);
    });
  });
  items.forEach((e) => {
    let rect = e.parentElement
      .getElementsByTagName("button")[0]
      .getBoundingClientRect();

    let modalRect = { left: 0, top: 0 };

    if (Array.from(document.getElementsByClassName("rs-modal-dialog"))[0]) {
      modalRect = Array.from(
        document.getElementsByClassName("rs-modal-dialog")
      )[0].getBoundingClientRect();
    }

    e.setAttribute(
      "style",
      `left: ${rect.left - modalRect.left + (rect.width - 5)}px;
        top: ${rect.top - modalRect.top}px !important`
    );
  });

  const itemsInner = Array.from(document.getElementsByClassName("rs-dropdown-inner-menu"));

  itemsInner.forEach((e) => {
    let rect = e.parentElement
      .getBoundingClientRect();

    let modalRect = { left: 0, top: 0 };

    if (Array.from(document.getElementsByClassName("rs-modal-dialog"))[0]) {
      modalRect = Array.from(
        document.getElementsByClassName("rs-modal-dialog")
      )[0].getBoundingClientRect();
    }

    e.setAttribute(
      "style",
      `left: ${rect.left - modalRect.left + (rect.width - 5)}px;
        top: ${rect.top - modalRect.top}px !important`
    );
  });
};
