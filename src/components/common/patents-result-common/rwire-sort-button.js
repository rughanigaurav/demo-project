import React from "react";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import { useTranslation } from "react-i18next";

const RwireSortDropdown = (props) => {
  const { onRwireSearch, onSortDropdown, totalRecordsCount } = props;
  const { t } = useTranslation();
  const handleSortClick = (e) => {
    const sort = e.target.id.split("__");
    const SortBY = sort[0];
    const SortType = sort[1];
    onSortDropdown(SortBY, SortType);
    onRwireSearch("", {
      isReRunId: true,
    });
  };

  return (
    <div className="dropdown table-sort-dropdown sort-list">
      <button
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className={`${totalRecordsCount === 0 ? "button-disabled" : ""}`}
        disabled={totalRecordsCount === 0}
      >
        <img alt="" src={RWIRE_IMAGES.RwireSortIcon} />
        <span className="header-table-result-page"> {t("sort")} </span>
      </button>
      <div className="dropdown-menu table-sort-dropdown sort-dropdown">
        <div className="dropdown-item" href="#">
          {t("relevancy_score")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"score__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"score__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("publication_country_code")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"PNC__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"PNC__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("application_country")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"AC__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"AC__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("application_date")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"AD__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"AD__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("assignee_country")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"ACC__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"ACC__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("assignee_count")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"ACN__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"ACN__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("applicant_count")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"APCN__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"APCN__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("inventor_count")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"INCN__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"INCN__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("priority_country")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"PRC__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"PRC__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("priority_date")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"PRD__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"PRD__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("Earliest_Priority_Date")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"EPRD__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"EPRD__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("publication_date")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"PD__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"PD__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("publication_kind_code")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"PKC__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"PKC__DESC"}
            />
          </span>
        </div>
        <div className="dropdown-item" href="#">
          {t("expiry_date")}
          <span className="float-right menu">
            <img
              alt=""
              src={RWIRE_IMAGES.RWireUpsort}
              className="px-2 menu"
              onClick={handleSortClick}
              id={"ED__ASC"}
            />
            <img
              alt=""
              src={RWIRE_IMAGES.RWireDownsort}
              onClick={handleSortClick}
              id={"ED__DESC"}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RwireSortDropdown;
