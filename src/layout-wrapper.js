import useDocumentTitle from "./useDocumentTitle";
import { useParams, Navigate } from "react-router-dom";
import i18n from "./helpers/i18n";
import RwireInactiveScreen from "./container/rwire-inactive-screen";
import { useEffect } from "react";
import { ClassesSuggestions } from "./container/classes-suggestions";
import KeywordSuggestions from "./container/keyword-suggestions";

//Supported languages can be added to the array.
const supportedLocales = ["en"];

const LayoutWrapper = (props) => {
  const { titleKey, children, onSetQuery } = props;
  let { locale } = useParams();
  const pathName = window.location.pathname;

  useEffect(() => {
    const language = supportedLocales.includes(locale) ? locale : "en";
    i18n.changeLanguage(language);
  }, [locale]);

  useEffect(() => {
    onSetQuery({ syntaxqueryCorrect: "", syntaxqueryError: "" });
  }, [onSetQuery, pathName]);

  useDocumentTitle(titleKey);

  if (!locale) {
    return <Navigate to="/en/" />;
  }

  if (!supportedLocales.includes(locale)) {
    return <Navigate to="/en/page-not-found" />;
  }

  return (
    <div>
      <RwireInactiveScreen />
      {children}
      <ClassesSuggestions />
      <KeywordSuggestions />
    </div>
  );
};

export default LayoutWrapper;
