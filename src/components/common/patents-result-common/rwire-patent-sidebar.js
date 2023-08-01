import React, { useEffect, useRef, useState } from "react";
import FiltersList from "./rwire-filter-list";
import GearIcon from "@rsuite/icons/Gear";
import RwireFiltersSettings from "./rwire-filter-settings";
import useClickOutside from "../../../common/useClickOutside";
import { assignTopToModal } from "../../../common/utils";

const RWirePatentSideBar = (props) => {
  const { filterList, onSetFilter } = props;

  const [toggle, setToggle] = useState(false);
  const [filtersList, setFiltersList] = useState(filterList);
  const ref = useRef(null);
  useClickOutside(ref, () => setToggle(false));
  useEffect(() => {
    setFiltersList(filterList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterList]);

  const handleCloseFilter = () => {
    onSetFilter({ openedFilterName: "" });
  };
  const handleFilterSetting = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    assignTopToModal();
  }, [filtersList]);

  useEffect(() => {
    window.addEventListener("resize", assignTopToModal);
    return () => {
      window.removeEventListener("resize", assignTopToModal);
    };
  });
  return (
    <div className="sidebar-patents">
      <div
        className="patent-filter d-flex justify-content-between pe-3"
        onClick={handleCloseFilter}
      >
        <span className="">Filters</span>
        <div className="filter-setting-btn" ref={ref}>
          <GearIcon
            onClick={handleFilterSetting}
            style={{ cursor: "pointer" }}
          />
          {toggle && <RwireFiltersSettings {...props} />}
        </div>
      </div>
      {/* <Trans> */}
      <ul className="list-unstyled filters-list ps-0">
        {filtersList &&
          filtersList.map((filter, index) => {
            return (
              <FiltersList
                filter={filter}
                {...props}
                key={index}
                index={index}
              />
            );
          })}
      </ul>
      {/* </Trans> */}
    </div>
  );
};

export default RWirePatentSideBar;
