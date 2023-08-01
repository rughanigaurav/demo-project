import loaderGIF from "../../assets/images/loader.gif";
import "../../assets/css/loading.scss";

const SearchLoader = (props) => {
  const { isLoadingResult } = props;

  if (!isLoadingResult) {
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
    return null;
  }
  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none";

  return (
    <div className="loader-overlay">
      <div className="search-loader">
        <img src={loaderGIF} alt="" />
      </div>
    </div>
  );
};

export default SearchLoader;
