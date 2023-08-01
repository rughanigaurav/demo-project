import { Dropdown } from "rsuite";
import { fieldOptionsDate } from "../../../resources/data/options";
import { checkValidation } from "../../../common/date-validation";
const MAX_LENGTH = 14;

const DropDown = ({
  item,
  fieldData,
  index,
  setAllField,
  onSetApp,
  startDate,
  endDate,
}) => {
  const handleSelect = async (eventKey) => {
    const dtOp = fieldData.map((item, key) => {
      if (index === key) {
        return {
          ...item,
          query: eventKey[0],
          type: eventKey[1],
          startdate: "",
          enddate: "",
        };
      }
      return { ...item };
    });
    setAllField({ queryFields: dtOp });
    onSetApp({ smartSearchWord: "", isUpdateQuery: false });

    //We passed start and end date because after state set it's not found imediatlly
    const validData = await checkValidation({
      startDate,
      endDate,
      data: dtOp,
      index,
    });
    await setAllField({ queryFields: validData });
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

  return (
    <>
      <Dropdown
        title={
          item.type.length < MAX_LENGTH
            ? item.type
            : `${item.type.substring(0, MAX_LENGTH)}...`
        }
        onSelect={(e) => handleSelect(e)}
        onOpen={handleOpen}
        id={item.id}>
        {fieldOptionsDate.map((item, index) => {
          return (
            <Dropdown.Item
              key={index}
              title={item.valuecode}
              eventKey={[item.sortcode, item.valuecode]}>
              {item.valuecode}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </>
  );
};

export default DropDown;
