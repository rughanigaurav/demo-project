import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, Input } from "rsuite";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import { checkIfObjIsBlank } from "./rwire-patents-filter-details";
import loaderGIF from "../../../assets/images/loader.gif";
import { getSortedArray } from "../../../action/patent-view";
import { AiOutlineClose } from "react-icons/ai";

export const hasNonWhiteSpaceChars = (str) => {
  return /\S/.test(str);
};
export const filtersJson = {
  agent_name: "AG_EN",
  lapse_year: "ED",
  application_year: "AY",
  cpc: "CPCD",
  inventor_name: "IN_EN",
  standardized_assignee_name: "CA_EN",
  priority_country: "PRC",
  publication_country: "PNC",
  publication_year: "PY",
  ipc: "IPCD",
  application_country: "AC",
  us_series_code: "SC",
  assignee_country: "ACC",
  original_assignee_english: "AO_EN",
  original_assignee_first_english: "AOF_EN",
  assignee_normalized_english: "ANZ_EN",
  botanic_latin_name: "BON",
  botanic_variety: "BOV",
  us_class_further_classification_divided: "USFD",
  locarno_class_main_classification: "LCM",
  locarno_class_further_classification: "LCF",
  cpc_primary: "CPCP",
  cpc_12_digit: "CPC12",
  cpc_8_digit: "CPC8",
  cpc_4_digit: "CPC4",
  cpc_version: "CPCV",
  cpc_assigning_office: "CPCO",
  ecla_class_divided: "ECLD",
  jp_fi_f_terms: "JCL",
  ipc_divided: "IPCD",
  ipc_12_digit: "IPC12",
  ipc_8_digit: "IPC8",
  ipc_4_digit: "IPC4",
  ipcr_version: "IPCRV",
  current_assignee_standardized_english: "CAS_EN",
  current_assignee_normalized_english: "CAN_EN",
  designated_contracting_states_ep: "DSEP_CST",
  designated_extension_states_ep: "DSEP_EST",
  designated_validation_states_ep: "DSEP_VST",
  designated_up_participating_states_ep: "DSEP_PST",
  designated_states_all_ep: "DSEP",
  designated_regional_country: "DSPCT_RGCN",
  designated_regional_any_other_state: "DSPCT_AOST",
  designated_regional_region_country: "DSPCT_RGNCN",
  designated_pct_national: "DSPCT_NT",
  designated_pct_new_designation_country: "DSPCT_NDSCN",
  designated_states_all_pct: "DSPCT",
  assistant_examiner: "AEX",
  primary_examiner: "PEX",
  applicant_first_english_organization: "APFO_EN",
  applicant_first_english_individual: "APFI_EN",
  correspondent_english: "CR_EN",
  inventor_first_english: "INF_EN",
  earliest_priority_year: "EPRY",
  priority_year: "PRY",
  us_class: "USD",
  legal_state: "ALD",
  legal_status: "LST",
  publication_type: "PT",
  assignee_applicant_original: "AAPO",
  assignee_applicant_standardized: "AAPS",
  assignee_applicant_normalized: "AAPN",
  ipc_cpc: "PCL",
  applicant_type: "APT",
};
const searchBoxPlaceholder = {
  agent_name: "Attorney/Agent",
  application_year: "Application Year",
  cpc: "CPC",
  inventor_name: "Inventor",
  standardized_assignee_name: " current Assignee ",
  priority_country: "Priority Country",
  publication_country: "Publication Country",
  publication_year: "Publication Year",
  ipc: "IPC",
  application_country: "Application Country",
  us_series_code: "US Series Code",
  assignee_country: "Assignee Country",
  original_assignee_english: "Original Assignee ",
  original_assignee_first_english: "Original Assignee First",
  assignee_normalized_english: "Assignee Normalized ",
  botanic_latin_name: "Botanic Name",
  botanic_variety: "Botanic Variety",
  us_class_further_classification_divided: "US Class-Further-Divided",
  us_class_main_classification_divided: "US Class Main Classification Divided",
  us_class: "US Class-Main-Divided",
  locarno_class_main_classification: "Locarno Class-Main",
  locarno_class_further_classification: "Locarno Class-Further",
  cpc_primary: "CPC Primary",
  cpc_12_digit: "CPC-12 Digit",
  cpc_8_digit: "CPC-8 Digit",
  cpc_4_digit: "CPC-4  Digit",
  cpc_version: "CPC-Version",
  cpc_assigning_office: "CPC-Assigning Office",
  ecla_class_divided: "ECLA-Divided",
  jp_fi_f_terms: "JP-FI/F-Terms",
  ipc_divided: "IPC-Divided",
  ipc_12_digit: "IPC-12 Digit",
  ipc_8_digit: "IPC-8 Digit",
  ipc_4_digit: "IPC-4 Digit",
  ipcr_version: "IPC-Version",
  lapse_year: "Lapse Year",
  current_assignee_standardized_english: "Current Assignee Standardized",
  current_assignee_normalized_english: "Current Assignee Normalized",
  designated_contracting_states_ep: "Contracting-States - EP",
  designated_extension_states_ep: "Extension-States - EP",
  designated_validation_states_ep: "Validation-States - EP",
  designated_up_participating_states_ep: "UP-Participating-States - EP",
  designated_states_all_ep: "Designated States (All) - EP",
  designated_regional_country: "Regional Country - PCT",
  designated_regional_any_other_state: "Regional Any-Other-State - PCT",
  designated_regional_region_country: "Designated Regional-Region-Country",
  designated_pct_national: "PCT - National",
  designated_pct_new_designation_country: "New-Designation-Country-PCT",
  designated_states_all_pct: "Designated States (All) -PCT",
  assistant_examiner: "Examiner",
  primary_examiner: "Examiner",
  applicant_first_english_organization: "Applicant First Organization",
  applicant_first_english_individual: "Applicant First Individual",
  correspondent_english: "Correspondent",
  inventor_first_english: "Inventor First",
  earliest_priority_year: "Earliest Priority Year",
  priority_year: "Priority Year",
  legal_state: "Legal State",
  legal_status: "Legal Status",
  publication_type: "Publication Type",
  assignee_applicant_original: "Assignee/Applicant - Original",
  assignee_applicant_standardized: "Assignee/Applicant - Standardized",
  assignee_applicant_normalized: "Assignee/Applicant - Normalized",
  ipc_cpc: "IPC/CPC",
  applicant_type: "Applicant Type",
};
export const filterSelected = {
  agent_name: "agentNameSelected",
  application_year: "applicationYearSelected",
  cpc: "cpcSelected",
  lapse_year: "lapseYearSelected",
  inventor_name: "inventorNameSelected",
  standardized_assignee_name: "stdAssigneeNameSelected",
  priority_country: "priorityCountrySelected",
  publication_country: "publicationCountrySelected",
  publication_year: "publicationYearSelected",
  ipc: "ipcSelected",
  application_country: "applicationCountrySelected",
  us_series_code: "usSeriesCodeSelected",
  assignee_country: "assigneeCountrySelected",
  original_assignee_english: "originalAssigneeSelected",
  original_assignee_first_english: "originalAssigneeFirstEngSelected",
  assignee_normalized_english: "assigneeNormalizedSelected",
  botanic_latin_name: "botanicLatinNameSelected",
  botanic_variety: "botanicVarietySelected",
  us_class_further_classification_divided:
    "usClassfurtherClassificationSelected",
  locarno_class_main_classification: "LCMSelected",
  locarno_class_further_classification: "LCFSelected",
  cpc_primary: "CPCPSelected",
  cpc_12_digit: "CPC12Selected",
  cpc_8_digit: "CPC8Selected",
  cpc_4_digit: "CPC4Selected",
  cpc_version: "CPCVSelected",
  cpc_assigning_office: "CPCOSelected",
  ecla_class_divided: "ECLDSelected",
  jp_fi_f_terms: "JCLSelected",
  ipc_divided: "IPCDSelected",
  ipc_12_digit: "IPC12Selected",
  ipc_8_digit: "IPC8Selected",
  ipc_4_digit: "IPC4Selected",
  ipcr_version: "IPCRVSelected",
  current_assignee_standardized_english: "CAS_ENSelected",
  current_assignee_normalized_english: "CAN_ENSelected",
  designated_contracting_states_ep: "DSEP_CSTSelected",
  designated_extension_states_ep: "DSEP_ESTSelected",
  designated_validation_states_ep: "DSEP_VSTSelected",
  designated_up_participating_states_ep: "DSEP_PSTSelected",
  designated_states_all_ep: "DSEPSelected",
  designated_regional_country: "DSPCT_RGCNSelected",
  designated_regional_any_other_state: "DSPCT_AOSTSelected",
  designated_regional_region_country: "DSPCT_RGNCNSelected",
  designated_pct_national: "DSPCT_NTSelected",
  designated_pct_new_designation_country: "DSPCT_NDSCNSelected",
  designated_states_all_pct: "DSPCTSelected",
  assistant_examiner: "AEXSelected",
  primary_examiner: "PEXSelected",
  applicant_first_english_organization: "APFO_ENSelected",
  applicant_first_english_individual: "APFI_ENSelected",
  correspondent_english: "CR_ENSelected",
  inventor_first_english: "INF_ENSelected",
  earliest_priority_year: "EPRYSelected",
  priority_year: "PRYSelected",
  us_class: "usClassSelected",
  legal_state: "LegalStateSelected",
  legal_status: "LegalStatusSelected",
  publication_type: "PublicationTypeSelected",
  assignee_applicant_original: "AAPOSelected",
  assignee_applicant_standardized: "AAPSSelected",
  assignee_applicant_normalized: "AAPNSelected",
  ipc_cpc: "ipcCpcSelected",
  applicant_type: "APTSelected",
};
export const toCapitalizeCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function RwireFilterModal(props) {
  const {
    filterOptionsData,
    openedFilterName,
    filter,
    filtersSearchText,
    filtersSelected,
    clickedOnClear,
    searchQuery,
    onSetFilter,
    onRwireSearchAPI,
    onGetFiltersOptions,
    isLoadingFilterData = false,
    index,
    isQuickView = false,
  } = props;
  let finalData = filterOptionsData[filtersJson[filter]]
    ? filterOptionsData[filtersJson[filter]].buckets
    : [];
  let tempDataArray = finalData ? finalData.map((a) => a.key) : [];
  const [value, setValue] = useState([]);
  const [searchInputText, setSearchInputText] = useState("");
  useEffect(() => {
    setSearchInputText(
      filtersSearchText[filtersJson[filter]]
        ? filtersSearchText[filtersJson[filter]]
        : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSearchText]);

  useEffect(() => {
    if (
      Object.keys(filtersSelected).length !== 0 &&
      checkIfObjIsBlank(filtersSelected)
    ) {
      setSearchInputText("");
      onGetFiltersOptions({
        isIndivisual: true,
      });
      setValue([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSelected]);

  useEffect(() => {
    setSearchInputText("");
    setValue([]);
  }, [searchQuery]);

  useEffect(() => {
    setValue([]);
  }, [clickedOnClear]);

  useEffect(() => {
    if (filtersSelected[filtersJson[filter]]) {
      setValue(filtersSelected[filtersJson[filter]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSelected]);

  const handleCheckAll = (value, checked) => {
    setValue(checked ? tempDataArray : []);
  };
  const handleResetSelection = () => {
    setValue([]);
    if (
      filtersSelected[filtersJson[filter]] &&
      filtersSelected[filtersJson[filter]].length > 0
    ) {
      handleClearAll();
    }
  };
  const handleChange = (value) => {
    setValue(value);
    if (
      value &&
      value.length === 0 &&
      filtersSelected[filtersJson[filter]] &&
      [filtersSelected[filtersJson[filter]]].length > 0
    ) {
      handleClearAll();
    }
  };
  const handleApply = () => {
    onSetFilter({
      openedFilterName: "",
      [filterSelected[filter]]: value,
      filtersSelected: { ...filtersSelected, [filtersJson[filter]]: value },
      dataFrom: 0,
      activePages: 1,
    });
    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  };
  const handleClearAll = () => {
    onSetFilter({
      [filterSelected[filter]]: [],
      filtersSelected: { ...filtersSelected, [filtersJson[filter]]: [] },
      dataFrom: 0,
      activePages: 1,
    });
    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  };
  const handleSearchChange = (e) => {
    let str = e;
    setSearchInputText(str);
    onSetFilter({
      filtersSearchText: { ...filtersSearchText, [filtersJson[filter]]: str },
    });
    onGetFiltersOptions({
      isIndivisual: true,
    });
  };

  return (
    <div
      className={`filter-modal p-3 ${
        openedFilterName === filter ? "filter-modal-active" : ""
      } ${index >= 3 ? "filter-modal-fixed" : "filter-modal-absolute"}`}
    >
      <div className="d-flex justify-content-between">
        <Input
          value={searchInputText}
          className="filter-modal-searchInput"
          placeholder={`Search For ${searchBoxPlaceholder[filter]}`}
          onChange={handleSearchChange}
        />
        <div className="d-flex justify-content-between">
          <h6
            className="filter-clearAll-btn"
            onClick={handleResetSelection}
            style={{ color: "#0048A2" }}
          >
            Clear All
          </h6>
          {finalData.length !== 0 && (
            <Checkbox
              checked={value.length === finalData.length}
              onChange={handleCheckAll}
              style={{ color: "#0048A2" }}
            >
              Select All
            </Checkbox>
          )}
          <RWireButton buttonCName="ms-5 me-4 btn" onClick={handleApply}>
            Apply
          </RWireButton>
          {isQuickView && (
            <div
              className="filter-modal-close-btn cursor-pointer"
              onClick={() =>
                onSetFilter({
                  openedFilterName: "",
                })
              }
            >
              <AiOutlineClose />
            </div>
          )}
        </div>
      </div>

      <div className="filters-sublist mt-3 p-3">
        {isLoadingFilterData ? (
          <div className="filters_loader">
            <img
              src={loaderGIF}
              alt="Computer man"
              className="filter-loader-img"
            ></img>
          </div>
        ) : tempDataArray.length === 0 ? (
          <div className="filters_loader">
            <h6 className="text-secondary">Data Not Available</h6>
          </div>
        ) : (
          <CheckboxGroup
            name="checkboxList"
            value={value}
            onChange={handleChange}
          >
            <ul className="filter-names d-flex flex-wrap">
              {finalData &&
                getSortedArray(finalData, "key", openedFilterName).map((item) =>
                  hasNonWhiteSpaceChars(item.key) ? (
                    <Checkbox key={item.key} value={item.key}>
                      {item.key.replaceAll("&amp;", " & ").toUpperCase() + " "}(
                      {item.aggsUniqueCount.value})
                    </Checkbox>
                  ) : null
                )}
            </ul>
          </CheckboxGroup>
        )}
      </div>
    </div>
  );
}

export default RwireFilterModal;
