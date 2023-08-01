import { useTranslation } from "react-i18next";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import React, { useState } from "react";
import { checkList } from "../../../resources/data/patent-info-checklist";
import { arrayMove } from "react-sortable-hoc";
import RwireSortDropdown from "./rwire-sort-button";
import RwireTableDropdown from "./rwire-table-button";
import { useNavigate } from "react-router-dom";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";

export function checkIfObjIsBlank(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].length !== 0) {
      return false;
    }
  }
  return true;
}

const RWirePatentFilterDetails = (props) => {
  const {
    setHighlightToggle,
    onSetFilter,
    onSortDropdown,
    onRwireSearchAPI,
    filtersSelected,
    patentInformationList,
    patentReamainingList,
    totalRecordsCount,
  } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [toggle, setToogle] = useState(false);
  const [value, setValue] = useState(patentInformationList);
  const [othervalues, setOtherValues] = useState(patentReamainingList);
  const [items, setItems] = useState(checkList);
  const [showColumnChecker, setShowColumnChecker] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [allItems, setAllItems] = useState(checkList);
  const [showNestedList, setShowNestedList] = useState(true);

  const handleClick = () => {
    setHighlightToggle(!toggle);
  };

  const handleInfoChange = (value) => {
    if (value.target.checked) {
      const checkList = [...patentInformationList, value.target.dataset.value];

      onSetFilter({ patentInformationList: checkList });
      setValue(checkList);
    } else {
      const nodeElement = value.target.dataset.value;
      patentInformationList.splice(
        patentInformationList.indexOf(nodeElement),
        1
      );

      onSetFilter({ patentInformationList: [...patentInformationList] });
      setValue(patentInformationList);
    }

    value.stopPropagation();
  };

  const handleInfoOtherChange = (othervalues) => {
    if (othervalues.target.checked) {
      const checkList = [
        ...patentReamainingList,
        othervalues.target.dataset.value,
      ];
      if (othervalues.target.dataset.value === "patent_information") {
        onSetFilter({
          patentInformationList: [
            "publication_date",
            "application_date",
            "Earliest_Priority_Date",
            "Current Assignee",
            "Inventor",
            "Jurisdiction",
            "Country",
          ],
        });
        setValue([
          "publication_date",
          "application_date",
          "Earliest_Priority_Date",
          "Current Assignee",
          "Inventor",
          "Jurisdiction",
          "Country",
        ]);
      }

      onSetFilter({ patentReamainingList: checkList });
      setOtherValues(checkList);
    } else {
      const nodeElement = othervalues.target.dataset.value;
      if (nodeElement === "patent_information") {
        onSetFilter({ patentReamainingList: [] });
        setValue([]);
      }

      patentReamainingList.splice(patentReamainingList.indexOf(nodeElement), 1);

      onSetFilter({ patentReamainingList: [...patentReamainingList] });
      setOtherValues(patentReamainingList);
    }
    onRwireSearchAPI("", {
      isReRunId: true,
    });

    othervalues.stopPropagation();
  };

  const handleNestedSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = items;
    const patentInfoItem = newItems.find(
      (item) => item.id === "patent_information"
    );
    const newSubList = arrayMove(patentInfoItem.subList, oldIndex, newIndex);
    // eslint-disable-next-line array-callback-return
    newItems.map((i, k) => {
      if (i.id === "patent_information") {
        newItems[k].subList = newSubList;
      }
    });

    const newValues = patentInfoItem.subList.filter((item) =>
      value.includes(item)
    );
    setItems(newItems);
    onSetFilter({
      patentInformationList: newValues,
    });
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    setAllItems(newItems);
    let temp = newItems
      .map((item) => item.value)
      .filter((item) => othervalues.includes(item));

    onSetFilter({ patentReamainingList: temp });
    if (items[newIndex].value === "patent_information") {
      setShowNestedList(true);
    }
  };

  const handleDragStart = ({ index }) => {
    if (items[index].value === "patent_information") {
      setShowNestedList(false);
    }
  };

  return (
    <div className="filter-table">
      <div
        className={`filter-right-section  ${
          Object.keys(filtersSelected).length !== 0 ? "" : "filter-section-hide"
        }`}
      >
        <RWireButton
          buttonCName={`match-btn header-table-result-page ${
            totalRecordsCount === 0 ? "button-disabled" : ""
          }`}
          onClick={() => {
            if (totalRecordsCount !== 0) {
              navigate("/en/quick-view");
            }
          }}
          disabled={totalRecordsCount === 0}
        >
          <span className="header-table-result-page">Quick</span>
        </RWireButton>
        <RwireTableDropdown
          showColumnChecker={showColumnChecker}
          handleInfoChange={handleInfoChange}
          handleDragStart={handleDragStart}
          handleSortEnd={handleSortEnd}
          handleInfoOtherChange={handleInfoOtherChange}
          value={value}
          othervalues={othervalues}
          items={items}
          showNestedList={showNestedList}
          handleNestedSortEnd={handleNestedSortEnd}
          t={t}
          setShowColumnChecker={setShowColumnChecker}
          totalRecordsCount={totalRecordsCount}
        />
        <button
          onClick={handleClick}
          className={totalRecordsCount === 0 ? "button-disabled" : ""}
          disabled={totalRecordsCount === 0}
        >
          <img alt="" src={RWIRE_IMAGES.RwireHighlightIcon} />
          <span className="header-table-result-page"> {t("highlight")} </span>
        </button>
        <RwireSortDropdown
          onSortDropdown={onSortDropdown}
          onRwireSearch={onRwireSearchAPI}
          totalRecordsCount={totalRecordsCount}
        />
      </div>
    </div>
  );
};

export default RWirePatentFilterDetails;
