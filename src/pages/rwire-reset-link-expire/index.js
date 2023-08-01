import React from "react";
import "./reset-link-expire.scss";
import LinkExpire from "../../assets/images/reset-link-expire.png";
import { Trans, useTranslation } from "react-i18next";

const RwireResetLinkExpire = () => {
  const { t } = useTranslation();
  return (
    <div className="link-expire-page d-flex flex-column">
      <div className="upper-block"></div>
      <div className="lower-block">
        <div className="inner-block">
          <div className="message-block">
            <div className="d-flex flex-column inner-message-block">
              <div className="link-expire-img">
                <img
                  src={LinkExpire}
                  class=""
                  alt=""
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="link-expire-message">
                <Trans>{t("reset_link_expire_message")}</Trans>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RwireResetLinkExpire;
