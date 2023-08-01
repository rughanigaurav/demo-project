import { useTranslation } from "react-i18next";
import collapse from "../../../assets/images/collapse.png";

const TableHeader = ({ fullDefinationText, onSetFullDefinationText }) => {
  const { t } = useTranslation();

  return (
    <div className="header_wrapper table-row rwire-tableheader">
      <div className="form-check regular-checkbox table-column">
        {/* <input className="form-check-input regular-checkbox" type="checkbox" /> */}
      </div>
      <div className="table-column class">{t("classes-suggestor-title")}</div>
      <div className="table-column definition justify-content-center">
        <div>{t("classes-suggestor-definition")}</div>
        <div>
          <img
            src={collapse}
            alt=""
            onClick={() => onSetFullDefinationText(!fullDefinationText)}
            className="collapse-expand-image"
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default TableHeader;
