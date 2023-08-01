/* eslint-disable no-useless-escape */
import { useNavigate } from "react-router-dom";
import moment from "moment";
import refreshIcon from "../../images/refresh.svg";
import bookmarkIcon from "../../images/bookmark.svg";
import removeIcon from "../../images/remove.svg";
import { BiEdit } from "react-icons/bi";
import { clearFielded } from "../../common/clear-filded";
import { getChunksData } from "../../common/getChunksData";

const HistoryRow = (props) => {
  let navigate = useNavigate();

  const {
    isBookmark,
    id,
    numberOfHits,
    query,
    createdAt,
    updatedAt,
    onDeleteHistory,
    onFetchHistory,
    onBookmarkHistory,
    selectedRows,
    onSetSelectedRows,
    onSetExportSelected,
    selectedItemList,
    onSetApp,
    setEditQuery,
    userSearchNumber,
    onRwireSearchAPI,
    clickOnEditQuery,
    selectedRowsForCombine,
    onSetItemPerPage,
  } = props;

  const deleteRecord = async () => {
    await onDeleteHistory(id);
    await onFetchHistory();
  };

  const addBookMarkRecord = () => {
    onBookmarkHistory(id, !Boolean(isBookmark));
  };

  const handleRunQuery = () => {
    onSetApp({ searchQuery: query });

    onRwireSearchAPI(query, {
      isReRunId: id,
    }).then((data) => {
      if (data) {
        navigate("/en/rwire-patents");
      } else {
        // eslint-disable-next-line no-console
        console.log(props.error);
      }
    });
  };

  let selectedId = [];
  let selectedRowNumber = [];

  const handleCheckbox = (e) => {
    selectedId = [...selectedRows, `${id}`];
    selectedRowNumber = [...selectedRowsForCombine, `${userSearchNumber}`];
    if (!e.target.checked) {
      selectedId = selectedId.filter((item) => {
        return `${item}` !== `${id}`;
      });
    }
    if (!e.target.checked) {
      selectedRowNumber = selectedRowNumber.filter((item) => {
        return `${item}` !== `${userSearchNumber}`;
      });
    }
    onSetItemPerPage({ selectedRowsForCombine: selectedRowNumber });

    const selectedList = {
      id: id,
      userSearchNumber: userSearchNumber,
      query: query,
      numberOfHits: numberOfHits,
      isBookmark: isBookmark,
      createdAt: createdAt,
    };

    if (e.target.checked) {
      selectedItemList.push(selectedList);
      onSetExportSelected({ selectedItemList: selectedItemList });
    } else if (!e.target.checked) {
      const filteredNumbers = selectedItemList.filter((element) => {
        return element.id !== selectedList.id;
      });
      onSetExportSelected({ selectedItemList: [] });
      onSetExportSelected({ selectedItemList: filteredNumbers });
    }

    onSetSelectedRows({ selectedRows: selectedId });
  };

  const isNumberSearchHistory = (string) => {
    const allowedKeywords = [
      "PN",
      "AN",
      "PRN",
      "PN_B",
      "AN_B",
      "PAPR",
      "PA",
      "PPR",
      "APR",
    ];
    string = string.match(/([^=]+)(?=\>\=|\<\=|\=)/)
      ? string.match(/([^=]+)(?=\>\=|\<\=|\=)/)[1]
      : string;
    const words = string.split(" OR ");

    // Check if any of the words are not in the list of allowed keywords
    for (const word of words) {
      if (!allowedKeywords.includes(word)) {
        return false;
      }
    }
    return true;
  };
  const handleEditQuery = async () => {
    const clearData = clearFielded(props.queryFields);
    props.onSetAllField({
      queryFields: clearData,
      tabWiseSearchQuery: { fielded: query },
    });

    setEditQuery(query);
    onSetApp({
      editQuery: query,
      clickOnEditQuery: !clickOnEditQuery,
      editQueryId: id,
      isNumberSearchHistory: isNumberSearchHistory(query),
    });

    let { equations, operators, input } = getChunksData(query);
    await onSetApp({
      chunksArray: equations,
      operatorsArray: operators,
      inputsValue: input,
    });
  };

  return (
    <div className={`table-row ${isBookmark ? "active" : ""} edit-row`}>
      <div className="table-column regular-checkbox form-check regular-checkbox">
        <input
          className={`form-check-input cursor-pointer ${
            selectedRows.includes(`${id}`) ? "checked" : ""
          }`}
          key={id}
          type="checkbox"
          defaultChecked={selectedRows.includes(`${id}`)}
          value={id}
          onChange={handleCheckbox}
        />
      </div>
      <div className="table-column  numbers">{userSearchNumber}</div>
      <div className="table-column  records">{numberOfHits}</div>
      <div
        className="table-column  search-query query-column d-flex justify-content-between gap-2"
        title={query}
      >
        <div className="edit-query-text">{query}</div>

        <div className="edit-button">
          <BiEdit
            alt="edit"
            onClick={handleEditQuery}
            className="img-fluid"
            width="30"
            height="30"
            style={{ fontSize: "20px", cursor: "pointer", marginLeft: "10px" }}
          />
        </div>
      </div>
      <div className="table-column  date-time">
        {moment.unix(updatedAt).format("DD-MM-YYYY HH:mm:ss")}
      </div>
      <div className="table-column  run">
        <img
          alt=""
          onClick={handleRunQuery}
          className="img-fluid search_history_icon cursor-pointer"
          src={refreshIcon}
        />
      </div>
      <div className="table-column  bookmark">
        <img
          alt=""
          onClick={addBookMarkRecord}
          className="img-fluid rwire-img cursor-pointer"
          src={bookmarkIcon}
        />
      </div>
      <div className="table-column delete ">
        <img
          alt=""
          onClick={deleteRecord}
          className="img-fluid rwire-imgs cursor-pointer"
          src={removeIcon}
        />
      </div>
    </div>
  );
};

export default HistoryRow;
