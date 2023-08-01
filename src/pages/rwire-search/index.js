import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";

const smartSearchField = "SS";

const RWireSearch = (props) => {
  const {onRwireSearchAPI, onSetApp, smartSearchWord, onSetAllField, tabWiseSearchQuery } = props;
  const [displayValue, setDisplayValue] = useState(smartSearchWord);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const querySearch = e.target.value ? `${smartSearchField}=(${e.target.value})` : "";
    onSetApp({ smartSearchWord: e.target.value });
    onSetApp({ searchQuery: querySearch });
    setDisplayValue(e.target.value);
    onSetAllField({ tabWiseSearchQuery: {...tabWiseSearchQuery, fielded: querySearch} })
  };

  useEffect(() => {
    if (smartSearchWord) {
      const querySearch = `${smartSearchField}=(${smartSearchWord})`;

      onSetApp({ searchQuery: querySearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (displayValue) {
      const querySearch = `${smartSearchField}=(${displayValue})`;

      onSetApp({ searchQuery: querySearch });
      onRwireSearchAPI(querySearch).then((data) => {
        if (data) {
          navigate("/en/rwire-patents");
        } else {
          // eslint-disable-next-line no-console
          console.log("Error:", props.error);
        }
      });
    }
  };

  const handleClick = () => {
    handleSearch();
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      if (!displayValue) {
        return false;
      }

      handleSearch();
    }

    return;
  };

  return (
    <div className="container-fluid search-holder-main">
      <div className="container">
        <div className="input-group mb-3 search-holder-group">
          <input
            type="text"
            className="form-control search-border-radius"
            placeholder="Enter keywords or publication number "
            value={smartSearchWord}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <div className="search-main" onClick={handleClick}>
            <button className="search-button">
              <img src={RWIRE_IMAGES.RwireSearchBlackIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RWireSearch;
