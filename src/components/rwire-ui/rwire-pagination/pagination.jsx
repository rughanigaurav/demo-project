import React, { useEffect, useState } from "react";
// import { useSharedContext } from "../../el-search";
import Select from "react-select";
// import { perPageOptions } from "../result-table/content";
import RCPagination from "rc-pagination";
import "./style.scss";
import { useTranslation } from "react-i18next";

const perPageOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
  { value: "200", label: "200" },
  { value: "500", label: "500" },
];


const Pagination = (props) => {
  const { t } = useTranslation();
  const {
    total,
    itemsPerPage,
    page,
    onSetItemPerPage,
    limit,
    onGetPagination,
    totalPage,
    onSetPage,
    isResultFetch = true,
    ...rest
  } = props;

  useEffect(() => {
    onGetPagination(total, itemsPerPage, page);
  });
  const [pageValue, setPageValue] = useState("");
  const [clname, setClassName] = useState("pages_input_box");

  const handleChangeOptions = (item) => {
    onSetItemPerPage({ itemsPerPage: parseInt(item.value) });
    if(isResultFetch) {
      // dispatch({ type: "fetchQueryData", dispatch });
    }
    onSetPage(1);
  };

  const enterPageAlert = () => {
    // eslint-disable-next-line no-console
    console.log("Please enter page number");
  }
  const pageNotFoundAlert = () => {
    // eslint-disable-next-line no-console
    console.log("Page number not found");
  }
  const handleChange = (event) => {
    setPageValue(event.target.value);
    if (event.target.value.length >=0){
      setClassName("pages_input_box");
    }
  };

  const handleClick = () => {
    if (pageValue !== "") {
      if(parseInt(pageValue) <= 0){
        setClassName("red_border")
        setTimeout(pageNotFoundAlert,100);
      }
      else if (parseInt(pageValue) <= parseInt(totalPage)) {
        onSetPage(pageValue);
      } else {
        setClassName("red_border")
        setTimeout(pageNotFoundAlert,100);
      }
    } else if(pageValue === ""){
      setClassName("red_border");
      setTimeout(enterPageAlert ,100);
    }

  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      if(parseInt(pageValue) <= 0){
        setClassName("red_border")
        setTimeout(pageNotFoundAlert,100);
      }
      else if (parseInt(pageValue) <= parseInt(totalPage)) {
        onSetPage(pageValue);
      } else {
        setClassName("red_border")
        setTimeout(pageNotFoundAlert,100);
      }
    } else if(event.key === "Enter" ){
      setClassName("red_border");
      setTimeout(enterPageAlert,100);

    }
  }

  const offset = parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * itemsPerPage;
  const record = offset + itemsPerPage > total ? total : offset + itemsPerPage;

  return (
    <div className={`pagination p-4 d-flex align-items-center justify-content-between`}>
      <div className={`per_page_block d-flex align-items-center justify-content-between`}>
        <div className="pe-1 me-1 px-1">{t("pagination-records-page")}</div>
        <Select
          defaultValue={itemsPerPage}
          onChange={handleChangeOptions}
          options={perPageOptions}
          className="mr-3 page-number-dropdown"
          placeholder={itemsPerPage}
          menuPlacement="top"
          isSearchable={false}

        />
        <div className="ps-3 ms-2 me-2">
        {t("pagination-showing")} {offset + 1} {t("pagination-to")} {record} {t("pagination-of")} {total}
        </div>
      </div>
      {totalPage > 1 ? (
        <RCPagination
          {...rest}
          current={parseInt(page)}
          onChange={onSetPage}
          pageSize={itemsPerPage}
          total={total}
          showTitle={true}
          locale={{
            items_per_page: '/ page',
            jump_to: 'Go to',
            jump_to_confirm: 'confirm',
            page: 'Page',
            prev_page: 'Previous Page',
            next_page: 'Next Page',
            prev_5: 'Previous 5 Pages',
            next_5: 'Next 5 Pages',
            prev_3: 'Previous 3 Pages',
            next_3: 'Next 3 Pages',
            page_size: 'Page Size'
          }}
        />
      ) : (
        <div className="pagination__navigate">
          <div className="pagination__page">
            <span>
              <div
                className={`
                page-number me-2
                d-flex align-items-center justify-content-center
                selected-page
              `}
              >
                {totalPage}
              </div>
            </span>
          </div>
        </div>
      )}
      <div className={`ml-4 jump_to_page d-flex align-items-center justify-content-between`}>
        <div className="jump-pages pe-3">{t("pagination-jump-pages")}</div>
        <div className="pe-2">
          <input
            type="text"
            value={pageValue}
            placeholder="pages"
            onChange={handleChange}
            // className= {`pages_input_box ${clname}`}
            className= {clname}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <button
            type="button"
            className={`go-btn d-flex align-items-center justify-content-between`}
            onClick={handleClick}
          >
            {t("pagination-go")}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
