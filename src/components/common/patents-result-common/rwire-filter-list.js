import React from "react";
import { useTranslation } from "react-i18next";
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import LapseYear from "../filters/rwire-lapse-year";
import RwireFilterModal from "../../../container/rwire-filter-modal";
import { filterNames } from "../../../common/field-map";

function FiltersList(props) {

  const {
    openedFilterName,
    onSetFilter,
    filter,
    onGetFiltersOptions,
    index,
    isQuickView = false,
  } = props;

  const handleClick = () => {
    if (openedFilterName === "") {
      onSetFilter({ openedFilterName: filter });
      onGetFiltersOptions({
        isIndivisual: false,
      });
    } else if (openedFilterName !== filter) {
      onSetFilter({ openedFilterName: filter });
      onGetFiltersOptions({
        isIndivisual: false,
      });
    } else {
      onSetFilter({ openedFilterName: "" });
    }
  };

  const { t } = useTranslation();
  return (
    <li className={`side-list ${index === 3 ? "side-list-fixed" : ""}`}>
      <button
        className={`side-menu-patent-button filter-btn text-nowrap ${
          openedFilterName === filter ? "filter-btn-active" : ""
        }`}
        onClick={handleClick}
        title={filterNames[filter]}
      >
        <p>{t(`${filter}`)}</p>{" "}
        <ArrowRightLineIcon style={{ fontSize: "20px", color: "grey" }} />
      </button>
      {filter !== "lapse_year" && (
        <RwireFilterModal
          index={index}
          filter={filter}
          isQuickView={isQuickView}
        />
      )}
      {filter === "lapse_year" && <LapseYear {...props} />}
    </li>
  );
}

export default FiltersList;
