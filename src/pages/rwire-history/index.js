import React, { useEffect, useState } from "react";
import HistoryBlock from "../../components/rwire-history";
import { Trans } from "react-i18next";
import { t } from "i18next";
import RwireHistoryFielded from "../../components/rwire-history/rwire-history-fielded";
import RwireExpert from "../../container/rwire-expert";
import RwireNumber from "../../container/rwire-number";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import { RwireCombineQuery } from "../../components/rwire-history/rwire-combine-query";
import { clearFielded } from "../../common/clear-filded";
import { resetFields } from "../../resources/data/options";
import { getEditFields } from "../../action/history";
import { handleSetActiveTab } from "../../action/app";
import RwireLoader from "../../container/rwire-loader";

const resetData = resetFields;
const RwireHistory = (props) => {
  const {
    isNumberSearchHistory,
    clickOnEditQuery,
    editQuery,
    onSetApp,
    onSetAllField,
    chunksArray,
    operatorsArray,
    onSetQuery,
    inputsValue,
  } = props;
  const [selectedField, setSelectedField] = useState("Fielded");
  // eslint-disable-next-line no-unused-vars
  const [editQueryId, setEditQueryId] = useState("");
  useEffect(() => {
    document.getElementById("defaultOpen").click();
    document.title = "Researchwire | Search";
  }, []);
  useEffect(() => {
    if (isNumberSearchHistory) {
      const clearData = clearFielded(resetData);
      onSetAllField({ queryFields: clearData });
    } else if (
      editQuery &&
      (editQuery.includes("SS") ||
        (editQuery.includes(">") && !editQuery.includes(">=")) ||
        (editQuery.includes("<") && !editQuery.includes("<=")))
    ) {
      const clearData = clearFielded(resetData);
      onSetAllField({ queryFields: clearData });
    } else {
      if (editQuery) {
        let temp = "";
        temp = getEditFields(inputsValue, chunksArray, operatorsArray);
        setTimeout(() => {
          if (editQuery) {
            onSetAllField({ queryFields: temp });
          }
        }, 50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickOnEditQuery]);

  useEffect(() => {
    onSetApp({ editQuery: "" });
    if (document.title === "Researchwire | History") {
      setSelectedField("Fielded");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.title]);
  useEffect(() => {
    if (isNumberSearchHistory) {
      setSelectedField("Number");
    } else if (
      editQuery &&
      (editQuery.includes("SS") ||
        (editQuery.includes(">") && !editQuery.includes(">=")) ||
        (editQuery.includes("<") && !editQuery.includes("<=")))
    ) {
      setSelectedField("Expert");
    } else {
      setSelectedField("Fielded");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickOnEditQuery]);
  const handleFielded = () => {
    if (selectedField !== "Fielded") {
      setTimeout(() => {
        setSelectedField("Fielded");
        handleSetActiveTab("#fielded", onSetApp, onSetQuery);
      }, 10);
    }
  };
  const handleExpert = () => {
    if (selectedField !== "Expert") {
      setTimeout(() => {
        setSelectedField("Expert");
        handleSetActiveTab("#expert", onSetApp, onSetQuery);
      }, 10);
    }
  };
  const handleNumber = () => {
    if (selectedField !== "Number") {
      setTimeout(() => {
        setSelectedField("Number");
        handleSetActiveTab("#number", onSetApp, onSetQuery);
      }, 10);
    }
  };

  return (
    <>
      <RwireLoader />
      <div className="container-fluid  history-page">
        <div className="home-page-content">
          <div className="tab-main">
            <button
              className={`tablink ${
                selectedField === "Fielded" || selectedField === "Combine"
                  ? "tablink-selected"
                  : ""
              }`}
              onClick={handleFielded}
              id="defaultOpen"
            >
              <img alt="" src={RWIRE_IMAGES.RwireFiledIcon} />
              <Trans>{t("fielded")}</Trans>
            </button>
            <button
              className={`tablink ${
                selectedField === "Expert" ? "tablink-selected" : ""
              }`}
              onClick={handleExpert}
            >
              <img alt="" src={RWIRE_IMAGES.RwireExpertIcon} />
              <Trans>{t("expert")}</Trans>
            </button>
            <button
              className={`tablink ${
                selectedField === "Number" ? "tablink-selected" : ""
              }`}
              onClick={handleNumber}
            >
              <img alt="" src={RWIRE_IMAGES.RwireNumberIcon} />
              <Trans>{t("number")}</Trans>
            </button>
          </div>

          <div className="tab-containt-main">
            <div className="tabcontent">
              {selectedField === "Fielded" && (
                <RwireHistoryFielded {...props} />
              )}
              {selectedField === "Expert" && (
                <RwireExpert {...props} editQueryId={editQueryId} />
              )}
              {selectedField === "Number" && (
                <RwireNumber {...props} editQueryId={editQueryId} />
              )}
              {selectedField === "Combine" && (
                <RwireCombineQuery {...props} editQueryId={editQueryId} />
              )}
              <HistoryBlock {...props} setSelectedField={setSelectedField} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RwireHistory;
