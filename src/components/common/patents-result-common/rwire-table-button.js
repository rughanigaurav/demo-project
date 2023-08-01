import React, { useEffect, useRef } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";

const RwireTableDropdown = (props) => {
  const {
    showColumnChecker,
    handleInfoChange,
    handleDragStart,
    handleSortEnd,
    handleInfoOtherChange,
    value,
    othervalues,
    items,
    showNestedList,
    handleNestedSortEnd,
    t,
    setShowColumnChecker,
    totalRecordsCount,
  } = props;

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowColumnChecker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownRef]);

  const handleClick = (e) => {
    if (totalRecordsCount === 0) {
      return;
    }
    setShowColumnChecker(!showColumnChecker);
  };
  const NestedSortableItem = SortableElement(
    ({ item, value, handleInfoChange }) => (
      <div
        className="ml-4 d-flex align-items-start patent-info-space pt-2"
        index={item}
        style={{ "z-index": 99999 }}
      >
        <div className="img-table-drag-drop_wrapper"></div>
        <img
          src={RWIRE_IMAGES.RwireDrag}
          alt=""
          className="img-table-drag-drop pb-2"
        />
        <input
          type={"checkbox"}
          className="cursor-pointer"
          checked={value.includes(item)}
          data-value={item}
          onChange={handleInfoChange}
        />
        <span className="drag-table-dropdown pl-2">{t(`${item}`)}</span>
      </div>
    )
  );

  const NestedSortableList = SortableContainer(
    ({ items, value, handleInfoChange }) => (
      <div>
        {items.map((item, index) => (
          <NestedSortableItem
            key={index}
            index={index}
            item={item}
            value={value}
            handleInfoChange={handleInfoChange}
          />
        ))}
      </div>
    )
  );

  const SortableItem = SortableElement(
    ({ item, value, handleInfoChange, handleInfoOtherChange }) => (
      <div className="drag-list-table-section" style={{ "z-index": 9999 }}>
        <div className="d-flex justify-content-between">
          <div className="parent-list pb-1">
            <img
              src={RWIRE_IMAGES.RwireDrag}
              alt=""
              className="img-table-drag-drop"
            />

            <input
              type={"checkbox"}
              className="checkbox-text-alignmet cursor-pointer"
              checked={othervalues.includes(item.value)}
              data-value={item.value}
              onChange={handleInfoOtherChange}
            />
            <span className="drag-table-dropdown font-weight-bold pl-2">
              {t(`${item.value}`)}
              {item.value === "patent_information" && (
                <i>
                  <ArrowDownLineIcon
                    className={`${
                      showNestedList
                        ? "patent-info-arrow-position"
                        : "patent-info-arrow"
                    }`}
                  />
                </i>
              )}
            </span>
          </div>
        </div>

        {showNestedList && item.subList && (
          <NestedSortableList
            items={item.subList}
            lockAxis="y"
            lockToContainerEdges={true}
            helperClass="sortableHelper"
            value={value}
            handleInfoChange={handleInfoChange}
            onSortEnd={handleNestedSortEnd}
          />
        )}
      </div>
    )
  );

  const SortableList = SortableContainer(
    ({ items, value, handleInfoChange }) => {
      return (
        <div className="pl-2">
          {items.map((item, index) => (
            <SortableItem
              key={index}
              index={index}
              item={item}
              value={value}
              handleInfoChange={handleInfoChange}
              handleInfoOtherChange={handleInfoOtherChange}
            />
          ))}
        </div>
      );
    }
  );

  return (
    <div className="dropdown table-sort-dropdown" ref={dropdownRef}>
      <div
        className={`table-button cursor-pointer ${
          totalRecordsCount === 0 ? "button-disabled" : "button-enabled"
        }`}
        style={{ cursor: totalRecordsCount === 0 ? "not-allowed" : "pointer" }}
        onClick={handleClick}
        disabled={totalRecordsCount === 0}
      >
        <span className="pl-2 pr-1">
          <img alt="" src={RWIRE_IMAGES.RwireFilterIcon} />
        </span>
        <span className="header-table-result-page">{t("table")}</span>
      </div>

      <div
        className={`table-column-checker table-sort-dropdown table-dropdown ${
          showColumnChecker ? " " : "d-none"
        }`}
      >
        <SortableList
          items={items}
          lockAxis="y"
          lockToContainerEdges={true}
          helperClass="sortableHelper"
          value={value}
          handleInfoChange={handleInfoChange}
          onSortEnd={handleSortEnd}
          onSortStart={handleDragStart}
          onSortMove={handleDragStart}
        />
      </div>
    </div>
  );
};

export default RwireTableDropdown;
