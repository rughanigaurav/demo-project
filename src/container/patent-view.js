import RWirePatentView from "../pages/rwire-patent-view";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigate } from "react-router-dom";
import {
  setDetails,
  setFilterFields,
  setPatentDetails,
  setPatentId,
} from "../action/result-table";
import {
  setFullView,
  searchForClassAndKeyword,
  getUserAnnotations,
  updateUserAnnotations,
} from "../action/patent-view";
import { setNotes, getNote } from "../action/note";

const Container = (props) => {
  const { onSetDetails, displayData, onGetUserAnnotations } = props;
  let prevId,
    nextId = "";
  const patentIdFromStorage = sessionStorage.getItem("patentId");

  useEffect(() => {
    if (patentIdFromStorage) {
      onSetDetails(patentIdFromStorage);
      onGetUserAnnotations({
        publication_number: `${patentIdFromStorage}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patentIdFromStorage, onSetDetails]);

  if (
    patentIdFromStorage === "" ||
    typeof patentIdFromStorage === "undefined"
  ) {
    return <Navigate to="/" />;
  }

  displayData &&
    // eslint-disable-next-line array-callback-return
    displayData.map((value, key) => {
      if (value._id === patentIdFromStorage) {
        prevId = displayData[key - 1] ? displayData[key - 1]._id : "";
        nextId = displayData[key + 1] ? displayData[key + 1]._id : "";
      }
    });

  if (patentIdFromStorage) {
    return (
      <RWirePatentView
        {...props}
        prevId={prevId}
        nextId={nextId}
        currentId={patentIdFromStorage}
        onSetDetails={setDetails}
      />
    );
  }
};

const mapStateToProps = (
  {
    resultTable,
    app: { isLoadingTable, previousPage },
    fullView,
    note: { isNotesModalOpen, notes },
  },
  ...rest
) => ({
  ...resultTable,
  ...fullView,
  isLoadingTable,
  previousPage,
  highlightword: [
    ...resultTable.esHighlightwords,
    ...resultTable.highlightword,
  ],
  rest,
  isNotesModalOpen,
  notes,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      onSetDetails: setPatentDetails,
      onSetResultTable: setDetails,
      onSetPatentId: setPatentId,
      onSetFilter: setFilterFields,
      onSetFullView: setFullView,
      onSearchForClassAndKeyword: searchForClassAndKeyword,
      onGetUserAnnotations: getUserAnnotations,
      onUpdateUserAnnotations: updateUserAnnotations,
      onSetNotes: setNotes,
      onGetNotes: getNote,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
