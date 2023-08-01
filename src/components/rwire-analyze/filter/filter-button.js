import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import filterIcon from "../../../images/filter-white.svg";

const FilterButton = (props) => {
  const { setIsFilterModal, isFilterModal, currentSheet } = props;

  const isFilter =
    currentSheet &&
    props[currentSheet] &&
    (props[currentSheet].data.length > 0 ||
      (props[currentSheet].dataset &&
        props[currentSheet].dataset[0].data.length > 0));

  const handleClick = () => {
    if (isFilter) {
      setIsFilterModal(!isFilterModal);
    }
  };

  return (
    <div className="ms-3">
      <RWireButton
        buttonCName={`input-button-text-form normal-button mt-0 anaylyse-filter-button ${
          !isFilter ? "disabled" : ""
        }`}
        onClick={handleClick}
        buttonImg={filterIcon}
      >
        Filter
      </RWireButton>
    </div>
  );
};

export default FilterButton;
