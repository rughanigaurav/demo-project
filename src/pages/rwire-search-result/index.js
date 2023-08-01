/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import RWirePatentSideBar from "../../container/rwire-patent-sidebar";
import RWireTable from "../../container/result-table";
import RWirePatentsSearch from "../../components/common/patents-result-common/rwire-patents-search-input";
import RWirePatentsCount from "../../components/common/patents-result-common/rwire-patent-count";
import RWirePatentFilterDetails from "../../components/common/patents-result-common/rwire-patents-filter-details";
import { Modal } from "rsuite";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import PlusIcon from "@rsuite/icons/Plus";
import RwireHighlight from "./rwire-highlight";
import RwireExport from "../../container/export";
import IncrementalQuery from "../../container/incremental-query";
import SearchResultsBaseNote from "./results-base";
import "./style.scss";
import RwireCustomize from "./rwire-customize";
import RwireImageCarousel from "./rwire-image-carousel";
import RwireLoader from "../../container/rwire-loader";
import RwireChangeFont from "./rwire-change-font";
import { IoMdClose } from "react-icons/io";

function RWireSearchResult(props) {
  const {
    totalRecordsCount,
    onSortDropdown,
    onRwireSearchAPI,
    totalApplicationCount,
    onFetchIncrementalQueryDetails,
    historyData,
    lastQueryString,
    displayQueryIncremental,
    onSetIncremental,
    searchQuery,
    aggregations,
    onSetApp,
    collapsebleFields,
    onSetResultTable,
    onEditModalClick,
    isActiveEditModal,
    queryKeywordsHighlightColor,
    onGetFiltersOptions,
    onSetDetails,
    totalHighlightedWords = [],
    patentInformationList,
    patentReamainingList,
  } = props;
  const [isIncremental, setIncremental] = useState(false);
  const [hideQueryToggle, setHideQueryToggle] = useState(true);
  const [isArrow, setArrow] = useState(false);
  const [highlightToggle, setHighlightToggle] = useState(false);
  const [exportToggle, setExportToggle] = useState(false);
  const [isIncrementalModalOpen, setIncrementalModal] = useState(false);
  const [isCustomizeModal, setCustomizeModal] = useState(false);
  const [isImageCarouselModalOpen, setIsImageCarouselModalOpen] =
    useState(false);
  const [imagePath, setImagePath] = useState("");

  const handleGetLastQuery = () => {
    if (isIncrementalModalOpen) {
      handleOpenModal();
    } else {
      setIncremental(!isIncremental);
      onFetchIncrementalQueryDetails(true);
    }
  };

  const handleHideQuery = () => {
    setHideQueryToggle(!hideQueryToggle);
    setArrow((current) => !current);
  };

  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      handleHighlightElastic();
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKeywordsHighlightColor]);

  const handleHighlightElastic = (
    filteredHighlightedWords = [],
    removedWord = ""
  ) => {
    let highlightData = [];
    highlightData = Array.from(
      document.getElementsByClassName("highlight-word")
    );
    let wordsArray =
      filteredHighlightedWords && filteredHighlightedWords.length
        ? [...filteredHighlightedWords]
        : [...totalHighlightedWords];
    highlightData &&
      highlightData.forEach((i) => {
        let searchWord = i.textContent.toLocaleLowerCase();
        if (!wordsArray.includes(searchWord) && searchWord !== removedWord) {
          wordsArray.push(searchWord);
        }
        i.style.backgroundColor =
          queryKeywordsHighlightColor[[wordsArray.indexOf(searchWord)]];
      });
    onSetDetails({ totalHighlightedWords: wordsArray });
  };
  const handleCloseFilter = () => {
    props.onSetFilter({ openedFilterName: "" });
  };

  const handleOpenModal = () => {
    const selectedId =
      displayQueryIncremental && displayQueryIncremental.map((i) => i.id);
    onSetIncremental({
      selectedRows: [...selectedId],
      modalQuery: displayQueryIncremental,
    });
    if (isIncrementalModalOpen) {
      setIncrementalModal(false);
    } else {
      onFetchIncrementalQueryDetails(false);
      setIncrementalModal(true);
    }
  };
  return (
    <div className="container-fluid patent-result-main">
      <RwireLoader />
      {highlightToggle && (
        <Modal
          className="modalClassFilter"
          static="static"
          keyboard={false}
          open={true}
        >
          <div
            className="highlight-modal-close-btn"
            onClick={() => setHighlightToggle(!highlightToggle)}
          >
            <IoMdClose className="modal__close" title="Close" />
          </div>
          <RwireHighlight
            {...props}
            onHandleHighlightElastic={handleHighlightElastic}
            setCustomizeModal={setCustomizeModal}
            isCustomizeModal={isCustomizeModal}
            totalHighlightedWords={totalHighlightedWords}
          />
        </Modal>
      )}
      {isCustomizeModal && (
        <Modal className="modalCustomizeFilter" open={true} static="static">
          <RwireCustomize
            {...props}
            onHandleHighlightElastic={handleHighlightElastic}
            setCustomizeModal={setCustomizeModal}
            isCustomizeModal={isCustomizeModal}
            totalHighlightedWords={totalHighlightedWords}
          />
        </Modal>
      )}

      {exportToggle && (
        <Modal
          className="modalexportfilter bd-example-modal-lg"
          backdrop="true"
          keyboard={false}
          open={true}
          onClose={() => {
            setExportToggle(false);
          }}
        >
          <RwireExport
            {...props}
            setExportToggle={setExportToggle}
            exportToggle={exportToggle}
          />
        </Modal>
      )}

      {isIncrementalModalOpen && (
        <Modal
          className="modal-class incremental-modal"
          backdrop="true"
          keyboard={false}
          open={true}
          onClose={handleOpenModal}
        >
          <IncrementalQuery
            data={historyData}
            onCloseModal={setIncrementalModal}
          />
        </Modal>
      )}

      {isImageCarouselModalOpen && (
        <Modal
          className="modalImageCarousel"
          open={true}
          static="static"
          onClose={() => setIsImageCarouselModalOpen(!isImageCarouselModalOpen)}
        >
          <RwireImageCarousel
            isImageCarouselModalOpen={isImageCarouselModalOpen}
            setIsImageCarouselModalOpen={setIsImageCarouselModalOpen}
            imagePath={imagePath}
            setImagePath={setImagePath}
          />
        </Modal>
      )}

      <div className="patent-flex-design">
        <div className="flex-shrink-0 side-menu-width">
          <RWirePatentSideBar />
        </div>
        <div className="patent-right-side" onClick={handleCloseFilter}>
          <div className="header-patent-main">
            <Trans>
              <div className="header-patent-result">
                <div className="nav-details-patent">
                  Search &gt; {t("fielded")} &gt; {t("result")}
                </div>
                <div className="tab-patents hide-query-box">
                  <button
                    onClick={handleGetLastQuery}
                    className={`pr - 1
                      ${isIncrementalModalOpen ? "bg-toggle" : ""}
                      ${!searchQuery ? "disabled-btn" : ""}
                    `}
                  >
                    <PlusIcon style={{ fontSize: "16px", color: "#0048A2" }} />
                    {t("Incremental")}
                  </button>
                  <button
                    className={`
                      ${isActiveEditModal ? "bg-toggle" : ""}
                      ${!searchQuery ? "disabled-btn" : ""}
                    `}
                    onClick={onEditModalClick}
                  >
                    {t("edit_fielded")}
                    <ArrowDownLineIcon
                      className={
                        isActiveEditModal
                          ? "hide-query-arrow-position"
                          : "hide-query-arrow"
                      }
                    />
                  </button>
                  <button
                    className={`${isArrow ? "box-close" : "increment-box"}`}
                    onClick={handleHideQuery}
                  >
                    <span className="mr-1">{t("hide_query")}</span>
                    <ArrowDownLineIcon
                      className={
                        isArrow
                          ? "hide-query-arrow"
                          : " hide-query-arrow-position"
                      }
                    />
                  </button>
                </div>
              </div>
            </Trans>
            <RwireChangeFont
              patentReamainingList={patentReamainingList}
              patentInformationList={patentInformationList}
            />
          </div>
          {hideQueryToggle && (
            <RWirePatentsSearch
              {...props}
              isIncremental={isIncremental}
              onSetIncrementalPart={setIncremental}
              historyData={historyData}
              onOpenModal={handleOpenModal}
              lastQueryString={lastQueryString}
            />
          )}
          <SearchResultsBaseNote />
          <RWirePatentsCount
            totalRecordsCount={totalRecordsCount}
            totalApplicationCount={totalApplicationCount}
            aggregations={aggregations}
            onSetApp={onSetApp}
            onRwireSearchAPI={onRwireSearchAPI}
            collapsebleFields={collapsebleFields}
            onSetResultTable={onSetResultTable}
            onGetFiltersOptions={onGetFiltersOptions}
            {...props}
          />

          <RWirePatentFilterDetails
            setHighlightToggle={setHighlightToggle}
            onSortDropdown={onSortDropdown}
            onRwireSearchAPI={onRwireSearchAPI}
            {...props}
          />
          <div className="patent-result-table">
            <Trans>
              <RWireTable
                onHandleHighlightElastic={handleHighlightElastic}
                isArrow={isArrow}
                exportToggle={exportToggle}
                style={{
                  height: "400px",
                }}
                setExportToggle={setExportToggle}
                isImageCarouselModalOpen={isImageCarouselModalOpen}
                setIsImageCarouselModalOpen={setIsImageCarouselModalOpen}
                imagePath={imagePath}
                setImagePath={setImagePath}
              />
            </Trans>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RWireSearchResult;
