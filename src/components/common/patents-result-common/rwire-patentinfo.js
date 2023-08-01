import React from "react";
import moment from "moment";
import {
  getFormatizedValue,
  getLocalizedValue,
  getMax,
} from "../../../action/patent-view";
import RwirePatentInfoMicroDiv from "./rwire-patentInfo-microDiv";
import RwirePatentInfoAssignee from "./rwire-patentInfo-assignee";
import RwirePatentInfoInventor from "./rwire-patentinfo-inventor";
import RwirePatentInfoJurisdiction from "./rwire-patentinfo-jurisdiction";
import RwirePriorityNumber from "./rwire-priority-number";

function RwirePatentInfo(props) {
  const { row, patentInformationList } = props;

  return (
    <td className="result-table-patent-info">
      <div className="d-flex flex-column ml-2">
        {patentInformationList &&
          patentInformationList.map((rows) => {
            switch (rows) {
              case "publication_date":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Publication Date:"
                    text={moment(row._source["PD"]).format("LL")}
                  />
                );
              case "application_date":
                const applicationDate = row._source["AD"];
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Application Date:"
                    text={
                      applicationDate
                        ? moment(applicationDate).format("LL")
                        : ""
                    }
                  />
                );

              case "Earliest_Priority_Date":
                const EarliestPriorityDate = row._source["EPRD"];
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Earliest Priority Date:"
                    text={
                      EarliestPriorityDate
                        ? moment(EarliestPriorityDate).format("LL")
                        : ""
                    }
                  />
                );

              case "Current Assignee":
                return <RwirePatentInfoAssignee row={row} />;

              case "Inventor":
                return <RwirePatentInfoInventor row={row} />;

              case "Jurisdiction":
                return <RwirePatentInfoJurisdiction row={row} />;

              case "Country":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Country:"
                    text={row._source["PNC"]}
                  />
                );

              case "normalized_assignee":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Normalized Assignee:"
                    text={getLocalizedValue(row._source, "EN", "ANZ")}
                  />
                );

              case "standardized_assignee":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Standardized Assignee:"
                    text={getLocalizedValue(row._source, "EN", "AS")}
                  />
                );

              case "assignee_original":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Assignee-Original:"
                    text={getLocalizedValue(row._source, "EN", "AO")}
                  />
                );

              case "Assignee/Applicant_Original":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Assignee/Applicant-Original:"
                    text={row._source["AAPO"]}
                  />
                );

              case "Assignee/Applicant_Standardized":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText=" Assignee/Applicant-Standardized:"
                    text={row._source["AAPS"]}
                  />
                );

              case "Assignee/Applicant_Normalized":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Assignee/Applicant-Normalized:"
                    text={row._source["AAPN"]}
                  />
                );

              case "application_number":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Application Number:"
                    text={getFormatizedValue(row._source, "AN")}
                  />
                );

              case "priority_number":
                return <RwirePriorityNumber row={row} />;

              case "Kind Code":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Kind Code:"
                    text={row._source["PKC"]}
                  />
                );

              case "Expiry Date":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Expiry Date:"
                    text={
                      getMax(row._source["ED"])
                        ? moment(getMax(row._source["ED"])).format("LL")
                        : ""
                    }
                  />
                );

              case "Priority Country":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Priority Country:"
                    text={row._source["PRC"][0]}
                  />
                );

              case "patent_type":
                return (
                  <RwirePatentInfoMicroDiv
                    headerText="Patent Type:"
                    text={row._source["PTS"]}
                  />
                );
              default:
                return (
                  <div className="result-page-details d-flex">
                    <div className="details-header-result font-weight-bold"></div>
                    <div className="ml-4"></div>
                  </div>
                );
            }
          })}
      </div>
    </td>
  );
}

export default RwirePatentInfo;
