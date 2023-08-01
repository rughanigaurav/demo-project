import React, { useEffect } from "react";
import CoggnizanceBlock from "../../components/rwire-cognizance";
import AnalyzeBlock from "../../container/rwire-analyze";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import RWireselectFields from "../../components/common/common-functions/rwire-selected-fields";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";
import printIcon from "../../images/print.svg";
import { handlePrint } from "../../common/print";

const RWireCognizance = (props) => {
  const navigate = useNavigate();

  const {
    chartList,
    onSetChart,
    activeTab,
    currentSheet,
    sheets,
    previousPage = "rwire-patents",
  } = props;

  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  const handleBackSearchClick = () => {
    navigate(`/en/${previousPage}`);
  };

  const handleAddToCognizance = () => {
    const { xaxis, yaxis, type } = props[currentSheet];

    const sheetTitle = sheets.filter((i) => i.id === currentSheet)[0].title;

    const newChartConfig = {
      chartMainTitle: sheetTitle,
      field1: xaxis,
      field2: yaxis,
      id: `${xaxis}-${yaxis}-${type}`,
      isDelete: false,
      type: type,
      availableChartList: [
        "line",
        "column2D",
        "bar2D",
        "pie2D",
        "splinearea",
        "doughnut2D",
        "column3d",
        "pie3d",
        "doughnut3d"
      ]
    };

    onSetChart({ chartList: [newChartConfig, ...chartList] });
  };

  const handleDefaultViewClick = () => {
    let newChartList = [];
    // eslint-disable-next-line array-callback-return
    chartList.map((item) => {
      item.isDelete = false;
      newChartList.push(item);
    });

    onSetChart({ chartList: newChartList });
  };

  const { t } = useTranslation();

  const isFilter =
    currentSheet &&
    props[currentSheet] &&
    (props[currentSheet].data.length > 0 ||
      (props[currentSheet].dataset &&
        props[currentSheet].dataset[0].data.length > 0));

  return (
    <>
      {/* <RWireSearch /> */}
      <div className="container-fluid  main-div-download">
        <div className="container">
          <div className="tab-main">
            <div>
              <button
                className="tablink"
                onClick={(e) => RWireselectFields("Cognizance", e, onSetChart)}
                id="defaultOpen"
              >
                <Trans>{t("cognizance_tab_cognizance")}</Trans>
              </button>
              <button
                className="tablink"
                onClick={(e) => RWireselectFields("Analytics", e, onSetChart)}
              >
                <Trans>{t("cognizance_tab_analytics")}</Trans>
              </button>
            </div>
            <div className="extra-buttons d-flex">
              {activeTab === "Analytics" && (
                <RWireButton
                  buttonCName="input-button-text-form me-2 w-auto p-1"
                  name={t("cognizance_add_cognizance")}
                  buttonImg={""}
                  onClick={handleAddToCognizance}
                ></RWireButton>
              )}
              <RWireButton
                buttonCName="input-button-text-form mx-2"
                name={t("back_to_search")}
                buttonImg={""}
                onClick={handleBackSearchClick}
              ></RWireButton>
              {activeTab === "Cognizance" && (
                <RWireButton
                  buttonCName="input-button-text-form me-2"
                  name={t("cognizance_default_view")}
                  buttonImg={""}
                  onClick={handleDefaultViewClick}
                ></RWireButton>
              )}
              <RWireButton
                buttonCName={`input-button-text-form export-button normal-button  ${activeTab === "Analytics" && !isFilter ? "disabled" : ""
                  }`}
                name={t("print")}
                buttonImg={printIcon}
                onClick={
                  activeTab === "Analytics" && !isFilter ? "" : handlePrint
                }
              >
                <Trans>{t("print")}</Trans>
              </RWireButton>
            </div>
          </div>
          <div className="tab-containt-main">
            <div id="Cognizance" className={`tabcontent remove-space-x`}>
              <div id="section-to-print">
                <CoggnizanceBlock {...props} />
              </div>
            </div>

            <div
              id="Analytics"
              className="tabcontent remove-space-x analyze-page"
            >
              <AnalyzeBlock {...props} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RWireCognizance;
