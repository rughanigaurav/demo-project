import Container from "../../common/main-container";
import "./style.scss";
import ChartDataBlock from "./chart-data-block";
import { useTranslation, Trans } from "react-i18next";
import { GridContextProvider, GridDropZone, swap } from "react-grid-dnd";

import { useEffect, useState } from "react";
import { uuidv4 } from "../../action/app";

const Cognizance = (props) => {
  const { t } = useTranslation();

  const { chartList, onSetChart } = props;
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [items, setItems] = useState();

  useEffect(() => {
    setItems(chartList);
  }, [chartList]);


  const handleSortEnd = (sourceId, sourceIndex, targetIndex, targetId) => {
    const result = swap(items, sourceIndex, targetIndex);

    onSetChart({ chartList: [...result] });
    return setItems([...result]);
  };

  const getHeightOfChartAsPerScreen = () => {
    let chartHeight = "384";

    if (window && window.innerWidth <= 1280) {
      chartHeight = "330";
    }
    return chartHeight;
  };

  return (
    <>
      <Trans>
        <Container className="col-md-12">
          <div className="cognizance-page chart-page">
            <div className="tab-page-title pb-3 ps-2 fw-bold">
              {t("cognizance_main_title")}
            </div>
            <div id="chart-div" className={`chart-row`}>
              <GridContextProvider onChange={handleSortEnd}>
                <GridDropZone
                  className="dropzone chart-insight"
                  disableDrag={isModelOpen}
                  id="chart-insight"
                  boxesPerRow={3}
                  rowHeight={getHeightOfChartAsPerScreen()}
                  style={{ height: "1600px" }}
                >
                  {items &&
                    items.map((item) => {
                      if (!item.isDelete) {
                        return (
                          <ChartDataBlock
                            key={uuidv4()}
                            item={item}
                            onSetIsModelOpen={setIsModelOpen}
                            {...props}
                            className="chart-data"
                          />
                        );
                      }

                      return "";
                    })}
                </GridDropZone>
              </GridContextProvider>
            </div>
          </div>
        </Container>
      </Trans>
    </>
  );
};

export default Cognizance;
