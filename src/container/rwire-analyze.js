import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Analyze from "../components/rwire-analyze";
import { setChart } from "../action/chart";
import { setAnalyze } from "../action/analyze";
import { setGenerateCharts } from "../action/generate-charts";

const mapStateToProps = ({
  analyze,
  exportField: { exportQuery },
  app: { cognizanceOrAnalyse },
  chart,
  generateChart
 }) => ({
  exportQuery, cognizanceOrAnalyse,
  ...analyze,
  ...generateChart
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      onSetChart: setChart,
      onSetAnalyze: setAnalyze,
      onSetGenerateChart: setGenerateCharts
    },
    dispatch
  ),

});

export default connect(mapStateToProps, mapDispatchToProps)(Analyze);
