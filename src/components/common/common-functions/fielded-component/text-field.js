import React from "react";
import { Trans } from "react-i18next";
import DropDownList from "../rwire-drop-down";
import RwireFieldedInputTextarea from "../rwire-fielded-inputTextarea";
// import OperatorDropDown from "../rwire-operator-dropdown";
import Operator from "../rwire-operator-dropdown";

const TextField = (props) => {
  const {
    index,
    item,
    fieldData,
    setAllField,
    allinputvalue,
    onSetApp,
    onChange,
    onKeyDown,
    textCondition,
    addFielded,
    onRemoveItem,
    plus,
    minus,
  } = props;
  return (
    <div key={index} className="status-state-type-pub">
      <div className="status-main status-main-overflow  status-main-for-input">
        <div title={item.type}>
          <DropDownList
            item={item}
            fieldData={fieldData}
            index={index}
            setAllField={setAllField}
            allinputvalue={allinputvalue}
            onSetApp={onSetApp}
          />
        </div>
        <div className="check-status check-status-relative ">
          <Trans>
            <RwireFieldedInputTextarea
              onChange={onChange}
              onKeyDown={onKeyDown}
              item={item}
              index={index}
              value={item.filedsinput !== " " ? item.filedsinput : ""}
            />
          </Trans>
        </div>
        <Operator
          currentIndex={index}
          onSetField={setAllField}
          fieldData={fieldData}
          onSetApp={onSetApp}
          item={item}
        />
        <button
          type="button"
          className={`status-button status-plus ${
            textCondition.length === 1 ? "status-plus-single" : ""
          }`}
          onClick={() =>
            addFielded({
              item: { ...item, filedsinput: "" },
              index,
              fromDate: false,
            })
          }
        >
          <img src={plus} alt="" />
        </button>

        {textCondition.length > 1 ? (
          <button
            type="button"
            className="status-button status-plus radius-minus"
            onClick={onRemoveItem}
          >
            <img src={minus} alt="" />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TextField;
