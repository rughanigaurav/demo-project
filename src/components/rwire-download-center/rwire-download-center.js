/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import "./style.scss";
import RWIRE_IMAGES from "../common/common-functions/rwire-images";
import searchIcon from "../../assets/images/search-button.svg";
import RwireFilterIconDark from "../../assets/images/dark-filter-icon.svg";
import clearIcon from "../../assets/images/clear-icon.svg";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trans, useTranslation } from "react-i18next";
import moment from "moment";
import Pagination from "../../components/rwire-ui/rwire-pagination";
import DownloadCenterEmailModal from "./email-modal";
import ActionButtons from "./action-buttons";

const RwireDownloadCenter = (props) => {
  const {
    data,
    onSetPage,
    onSetItemPerPage,
    onFetchDownloadCenterData,
    onGetPagination,
    totalRecordsCount,
    itemsPerPage,
    onDeleteDownloadCenter,
    page,
    onExportMailRecord,
    filterFileType,
  } = props;

  const [emailDownloadToggle, setEmailDownloadToggle] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [mailId, setMailId] = useState();
  const [datePickerImg, setDatepickerImg] = useState(false);

  const getData = () => {
    onFetchDownloadCenterData();
    const dataFetchTimer = setInterval(
      async () => onFetchDownloadCenterData(),
      5000
    );

    return dataFetchTimer;
  };

  useEffect(() => {
    const dataFetchTimer = getData();

    // returned function will be called on component unmount
    return () => {
      clearInterval(dataFetchTimer);
    };
  }, []);

  const handleChange = (p) => {
    onSetPage(p);
    onFetchDownloadCenterData();
  };

  const handleSearchOnChange = (event) => {
    setSearchValue(event.target.value);

    if (value === "") {
      setFilteredData(data); // Set filteredData to data if input value is empty
    } else {
      const filtered = data.filter((item) =>
        item.fileName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleSearchClick = (event) => {
    onSetItemPerPage({ filterSearch: searchValue });
    onFetchDownloadCenterData();
  };

  const handleDateChange = (date) => {
    setDatepickerImg(true);
    setStartDate(date);
    onSetItemPerPage({ filterDate: date });
    onFetchDownloadCenterData();
  };

  const handleSelect = (event) => {
    onSetItemPerPage({ filterFileType: event.value });
    onFetchDownloadCenterData();
  };

  const handleClearSelect = () => {
    onSetItemPerPage({ filterFileType: "" });
    onFetchDownloadCenterData();
  };

  const handleClearDate = () => {
    setStartDate(null);
    onSetItemPerPage({ filterDate: "" });
    onFetchDownloadCenterData();
    setDatepickerImg(false);
  };
  const handleEnter = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const { t } = useTranslation();

  return (
    <div className="background-line">
      <div className="download-center-banner">
        <div className="download-center-text">{t("download-center")}</div>
      </div>
      <Trans>
        <div className="container-fluid main-div-download">
          <DownloadCenterEmailModal
            emailDownloadToggle={emailDownloadToggle}
            setEmailDownloadToggle={setEmailDownloadToggle}
            onExportMailRecord={onExportMailRecord}
            mailId={mailId}
            setMailId={setMailId}
            data={data}
          />

          <div className="container">
            <div className="download-center-main mt-3">
              <div className="download-center-table-main">
                <div className="d-flex justify-content-between filter-search-main px-3">
                  <div className="d-flex   download-center-search">
                    <div className="search-input-main">
                      <input
                        type="text"
                        className="form-control search-input-filter search-download-radius me-1"
                        placeholder={t("download-search")}
                        onChange={handleSearchOnChange}
                        onKeyDown={handleEnter}
                        value={searchValue}
                      />
                    </div>
                    <div
                      className="search-input-icon-button ms-2"
                      onClick={handleSearchClick}
                    >
                      <img src={searchIcon} />
                      <span>Search</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between download-filter-center">
                    <div className="d-flex justify-content-start filter-download">
                      <div className="filter-file-type">
                        <img src={RwireFilterIconDark}></img>
                      </div>
                      <div className="file-type-download d-flex justify-content-start">
                        <div className="d-flex filter-file-download-type">
                          <Select
                            classNamePrefix="react-select-container"
                            value={
                              filterFileType
                                ? {
                                    value: filterFileType,
                                    label: filterFileType,
                                  }
                                : "File Type"
                            }
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            onChange={(event) => handleSelect(event)}
                            placeholder="File Type"
                            options={[
                              { value: "XLSX", label: "XLSX" },
                              { value: "CSV", label: "CSV" },
                            ]}
                            styles={{
                              option: (provided) => ({
                                ...provided,
                                fontSize: 16,
                                top: 0,
                                cursor: "pointer",
                                color: "#000000",
                                background: "white",
                                borderTop: "1px solid #dee2e6",
                                padding: 8,
                              }),

                              placeholder: (defaultStyles) => {
                                return {
                                  ...defaultStyles,
                                  color: "#000000",
                                };
                              },
                              menu: (base) => ({
                                ...base,
                                margin: 1,
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              }),

                              control: (base) => ({
                                ...base,
                                border: 0,
                                width: 130,
                                paddingLeft: 15,
                                borderRadius: 10,
                                boxShadow: "none",
                              }),
                              indicatorsContainer: (styles) => ({
                                ...styles,
                                cursor: "pointer",
                              }),
                            }}
                          />
                          <div className="filetype-cross">
                            {filterFileType ? (
                              <img
                                src={clearIcon}
                                alt=""
                                onClick={handleClearSelect}
                                className="me-2"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between date-picker-main align-items-center ">
                      <div className="type-image-download mx-2">
                        <img src={RWIRE_IMAGES.RwireCalender} />
                      </div>
                      <div>
                        <DatePicker
                          className="date-picker-download"
                          selected={startDate}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="DD/MM/YYYY"
                          onChange={handleDateChange}
                        />
                      </div>
                      <div className="date-cross">
                        {datePickerImg ? (
                          <img
                            src={clearIcon}
                            alt=""
                            onClick={handleClearDate}
                            className="me-2"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="download-center-table">
                  <div className="table-size">
                    {data.length > 0 ? (
                      <table className="table">
                        <tbody>
                          {data.map((item) => {
                            return (
                              <tr>
                                <td style={{ border: "none" }}>
                                  <div className="d-flex justify-content-between detail-center-main download-column">
                                    <div className="download-details">
                                      <h6>{item.fileName}</h6>
                                      <p>
                                        {moment
                                          .utc(item.createdAt.date)
                                          .utcOffset("+05:30")
                                          .format("DD/MM/YYYY hh:mm A")}
                                      </p>
                                    </div>
                                    <ActionButtons
                                      item={item}
                                      setEmailDownloadToggle={
                                        setEmailDownloadToggle
                                      }
                                      emailDownloadToggle={emailDownloadToggle}
                                      setMailId={setMailId}
                                      onDeleteDownloadCenter={
                                        onDeleteDownloadCenter
                                      }
                                      onFetchDownloadCenterData={
                                        onFetchDownloadCenterData
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <p className="no-results-error">No Results Found</p>
                    )}
                  </div>
                  <div className="pagivation-download-center d-flex ">
                    <Pagination
                      {...props}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      onGetPagination={onGetPagination}
                      page={page}
                      itemsPerPage={itemsPerPage}
                      total={totalRecordsCount ? totalRecordsCount : 0}
                      onSetItemPerPage={onSetItemPerPage}
                      onSetPage={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Trans>
    </div>
  );
};
export default RwireDownloadCenter;
