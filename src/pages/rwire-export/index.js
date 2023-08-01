import { fieldNameFromShortCodeExport } from "../../common/field-map";
import { exportFieldsList } from "../../resources/data/export-field-list";
import { useEffect, useState } from "react";
import React from "react";
import { Checkbox, CheckboxGroup, Input } from "rsuite";
import ExportFooter from "../../common/footer-export";
import {
  SortableElement,
  SortableContainer,
  arrayMove,
} from "react-sortable-hoc";

import RwireSaveTemplate from "./save-as-template";
import RwireLoadFromTemplate from "./load-from-template";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import CloseIcon from "@rsuite/icons/Close";

let searchTimer = null;

const RwireExport = (props) => {
  const {
    onSetSelectedField,
    selectedFields,
    totalRecordsCount,
    selectedRows,
    setExportToggle,
    exportToggle,
  } = props;
  const [query, setQuery] = useState("");
  const [fieldOptions, setFieldOptions] = useState([]);
  const [defaultOption, setDefaultData] = useState([]);
  const [value, setValue] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [check, setCheck] = useState();
  const [loadModal, setLoadModal] = useState(false);
  const [loadSaveModal, setSaveLoadModal] = useState(false);

  const handleClickModalLoad = () => {
    setLoadModal(!loadModal);
  };

  const handleClickModalLoadSave = () => {
    setSaveLoadModal(!loadSaveModal);
  };

  useEffect(() => {
    setFieldOptions(exportFieldsList);
    setDefaultData(exportFieldsList);
    setValue(selectedFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event) => {
    setQuery(event);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const filteredData = defaultOption.filter((i) => {
        if (
          query === "" ||
          fieldNameFromShortCodeExport(i)
            .toLowerCase()
            .includes(event.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
      setFieldOptions(filteredData);
    }, 500);
  };

  const handleSelectField = (e) => {
    setValue(e);
    onSetSelectedField({ selectedFields: e });
  };

  const handleCheckAll = (value, checked) => {
    setCheck(checked);
    setValue(fieldOptions);
    if (checked) {
      onSetSelectedField({ selectedFields: fieldOptions });
    }
  };

  const clearAll = (check) => {
    if (check) {
      const updatedSelectedFields = selectedFields.includes("PN_B")
        ? ["PN_B"]
        : [];
      onSetSelectedField({ selectedFields: updatedSelectedFields });
      setValue(updatedSelectedFields);
    }
  };

  const handleRemoveItem = (e, check) => {
    const filteredItem = selectedFields.filter((item) => item !== e);
    if (check) {
      const updatedSelectedFields = selectedFields.includes("PN_B")
        ? ["PN_B"]
        : [];
      onSetSelectedField({ selectedFields: updatedSelectedFields });
    } else {
      onSetSelectedField({ selectedFields: [...filteredItem] });
    }
    const fieldAllData = value && value.filter((item) => item !== e);
    setValue([...fieldAllData]);
  };

  const SortableItem = SortableElement(({ value }) => (
    <div style={{ zIndex: 99999999 }} className="item-container">
      <div className="d-flex justify-content-between selected-list">
        <div className="d-flex justify-content-start">
          <div>
            <img
              src={RWIRE_IMAGES.RwireDrag}
              alt=""
              className="img-table-drag-drop"
            />
          </div>
          <div className="label-value-drag">
            {fieldNameFromShortCodeExport(value)}
          </div>
        </div>

        {selectedFields.includes("PN_B") && value !== "PN_B" && (
          <button
            className="delete-selected"
            onClick={() => handleRemoveItem(value)}
          >
            X
          </button>
        )}
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {selectedFields.map((value, index) => {
          return (
            <SortableItem
              key={`item-${value}`}
              index={index}
              value={value}
              style={{ zIndex: 99999999 }}
            />
          );
        })}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    onSetSelectedField({
      selectedFields: arrayMove(selectedFields, oldIndex, newIndex),
    });
  };

  return (
    <>
      <RwireSaveTemplate
        loadModal={loadModal}
        setLoadModal={setLoadModal}
        {...props}
        fieldNameFromShortCodeExport={fieldNameFromShortCodeExport}
      />
      <RwireLoadFromTemplate
        loadSaveModal={loadSaveModal}
        setSaveLoadModal={setSaveLoadModal}
        {...props}
        fieldNameFromShortCodeExport={fieldNameFromShortCodeExport}
      />
      <div className="modal-expert">
        <div className="export-headname d-flex justify-content-between">
          <div>
            Exporting{" "}
            {selectedRows.length === 0
              ? `${totalRecordsCount + "/" + totalRecordsCount}`
              : `${selectedRows.length + "/" + totalRecordsCount}`}{" "}
            Results
          </div>
          <div
            className="cursor-pointer"
            title="Close"
            onClick={() => setExportToggle(!exportToggle)}
          >
            <CloseIcon />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="export-default-fame">
            <div className="d-flex justify-content-between">
              <div className="d-flex ">
                <Input
                  className="export-search-one "
                  placeholder={`Search For Fields`}
                  onChange={handleSearchChange}
                  value={query}
                />
                <h6
                  className="clearAll-btn load-from-template"
                  onClick={() => handleClickModalLoadSave()}
                >
                  Load from template
                </h6>
              </div>
              <div className="d-flex justify-content-between align-content-clear">
                <div>
                  <h6 className="clearAll-btn clearAll" onClick={clearAll}>
                    Clear All
                  </h6>
                </div>
                <div className="select-all">
                  <Checkbox
                    checked={value.length === fieldOptions.length}
                    onChange={handleCheckAll}
                    className="clearAll-btn "
                  >
                    Select All
                  </Checkbox>
                </div>
              </div>
            </div>

            <div className="filters-sublist-export mt-3 p-3 list-checkbox">
              <CheckboxGroup
                name="checkboxList"
                value={value}
                onChange={handleSelectField}
              >
                <ul className="filter-names-export d-flex flex-wrap">
                  {fieldOptions.map((item) => (
                    <Checkbox
                      key={item}
                      value={item}
                      checked={selectedFields.includes(item)}
                    >
                      {fieldNameFromShortCodeExport(item)}
                    </Checkbox>
                  ))}
                </ul>
              </CheckboxGroup>
            </div>
          </div>
          <div className="export-default-fame-second">
            <div className="d-flex justify-content-end">
              <h6
                className="clearAll-btn save-as-template"
                onClick={() => handleClickModalLoad()}
              >
                Save as template
              </h6>
            </div>
            <div className="filters-sublist-export filter-select-filed-list mt-3">
              <div className="select-filed-export">
                Selected Fields ({selectedFields.length})
              </div>
              <div className="dnd-export">
                <SortableList items={selectedFields} onSortEnd={onSortEnd} />
              </div>
            </div>
          </div>
        </div>
        <ExportFooter setValue={setValue} {...props} />
      </div>
    </>
  );
};

export default RwireExport;
