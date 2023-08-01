import React, { useState } from "react";
import Citations from "../citations";
import Classifications from "../classifications";
import ClassificationsChecks from "../classifications-checks";
import Family from "../family";
import LegalEvents from "../legal-events";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";

function RwireOtherBlock(props) {
  const {
    detailsData,
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
    classesTableData,
    onSearchForClassAndKeyword,
  } = props;
  const [classificationTablesToggle, setClassificationTablesToggle] =
    useState(true);
  const [CFValues, setCFValues] = useState(["A"]);
  const [citationsFilterValue, setCitationsFilterValue] = useState([
    "bcp",
    "fcp",
  ]);

  return (
    <div className="modal-others-block">
      <div
        className="classification-block mt-4 d-flex justify-content-between"
        style={{ scrollMarginTop: "125px" }}
      >
        <div className="cfBlock">
          <div className="d-flex">
            <h5
              className=""
              style={{ cursor: "pointer" }}
              onClick={() => {
                setClassificationTablesToggle(!classificationTablesToggle);
              }}
            >
              Classifications{" "}
              <ArrowDownLineIcon
                className="blackdrop"
                style={{
                  transform: `${
                    classificationTablesToggle
                      ? "rotate(180deg)"
                      : "rotate(0deg)"
                  }`,
                }}
              />{" "}
            </h5>
            <ClassificationsChecks
              setCFValues={setCFValues}
              CFValues={CFValues}
              cpcd={detailsData["CPCD"]}
              ipcd={detailsData["IPCD"]}
              us={detailsData["USD"]}
              jpfi={detailsData["JCL"]}
              ecla={detailsData["ECL"]}
              extraClass="modal-block"
              classesTableData={classesTableData}
            />
          </div>
          {classificationTablesToggle && (
            <Classifications
              cpcd={detailsData["CPCD"]}
              ipcd={detailsData["IPCD"]}
              us={detailsData["USD"]}
              jpfi={detailsData["JCL"]}
              ecla={detailsData["ECL"]}
              values={CFValues}
              extraClass="modal-block"
              queryKeywordsHighlightColor={queryKeywordsHighlightColor}
              highlightword={highlightword}
              isExact={isExact}
              classesTableData={classesTableData}
              onSearchForClassAndKeyword={onSearchForClassAndKeyword}
            />
          )}
        </div>
      </div>

      <div>
        <h5 className="legal-events-heading mt-4 mb-2">Families:</h5>
        <Family
          simpleFamily={detailsData["SF"]}
          mainFamily={detailsData["MF"]}
          domesticFamily={detailsData["DF"]}
          completeFamily={detailsData["CF"]}
          extendedFamily={detailsData["EF"]}
          extraClass="modal-block"
          queryKeywordsHighlightColor={queryKeywordsHighlightColor}
          highlightword={highlightword}
          isExact={isExact}
        />
      </div>

      <div>
        <Citations
          citations={
            citationsFilterValue.includes("bcp") ? detailsData["BCPN"] : []
          }
          forward_citations={
            citationsFilterValue.includes("fcp") ? detailsData["FCPN"] : []
          }
          backward_citations_count={
            detailsData["BCPN"] && detailsData["BCPN"].length
          }
          forward_citations_count={
            detailsData["BCPN"] && detailsData["FCPN"].length
          }
          citationsFilterValue={citationsFilterValue}
          setCitationsFilterValue={setCitationsFilterValue}
          extraClass="modal-block"
          queryKeywordsHighlightColor={queryKeywordsHighlightColor}
          highlightword={highlightword}
          isExact={isExact}
        />
      </div>

      <div className="mt-1 mb-3">
        <LegalEvents
          data={detailsData["LE"]}
          extraClass="modal-block"
          queryKeywordsHighlightColor={queryKeywordsHighlightColor}
          highlightword={highlightword}
          isExact={isExact}
        />
      </div>
    </div>
  );
}

export default RwireOtherBlock;
