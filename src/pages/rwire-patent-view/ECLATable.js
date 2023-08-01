import React, { useState } from "react";
import collapse from "../../assets/images/collapse.png";
import HighLighter from "../../common/highlightFunction";

function ECLATable(props) {
  const { ecla, extraClass, highlightword,isExact, queryKeywordsHighlightColor } = props;
  const [toggle, setToggle] = useState(true);

  return (
    <>
      {ecla && ecla.length > 0 && (
        <div className={`view-tables ${extraClass ? extraClass : ""}`}>
          <table className="p-0">
            <thead className="table border table-borderless">
              <tr>
                <th className="classification-first-col">ECLA Classes</th>
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
                ecla.map((ecla) => {
                  return (
                    <tr>
                      <td className="classification-first-col"
                      dangerouslySetInnerHTML={{
                        __html: HighLighter(
                          ecla,
                          highlightword,
                          isExact,
                          queryKeywordsHighlightColor
                        ),
                      }}
                      ></td>
                      <td style={{ borderRight: "none" }}>XXXXXXXXX</td>
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

export default ECLATable;
