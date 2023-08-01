import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "rsuite";
import RWireButton from "../rwire-ui/rwire-button/rwire-button";
import CloseIcon from "@rsuite/icons/Close";

const DownloadCenterEmailModal = (props) => {
  const {
    emailDownloadToggle,
    setEmailDownloadToggle,
    onExportMailRecord,
    setMailId,
    mailId,
    data,
  } = props;

  const { t } = useTranslation();

  const [displayEmailValue, setDisplayEmailValue] = useState();

  if (!emailDownloadToggle) {
    return null;
  }

  const handleClickModalEmailClose = () => {
    setEmailDownloadToggle(false);
    setMailId("");
  };

  const handleEmailChange = (event) => {
    setDisplayEmailValue(event.target.value);
  };

  const handleSendClick = () => {
    const mailData = data.filter((item) => item.id === mailId)[0];
    setEmailDownloadToggle(!emailDownloadToggle);
    setDisplayEmailValue("");
    onExportMailRecord({
      emails: displayEmailValue,
      subject: mailData.fileName ? mailData.fileName : "Rwire Data Download",
      fileName: mailData.fileName ? mailData.fileName : "Rwire Data Download",
      message: "",
      searchBody: mailData.body,
      searchFields: mailData.exportFields,
    });
  };

  return (
    <Modal
      className="modalClassFilterEmail"
      backdrop="true"
      keyboard={false}
      open={true}
      onClose={() => {
        setEmailDownloadToggle(!emailDownloadToggle);
      }}
    >
      <div>
        <div className="d-flex justify-content-between download-center-header light-blue-background">
          <div className="download-center-text">Send Email</div>
          <div
            className="cursor-pointer"
            title="Close"
            onClick={handleClickModalEmailClose}
          >
            <CloseIcon />
          </div>
        </div>
        <div className="email-button-center-download">
          <div className="email-text-download">Email id</div>
          <div className=" mb-3">
            <input
              type="text"
              className="form-control download-email"
              placeholder="Type a email id"
              value={displayEmailValue}
              onChange={handleEmailChange}
            />
          </div>
          <div className="d-flex justify-content-end">
            <RWireButton
              buttonCName="input-button-text-form"
              onClick={handleSendClick}
            >
              {t("send_button_label")}
            </RWireButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadCenterEmailModal;
