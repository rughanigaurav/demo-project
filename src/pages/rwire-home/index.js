import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import RWireFielded from "../../container/search-query";
import RWireSearch from "../../container/rwire-search";
import { Trans, useTranslation } from "react-i18next";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import RwireExpert from "../../container/rwire-expert";
import RwireNumber from "../../container/rwire-number";
import LocaleLink from "../../components/common/local-links";
import "../../assets/css/search-page.scss";
import { handleSetActiveTab } from "../../action/app";
import RwireLoader from "../../container/rwire-loader";

const RWireHome = (props) => {
  const { t } = useTranslation();
  const { onSetApp, activeTab, onSetQuery } = props;
  useEffect(() => {
    const hashKey = window.location.hash;

    handleSetActiveTab(hashKey, onSetApp, onSetQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (hashKey) => {
    handleSetActiveTab(hashKey, onSetApp, onSetQuery);
  };

  return (
    <>
      <RwireLoader />
      <RWireSearch />
      <div className="container-fluid  home-backline search-page">
        <div className="home-page-content">
          <div className="tab-main">
            <LocaleLink to="#fielded">
              <button
                className={`tablink ${
                  activeTab === "fielded" ? "active-filed" : ""
                }`}
                id="defaultOpen"
                onClick={() => handleClick("#fielded")}>
                <img src={RWIRE_IMAGES.RwireFiledIcon} alt="" />
                <Trans>{t("fielded")}</Trans>
              </button>
            </LocaleLink>
            <LocaleLink to="#expert">
              <button
                onClick={() => handleClick("#expert")}
                className={`tablink ${
                  activeTab === "expert" ? "active-filed" : ""
                }`}>
                <img src={RWIRE_IMAGES.RwireExpertIcon} alt="" />
                <Trans>{t("expert")}</Trans>
              </button>
            </LocaleLink>
            <LocaleLink to="#number">
              <button
                onClick={() => handleClick("#number")}
                className={`tablink ${
                  activeTab === "number" ? "active-filed" : ""
                }`}>
                <img src={RWIRE_IMAGES.RwireNumberIcon} alt="" />
                <Trans>{t("number")}</Trans>
              </button>
            </LocaleLink>
          </div>
          <div className="tab-containt-main home-tab">
            {activeTab === "fielded" ? (
              <div
                id="Fielded"
                className={`tabcontent ${
                  activeTab === "fielded" ? "show" : "hide"
                } `}>
                <RWireFielded />
              </div>
            ) : activeTab === "expert" ? (
              <div
                id="Expert"
                className={`tabcontent ${
                  activeTab === "expert" ? "show" : "hide"
                } `}>
                <RwireExpert {...props} />
              </div>
            ) : (
              <div
                id="Number"
                className={`tabcontent ${
                  activeTab === "number" ? "show" : "hide"
                } `}>
                <RwireNumber {...props} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default RWireHome;
