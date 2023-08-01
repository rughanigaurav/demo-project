import { Modal } from "rsuite";
import ClassesTable from "./clsses-table";
import ClassesForm from "./classes-form";

import "./classes-suggestions.scss";
import { ClassesActions } from "../../container/classes-suggestions";

const ClassesSuggestions = (props) => {
  const {
    isOpenClassesSuggestorModal,
    onSetClassesModal,
    onClassesSearch,
    tableData = [],
    selectedItemList,
    selectedRows,
    onSetItemPerPage,
    onSetSelectedRows,
    onSetClassesSelector,
    classesType,
    formData
  } = props;

  return (
    <Modal
      className="modalClassFilter classes-suggestor-modal"
      static="static"
      keyboard={false}
      open={isOpenClassesSuggestorModal}
      onClose={() => onSetClassesModal({ isOpenClassesSuggestorModal: false })}>
      <div className="modal-title">
        <p className="modal-title-heading">Classes Suggestions</p>
        <p
          className="modal-title-heading"
          onClick={() =>
            onSetClassesModal({ isOpenClassesSuggestorModal: false })
          }>
          X
        </p>
      </div>
      <div className="classes-suggestor-modal__wrapper">
        <ClassesForm
          onClassesSearch={onClassesSearch}
          classesType={classesType}
          onSetClassesSelector={onSetClassesSelector}
          onSetFormData={onSetClassesModal}
          formData={formData}
        />
        <ClassesTable
          tableData={tableData}
          selectedRows={selectedRows}
          onSetSelectedRows={onSetSelectedRows}
          selectedItemList={selectedItemList}
          onSetItemPerPage={onSetItemPerPage}
          onSetClassesSelector={onSetClassesSelector}
        />
        <ClassesActions />
      </div>
    </Modal>
  );
};

export default ClassesSuggestions;
