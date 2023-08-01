import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";
import FilterIcon from "../../assets/images/FilterIcon.png";
import { FiChevronDown } from "react-icons/fi";
import { Checkbox, CheckboxGroup } from "rsuite";
import HighLighter from "../../common/highlightFunction";
// import { useNavigate } from 'react-router-dom';
export const citedByMapping = {
  0: "SEA - Search Report",
  1: "APP - Applicant cited",
  2: "EXA - Examination citation",
  3: "OPP - Opposition citation",
  4: "TPO - Third-party citation",
  5: "OTH - Other",
  6: "CH2 - PCT cited",
  E: "CEX - Examiner cited",
  O: "OEX - Citations(Examiner not included)",
  7: "ISR - Int. Search Report",
  8: "SUP - Supplementary Search Report",
  9: "PRS - Pre Search",
  10: "APL - Appealed",
  11: "FOP - Filed Opposition",
};

function Citations(props) {
  const {
    citations = [],
    forward_citations = [],
    extraClass,
    citationsFilterValue,
    setCitationsFilterValue,
    backward_citations_count = 0,
    forward_citations_count = 0,
    highlightword,
    isExact,
    queryKeywordsHighlightColor,
  } = props;

  // const navigate = useNavigate();
  const [filterToggle, setFilterToggle] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setFilterToggle(false);
      }
    };
    const handleScroll = () => {
      const dropdownMenu = dropdownRef.current;
      if (
        dropdownMenu &&
        window.scrollY > buttonRef.current.getBoundingClientRect().bottom &&
        window.scrollY > dropdownMenu.getBoundingClientRect().top
      ) {
        setFilterToggle(false);
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [buttonRef, dropdownRef]);
  function findObjectByPublicationNo(obj1, obj2, pubNo) {
    let found = "Backward Citation";
    obj1.forEach((item) => {
      if (item.PN === pubNo) {
        found = "Backward Citation";
      }
    });
    obj2.forEach((item) => {
      if (item.PN === pubNo) {
        found = "Forward Citation";
      }
    });
    return found;
  }

  function createUniqueCitations(obj1 = [], obj2 = []) {
    let merged = [];
    obj1.forEach((item) => {
      if (!merged.find((elem) => elem.PN === item.PN)) {
        merged.push(item);
      }
    });
    obj2.forEach((item) => {
      if (!merged.find((elem) => elem.PN === item.PN)) {
        merged.push(item);
      }
    });
    return merged;
  }

  const handleClick = (PN) => {
    // sessionStorage.setItem('patentId', "EP3034448B1");
    // onSetFilter({isViewPageModalOpen: false, isSmartReaderOpen: false});
    // console.log(sessionStorage.getItem('patentId'))
    // navigate(`/en/patent-view`);
  };

  const handleChange = (e) => {
    setCitationsFilterValue(e);
  };
  return (
    <>
      {extraClass ? (
        <div className="d-flex align-items-end">
          <h5 className="legal-events-heading citations-table mt-5 mb-2">
            Citations:
          </h5>
          <div className="ml-2 citations__modal__checkboxes">
            <CheckboxGroup
              value={citationsFilterValue}
              onChange={handleChange}
              inline
              name="checkboxList"
            >
              {backward_citations_count > 0 && (
                <Checkbox value="bcp">Backward Citation</Checkbox>
              )}
              {forward_citations_count > 0 && (
                <Checkbox value="fcp">Forward Citation</Checkbox>
              )}
            </CheckboxGroup>
          </div>
        </div>
      ) : (
        <h5 className="legal-events-heading citations-table mt-5 mb-2">
          Citations:
        </h5>
      )}
      {forward_citations_count > 0 || backward_citations_count > 0 ? (
        <div
          className={`view-tables ${
            extraClass ? extraClass : ""
          } citations_table`}
        >
          <table className="css-serial">
            <thead className="table border table-borderless">
              <tr>
                <th
                  className={`${
                    extraClass
                      ? "citations__first__col_modal"
                      : "citations__first__col"
                  }`}
                >
                  Sr. No
                </th>
                <th>Publication Number</th>
                <th>Publication Date</th>
                <th>Application Date</th>
                <th className="">Cited By</th>
                <th
                  className={`citation__filter__btn ${
                    extraClass ? "" : "citations__filter_column"
                  }`}
                >
                  <div
                    className="d-flex p-0 justify-content-between cursor-pointer"
                    onClick={() => setFilterToggle(!filterToggle)}
                    ref={buttonRef}
                  >
                    <RWireButton
                      cNameDiv="p-0 citations_filter"
                      buttonImg={FilterIcon}
                      buttonCName="text-left"
                    >
                      Filter Citations
                    </RWireButton>
                    {!extraClass && (
                      <FiChevronDown
                        style={{ fontSize: "20px", color: "#000" }}
                      />
                    )}
                  </div>

                  {!extraClass &&
                    filterToggle &&
                    citations.length + forward_citations.length > 1 && (
                      <CheckboxGroup
                        className="p-0"
                        value={citationsFilterValue}
                        onChange={handleChange}
                      >
                        <div
                          className="citation__filter__modal"
                          ref={dropdownRef}
                        >
                          <div className="citation__filter__checkbox">
                            {backward_citations_count > 0 && (
                              <Checkbox value="bcp">Backward Citation</Checkbox>
                            )}
                          </div>
                          <div className="citation__filter__checkbox">
                            {forward_citations_count > 0 && (
                              <Checkbox value="fcp">Forward Citation</Checkbox>
                            )}
                          </div>
                        </div>
                      </CheckboxGroup>
                    )}
                </th>
              </tr>
            </thead>

            <tbody>
              {createUniqueCitations(citations, forward_citations) &&
                createUniqueCitations(citations, forward_citations).map(
                  (bcp) => {
                    return (
                      <tr>
                        <td
                          className={`${
                            extraClass
                              ? "citations__first__col_modal"
                              : "citations__first__col"
                          }`}
                        ></td>
                        <td
                          className={`${
                            extraClass
                              ? "modal_citations_pub_no"
                              : "citations_pub_no"
                          }`}
                          onClick={() => handleClick(bcp.PN)}
                          dangerouslySetInnerHTML={{
                            __html: HighLighter(
                              bcp.PN,
                              highlightword,
                              isExact,
                              queryKeywordsHighlightColor
                            ),
                          }}
                        ></td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: HighLighter(
                              bcp.PDT !== "" && moment(bcp.PDT).format("LL"),
                              highlightword,
                              isExact,
                              queryKeywordsHighlightColor
                            ),
                          }}
                        ></td>
                        <td>
                          {bcp.ADT && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: HighLighter(
                                  bcp.ADT !== "" &&
                                    moment(bcp.ADT).format("LL"),
                                  highlightword,
                                  isExact,
                                  queryKeywordsHighlightColor
                                ),
                              }}
                            />
                          )}
                        </td>
                        <td
                          className={`${
                            extraClass
                              ? "modal_cited__by__col"
                              : "cited__by__col"
                          }`}
                        >
                          {bcp.CTBY && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: HighLighter(
                                  bcp.CTBY !== "" && citedByMapping[bcp.CTBY],
                                  highlightword,
                                  isExact,
                                  queryKeywordsHighlightColor
                                ),
                              }}
                            />
                          )}
                        </td>
                        <td
                          className={`${
                            extraClass ? "" : "citation__filter__col"
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: HighLighter(
                              findObjectByPublicationNo(
                                citations,
                                forward_citations,
                                bcp.PN
                              ),
                              highlightword,
                              isExact,
                              queryKeywordsHighlightColor
                            ),
                          }}
                        ></td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="pt-2">Data not available</p>
      )}
    </>
  );
}

export default Citations;
