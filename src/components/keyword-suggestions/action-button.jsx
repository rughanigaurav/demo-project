import RWireButton from "../rwire-ui/rwire-button/rwire-button";

const ActionButton = ({ onApply, onClear, isDisable }) => {
  return (
    <div className="model-footer-buttons">
      <RWireButton
        cNameDiv="search-query ps-3"
        buttonCName="input-button-text-form"
        name="Clear"
        onClick={() => onClear()}
      />
      <RWireButton
        cNameDiv="search-query ps-3"
        buttonCName={`input-button-text-form ${isDisable ? "disabled" : ""}`}
        name="Apply"
        onClick={onApply}
      />
    </div>
  );
};

export default ActionButton