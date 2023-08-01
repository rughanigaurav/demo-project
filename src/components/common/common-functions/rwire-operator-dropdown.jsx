import Select from "react-select";
const options = [
  { value: "AND", label: "AND" },
  { value: "OR", label: "OR" },
  { value: "NOT", label: "NOT" },
];

const OperatorDropDown = ({
  fieldData,
  currentIndex,
  onSetField,
  onSetApp,
  item,
}) => {
  const handleSelect = (event) => {
    const opData = fieldData.map((i, key) => {
      if (currentIndex === key) {
        return {
          ...i,
          operatersvalue: event.value,
        };
      } else {
        return { ...i };
      }
    });

    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    onSetField({ queryFields: opData });
  };

  const defaulValue =
    item && item.operatersvalue
      ? { label: item.operatersvalue, value: item.operatersvalue }
      : { value: "AND", label: "AND" };

  const handleMenuOpen = (e) => {
    const allOperatorSelecorNode = Array.from(
      document.getElementsByClassName("operator-dropdown")
    );
    let modalRect = { left: 0, top: 0 };

    if (Array.from(document.getElementsByClassName("rs-modal-dialog"))[0]) {
      modalRect = Array.from(
        document.getElementsByClassName("rs-modal-dialog")
      )[0].getBoundingClientRect();
    }

    allOperatorSelecorNode.forEach((e) => {
      let rect = e.getBoundingClientRect();

      setTimeout(() => {
        e.getElementsByClassName("select-dropdown__menu")[0] &&
          e.getElementsByClassName("select-dropdown__menu")[0].setAttribute(
            "style",
            `opacity:1; position: fixed;
          left: ${rect.left - modalRect.left}px;
          top: ${rect.bottom - modalRect.top - 5}px !important`
          );
      }, 10);
    });
  };

  return (
    <div className={`operator-selector operator-dropdown`}>
      <Select
        options={options}
        className={`select-dropdown `}
        classNamePrefix="select-dropdown"
        onChange={(event) => handleSelect(event, currentIndex)}
        isSearchable={false}
        value={defaulValue}
        placeholder={"Select"}
        closeMenuOnScroll={() => true}
        onMenuOpen={handleMenuOpen}
        styles={{
          option: (provided) => ({
            ...provided,
            fontSize: 12,
            cursor: "pointer",
            color: "#000",
            fontWeight: 500,
          }),
          control: (styles) => ({
            ...styles,
            cursor: "pointer",
            fontSize: 12,
          }),
        }}
      />
    </div>
  );
};

export default OperatorDropDown;
