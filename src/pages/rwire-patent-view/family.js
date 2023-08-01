import React, { useEffect } from "react";
import HighLighter from "../../common/highlightFunction";

function Family(props) {
  const {
    simpleFamily = [],
    mainFamily = [],
    domesticFamily = [],
    completeFamily = [],
    extendedFamily = [],
    extraClass = "",
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
  } = props;
  useEffect(() => {
    simpleFamily.join(" | ").replace(/| *$/, "");
  });
  return (
    <>
      {simpleFamily.length > 0 &&
      mainFamily.length > 0 &&
      domesticFamily.length > 0 &&
      completeFamily.length > 0 &&
      extendedFamily.length > 0 ? (
        <div className={`view-tables ${extraClass ? extraClass : ""}`}>
          <table className="legal__events">
            <thead className="table">
              <tr>
                <th>Family Type</th>
                <th>Family Members</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Simple</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: HighLighter(
                      (simpleFamily && simpleFamily.join(" | ")).replace(
                        /| *$/,
                        ""
                      ),
                      highlightword,
                      isExact,
                      queryKeywordsHighlightColor
                    ),
                  }}
                ></td>
              </tr>
              <tr>
                <td>Main</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: HighLighter(
                      (mainFamily && mainFamily.join(" | ")).replace(
                        /| *$/,
                        ""
                      ),
                      highlightword,
                      isExact,
                      queryKeywordsHighlightColor
                    ),
                  }}
                ></td>
              </tr>
              <tr>
                <td>Domestic</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: HighLighter(
                      (domesticFamily && domesticFamily.join(" | ")).replace(
                        /| *$/,
                        ""
                      ),
                      highlightword,
                      isExact,
                      queryKeywordsHighlightColor
                    ),
                  }}
                ></td>
              </tr>
              <tr>
                <td>Complete</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: HighLighter(
                      (completeFamily && completeFamily.join(" | ")).replace(
                        /| *$/,
                        ""
                      ),
                      highlightword,
                      isExact,
                      queryKeywordsHighlightColor
                    ),
                  }}
                ></td>
              </tr>
              <tr>
                <td>Extended</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: HighLighter(
                      (extendedFamily && extendedFamily.join(" | ")).replace(
                        /| *$/,
                        ""
                      ),
                      highlightword,
                      isExact,
                      queryKeywordsHighlightColor
                    ),
                  }}
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="pt-2">Data not available</p>
      )}
    </>
  );
}

export default Family;
