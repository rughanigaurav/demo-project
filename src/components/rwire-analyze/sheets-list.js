import { initialData } from "../../common/generate-chart-initial-data";
import SheetRow from "./sheet-row";

const SheetsList = (props) => {
  const { onSetAnalyze, sheets, onSetGenerateChart, currentSheet } = props;

  const handleMoreSheetClick = (e) => {
    const ids = sheets.map((object) => {
      return parseInt(object.id.split("-")[1]);
    });

    const max = parseInt(Math.max.apply(null, ids) + 1);

    onSetGenerateChart({ [`sheet-${max}`]: initialData });
    onSetAnalyze({
      sheets: [
        ...sheets,
        { id: `sheet-${max}`, title: `Sheet ${max}`, name: `Sheet ${max}` },
      ],
    });
  };

  return (
    <div className="sheets-list-bar d-flex mt-2">
      <div className="d-flex h-100 align-items-center ml-2 ">
        {sheets.map((item) => {
          return (
            <SheetRow
              key={item.id}
              id={item.id}
              title={item.name}
              onSetAnalyze={onSetAnalyze}
              sheets={sheets}
              currentSheet={currentSheet}
            />
          );
        })}
      </div>
      <div>
        <div
          className="sheet-tag px-2 mx-1 h-100 d-flex align-items-center cursor-pointer"
          onClick={handleMoreSheetClick}
        >
          + To add more sheets
        </div>
      </div>
    </div>
  );
};

export default SheetsList;
