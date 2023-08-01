import React from "react";
import "./style.scss";
import Banner from "../../assets/images/page-not-found-banner.png";
import Arrow from "../../assets/images/left-arrow.png";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
const RwireNotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = () => {
    navigate("/en");
  };
  return (
    <div className="not-found-page">
      <div className="banner-img">
        <img src={Banner} alt="Not Found" />
      </div>
      <div className="not-found-page-content">
        <div className="fof-alert">404</div>
        <div className="fof-message-one pt-3">
          <Trans>{t("fof_message_one")}</Trans>
        </div>
        <div className="fof-message-two py-3 ">
          <Trans>{t("fof_message_two", { br: "<br />" })}</Trans>
        </div>
        <RWireButton
          buttonCName="back-to-home-page-btn py-2 px-3"
          buttonImg={Arrow}
          onClick={handleClick}
        >
          <Trans>{t("back_to_home_page")}</Trans>
        </RWireButton>
      </div>
    </div>
  );
};

export default RwireNotFound;
