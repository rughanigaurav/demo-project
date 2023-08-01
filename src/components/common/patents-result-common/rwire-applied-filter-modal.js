import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../common/useClickOutside";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import { filterSelected, filtersJson } from "./rwire-filter-modal";

function RwireAppliedFilterModal(props) {
  const {
    filter,
    values,
    setToggle,
    toggle,
    filtersSelected,
    onGetFiltersOptions,
    onRwireSearchAPI,
    filtersSearchText,
    onSetFilter,
    filterShortCode,
  } = props;
  let tempAppliedFiltersArray = values ? values : [];
  const ref = useRef(null);
  const { t } = useTranslation();
  useClickOutside(ref, () => setToggle(false));

  function handleRemove(e) {
    let arr = tempAppliedFiltersArray.filter(function (ele) {
      // eslint-disable-next-line eqeqeq
      return ele != e;
    });

    tempAppliedFiltersArray = arr;
    props.onSetFilter({
      [filterSelected[filter]]: arr,
      filtersSelected: { ...filtersSelected, [filtersJson[filter]]: arr },
      dataFrom: 0,
      activePages: 1,
    });


    if (arr.length === 0) {
      onSetFilter({
        filtersSearchText: {
          ...filtersSearchText,
          [filterShortCode]: "",
        },
      });
      setToggle(!toggle);
    }

    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  }

  return (
    <>
      {toggle && tempAppliedFiltersArray.length > 0 && (
        <div className="filters-list-modal" ref={ref}>
          {t(`${filter}`)} =
          {tempAppliedFiltersArray &&
            tempAppliedFiltersArray.map((value) => {
              return (
                <button className="d-flex">
                  <p>{value.replaceAll("&amp;", "&").toUpperCase()}</p>
                  <img
                    alt=""
                    src={RWIRE_IMAGES.RwireCloseIcon}
                    className="closeImg"
                    onClick={() => handleRemove(value)}
                  />
                </button>
              );
            })}
        </div>
      )}
    </>
  );
}

export default RwireAppliedFilterModal;
