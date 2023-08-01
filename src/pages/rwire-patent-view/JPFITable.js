import React, { useState } from "react";
import collapse from "../../assets/images/collapse.png";
import HighLighter from "../../common/highlightFunction";

function JPFITable(props) {
  const { jpfi, extraClass, highlightword,isExact, queryKeywordsHighlightColor } = props;
  const [toggle, setToggle] = useState(true);

  return (
    <>
      {jpfi && jpfi.length > 0 && (
        <div className={`view-tables ${extraClass ? extraClass : ""}`}>
          <table className="p-0">
            <thead className="table border table-borderless">
              <tr>
                <th className="classification-first-col">JPFI Classes</th>
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
                jpfi.map((jpfi) => {
                  return (
                    <tr>
                      <td className="classification-first-col"
                      dangerouslySetInnerHTML={{
                        __html: HighLighter(
                          jpfi,
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

export default JPFITable;
