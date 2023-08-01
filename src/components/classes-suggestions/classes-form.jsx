import RWireButton from "../rwire-ui/rwire-button/rwire-button";

const ClassesForm = (props) => {
  const {
    onClassesSearch,
    classesType,
    onSetClassesSelector,
    formData,
    onSetFormData
  } = props;
  const handleSetValue = (event) => {
    onSetFormData({
      formData: { ...formData, [event.target.name]: event.target.value },
    });
  };

  const handleChangeType = (type) => {
    onSetClassesSelector({ classesType: type, page: 1, selectedRows: [] });
    if (formData.classes || formData.keywords) {
      setTimeout(() => {
        onClassesSearch();
      }, 200);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      onClassesSearch();
    }
  };

  const isDisable = formData.classes || formData.keywords ? false : true;

  return (
    <div className="form-container">
      <div className="form-inputs">
        <div className="label-suggestion-class label">Classes</div>
        <div className="input-suggestion-class input">
          <input
            name="classes"
            className="suggestion-input"
            placeholder="Search a class"
            onChange={(event) => handleSetValue(event)}
            value={formData.classes}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
      <div className="form-inputs">
        <div className="label-suggestion-class label">Keywords</div>
        <div className="input-suggestion-class input">
          <input
            name="keywords"
            className="suggestion-input"
            placeholder="Search a keyword"
            value={formData.keywords}
            onChange={(event) => handleSetValue(event)}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
      <div className="form-action-button">
        <button
          className={`form-checkbox ${classesType === "cpc" ? "active" : ""}`}
          onClick={() => handleChangeType("cpc")}>
          CPC
        </button>
        <button
          className={`form-checkbox ${classesType === "ipc" ? "active" : ""}`}
          onClick={() => handleChangeType("ipc")}>
          IPC
        </button>
        <button
          className={`form-checkbox ${classesType === "us" ? "active" : ""}`}
          onClick={() => handleChangeType("us")}>
          US
        </button>
        <RWireButton
          cNameDiv="search-query ps-2"
          buttonCName={`search-btn input-button-text-form ${isDisable ? "disabled" : ""}`}
          name="Search"
          onClick={onClassesSearch}
        />
      </div>
    </div>
  );
};

export default ClassesForm;
