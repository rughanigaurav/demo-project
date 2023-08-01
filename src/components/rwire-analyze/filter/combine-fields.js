import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import MergeBlock from "./merge-block";
import closeIcon from "../../../images/close-icon.svg";
import { useTranslation } from "react-i18next";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";

const CombineFields = (props) => {
  const { t } = useTranslation();

  const {
    updateConfig,
    currentSheet,
    mergeData,
    onGetResult,
    chartId,
    listMerge,
    onChangeChartDataAsPerMerge,
    onSetGenerateChart,
    listTopNumbers,
    topNumberSize
  } = props;
  const [isFilterModal, setIsFilterModal] = useState(false);

  const handleClick = () => {
    setIsFilterModal(true);
  };

  const handleClose = () => {
    setIsFilterModal(false);
  };

  return (
    <div>
      <RWireButton
        buttonCName="input-button-text-form normal-button big-width me-3"
        onClick={handleClick}>
        {t("combine_fields")}
      </RWireButton>
      <div>
        <Modal
          show={isFilterModal}
          size="m"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Body>
            <div>
              <img
                className="width-25 cursor-pointer position-absolute merge-close-icon"
                alt=""
                src={closeIcon}
                width="20"
                height="20"
                onClick={handleClose}
              />
            </div>
            <div className="d-flex justify-content-center">
              {!updateConfig.type.includes("maps/") &&
              updateConfig.type !== "msline" ? (
                <MergeBlock
                  {...props}
                  mergeData={mergeData}
                  onGetResult={onGetResult}
                  chartId={chartId}
                  listMerge={listMerge}
                  listTopNumbers={listTopNumbers}
                  onChangeChartDataAsPerMerge={onChangeChartDataAsPerMerge}
                  onSetGenerateChart={onSetGenerateChart}
                  currentSheet={currentSheet}
                  topNumberSize={topNumberSize}
                />
              ) : (
                ""
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CombineFields;
