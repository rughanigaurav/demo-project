import React, { useState, useEffect } from "react";
import collapse from "../../assets/images/collapse.png";
import HighLighter from "../../common/highlightFunction";

function CPCTable(props) {
  const {
    cpcd = [],
    onSearchForClassAndKeyword,
    extraClass,
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
    classesTableData,
  } = props;

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    onSearchForClassAndKeyword(cpcd, "cpc");
  }, [cpcd, onSearchForClassAndKeyword]);

  return (
    <>
      {classesTableData.cpc && classesTableData.cpc.length > 0 && (
        <div className={`view-tables ${extraClass ? extraClass : ""}`}>
          <table className="p-0">
            <thead className="table border table-borderless">
              <tr>
                <th className="classification-first-col">CPC Classes</th>
                <th style={{ borderRight: "none" }}>Definition</th>
                <th
                  className="close-classification"
                  scope="col"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <img
                    alt=""
                    src={collapse}
                    className="close-classification-btn"
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {toggle &&
                classesTableData.cpc.map((cpc) => {
                  let text = cpc._source.definition;
                  let code = cpc._source.code;
                  return (
                    <tr>
                      <td
                        className="classification-first-col"
                        dangerouslySetInnerHTML={{
                          __html: HighLighter(
                            code[0],
                            highlightword,
                            isExact,
                            queryKeywordsHighlightColor
                          ),
                        }}
                      ></td>
                      <td
                        style={{ borderRight: "none" }}
                        dangerouslySetInnerHTML={{
                          __html: HighLighter(
                            text,
                            highlightword,
                            isExact,
                            queryKeywordsHighlightColor
                          ),
                        }}
                      ></td>
                      <td></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default CPCTable;
