import { useEffect } from "react";
import { inActiveAutoLogoutTime } from "../../components/constant";
import Modal from "react-bootstrap/Modal";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const AlertModal = (props) => {
  const { closeModel, isOpen, minutes, seconds } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      window.logoutTimer = setTimeout(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();

        sessionStorage.setItem("expired", "true");
        return navigate("/en/login");
      }, inActiveAutoLogoutTime);
    } else {
      clearTimeout(window.logoutTimer);
    }
  }, [isOpen, navigate]);

  return (
    <Modal
      show={true}
      size="md"
      className="timeout-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body>
        <div className="modal-content medium-modal space-around-modal-large border-0">
          <h5>
            <Trans>
              {t("timeout_message", { minutes: minutes, seconds: seconds })}
            </Trans>
          </h5>
          <div className="d-flex justify-content-end mt-3">
            <RWireButton
              cNameDiv="search-query"
              buttonCName="input-button-text-form"
              name="Continue"
              onClick={closeModel}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
