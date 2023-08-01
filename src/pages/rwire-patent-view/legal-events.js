/* eslint-disable array-callback-return */
import moment from "moment";
import React from "react";
import HighLighter from "../../common/highlightFunction";
const fieldsToDesc = [
  { field: "DSA", title: "Designated country" },
  { field: "IPC", title: "IPC" },
  { field: "ESTA", title: "Extension country" },
  { field: "NO", title: "New owner" },
  { field: "ED", title: "Expiry date" },
  { field: "IN", title: "Inventor name" },
  { field: "PMTDT", title: "Payment date" },
  { field: "ON", title: "Opponent name" },
  { field: "EXTD", title: "Extension date" },
  { field: "CNCND", title: "Countries concerned" },
  { field: "EFD", title: "Effective date" },
  { field: "WRD", title: "Withdrawn date" },
];

function LegalEvents({
  data,
  extraClass,
  highlightword,
  isExact,
  queryKeywordsHighlightColor,
}) {
  const getEvents = () => {
    let FilterdEvents = [];

    data &&
      data.map((item) => {
        let filEve = FilterdEvents.filter(
          (i) => i.PD === item.PD && i.E1 === item.E1 && i.EC === item.EC
        );

        if (filEve.length > 0) {
          FilterdEvents.map((it, key) => {
            if (
              it.PD === filEve[0].PD &&
              it.E1 === filEve[0].E1 &&
              it.EC === filEve[0].EC
            ) {
              fieldsToDesc.map(({ field }) => {
                let displayValue = item[field];

                if (field === "IPC") {
                  if (item[field]) {
                    // eslint-disable-next-line eqeqeq
                    let splitCode = item[field]
                      .split(" ")
                      .filter((i) => i !== "");
                    displayValue = `${splitCode[0]} ${splitCode[1]}`;
                  }
                }

                if (displayValue) {
                  if (FilterdEvents[key][`ALL_${field}`]) {
                    FilterdEvents[key][`ALL_${field}`].push(displayValue);
                  } else {
                    FilterdEvents[key][`ALL_${field}`] = [displayValue];
                  }
                }
              });
            }
          });
        } else {
          fieldsToDesc.map(({ field }) => {
            let displayValue = item[field];

            if (field === "IPC") {
              // eslint-disable-next-line eqeqeq
              let splitCode = item.IPC.split(" ").filter((i) => i != "");
              displayValue = `${splitCode[0]} ${splitCode[1]}`;
            }

            if (item[field]) {
              item[`ALL_${field}`] = [displayValue];
            }
          });

          FilterdEvents.push(item);
        }
      });
    return FilterdEvents;
  };

  return (
    <>
      <h5 className="legal-events-heading mt-5 mb-2">Legal Events:</h5>
      { data && data.length > 0 ? (
        <div className={`view-tables ${extraClass ? extraClass : ""}`}>
          <table className="legal__events">
            <thead className="table">
              <tr>
                <th>Publication Date</th>
                <th className="event-code-clm">Event Code</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {getEvents().map((event) => {
                return (
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: HighLighter(
                          moment(event["PD"]).format("LL"),
                          highlightword,
                          isExact,
                          queryKeywordsHighlightColor
                        ),
                      }}
                    ></td>
                    <td
                      className="event-code-clm"
                      dangerouslySetInnerHTML={{
                        __html: HighLighter(
                          event["E1"],
                          highlightword,
                          isExact,
                          queryKeywordsHighlightColor
                        ),
                      }}
                    ></td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: HighLighter(
                          event["EC"],
                          highlightword,
                          isExact,
                          queryKeywordsHighlightColor
                        ),
                      }}
                    ></td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: HighLighter(
                          event["LGDESC"].trim(),
                          highlightword,
                          isExact,
                          queryKeywordsHighlightColor
                        ),
                      }}
                    ></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="pt-2">Data not available</p>
      )}
    </>
  );
}

export default LegalEvents;
