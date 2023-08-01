import React, { useState, useRef, useEffect } from "react";
import loading from "../../assets/images/loader.gif";
import Thirdblock from "./third-block";
import ClaimsOnly from "./claims-only";
import LegalEvents from "./legal-events";
import Citations from "./citations";
import Classifications from "./classifications";
import Family from "./family";
import DescBlockOnly from "./desc-block-only";
import ClassificationsChecks from "./classifications-checks";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import ColumnsIcon from "@rsuite/icons/Columns";
import RwireViewModal from "./rwire-smart-reader-modal./rwire-view-modal";
import { useNavigate } from "react-router-dom";
import RwireNotes from "../../container/rwire-note";
import {
  getFormatizedValue,
  getLocalizedValue,
  removeTagNames,
  getMax,
  removeHighlightByUid,
  updateDataById,
  getMergedObj,
} from "../../action/patent-view";
import { handleHighlightElastic } from "../../common/handle-highlight-elastic";
import Tooltip from "./tooltip";
import { Modal } from "rsuite";
import RwireImageCarousel from "../rwire-search-result/rwire-image-carousel";
import { getResourcesURL } from "../../service/elasticSearch";
import { pdf_api_url } from "../../components/constant";
import downloadPdfIcon from "../../assets/images/download-pdf-icon.svg";
import loaderGIF from "../../assets/images/loader.gif";
import ViewTitleSection from "./view-title-section";
import ViewPubNoSection from "./view-pub-no-section";
import ViewScrollButtons from "./view-scroll-buttons";
import { uuidv4 } from "../../action/app";
import AnnotationsActionButtons from "./annotations-action-buttons";
import { isObjectBlank } from "../../action/result-table";

function RWirePatentView(props) {
  const {
    detailsData,
    isViewPageModalOpen,
    onSetFilter,
    isSmartReaderOpen,
    queryKeywordsHighlightColor,
    totalHighlightedWords,
    onSetDetails,
    onSetResultTable,
    previousPage = "rwire-patents",
    userAnnotations,
    onSetFullView,
    classesTableData = [],
    onSearchForClassAndKeyword,
    isPdfAvailable,
    isLoadingPdf,
    prevId,
    nextId,
    onUpdateUserAnnotations,
    isEditingComment,
    stringsComments,
    stringsHighlights,
    isNotesModalOpen,
    onSetNotes,
    onGetNotes,
    notes,
    isExact,
    languageSelected,
    highlightword: queryAndManuallyHighlightWords
  } = props;

  const allHighlight = [...totalHighlightedWords, ...queryAndManuallyHighlightWords];
  const highlightword = [...new Set(allHighlight)];

  const scollToTop = useRef();
  const scollToClassification = useRef();
  const scollToClaims = useRef();
  const scollToDescription = useRef();
  const scollToFamily = useRef();
  const scollToCitations = useRef();
  const scollToLegalEvents = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      handleHighlightElastic(
        queryKeywordsHighlightColor,
        highlightword,
        onSetDetails
      );
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsData]);

  // eslint-disable-next-line no-unused-vars
  const [section, setSection] = useState("None");
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState([loading]);
  const [classificationTablesToggle, setClassificationTablesToggle] =
    useState(true);
  const [CFValues, setCFValues] = useState(["A"]);
  const [citationsFilterValue, setCitationsFilterValue] = useState([
    "bcp",
    "fcp",
  ]);
  const [selection, setSelection] = useState(null);
  const [selectionIndex, setSelectionIndex] = useState(null);
  const [toolRef, setToolRef] = useState(null);
  const [field, setField] = useState("");
  const [exe, setExe] = useState(null);
  useEffect(() => {
    const handleHideCross = () => {
      const cross = Array.from(document.querySelectorAll(".remove-highlight"));
      cross && cross[0] && cross[0].classList.remove("visible");
      const crossAndEdit = Array.from(
        document.querySelectorAll(".remove-comment")
      );
      crossAndEdit &&
        crossAndEdit[0] &&
        crossAndEdit[0].classList.remove("visible");
    };

    document.addEventListener("scroll", handleHideCross);
    return () => {
      document.removeEventListener("scroll", handleHideCross);
    };
  }, []);
  let elementToRemoveHighlight = {};
  let parentElementForHtml = "";
  useEffect(() => {
    addClickEventToHighlights();
  });
  const removeHighlight = () => {
    const element = elementToRemoveHighlight.target;
    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
    handleRemoveHighlight();
    handleClose();
  };

  const handleRemoveHighlight = () => {
    const uid = elementToRemoveHighlight.target.id;
    const field = parentElementForHtml.split(" ")[0];
    const newData = removeHighlightByUid(userAnnotations, uid, field);
    const newHighlightData = removeHighlightByUid(
      stringsHighlights,
      uid,
      field
    );

    onSetFullView({
      userAnnotations: newData || {},
      stringsHighlights: newHighlightData || {},
    });

    onUpdateUserAnnotations({
      body: isObjectBlank(newHighlightData)
        ? ""
        : JSON.stringify(newHighlightData),
      publication_number: `${detailsData[`PN_B`]}`,
      type: "highlight",
    });
  };

  const removeHelper = (e, className) => {
    elementToRemoveHighlight = e;
    if (className === "remove-comment") {
      setExe(e);
    }
    const closestElement = e.target.closest('[class*="highlighted-component"]');
    if (closestElement) {
      parentElementForHtml = closestElement.className;
    }
    const cross = Array.from(document.querySelectorAll(`.${className}`));
    cross && cross[0] && cross[0].classList.add("visible");
    if (isSmartReaderOpen || isViewPageModalOpen) {
      const modalRect = document
        .querySelector(".smart-reader-modal")
        ?.getBoundingClientRect();
      cross &&
        cross[0] &&
        (cross[0].style.top = `${
          e.currentTarget.getBoundingClientRect().y - modalRect.y - 30
        }px`);
      cross &&
        cross[0] &&
        (cross[0].style.left = `${
          e.currentTarget.getBoundingClientRect().x - modalRect.x
        }px`);
    } else {
      cross &&
        cross[0] &&
        (cross[0].style.top = `${
          e.currentTarget.getBoundingClientRect().y - 30
        }px`);
      cross &&
        cross[0] &&
        (cross[0].style.left = `${
          e.currentTarget.getBoundingClientRect().x -
          20 +
          e.currentTarget.getBoundingClientRect().width / 2
        }px`);
    }
  };
  const addClickEventToHighlights = () => {
    const highlightedElements = document.querySelectorAll(".manual-highlight");
    highlightedElements.forEach((element) => {
      element.addEventListener("click", (e) =>
        removeHelper(e, "remove-highlight")
      );
    });
    const commentedElements = document.querySelectorAll(".commented-keywords");
    commentedElements.forEach((element) => {
      element.addEventListener("click", (e) =>
        removeHelper(e, "remove-comment")
      );
    });
    document.addEventListener("click", (e) => {
      const cross = Array.from(document.querySelectorAll(".remove-highlight"));
      if (!e.target.classList.contains("manual-highlight")) {
        cross && cross[0] && cross[0].classList.remove("visible");
      }
      const crossAndEdit = Array.from(
        document.querySelectorAll(".remove-comment")
      );
      if (!e.target.classList.contains("commented-keywords")) {
        crossAndEdit &&
          crossAndEdit[0] &&
          crossAndEdit[0].classList.remove("visible");
      }
      if (window.getSelection().toString() === " ") {
        setSelection(null);
      }
    });
  };

  const handleApplyHighlights = (color) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const Uid = `highlights_${uuidv4()}`;
      handleSaveHighlights(false, color, Uid);
      setSelection({ ...selection, highlightColor: color, Uid: Uid });
    }

    handleClose();
  };

  const handleSaveHighlights = (isRemove = false, color, Uid) => {
    const previousObj = userAnnotations || {};
    const fieldName = isRemove ? parentElementForHtml.split(" ")[0] : field;
    const previousHighlightsObj = stringsHighlights || {};
    const highlightsObj =
      getMergedObj(
        previousHighlightsObj,
        fieldName,
        selection,
        null,
        Uid,
        color
      ) || {};
    onSetFullView({
      stringsHighlights: highlightsObj,
      userAnnotations:
        getMergedObj(
          previousObj,
          fieldName,
          selectionIndex,
          null,
          Uid,
          color
        ) || {},
    });

    onUpdateUserAnnotations({
      body: JSON.stringify(highlightsObj),
      publication_number: `${detailsData[`PN_B`]}`,
      type: "highlight",
    });
  };

  const handleApplyComments = (comment) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelection({ ...selectionIndex, highlightColor: "cyan" });
    }
    if (comment && comment !== "") {
      const Uid = `highlights_${uuidv4()}`;
      handleSaveComments(false, comment, Uid);
      handleClose();
    }
    handleClose();
  };

  const handleSaveComments = (isRemove = false, comment, Uid) => {
    const previousObj = userAnnotations || {};
    const fieldName = isRemove ? parentElementForHtml.split(" ")[0] : field;
    const previousCommentObj = stringsComments || {};
    const commentObj =
      getMergedObj(
        previousCommentObj,
        fieldName,
        selectionIndex,
        comment,
        Uid,
        "cyan"
      ) || {};
    onSetFullView({
      stringsComments: commentObj,
      userAnnotations:
        getMergedObj(
          previousObj,
          fieldName,
          selectionIndex,
          comment,
          Uid,
          "cyan"
        ) || {},
    });

    onUpdateUserAnnotations({
      body: JSON.stringify(commentObj),
      publication_number: `${detailsData[`PN_B`]}`,
      type: "comment",
    });
  };

  const handleClose = () => {
    setSelection(null);
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      // IE?
      document.selection.empty();
    }
    setToolRef(null);
  };
  const handleUpdateComment = (isRemove = false, comment = "") => {
    handleUpdateAnnotation(isRemove, comment);
    handleClose();
  };

  const handleUpdateAnnotation = (isRemove, comment = "") => {
    const uid = exe.target.id;
    const closestElement = exe.target.closest(
      '[class*="highlighted-component"]'
    );

    let exeParent = "";
    if (closestElement) {
      exeParent = closestElement.className;
    }
    const field = exeParent.split(" ")[0];
    const newData = isRemove
      ? removeHighlightByUid(userAnnotations, uid, field)
      : updateDataById(userAnnotations, uid, field, comment);
    const newCommentData = isRemove
      ? removeHighlightByUid(stringsComments, uid, field)
      : updateDataById(stringsComments, uid, field, comment);

    onSetFullView({
      stringsComments: newCommentData || {},
      userAnnotations: newData || {},
    });
    onUpdateUserAnnotations({
      body: isObjectBlank(newCommentData)
        ? ""
        : JSON.stringify(newCommentData || {}),
      publication_number: `${detailsData[`PN_B`]}`,
      type: "comment",
    });
  };

  const [isImageCarouselModalOpen, setIsImageCarouselModalOpen] =
    useState(false);
  const [imagePath, setImagePath] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [isClipImage, setIsClipImage] = useState(false);
  const handleOpenModal = () => {
    if (isViewPageModalOpen === true) {
      return;
    } else {
      onSetFilter({ isSmartReaderOpen: true });
    }
  };

  const handleChange = (e) => {
    onSetFullView({ languageSelected: e.value });
  };

  const getDesc = (str = []) => {
    if (str.length === 0) {
      return null;
    } else {
      return removeTagNames(str[0]);
    }
  };
  const handleBackToSearch = () => {
    navigate(`/en/${previousPage}`);
  };

  const downloadPdf = async (publicationNumber) => {
    if (publicationNumber) {
      const queryObj = {
        publicationNumber,
      };
      const body = JSON.stringify(queryObj);
      try {
        onSetResultTable({ isLoadingPdf: true });
        const response = await getResourcesURL(body, pdf_api_url);
        if (response.status === 200 && response.data.pdfURL) {
          const pdfURL = response.data.pdfURL;
          const link = document.createElement("a");
          link.href = pdfURL;
          link.download = true;
          link.click();
        }
        onSetResultTable({ isLoadingPdf: false });
      } catch (error) {
        onSetResultTable({ isPdfAvailable: false, isLoadingPdf: false });
        // console.error("error while downloading pdf : ", error.message);
      }
    }
  };

  return (
    <div className="patent__view__page">
      <div className="position-relative">
        {!(isSmartReaderOpen || isViewPageModalOpen) && (
          <AnnotationsActionButtons
            isSmartReaderOpen={isSmartReaderOpen}
            isViewPageModalOpen={isViewPageModalOpen}
            removeHighlight={removeHighlight}
            onSetFullView={onSetFullView}
            handleUpdateComment={handleUpdateComment}
          />
        )}

        {isImageCarouselModalOpen && (
          <Modal className="modalImageCarousel" open={true} static="static">
            <RwireImageCarousel
              setIsImageCarouselModalOpen={setIsImageCarouselModalOpen}
              imagePath={imagePath}
              imageIndex={imageIndex}
              images={images}
              isClipImage={isClipImage}
            />
          </Modal>
        )}
        <div className="patent-notes-model-wrapper">
          {isNotesModalOpen && <RwireNotes />}
        </div>
        <div className="patent-view-main-bg">
          {(isSmartReaderOpen || isViewPageModalOpen) && (
            <RwireViewModal
              onSetImages={setImages}
              abstractText={
                detailsData &&
                Array.isArray(detailsData[`AB_${languageSelected}`])
                  ? detailsData[`AB_${languageSelected}`][0]
                  : detailsData[`AB_${languageSelected}`] &&
                    detailsData[`AB_${languageSelected}`]
                      .replaceAll("&lt;p &gt;", "")
                      .replaceAll("&lt;/p&gt;", "")
              }
              assigneeName={getLocalizedValue(
                detailsData,
                languageSelected,
                "CA"
              )}
              inventorName={getLocalizedValue(
                detailsData,
                languageSelected,
                "IN"
              )}
              jurisdiction1={detailsData[`DSEP_CST`]}
              jurisdiction2={detailsData[`DSEP_EST`]}
              jurisdiction3={detailsData[`DSEP_VST`]}
              jurisdiction4={detailsData[`DSEP_PST`]}
              jurisdiction5={detailsData[`DSPCT_RGCN`]}
              jurisdiction6={detailsData[`DSPCT_AOST`]}
              jurisdiction7={detailsData[`DSPCT_RGNCN`]}
              jurisdiction8={detailsData[`DSPCT_NT`]}
              jurisdiction9={detailsData[`DSPCT_NDSCN`]}
              applNumber={getFormatizedValue(detailsData, "AN")}
              legalStatus={detailsData.LST}
              pubDate={detailsData["PD"]}
              applDate={detailsData[`AD`]}
              priority={detailsData[`EPRD`]}
              expDate={getMax(detailsData["ED"])}
              priorityNumber={getFormatizedValue(detailsData, "PRN")}
              images={images}
              setIsImageCarouselModalOpen={setIsImageCarouselModalOpen}
              isImageCarouselModalOpen={isImageCarouselModalOpen}
              setImagePath={setImagePath}
              setImageIndex={setImageIndex}
              setIsClipImage={setIsClipImage}
              languageSelected={languageSelected}
              userAnnotations={userAnnotations}
              selection={selection}
              toolRef={toolRef}
              setToolRef={setToolRef}
              handleClose={handleClose}
              handleApplyHighlights={handleApplyHighlights}
              removeHighlight={removeHighlight}
              openTextarea={props.openTextarea}
              onSetFullView={onSetFullView}
              onApplyComments={handleApplyComments}
              isSmartReaderOpen={isSmartReaderOpen}
              isViewPageModalOpen={isViewPageModalOpen}
              handleUpdateComment={handleUpdateComment}
              elementToRemoveHighlight={exe}
              setSelection={setSelection}
              setSelectionIndex={setSelectionIndex}
              setField={setField}
              {...props}
            />
          )}

          <ViewScrollButtons
            onTop={() => scollToTop.current.scrollIntoView()}
            onClassifications={() =>
              scollToClassification.current.scrollIntoView()
            }
            onClaims={() => scollToClaims.current.scrollIntoView()}
            onDescription={() => scollToDescription.current.scrollIntoView()}
            onFamilies={() => scollToFamily.current.scrollIntoView()}
            onCitations={() => scollToCitations.current.scrollIntoView()}
            onLegalEvents={() => scollToLegalEvents.current.scrollIntoView()}
            onBackToSearch={handleBackToSearch}
            onChange={handleChange}
          />
          <div
            className="container-fluid patent-view-body scroll-MarginTop"
            id="decision-reader-body-root"
            ref={scollToTop}
          >
            {!(isSmartReaderOpen || isViewPageModalOpen) && (
              <Tooltip
                isSelection={selection}
                tool={toolRef}
                setToolRef={setToolRef}
                onClose={handleClose}
                onApplyHighlights={handleApplyHighlights}
                openTextarea={props.openTextarea}
                onSetFullView={onSetFullView}
                onApplyComments={handleApplyComments}
                elementToRemoveHighlight={exe}
                isEditingComment={isEditingComment}
                handleUpdateComment={handleUpdateComment}
                setIsSelection={setSelection}
                setSelectionIndex={setSelectionIndex}
                setField={setField}
              />
            )}
            <ViewPubNoSection
              detailsData={detailsData}
              onSetFilter={onSetFilter}
              prevId={prevId}
              nextId={nextId}
              onSetImages={setImages}
            />
            <ViewTitleSection
              detailsData={detailsData}
              languageSelected={languageSelected}
              highlightword={highlightword}
              isExact={isExact}
              queryKeywordsHighlightColor={queryKeywordsHighlightColor}
              isLoadingPdf={isLoadingPdf}
              loaderGIF={loaderGIF}
              downloadPdfIcon={downloadPdfIcon}
              downloadPdf={downloadPdf}
              isPdfAvailable={isPdfAvailable}
              userAnnotations={userAnnotations}
              onSetNotes={onSetNotes}
              isNotesModalOpen={isNotesModalOpen}
              onGetNotes={onGetNotes}
              notes={notes}
              onSetFullView={onSetFullView}
              stringsComments={stringsComments}
              stringsHighlights={stringsHighlights}
              onUpdateUserAnnotations={onUpdateUserAnnotations}
            />
            <Thirdblock
              abstractText={
                Array.isArray(detailsData[`AB_${languageSelected}`])
                  ? detailsData[`AB_${languageSelected}`][0]
                  : detailsData[`AB_${languageSelected}`]
              }
              assigneeName={getLocalizedValue(
                detailsData,
                languageSelected,
                "CA"
              )}
              inventorName={getLocalizedValue(
                detailsData,
                languageSelected,
                "IN"
              )}
              jurisdiction1={detailsData[`DSEP_CST`]}
              jurisdiction2={detailsData[`DSEP_EST`]}
              jurisdiction3={detailsData[`DSEP_VST`]}
              jurisdiction4={detailsData[`DSEP_PST`]}
              jurisdiction5={detailsData[`DSPCT_RGCN`]}
              jurisdiction6={detailsData[`DSPCT_AOST`]}
              jurisdiction7={detailsData[`DSPCT_RGNCN`]}
              jurisdiction8={detailsData[`DSPCT_NT`]}
              jurisdiction9={detailsData[`DSPCT_NDSCN`]}
              applNumber={getFormatizedValue(detailsData, "AN")}
              legalStatus={detailsData.LST}
              pubDate={detailsData["PD"]}
              applDate={detailsData[`AD`]}
              priority={detailsData[`EPRD`]}
              expDate={getMax(detailsData["ED"])}
              priorityNumber={getFormatizedValue(detailsData, "PRN")}
              images={images}
              onSetImages={setImages}
              setIsImageCarouselModalOpen={setIsImageCarouselModalOpen}
              isImageCarouselModalOpen={isImageCarouselModalOpen}
              setImagePath={setImagePath}
              setIsClipImage={setIsClipImage}
              {...props}
              languageSelected={languageSelected}
              userAnnotations={userAnnotations}
            />

            <div className="classification-block mt-4 d-flex justify-content-between mb-3">
              <button
                className="view-page-btn px-3 py-1"
                onClick={handleOpenModal}
              >
                <span>
                  <ColumnsIcon
                    style={{ color: "#000", marginRight: "10", size: "15px" }}
                  />
                </span>
                Smart Reader
              </button>
            </div>

            <div
              className="claims-only-block scroll-MarginTop"
              ref={scollToClaims}
            >
              {section === "None" && (
                <div className="scroll-MarginTop" ref={scollToClaims}>
                  <ClaimsOnly
                    claimsData={detailsData["CLN"]}
                    dependantClaims={detailsData[`DCL_${languageSelected}`]}
                    queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                    highlightword={highlightword}
                    isExact={isExact}
                    languageSelected={languageSelected}
                    userAnnotations={userAnnotations}
                  />
                </div>
              )}
              {section === "None" && (
                <div className="scroll-MarginTop" ref={scollToDescription}>
                  <DescBlockOnly
                    description={getDesc(
                      detailsData[`DESC_${languageSelected}`]
                    )}
                    queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                    highlightword={highlightword}
                    isExact={isExact}
                    userAnnotations={userAnnotations}
                    languageSelected={languageSelected}
                    detailsData={detailsData}
                  />
                </div>
              )}
            </div>

            <div ref={scollToFamily} className="scroll-MarginTop">
              <h5 className="legal-events-heading mt-4 mb-2">Families:</h5>
              <Family
                simpleFamily={detailsData["SF"]}
                mainFamily={detailsData["MF"]}
                domesticFamily={detailsData["DF"]}
                completeFamily={detailsData["CF"]}
                extendedFamily={detailsData["EF"]}
                queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                highlightword={highlightword}
                isExact={isExact}
              />
            </div>

            <div
              ref={scollToClassification}
              className="classification-block mt-4 d-flex justify-content-between scroll-MarginTop"
            >
              <div className="cfBlock">
                <div className="d-flex">
                  <h5
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setClassificationTablesToggle(
                        !classificationTablesToggle
                      );
                    }}
                  >
                    Classifications{" "}
                    <ArrowDownLineIcon
                      className="blackdrop"
                      style={{
                        transform: `${
                          classificationTablesToggle
                            ? "rotate(180deg)"
                            : "rotate(0deg)"
                        }`,
                      }}
                    />{" "}
                  </h5>
                  <ClassificationsChecks
                    setCFValues={setCFValues}
                    CFValues={CFValues}
                    cpcd={detailsData["CPCD"]}
                    ipcd={detailsData["IPCD"]}
                    us={detailsData["USD"]}
                    jpfi={detailsData["JCL"]}
                    ecla={detailsData["ECL"]}
                    classesTableData={classesTableData}
                  />
                </div>
                {classificationTablesToggle && (
                  <Classifications
                    cpcd={detailsData["CPCD"]}
                    ipcd={detailsData["IPCD"]}
                    us={detailsData["USD"]}
                    jpfi={detailsData["JCL"]}
                    ecla={detailsData["ECL"]}
                    values={CFValues}
                    queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                    highlightword={highlightword}
                    isExact={isExact}
                    classesTableData={classesTableData}
                    onSearchForClassAndKeyword={onSearchForClassAndKeyword}
                  />
                )}
              </div>
            </div>
            <div ref={scollToCitations} className="scroll-MarginTop">
              <Citations
                citations={
                  citationsFilterValue.includes("bcp")
                    ? detailsData["BCPN"]
                    : []
                }
                backward_citations_count={
                  detailsData["BCPN"] && detailsData["BCPN"].length
                }
                forward_citations_count={
                  detailsData["FCPN"] && detailsData["FCPN"].length
                }
                forward_citations={
                  citationsFilterValue.includes("fcp")
                    ? detailsData["FCPN"]
                    : []
                }
                onSetFilter={onSetFilter}
                citationsFilterValue={citationsFilterValue}
                setCitationsFilterValue={setCitationsFilterValue}
                queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                highlightword={highlightword}
                isExact={isExact}
              />
            </div>
            <div
              className="mt-1 mb-3 scroll-MarginTop"
              ref={scollToLegalEvents}
            >
              <LegalEvents
                data={detailsData["LE"]}
                queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                highlightword={highlightword}
                isExact={isExact}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RWirePatentView;
