import "./styles.scss";

/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import RWirePatentsSearch from "../../components/common/patents-result-common/rwire-patents-search-input";
import { Modal } from "rsuite";
import "../../assets/css/search-result-page.scss";
import RwireHighlight from "../rwire-search-result/";
import RwireExport from "../../container/export";
import IncrementalQuery from "../../container/incremental-query";
import SearchResultsBaseNote from "../rwire-search-result/results-base";
import "../rwire-search-result/style.scss";
import RwireCustomize from "../rwire-search-result/rwire-customize";
import RwireImageCarousel from "../rwire-search-result/rwire-image-carousel";
import { IoMdClose } from "react-icons/io";
import QuickViewBody from "../../components/rwire-quick-view/quick-view-body";
import QuickViewFooter from "../../components/rwire-quick-view/quick-view-footer";
import QvFilterModal from "../../components/rwire-quick-view/qv-filter-modal";
import Header from "../../container/header";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import { handleHighlightElastic } from "../../common/handle-highlight-elastic";
import RWireButtonTextImg from "../../components/rwire-ui/rwire-button/rwire-button-text-img";
import RwireLoader from "../../container/rwire-loader";
const RwireResultsQuickView = (props) => {
  const {
    onFetchIncrementalQueryDetails,
    historyData,
    lastQueryString,
    displayQueryIncremental,
    onSetIncremental,
    searchQuery,
    onEditModalClick,
    isActiveEditModal,
    queryKeywordsHighlightColor,
    onSetDetails,
    totalHighlightedWords,
    onSetApp,
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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  useEffect(() => {
    onSetApp({ currentPage: "result-page", previousPage: "quick-view" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const handleBottomBorder = () => {
    switch (true) {
      case isActiveEditModal:
        return "";
      case !hideQueryToggle:
        return "btn-bottom-border";
      case isIncremental:
        return "";
      default:
        return "border-to-first-two-buttons";
    }
  };
  return (
    <>
      <RwireLoader />
      <div className="quick-view">
        {isFilterModalOpen && (
          <Modal
            className="qv-filter-modal bd-example-modal-lg"
            backdrop="true"
            keyboard={true}
            open={true}
            onClose={() => {
              setIsFilterModalOpen(false);
              handleCloseFilter();
            }}
          >
            <Header />
            <QvFilterModal
              setIsFilterModalOpen={setIsFilterModalOpen}
              isFilterModalOpen={isFilterModalOpen}
              handleCloseFilter={handleCloseFilter}
              {...props}
            />
          </Modal>
        )}
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
              onHandleHighlightElastic={handleHighlightElastic(
                queryKeywordsHighlightColor,
                totalHighlightedWords,
                onSetDetails
              )}
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
              onHandleHighlightElastic={handleHighlightElastic(
                queryKeywordsHighlightColor,
                totalHighlightedWords,
                onSetDetails
              )}
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
            onClose={() =>
              setIsImageCarouselModalOpen(!isImageCarouselModalOpen)
            }
          >
            <RwireImageCarousel
              isImageCarouselModalOpen={isImageCarouselModalOpen}
              setIsImageCarouselModalOpen={setIsImageCarouselModalOpen}
              imagePath={imagePath}
              setImagePath={setImagePath}
            />
          </Modal>
        )}
        <Trans>
          <div className="primary-bg header text-white">
            <div className="viewBody-width d-flex justify-content-between">
              <div className="py-2">
                Search {">"} Fielded {">"} Results
              </div>
              <div className="d-flex gap-3 align-items-end btn-text">
                <div>
                  <RWireButton
                    onClick={handleGetLastQuery}
                    buttonCName={`px-3
                ${isIncrementalModalOpen ? "bg-toggle" : ""}
                ${!searchQuery ? "disabled-btn" : ""}
                ${
                  handleBottomBorder() === "border-to-first-two-buttons"
                    ? "btn-bottom-border"
                    : handleBottomBorder()
                }
              `}
                    buttonImg={RWIRE_IMAGES.RwirePlus}
                    name={t("Incremental")}
                  />
                </div>
                <div className={`${isActiveEditModal ? "zIndex" : ""}`}>
                  <RWireButtonTextImg
                    buttonCName={`px-3
                      ${isActiveEditModal ? "bg-toggle" : ""}
                      ${!searchQuery ? "disabled-btn" : ""}
                      ${
                        handleBottomBorder() === "border-to-first-two-buttons"
                          ? "btn-bottom-border"
                          : handleBottomBorder()
                      }
                    `}
                    onClick={onEditModalClick}
                    buttonImg={
                      isActiveEditModal
                        ? RWIRE_IMAGES.RwireUp
                        : RWIRE_IMAGES.RwireDrop
                    }
                    imgClassName={"btnIcon ps-1"}
                    name={t("edit_fielded")}
                  />
                </div>
                <div>
                  <RWireButtonTextImg
                    buttonCName={`px-3 ${isArrow ? "" : ""}
                  ${
                    handleBottomBorder() === "border-to-first-two-buttons"
                      ? ""
                      : handleBottomBorder()
                  }
                  `}
                    onClick={handleHideQuery}
                    buttonImg={
                      isArrow ? RWIRE_IMAGES.RwireUp : RWIRE_IMAGES.RwireDrop
                    }
                    imgClassName={"btnIcon ps-1"}
                    name={!isArrow ? t("hide_query") : "Show Query"}
                  />
                </div>
              </div>
            </div>
          </div>
        </Trans>
        <div className="viewBody-width">
          {hideQueryToggle && (
            <RWirePatentsSearch
              {...props}
              isIncremental={isIncremental}
              onSetIncrementalPart={setIncremental}
              historyData={historyData}
              onOpenModal={handleOpenModal}
              lastQueryString={lastQueryString}
              isQuickView={true}
            />
          )}
          <SearchResultsBaseNote />
        </div>
        <div className="viewBody-width pb-2 d-flex flex-column  flex-grow-1">
          <QuickViewBody
            {...props}
            setIsImageCarouselModalOpen={setIsImageCarouselModalOpen}
            isImageCarouselModalOpen={isImageCarouselModalOpen}
            setImagePath={setImagePath}
            setIsFilterModalOpen={setIsFilterModalOpen}
            hideQueryToggle={hideQueryToggle}
          />
        </div>
        <div className="mt-auto footer-shadow">
          <div className="quick-view-footer viewBody-width bg-white">
            <QuickViewFooter
              {...props}
              setExportToggle={setExportToggle}
              exportToggle={exportToggle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RwireResultsQuickView;
