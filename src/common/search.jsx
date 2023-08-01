import searchIcon from "../images/search-bar-icon.svg";
import closeIcon from "../images/close-icon-black.svg";

const Search = ({ onChange, onClear, value }) => {
  return (
    <div className="search-bar d-flex align-items-center p-3 ">
      <div className="search-icon-wrapper">
        <img src={searchIcon} className="search-icon" alt="" />
      </div>
      <input
        type="text"
        placeholder="Search"
        onChange={onChange}
        value={value}
        className="search-input"
      />
      <div onClick={onClear}>
        <img src={closeIcon} className="close-icon" alt="" />
      </div>
    </div>
  );
};

export default Search;
