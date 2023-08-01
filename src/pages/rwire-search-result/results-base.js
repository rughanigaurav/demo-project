import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useStore } from "react-redux";
import { BiInfoCircle } from "react-icons/bi";
const tooltip = (
  <Tooltip id="tooltip">
    Incremental results are the new results, which were not available in the
    previously selected query
  </Tooltip>
);

const ResultBase = () => {
  const store = useStore();

  const {
    app: { isSearchFromIncremental },
  } = store.getState();

  if (!isSearchFromIncremental) {
    return "";
  }

  return (
    <div className="result-base-info">
      Incremental Results.
      <OverlayTrigger placement="top" overlay={tooltip}>
        <div>
          <BiInfoCircle
            alt="edit"
            className="img-fluid"
            width="20"
            height="20"
            style={{
              fontSize: "23px",
              cursor: "pointer",
              marginLeft: "3px",
              marginTop: "-6px",
            }}
          />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default ResultBase;
