import closeIcon from "../../../images/close-icon.svg";
import lineIcon from "../../../images/chart-icons/simple-line.svg";
import column2dIcon from "../../../images/chart-icons/column-in-2d.svg";
import bar2dIcon from "../../../images/chart-icons/bar-in-2d.svg";
import column3dIcon from "../../../images/chart-icons/column-in-3d.svg";
import donut2dIcon from "../../../images/chart-icons/donut-in-2d.svg";
import donut3dIcon from "../../../images/chart-icons/donut-in-3d.svg";
import pie2dIcon from "../../../images/chart-icons/pie-in-2d.svg";
import pie3dIcon from "../../../images/chart-icons/pie-in-3d.svg";
import simpleSplineAreaIcon from "../../../images/chart-icons/simple-spline-area.svg";

const availableChartList = [
  "line",
  "column2D",
  "bar2D",
  "pie2D",
  "splinearea",
  "doughnut2D",
  "column3d",
  "pie3d",
  "doughnut3d",
];

const getIcon = (type) => {
  let icon = lineIcon;
  switch (type) {
    case "line":
      icon = lineIcon;
      break;
    case "column2D":
      icon = column2dIcon;
      break;

    case "bar2D":
      icon = bar2dIcon;
      break;

    case "pie2D":
      icon = pie2dIcon;
      break;

    case "splinearea":
      icon = simpleSplineAreaIcon;
      break;

    case "doughnut2D":
      icon = donut2dIcon;
      break;

    case "column3d":
      icon = column3dIcon;
      break;

    case "pie3d":
      icon = pie3dIcon;
      break;

    case "doughnut3d":
      icon = donut3dIcon;
      break;

    default:
      icon = lineIcon;
      break;
  }
  return icon;
};

const ChartTypeOptions = (props) => {
  const { onHandleChartType, onHandleClose } = props;

  const handleChartType = (e) => {
    onHandleChartType(e.target.getAttribute("data-type"));
  };

  return (
    <div className="chart-filter d-flex">
      {availableChartList.map((i) => (
        <span className="ps-3 pe-3">
          <img
            src={getIcon(i)}
            alt={i}
            title={i}
            className="cursor-pointer"
            onClick={handleChartType}
            data-type={i}
          />
        </span>
      ))}

      <span className="filters">
        <img
          className="width-25 cursor-pointer"
          alt=""
          src={closeIcon}
          onClick={onHandleClose}
        />
      </span>
    </div>
  );
};

export default ChartTypeOptions;
