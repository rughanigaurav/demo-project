import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Cognizance from "../pages/rwire-cognizance";
import { setChart } from "../action/chart";
import { setAnalyze } from "../action/analyze";
import { setGenerateCharts } from "../action/generate-charts";

const mapStateToProps = ({
  analyze,
  exportField: { exportQuery },
  app: { cognizanceOrAnalyse, previousPage, isDarkMode },
  chart,
  generateChart,
}) => ({
  exportQuery,
  cognizanceOrAnalyse,
  previousPage,
  isDarkMode,
  ...analyze,
  ...chart,
  ...generateChart,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      onSetChart: setChart,
      onSetAnalyze: setAnalyze,
      onSetGenerateChart: setGenerateCharts,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cognizance);
