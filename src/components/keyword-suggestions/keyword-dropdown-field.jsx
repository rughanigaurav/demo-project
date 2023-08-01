import { Dropdown } from "rsuite";
import { keywordFieldsOptions } from "../../resources/data/options";
const MAX_LENGTH = 14;

const KeywordDropdown = (props) => {
  const { onSetQueryField, queryField } = props;

  const handleSelect = (eventKey) => {
    onSetQueryField({ title: eventKey[0], code: eventKey[1] });
  };

  const handleOpen = () => {
    const elem = document.getElementById("keyword-dropdown").parentElement;
    const rect = elem.getElementsByTagName("button")[0].getBoundingClientRect();
    let modalRect = { left: 0, top: 0 };

    if (Array.from(document.getElementsByClassName("rs-modal-content"))[0]) {
      modalRect = Array.from(
        document.getElementsByClassName("rs-modal-content"),
      )[0].getBoundingClientRect();
    }
    const bottom = rect.top + 250 > window.innerHeight ? "10px" : "auto";

    elem.getElementsByClassName("rs-dropdown-menu")[0].setAttribute(
      "style",
      `left: ${rect.left - modalRect.left}px;
      top: ${rect.top - modalRect.top + 36}px !important;
      bottom: ${bottom} !important`,
    );
  };

  return (
    <div title={queryField.title}>
      <Dropdown
        title={
          queryField.title.length < MAX_LENGTH
            ? queryField.title
            : `${queryField.title.substring(0, MAX_LENGTH)}...`
        }
        onSelect={(e) => handleSelect(e)}
        onOpen={handleOpen}
        id="keyword-dropdown">
        {keywordFieldsOptions.map((item, index) => {
          return (
            <Dropdown.Item
              key={index}
              title={item.title}
              eventKey={[item.title, item.code]}>
              {item.title}
            </Dropdown.Item>
          );
        })}
      </Dropdown>

    </div>
  );
};

export default KeywordDropdown;
