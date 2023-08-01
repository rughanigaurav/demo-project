
import { useTranslation } from "react-i18next";
import closeIcon from "../../../images/close-icon.svg";

const ExcludeList = (props) => {
  const { t } = useTranslation();

  const { excludeData, onSetExcludeData, onHandleInclude } = props;

  const handleClick = (e) => {
    excludeData.splice(e.target.dataset.index, 1);

    onSetExcludeData([...excludeData]);

    onHandleInclude();
  }

  if(excludeData.length <= 0) {
    return null;
  }

  return (
    <div className="w-100 exclude-node-list border mt-2 bg-light rounded">
      {excludeData.length > 0 && <div className="exclude-title p-2 rounded-top">{t("excluded_values")}</div>}
      <div className="d-flex flex-wrap p-2">
        {excludeData.length > 0 && excludeData.map((i, k) => {
          return (
            <div className="d-flex px-2 my-1">
              <div className="pe-1">{i}</div>
              <div>
                <img src={closeIcon}
                  width="20"
                  height="20"
                  alt="Include Value"
                  title="Include Value"
                  className="cursor-pointer"
                  id="include-button"
                  data-value={i}
                  data-index={k}
                  onClick={handleClick}
                />
              </div>
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default ExcludeList;
