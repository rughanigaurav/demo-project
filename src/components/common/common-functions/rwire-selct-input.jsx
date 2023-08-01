import Select from "react-select";
import { uuidv4 } from "../../../action/app";
import { getOptions } from "../../../common/utils";
import "./select-input.scss";

export default function RWireSelectInput(props) {
  const { fieldData, setAllField, onSetApp } = props;

  const handleSelect = (name, event) => {
    const changedFields = fieldData.map((i) => {
      if (name === i.name) {
        return {
          ...i,
          filedsinput: event.value,
        };
      } else {
        return {
          ...i,
        };
      }
    });
    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    setAllField({ queryFields: changedFields });
  };
  return fieldData

    .filter((i) => i.type === "dropdown")
    .map((item, index) => {
      const defaulValue = item.filedsinput
        ? { label: item.filedsinput, value: item.filedsinput }
        : { value: "Select", label: "Select" };
      return (
        <div key={uuidv4()} className="d-flex main-status">
          <div className="select-state">
            <button className="select-buttons">{item.name}</button>
          </div>
          <div className="main-selector">
            <Select
              options={getOptions(item.code)}
              className={`select-dropdown ${
                index === 3 ? "last-dropdown" : ""
              } `}
              classNamePrefix="select-dropdown"
              onChange={(event) => handleSelect(item.name, event)}
              isSearchable={false}
              defaultValue={defaulValue}
              placeholder={"Select"}
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
        </div>
      );
    });
}
