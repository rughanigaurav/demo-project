import { useState } from "react";
import { Input } from "rsuite";
import RWIRE_IMAGES from "../components/common/common-functions/rwire-images";
import { maxExportRecordsCount } from "../components/constant";
import { useNavigate } from "react-router-dom";

const ExportFooter = (props) => {
  const {
    onSetSelectedField,
    onExportMailRecord,
    onSetExport,
    setValue,
    selectedFields,
    exportFileName,
    isExportLoading,
    selectedRows,
    totalRecordsCount,
    exportToggle,
    setExportToggle,
  } = props;

  const navigate = useNavigate();

  const downloadLimitExceed =
    selectedRows.length > 0
      ? false
      : totalRecordsCount > maxExportRecordsCount
      ? true
      : false;

  // eslint-disable-next-line no-unused-vars
  const [fileType, setFileType] = useState("csv");
  const [emailValue, setEmailValue] = useState("");

  const handleExport = async (e) => {
    if (!isExportLoading && !downloadLimitExceed) {
      await onExportMailRecord({
        emails: "",
        subject: exportFileName ? exportFileName : "Rwire Data Download",
        fileName: exportFileName ? exportFileName : "Rwire Data Download",
        isDownload: true,
        message: "",
      });

      setValue([]);

      return navigate("/en/download-center");
    }
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    onSetExport({ selectedType: e.target.value });
  };

  const handleFileNameChange = (e) => {
    onSetExport({ exportFileName: e });
  };

  const handleChange = (e) => {
    setEmailValue(e);
  };

  const handleSendMail = () => {
    if (emailValue && selectedFields.length > 0) {
      onExportMailRecord({
        emails: emailValue,
        subject: exportFileName ? exportFileName : "Rwire Data Download",
        fileName: exportFileName ? exportFileName : "Rwire Data Download",
        message: "",
      });

      onSetSelectedField({ selectedFields: [] });
      setValue([]);
      setExportToggle(!exportToggle);

      navigate("/en/download-center");
    }

    return null;
  };

  return (
    <div className="d-flex justify-content-end footer-export">
      <div>
        <Input
          className="export-search file-name-export"
          placeholder={"file name"}
          onChange={handleFileNameChange}
        />
      </div>
      <div>
        <select
          onChange={handleFileTypeChange}
          className="form-select export-type">
          <option value="csv">CSV</option>
          <option value="xlsx">XLSX</option>
        </select>
      </div>
      <div
        className={`export-download d-flex ${
          isExportLoading || downloadLimitExceed ? "opacity-50" : ""
        }`}
        onClick={handleExport}>
        <div className="export-download-text">Download</div>
        <img
          src={RWIRE_IMAGES.RwireDownload}
          className="export-sec-icons"
          alt=""
        />
      </div>
      <div className="export-save d-flex">
        <div className="export-savedafault-text">Save default</div>
        <img src={RWIRE_IMAGES.RwireSave} className="export-sec-icons" alt="" />
      </div>
      <div className="d-flex justify-content-between footer-emailer">
        <span className="email-hard">Email</span>{" "}
        <Input
          className="export-search export-email-input"
          placeholder={`Email`}
          onChange={handleChange}
          value={emailValue}
        />
        <span>
          <img
            src={RWIRE_IMAGES.RwireEmail}
            title="Send on mail"
            alt=""
            onClick={handleSendMail}
            className="email-export"
          />
        </span>
      </div>
    </div>
  );
};

export default ExportFooter;
