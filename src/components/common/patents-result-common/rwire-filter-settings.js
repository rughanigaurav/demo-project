import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckboxGroup, Checkbox } from "rsuite";
import RwireTextInputWithSearchIcon from "../common-functions/rwire-textInput-withIcon";

function RwireFiltersSettings(props) {
  const { onSetFilter, filterList } = props;
  const [value, setValue] = useState(filterList);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const checkList = [
    "standardized_assignee_name",
    "inventor_name",
    "ipc",
    "cpc",
    "us_class",
    "priority_country",
    "publication_country",
    "lapse_year",
    "publication_year",
    "agent_name",
    "application_year",
    "application_country",
    "us_series_code",
    "assignee_country",
    "original_assignee_english",
    "original_assignee_first_english",
    "assignee_normalized_english",
    "botanic_latin_name",
    "botanic_variety",
    "us_class_further_classification_divided",
    "locarno_class_main_classification",
    "locarno_class_further_classification",
    "ipc_cpc",
    "cpc_primary",
    "cpc_12_digit",
    "cpc_8_digit",
    "cpc_4_digit",
    "cpc_version",
    "cpc_assigning_office",
    "ecla_class_divided",
    "jp_fi_f_terms",
    "ipc_12_digit",
    "ipc_8_digit",
    "ipc_4_digit",
    "ipcr_version",
    "current_assignee_standardized_english",
    "current_assignee_normalized_english",
    "designated_contracting_states_ep",
    "designated_extension_states_ep",
    "designated_validation_states_ep",
    "designated_up_participating_states_ep",
    "designated_states_all_ep",
    "designated_regional_country",
    "designated_regional_any_other_state",
    "designated_regional_region_country",
    "designated_pct_national",
    "designated_pct_new_designation_country",
    "designated_states_all_pct",
    "primary_examiner",
    "applicant_first_english_organization",
    "applicant_first_english_individual",
    "correspondent_english",
    "inventor_first_english",
    "earliest_priority_year",
    "priority_year",
    "legal_state",
    "legal_status",
    "publication_type",
    "assignee_applicant_original",
    "assignee_applicant_standardized",
    "assignee_applicant_normalized",
    "applicant_type",
  ];

  const { t } = useTranslation();

  const handleChange = (value) => {
    if (value.length === 0) {
      return;
    }
    let temp = value.slice(0, 15);
    if (value.length > 15) {
      setError("Maximum 15 Selections are allowed");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError(null);
    }
    onSetFilter({ filterList: temp });
    setValue(temp);
  };
  return (
    <div className="filter-setting-modal">
      {error && (
        <div className="d-flex justify-content-center">
          <p className="max-filter-error">{error}</p>
        </div>
      )}
      <RwireTextInputWithSearchIcon
        onChange={(e) => setQuery(e.toLowerCase())}
        iconClassName="filter-settings-search-icon"
        inputClassName="filter-settings-search-input"
        placeholder="Search For Filter"
      />
      <div className="filter-list-container">
        <CheckboxGroup
          name="checkboxList"
          value={value}
          onChange={handleChange}
        >
          <ul className="filter-settings-list d-flex flex-column ">
            {checkList &&
              checkList
                .filter((item) => {
                  return item
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .includes(query.toLowerCase());
                })
                .map((item) => (
                  <Checkbox key={item} value={item}>
                    {t(`${item}`)}
                  </Checkbox>
                ))}
          </ul>
        </CheckboxGroup>
      </div>
    </div>
  );
}

export default RwireFiltersSettings;
