import RWireButton from "../rwire-ui/rwire-button/rwire-button";

const RwireFooterButton = ({ onSetClassesModal, onSetKeywordModal }) => {
  return (
    <div className="footer-buttons">
      <div className="suggestion-title">Suggestions</div>
      <RWireButton
        cNameDiv="search-query ps-3"
        buttonCName="input-button-text-form"
        name="Classes"
        onClick={() => onSetClassesModal({ isOpenClassesSuggestorModal: true })}
      />
      <RWireButton
        cNameDiv="search-query ps-3"
        buttonCName="input-button-text-form"
        name="Keyword"
        onClick={() => onSetKeywordModal({ isOpenKeywordSuggestorModal: true })}
      />
    </div>
  );
};

export default RwireFooterButton;
