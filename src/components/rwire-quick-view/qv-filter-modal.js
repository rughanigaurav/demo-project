import RwirePatentSidebar from "../../container/rwire-patent-sidebar";
import React, { useRef, useEffect } from "react";

const QvFilterModal = (props) => {
  const { setIsFilterModalOpen, isFilterModalOpen, handleCloseFilter } = props;
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideSidebar = event.target.closest(".sidebar-patents");
      const isClickInsideFilterList = event.target.closest(".filters-list");
      if (!isClickInsideFilterList) {
        handleCloseFilter();
      }
      if (!isClickInsideSidebar) {
        setIsFilterModalOpen(!isFilterModalOpen);
        handleCloseFilter();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef]);
  return (
    <div className="filter-modal-body">
      <div ref={wrapperRef}>
        <RwirePatentSidebar isQuickView={true} />
      </div>
    </div>
  );
};

export default QvFilterModal;
