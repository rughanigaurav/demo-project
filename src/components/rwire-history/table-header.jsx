import { useTranslation } from "react-i18next";

const TableHeader = (props) => {
  const { t } = useTranslation();
  const { selectedRows, onSetSelectedRows, selectedItemList, data, onSetExportSelected, onSetItemPerPage, selectedRowsForCombine } = props;

  const handleCheckbox = (event) => {

    let selectIds = [];
    let selectRowNumber = [];
    let selectedList = [];

    // eslint-disable-next-line array-callback-return
    data.map((i) => {
      selectIds.push(`${i.id}`);
      selectRowNumber.push(`${i.userSearchNumber}`);
      selectedList.push({id: i.id, userSearchNumber: i.userSearchNumber,  query: i.query, numberOfHits: i.numberOfHits, isBookmark: i.isBookmark, createdAt: i.createdAt});
    });

    if(event.target.checked) {
      onSetSelectedRows({ selectedRows: selectIds });
      onSetItemPerPage({selectedRowsForCombine: selectRowNumber})
      onSetExportSelected({selectedItemList: selectedList})

    } else {
      const difference = selectedRows.filter( x => !selectIds.includes(x) );
      const differenceRowNumber = selectedRowsForCombine.filter( x => !selectRowNumber.includes(x) );
      onSetSelectedRows({ selectedRows: difference });
      onSetItemPerPage({selectedRowsForCombine: differenceRowNumber})

      var result = selectedItemList.filter(function (element) {
          return difference.includes(`${element.id}`);
      });
      onSetExportSelected({selectedItemList: result});
    }
  }

  return (
    <div className="header_wrapper table-row rwire-tableheader">
      <div className="form-check regular-checkbox table-column">
        <input
          className="form-check-input regular-checkbox"
          type="checkbox"
          onChange={handleCheckbox}
        />
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
      <div
          className="table-column date-time"
        >
          {t("history-table-title-date")}

      </div>
      <div
          className="table-column run"
        >
          {t("history-table-title-run")}
      </div>
      <div
          className="table-column bookmark"
        >
          {t("history-table-title-bookmark")}
      </div>
      <div
          className="table-column delete"
        >
          {t("history-table-title-delete")}
      </div>
    </div>
  )
}

export default TableHeader;
