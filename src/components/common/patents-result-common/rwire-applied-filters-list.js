import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import RwireAppliedFilterModal from "./rwire-applied-filter-modal";
import { filterSelected } from "./rwire-filter-modal";

function RwireAppliedFiltersList(props) {
  const {
    filter,
    values,
    filterShortCode,
    filtersSelected,
    clickedOnClear,
    onGetFiltersOptions,
    onRwireSearchAPI,
    filtersSearchText,
    onSetFilter
  } = props;
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();
  const truncate = (str) => {
    if (str.includes(",")) {
      let temp = str.split(" ,");
      return temp[0] + "…";
    } else {
      return str;
    }
  };
  const removeObjectField = (obj, field) => {
    const { [field]: remove, ...rest } = obj;

    return rest;
  };
  const handleRemove = (filterShortCode) => {
    const result = removeObjectField(filtersSelected, filterShortCode);

    onSetFilter({
      filtersSearchText: {
        ...filtersSearchText,
        [filterShortCode]: "",
      },
      [filterSelected[filter]]: [],
      filtersSelected: result,
      dataFrom: 0,
      activePages: 1,
      clickedOnClear: !clickedOnClear,
    });

    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  };

  return (
    <>
      {values && values.length > 0 && (
        <>
          <button className="d-flex">
            <p onClick={() => setToggle(!toggle)}>
              {t(`${filter}`)} ={" "}
              {values &&
                truncate(
                  values.join(" , ").replaceAll("&amp;", "&")
                ).toUpperCase()}{" "}
            </p>
            <img
              alt=""
              src={RWIRE_IMAGES.RwireCloseIcon}
              className="closeImg"
              onClick={() => handleRemove(filterShortCode)}
            />
          </button>
          <RwireAppliedFilterModal
            filter={t(`${filter}`)}
            values={values}
            setToggle={setToggle}
            toggle={toggle}
            filterShortCode={filterShortCode}
            {...props}
          />
        </>
      )}
    </>
  );
}

export default RwireAppliedFiltersList;
