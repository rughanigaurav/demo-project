import { useTranslation } from "react-i18next";

const TableHeader = (props) => {
  const { t } = useTranslation();

  return (
    <div className="header_wrapper table-row rwire-tableheader">
      <div className="form-check regular-checkbox table-column">
      </div>
      <div
          className="table-column numbers"
        >
          {t("history-table-title-numbers")}
      </div>
      <div
          className="table-column records"
        >
          {t("history-table-title-records")}

      </div>
      <div
          className="table-column search-query"
        >
          {t("history-table-title-query")}

      </div>
    </div>
  )
}

export default TableHeader;
