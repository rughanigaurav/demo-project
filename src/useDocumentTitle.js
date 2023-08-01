import { useRef, useEffect } from 'react'

const pageTitle = {
  "default": "Researchwire",
  "login": "Researchwire | Login",
  "home": "Researchwire | Search",
  "result-page": "Researchwire | Result",
  "patent-view": "Researchwire | Patent View",
  "cognizance": "Researchwire | Cognizance",
  "history": "Researchwire | History",
  "download-center": "Researchwire | Download Center",
}

function useDocumentTitle(title, prevailOnUnmount = false) {

  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = pageTitle[title] ? pageTitle[title] : pageTitle["default"];
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useDocumentTitle
