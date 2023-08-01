import React from "react";
import { useState } from "react";
import { Input, InputGroup } from "rsuite";
import CustomizeListItem from "./customize-listItem";
import { Trans, useTranslation } from "react-i18next";
import CloseIcon from "@rsuite/icons/Close";

function RwireCustomize(props) {
  const {
    highlightword,
    onSetDetails,
    queryKeywordsHighlightColor,
    setCustomizeModal,
    isCustomizeModal,
    totalHighlightedWords,
  } = props;

  let filterCustomeHighlightedWords = totalHighlightedWords.filter(
    (i) => !highlightword.includes(i),
  );

  filterCustomeHighlightedWords = filterCustomeHighlightedWords.map((i) =>
    i.replace("*", ""),
  );
  filterCustomeHighlightedWords = [...new Set(filterCustomeHighlightedWords)];
  const [scrolled, setScrolled] = useState(true);
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const { t } = useTranslation();
  const handleKeywordChange = (e) => {
    setSearchedKeyword(e.target.value);
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <Trans>
          <div className="customize-heading">{t("highlight_keywords")}</div>
        </Trans>
        <div
          className="cursor-pointer"
          title="Close"
          onClick={() => setCustomizeModal(!isCustomizeModal)}>
          <CloseIcon />
        </div>
      </div>
      <div className="d-flex customize-card-spacing">
        <div className="customize mr-3">
          <div className="pl-2 pr-4 py-1 d-flex justify-content-between list-upper-section">
            <Trans>
              <div className="keywords-list-heading">{t("query_keyword")}</div>
            </Trans>
            <Trans>
              <div className="keywords-list-heading"> {t("color")}</div>
            </Trans>
          </div>
          <div>
            <ul
              class="list-unstyled w-100 keywords-list"
              onScroll={() => setScrolled(!scrolled)}>
              {filterCustomeHighlightedWords &&
                filterCustomeHighlightedWords
                  .filter((word) =>
                    word.toLowerCase().includes(searchedKeyword.toLowerCase()),
                  )
                  .map((word, i) => (
                    <CustomizeListItem
                      word={word}
                      index={totalHighlightedWords.indexOf(word)}
                      onSetDetails={onSetDetails}
                      queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                      isQueryKeywords={true}
                      scrolled={scrolled}
                    />
                  ))}
            </ul>
          </div>
        </div>
        <div className="customize ml-3">
          <div className="pl-2 pr-4 py-1 d-flex justify-content-between border-bottom border-secondary">
            <Trans>
              <div className="keywords-list-heading">{t("other_keyword")} </div>
            </Trans>
            <Trans>
              <div className="keywords-list-heading"> {t("color")}</div>
            </Trans>
          </div>
          <ul
            class="list-unstyled keywords-list"
            onScroll={() => setScrolled(!scrolled)}>
            {highlightword &&
              highlightword
                .filter((word) =>
                  word.toLowerCase().includes(searchedKeyword.toLowerCase()),
                )
                .map((word, i) => (
                  <CustomizeListItem
                    word={word}
                    index={totalHighlightedWords.indexOf(word)}
                    isQueryKeywords={false}
                    onSetDetails={onSetDetails}
                    queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                    scrolled={scrolled}
                  />
                ))}
          </ul>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <InputGroup value={searchedKeyword} onChange={handleKeywordChange}>
            <Input placeholder="Search a keyword" />
          </InputGroup>
        </div>
      </div>
    </>
  );
}

export default RwireCustomize;
