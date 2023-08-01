import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import RWireTextarea from "../../rwire-ui/rwire-textarea";
import RWireFieldedInput from "../../common/common-functions/rwire-field-input";
import RWireSelectInput from "../../common/common-functions/rwire-selct-input";
import { Trans, useTranslation } from "react-i18next";
import RWIRE_IMAGES from "../../common/common-functions/rwire-images";
import RwireFooterButtons from "../../../container/rwire-footer-buttons";

function RWireFielded(props) {
  const {
    onRwireSearchAPI,
    onSetApp,
    validationQuery,
    syntaxqueryError,
    syntaxqueryCorrect,
    searchQuery,
    onSetAllField,
    queryFields,
    fieldOptions,
    isUpdateModal,
    onCloseModal,
    smartSearchWord,
    isUpdateQuery,
    chunksArray,
    currentPage,
    tabWiseSearchQuery,
    isEditModalOpen,
    onSetQuery,
    inputValidationQuery,
    fromClasssSuggestor,
    onSetClassSuggestor
  } = props;

  useEffect(() => {
    onSetApp({ currentPage: "home" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { t } = useTranslation();

  const [localQuery, setLocalQuery] = useState(searchQuery);

  return (
    <>
      <div>
        <div className="fielded-main">
          <div className="fielded-inner">
            <Trans>
              <div className="query-text field-text">{t("rwire_fields")}</div>
            </Trans>
            <div className="fields-form">
              <div className="status-state-type-pub"></div>
              <div className="status-state-type-pub select-section">
                <RWireSelectInput
                  fieldData={queryFields}
                  setAllField={onSetAllField}
                  onRwireSearchAPI={onRwireSearchAPI}
                  onSetApp={onSetApp}
                />
              </div>
              <div id="all-field-main">
                <RWireFieldedInput
                  plus={RWIRE_IMAGES.RwirePlusIcon}
                  minus={RWIRE_IMAGES.RwireMinusIcon}
                  fieldData={queryFields}
                  setAllField={onSetAllField}
                  allinputvalue={fieldOptions}
                  onRwireSearchAPI={onRwireSearchAPI}
                  validationQuery={validationQuery}
                  searchQuery={searchQuery}
                  onSetApp={onSetApp}
                  smartSearchWord={smartSearchWord}
                  chunksArray={chunksArray}
                  currentPage={currentPage}
                  isEditModalOpen={isEditModalOpen}
                  tabWiseSearchQuery={tabWiseSearchQuery}
                  localQuery={localQuery}
                  setLocalQuery={setLocalQuery}
                  onCloseModal={onCloseModal}
                />
              </div>
            </div>
            <div className="suggestion-section"></div>
            <div className="suggestions">
              <Trans>
                <button>{t("rwire_suggestions")}</button>
                <button>{t("rwire_classes")}</button>
                <button>{t("rwire_keyword")}</button>
                <button>{t("rwire_corporateTree")}</button>
              </Trans>
            </div>
          </div>
          <div className="fielded-text">
            <Trans>
              <div className="query-text">{t("rwire_query")}</div>
            </Trans>
            <RWireTextarea
              fieldData={queryFields}
              setAllField={onSetAllField}
              onRwireSearchAPI={onRwireSearchAPI}
              onSetApp={onSetApp}
              validationQuery={validationQuery}
              syntaxqueryError={syntaxqueryError}
              syntaxqueryCorrect={syntaxqueryCorrect}
              searchQuery={searchQuery}
              onCloseModal={onCloseModal}
              isUpdateModal={isUpdateModal}
              smartSearchWord={smartSearchWord}
              isUpdateQuery={isUpdateQuery}
              currentPage={currentPage}
              isEditModalOpen={isEditModalOpen}
              tabWiseSearchQuery={tabWiseSearchQuery}
              localQuery={localQuery}
              setLocalQuery={setLocalQuery}
              onSetQuery={onSetQuery}
              inputValidationQuery={inputValidationQuery}
              onSetClassSuggestor={onSetClassSuggestor}
              fromClasssSuggestor={fromClasssSuggestor}
            />
          </div>
        </div>
        <RwireFooterButtons />
      </div>
    </>
  );
}
export default RWireFielded;
