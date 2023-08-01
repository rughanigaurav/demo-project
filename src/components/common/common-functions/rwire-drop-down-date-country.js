import { Dropdown } from "rsuite";
import { fieldOptionsCountry } from "../../../resources/data/options";
const MAX_LENGTH = 14;

const DropDown = ({ item, fieldData, index, setAllField, onSetApp }) => {
  const handleSelect = (eventKey) => {
    const dtOp = fieldData.map((item, key) => {
      if (index === key) {
        return {
          ...item,
          query: eventKey[0],
          type: eventKey[1],
          placeholder: eventKey[2],
        };
      }
      return { ...item };
    });
    setAllField({ queryFields: dtOp });
    onSetApp({ smartSearchWord: "", isUpdateQuery: false });

    const allNode = Array.from(
      document.getElementsByClassName("rs-dropdown-menu")
    );

    allNode.forEach((element) => {
      element.setAttribute("hidden", true);
    });
  };

  const handleOpen = () => {
    const elem = document.getElementById(item.id).parentElement;
    const rect = elem.getElementsByTagName("button")[0].getBoundingClientRect();
    let modalRect = { left: 0, top: 0 };

    if (Array.from(document.getElementsByClassName("rs-modal-dialog"))[0]) {
      modalRect = Array.from(
        document.getElementsByClassName("rs-modal-dialog")
      )[0].getBoundingClientRect();
    }
    const top =
      rect.top + 250 > window.innerHeight
        ? "auto"
        : `${rect.top - modalRect.top}px`;
    const bottom = rect.top + 250 > window.innerHeight ? "10px" : "auto";

    elem.getElementsByClassName("rs-dropdown-menu")[0].setAttribute(
      "style",
      `left: ${rect.left - modalRect.left + (rect.width - 5)}px;
      top: ${top} !important;
      bottom: ${bottom} !important`
    );
  };

  const handleListEnter = (e) => {
    if (!Array.from(e.target.classList).includes("inner")) {
      const allNode = Array.from(
        document.getElementsByClassName("rs-dropdown-inner-menu")
      );

      document
        .getElementsByClassName("fields-form")[0]
        .addEventListener("scroll", () => {
          const allNode = Array.from(
            document.getElementsByClassName("rs-dropdown-menu")
          );

          allNode.forEach((element) => {
            element.setAttribute("hidden", true);
          });
        });

      let modalRect = { left: 0, top: 0 };
      let isModel = false;

      if (Array.from(document.getElementsByClassName("rs-modal-dialog"))[0]) {
        modalRect = Array.from(
          document.getElementsByClassName("rs-modal-dialog")
        )[0].getBoundingClientRect();
        isModel = true;
      }

      allNode.forEach((element) => {
        element.classList.add("d-none");
      });
      if (e.target.getElementsByTagName("ul")[0]) {
        e.target.getElementsByTagName("ul")[0].classList.remove("d-none");
        let rect = e.target.getBoundingClientRect();
        const bottom =
          rect.top + 250 > window.innerHeight
            ? isModel
              ? "-100px"
              : "0"
            : "auto";
        e.target.getElementsByTagName("ul")[0].setAttribute(
          "style",
          `left: ${rect.left - modalRect.left + (rect.width - 5)}px;
        top: ${rect.top - modalRect.top}px !important;
        bottom: ${bottom};
        overflow: auto;`
        );
      }
    }
  };

  return (
    <Dropdown
      title={
        item.type.length < MAX_LENGTH
          ? item.type
          : `${item.type.substring(0, MAX_LENGTH)}...`
      }
      onSelect={(e) => handleSelect(e)}
      onOpen={handleOpen}
      id={item.id}>
      {fieldOptionsCountry.map((item, index) => {
        return item.valuecode ? (
          <Dropdown.Item
            key={index}
            title={item.valuecode}
            onMouseEnter={handleListEnter}
            eventKey={[item.sortcode, item.valuecode]}>
            {item.valuecode}
          </Dropdown.Item>
        ) : (
          <li
            key={index}
            className="outer"
            onMouseEnter={handleListEnter}
            title={Object.keys(item)[0]}>
            <span>{Object.keys(item)[0]}</span>
            <ul className=" rs-dropdown-inner-menu d-none">
              {Object.values(item)[0].map((item, index) => {
                return (
                  <li
                    className="inner"
                    key={index}
                    onClick={() =>
                      handleSelect([item.sortcode, item.valuecode, item.placeholder])
                    }
                    title={item.valuecode}>
                    <span>{item.valuecode}</span>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </Dropdown>
  );
};

export default DropDown;
