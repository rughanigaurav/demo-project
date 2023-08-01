import React from "react";
import maintainance_logo from "../../assets/images/maintainance_logo.svg";
import "./rwire-maintainance.scss";
import { Trans, useTranslation } from "react-i18next";

const RwireMaintainance = () => {
  const { t } = useTranslation();
  return (
    <div className="maintainance-main">
      <div className="maintainance-inner">
        <div>
          <img src={maintainance_logo} className="maintainance_logo" alt="" />
        </div>
        <div className="maintainance-text-section">
          <div className="heading_text">
            <Trans>
              <span>{t("maintainance_message", { br: "<br />" })}</span>
            </Trans>
          </div>
          <div className="apology_text">
            <Trans>{t("maintainance_apology_message")}</Trans>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RwireMaintainance;
