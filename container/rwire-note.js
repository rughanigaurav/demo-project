import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RwireNote from "../common/note";
import { setNotes, addNote } from "../action/note";

const Container = (props) => {
  return (
    <RwireNote {...props} />
  );
};

const mapStateToProps = ({ note, app: { isDarkMode }, }) => ({
  ...note,
  isDarkMode
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onSetNotes: setNotes,
      onAddNote: addNote
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Container);
