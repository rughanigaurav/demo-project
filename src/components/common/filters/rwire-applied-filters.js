import React, { useEffect, useState } from "react";
import { getKeyByValue } from "../../../action/history";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import RWireButtonTextImg from "../../rwire-ui/rwire-button/rwire-button-text-img";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import RwireAppliedFiltersList from "../patents-result-common/rwire-applied-filters-list";
import { filtersJson } from "../patents-result-common/rwire-filter-modal";
import { checkIfObjIsBlank } from "../patents-result-common/rwire-patents-filter-details";

const RwireAppliedFilters = (props) => {
  const {
    filtersSelected,
    onGetFiltersOptions,
    onSetFilter,
    onRwireSearchAPI,
    clickedOnClear,
  } = props;
  const [appliedFilterNames, setAppliedFilterNames] = useState([]);
  const [isView, setIsView] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(23);
  const [totalHeight, setTotalHeight] = useState(23);

  useEffect(() => {
    setAppliedFilterNames(Object.keys(filtersSelected));
  }, [filtersSelected]);
  const handleClearAllFilters = () => {
    onSetFilter({
      stdAssigneeNameSelected: [],
      inventorNameSelected: [],
      ipcSelected: [],
      cpcSelected: [],
      usClassSelected: [],
      ipcCpcSelected: [],
      priorityCountrySelected: [],
      publicationCountrySelected: [],
      publicationYearSelected: [],
      publicationStateSelected: [],
      agentNameSelected: [],
      applicationYearSelected: [],
      lapseYearSelected: [],
      assigneeCountrySelected: [],
      usSeriesCodeSelected: [],
      applicationCountrySelected: [],
      originalAssigneeSelected: [],
      originalAssigneeFirstEngSelected: [],
      assigneeNormalizedSelected: [],
      botanicLatinNameSelected: [],
      botanicVarietySelected: [],
      usClassfurtherClassificationSelected: [],
      LCMSelected: [],
      LCFSelected: [],
      CPCPSelected: [],
      CPC12Selected: [],
      CPC8Selected: [],
      CPC4Selected: [],
      CPCVSelected: [],
      CPCOSelected: [],
      ECLDSelected: [],
      JCLSelected: [],
      IPCDSelected: [],
      IPC12Selected: [],
      IPC8Selected: [],
      IPC4Selected: [],
      IPCRVSelected: [],
      CAS_ENSelected: [],
      CAN_ENSelected: [],
      DSEP_CSTSelected: [],
      DSEP_ESTSelected: [],
      DSEP_VSTSelected: [],
      DSEP_PSTSelected: [],
      DSEPSelected: [],
      DSPCT_RGCNSelected: [],
      DSPCT_AOSTSelected: [],
      DSPCT_RGNCNSelected: [],
      DSPCT_NTSelected: [],
      DSPCT_NDSCNSelected: [],
      DSPCTSelected: [],
      AEXSelected: [],
      PEXSelected: [],
      APFO_ENSelected: [],
      APFI_ENSelected: [],
      CR_ENSelected: [],
      INF_ENSelected: [],
      EPRYSelected: [],
      PRYSelected: [],
      LegalStateSelected: [],
      LegalStatusSelected: [],
      PublicationTypeSelected: [],
      AAPOSelected: [],
      AAPSSelected: [],
      AAPNSelected: [],
      APTSelected: [],
      filtersSelected: {},
      openedFilterName: "",
      clickedOnClear: !clickedOnClear,
      filtersSearchText: {},
    });
    setTimeout(() => {
      onRwireSearchAPI("", {
        isReRunId: true,
      });
      onGetFiltersOptions({
        isDisplayListFilters: true,
      });
    }, 100);
  };

  const calculateTotalHeight = () => {
    const section = document.querySelector(".filters-applied-height");

    const button = document.querySelector(".filters-applied-height button");

    if (button) {
      const computedStyle = window.getComputedStyle(button);
      const marginTop = parseInt(
        computedStyle.getPropertyValue("margin-top"),
        10
      );
      const marginBottom = parseInt(
        computedStyle.getPropertyValue("margin-bottom"),
        10
      );

      setTotalHeight(button.offsetHeight + marginTop + marginBottom);
    }
    if (section) {
      const computedStyle = window.getComputedStyle(section);
      const marginTop = parseInt(
        computedStyle.getPropertyValue("margin-top"),
        10
      );

      setSectionHeight(section.offsetHeight + marginTop);
    }
  };

  useEffect(() => {
    calculateTotalHeight();
  });
  useEffect(() => {
    window.addEventListener("resize", calculateTotalHeight);
    return () => {
      window.removeEventListener("resize", calculateTotalHeight);
    };
  }, []);

  return (
    <>
      {filtersSelected &&
        Object.keys(filtersSelected).length !== 0 &&
        !checkIfObjIsBlank(filtersSelected) && (
          <div className="filter-section">
            <RWireButton
              buttonCName="filter-section-clear-btn mt-1 d-flex align-items-end"
              imgClassName="deleteIcon"
              onClick={handleClearAllFilters}
              buttonImg={RWIRE_IMAGES.RwireDeleteIcon}
              name="Filters :"
            />

            <div
              className=" filters-applied-section"
              style={{
                height: isView ? "auto" : `${totalHeight - 1}px`,
                overflow: isView ? "auto" : "hidden",
              }}
            >
              <div className="filters-applied-height d-flex flex-wrap">
                {appliedFilterNames &&
                  appliedFilterNames.length > 0 &&
                  appliedFilterNames.map((key, k) => {
                    return (
                      <RwireAppliedFiltersList
                        key={k}
                        {...props}
                        filterShortCode={key}
                        filter={getKeyByValue(filtersJson, key)}
                        values={filtersSelected[key]}
                      />
                    );
                  })}
              </div>
            </div>
            {sectionHeight > totalHeight && (
              <div className="ms-auto">
                {" "}
                <RWireButtonTextImg
                  onClick={() => setIsView(!isView)}
                  buttonCName="filters-view-btn"
                  name="View"
                  buttonImg={RWIRE_IMAGES.RwireDrop}
                />
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default RwireAppliedFilters;
