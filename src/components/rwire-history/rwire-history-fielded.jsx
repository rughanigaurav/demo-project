import React from "react";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Trans, useTranslation } from "react-i18next";
import RWireFieldedInput from "../common/common-functions/rwire-field-input";
import RWIRE_IMAGES from "../common/common-functions/rwire-images";
import RWireSelectInput from "../common/common-functions/rwire-selct-input";
import RWireTextarea from "../rwire-ui/rwire-textarea";
import RwireFooterButtons from "../../container/rwire-footer-buttons";

const RwireHistoryFielded = (props) => {
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
    currentPage,
  } = props;
  useEffect(() => {
    onSetApp({ currentPage: "history" });
  });
  const { t } = useTranslation();
  return (
    <>
      <div className="fielded-main">
        <div className="fielded-inner">
          <Trans>
            <div className="query-text field-text">
              {t("rwire_fielded_search")}
            </div>
          </Trans>
          <div className="history-fields-form fields-form">
            <div className="status-state-type-pub select-section">
              <RWireSelectInput
                fieldData={queryFields}
                setAllField={onSetAllField}
                onRwireSearchAPI={onRwireSearchAPI}
                onSetApp={onSetApp}
                {...props}
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
                currentPage={currentPage}
                {...props}
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
            smartSearchWordHistory={true}
            currentPage={currentPage}
            {...props}
          />
        </div>
        </div>
        <RwireFooterButtons />
    </>
  );
};

export default RwireHistoryFielded;
