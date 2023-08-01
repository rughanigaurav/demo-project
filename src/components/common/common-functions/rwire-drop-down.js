import { useEffect } from "react";
import { Dropdown } from "rsuite";
import { handleListScroll } from "../../../common/dropdown-position";
import { getFilteredOptions } from "../../../common/utils";

const MAX_LENGTH = 14;

const DropDownList = ({
  item,
  fieldData,
  index,
  setAllField,
  allinputvalue,
  onSetApp,
}) => {
  const handleSelect = (event) => {
    const changedFields = fieldData.map((i, k) => {
      if (index === k) {
        return {
          ...i,
          query: event[0],
          type: event[1],
          placeholder: event[2]
        };
      } else {
        return {
          ...i,
        };
      }
    });

    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    setAllField({ queryFields: changedFields });
    const allNode = Array.from(
      document.getElementsByClassName("rs-dropdown-menu"),
    );

    allNode.forEach((element) => {
      element.setAttribute("hidden", true);
    });
  };

  const dropDownOptions = getFilteredOptions({
    filterOptions: allinputvalue,
    fieldData,
    filedIndex: index,
  });

  const handleListEnter = (e) => {
    if (!Array.from(e.target.classList).includes("inner")) {
      const allNode = Array.from(
        document.getElementsByClassName("rs-dropdown-inner-menu"),
      );

      let modalRect = { left: 0, top: 0 };
      let isModel = false;

      if (Array.from(document.getElementsByClassName("rs-modal-dialog"))[0]) {
        modalRect = Array.from(
          document.getElementsByClassName("rs-modal-dialog"),
        )[0].getBoundingClientRect();
        isModel = true;
      }

      allNode.forEach((element) => {
        element.classList.add("d-none");
      });

      if (e.target.getElementsByTagName("ul")[0]) {
        e.target.getElementsByTagName("ul")[0].classList.remove("d-none");
        e.target
          .getElementsByTagName("ul")[0]
          .setAttribute("style", `overflow: unset`);
        let rect = e.target.getBoundingClientRect();
        let secondDropdownRect = e.target
          .getElementsByTagName("ul")[0]
          .getBoundingClientRect();
        const bottom =
          rect.top + secondDropdownRect.height > window.innerHeight
            ? isModel
              ? "-100px"
              : "0"
            : "auto";
        e.target.getElementsByTagName("ul")[0].setAttribute(
          "style",
          `left: ${rect.left - modalRect.left + (rect.width - 5)}px;
        top: ${rect.top - modalRect.top}px !important;
        overflow: auto;bottom: ${bottom};
        ;
        `,
        );
      }
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("scroll", handleListScroll);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("scroll", handleListScroll);
    };
  }, []);

  const handleOpen = (e) => {
    const allNode = Array.from(
      document.getElementsByClassName("rs-dropdown-inner-menu"),
    );

    allNode.forEach((element) => {
      element.classList.add("d-none");
    });

    handleListScroll();
  };

  return (
    <>
      <Dropdown
        title={
          item.type.length < MAX_LENGTH
            ? item.type
            : `${item.type.substring(0, MAX_LENGTH)}...`
        }
        onSelect={handleSelect}
        onOpen={handleOpen}
        id={item.id}>
        {dropDownOptions.map((data, index) => {
          return (
            <li
              key={index}
              className="outer"
              onMouseEnter={handleListEnter}
              title={Object.keys(data)[0]}>
              <span>{Object.keys(data)[0]}</span>
              <ul className=" rs-dropdown-inner-menu d-none">
                {Object.values(data)[0].map((item, key) => {
                  return (
                    <li
                      key={key}
                      className="inner"
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
    </>
  );
};

export default DropDownList;
