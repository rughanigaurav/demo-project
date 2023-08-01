import { memo, useEffect, useState } from "react";
import XDropDiv from "./xdrop-div";
import YDropDiv from "./ydrop-div";
import GenerateChart from "./generate-chart";
import FilterButton from "./filter/filter-button";
import { dragableFields } from "../../common/dragable-field-list";
import SheetsList from "./sheets-list";
import AnalyzeFieldsList from "./analyze-fields-list";

export const getFullName = (fieldName) => {
  const filterData = dragableFields.filter((i) => i.code === fieldName);

  if (filterData.length > 0) {
    return filterData[0].title;
  }
};

export const DragContainer = memo(function DragContainer(props) {
  const [isEditTitle, setEditTitle] = useState(false);
  const [value, setValue] = useState(props.sheets);

  const { onSetAnalyze, sheets, currentSheet, onSetGenerateChart } = props;

  const [isFilterModal, setIsFilterModal] = useState(false);

  const currentSheetTitle = sheets.filter((i) => i.id === currentSheet)[0]
    .title;

  useEffect(() => {
    setValue(sheets);
  }, [sheets]);

  const handleTitleChange = () => {
    setEditTitle(true);
  };

  const handleChange = (e) => {
    // eslint-disable-next-line array-callback-return
    value.map((i, k) => {
      if (i.id === currentSheet) {
        value[k].title = e.target.value;
      }
    });

    setValue([...value]);
  };

  const handleBlur = () => {
    // eslint-disable-next-line array-callback-return
    sheets.map((i, k) => {
      if (i.id === currentSheet) {
        const curValue = value.filter((i) => i.id === currentSheet)[0].title;
        sheets[k].title = curValue;
      }
    });

    onSetAnalyze({ sheets });
    setEditTitle(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      // eslint-disable-next-line array-callback-return
      sheets.map((i, k) => {
        if (i.id === currentSheet) {
          sheets[k].title = e.target.value;
        }
      });

      onSetAnalyze({ sheets });
      setEditTitle(false);
    }
  };

  const curValue = value.filter((i) => i.id === currentSheet)[0].title;

  return (
    <>
      <div className="d-flex justify-content-space-between col-md-12">
        <div className="mb-4 col-md-3 position-sticky remove-space-x">
          <div className="card me-2 analyze-fields">
            <div className="card-header px-4">
              <h2 className="card-title m-0">Fields</h2>
            </div>
            <div className="card-body px-2">
              <AnalyzeFieldsList dragableFields={dragableFields} {...props} />
            </div>
          </div>
        </div>
        <div className="col-md-9  mb-4 pe-0">
          <div className="chart-area d-flex ms-2">
            <div className="position-relative w-100 ps-3 ">
              <div className="d-flex pb-2">
                <XDropDiv
                  dropboxname="xaxis"
                  {...props}
                  getFullName={getFullName}
                />
                <YDropDiv
                  dropboxname="yaxis"
                  {...props}
                  getFullName={getFullName}
                />

                <FilterButton
                  {...props}
                  setIsFilterModal={setIsFilterModal}
                  isFilterModal={isFilterModal}
                />
              </div>

              <div id="section-to-print" className="analyze-print">
                <div className="card mb-4 chart-generate-area">
                  <div className="card-header px-4">
                    {!isEditTitle ? (
                      <h2
                        className="card-title m-0"
                        onClick={handleTitleChange}
                      >
                        {currentSheetTitle ? currentSheetTitle : "Title"}
                      </h2>
                    ) : (
                      <div className="card-title m-0">
                        <input
                          type="text"
                          className="title-change-input"
                          value={curValue}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          onBlur={handleBlur}
                        />
                      </div>
                    )}
                  </div>
                  <div className="card-body px-4 chart-body position-relative">
                    <GenerateChart
                      {...props}
                      setIsFilterModal={setIsFilterModal}
                      isFilterModal={isFilterModal}
                    />
                  </div>
                </div>
              </div>

              <SheetsList
                onSetAnalyze={onSetAnalyze}
                sheets={sheets}
                onSetGenerateChart={onSetGenerateChart}
                currentSheet={currentSheet}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
