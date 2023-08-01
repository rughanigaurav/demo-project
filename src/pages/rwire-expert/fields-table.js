import React, { useState } from "react";
import { data } from "./fields.js";
import { Input } from "rsuite";
import "./expert-page.scss";
const TableRaw = ({
  data,
  onSetApp,
  clickOnField,
  onSetAllField,
  tabWiseSearchQuery: { expert: expertQuery },
  tabWiseSearchQuery,
}) => {
  const handleClickField = () => {
    onSetApp({ clickOnField: !clickOnField, selectedField: data.shortcode });
    let temp = "";
    if (expertQuery === "") {
      temp = data.shortcode + "=()";
    } else {
      temp = expertQuery + " OR " + data.shortcode + "=()";
    }

    onSetAllField({
      tabWiseSearchQuery: { ...tabWiseSearchQuery, expert: temp },
    });
  };

  return (
    <div className="table_row cursor-pointer" onClick={handleClickField}>
      <div className="col-field text-left padding_row font_row">
        {data.field}
      </div>
      <div className="col-shortcode padding_row font_row">{data.shortcode}</div>
    </div>
  );
};

const FieldsTable = (props) => {
  const [search, setSearch] = useState("");

  const {
    onSetApp,
    clickOnField,
    onSetAllField,
    tabWiseSearchQuery: { expert: expertQuery },
    tabWiseSearchQuery,
  } = props;

  const keys = ["field", "shortcode"];

  return (
    <>
      <div className="searchbar">
        <Input
          className="expert-suggestion-searchbar"
          onChange={(e) => setSearch(e.toLowerCase())}
          placeholder="Search for field"
        />
      </div>
      <div className="expert-keywords-suggestion-table">
        <div className="table_row">
          <div className="col-field header-row text-left padding_row font_row">
            Field
          </div>
          <div className="col-shortcode header-row padding_row font_row">
            Code
          </div>
        </div>

        {data
          .filter((item) => {
            return keys.some((key) => item[key].toLowerCase().includes(search));
          })
          .map((item, i) => (
            <TableRaw
              data={item}
              key={i}
              onSetApp={onSetApp}
              clickOnField={clickOnField}
              onSetAllField={onSetAllField}
              expertQuery={expertQuery}
              tabWiseSearchQuery={tabWiseSearchQuery}
            />
          ))}
      </div>
    </>
  );
};

export default FieldsTable;
