import { Modal } from "rsuite";
import { Checkbox } from "rsuite";

const RwireSaveTemplate = (props) => {
  const { loadModal, setLoadModal, selectedFields, fieldNameFromShortCodeExport } = props;

  return (
    <>
      {loadModal && (
        <Modal
          className="modalClassFilterLoad"
          backdrop="true"
          keyboard={false}
          open={true}
          onClose={() => {
            setLoadModal(!loadModal);
          }}
        >
          <div>
            <div className="d-flex justify-content-between download-center-header light-blue-background">
              <div className="download-center-text">
                Export & report template properties
              </div>
              <div className="download-center-text">Help</div>
            </div>
            <div className="loadtempltedexport">
              <div className="Properties-export-load">Properties</div>
              <div className="email-button-center-download">
                <div className="d-flex justify-content-center align-center-load">
                  <div className="template-label-export">Template Name</div>
                  <div className="input-group mb-3 download-load">
                    <input
                      type="text"
                      className="form-control"
                      //   value={displayValue}
                      //   onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="selected-filed-save-tempate-main">
                  <div className="select-export">
                    Selected Fields ({selectedFields.length})
                  </div>
                  <div className="selected-filed-save-tempate d-flex justify-content-start">
                    {selectedFields.map((value, index) => (

                        <div className="select-list">{fieldNameFromShortCodeExport(value)},</div>

                    ))}
                  </div>
                </div>
                {/* <div className="main-load-check-additinal">
                      <div className="additional-export-load">
                        Additional save and share options
                      </div>
                      <div className="d-flex justify-content-start save-load-template">
                        <div>
                          <Checkbox
                            // checked={value.length === fieldOptions.length}
                            // onChange={handleCheckAll}
                            className=""
                          >
                            Save to personal folder
                          </Checkbox>
                        </div>
                        <div className="load-file-first">
                          <input type="file" />
                        </div>
                      </div>
                      <div className="d-flex justify-content-start save-load-template">
                        <div>
                          <Checkbox
                            // checked={value.length === fieldOptions.length}
                            // onChange={handleCheckAll}
                            className=""
                          >
                            Save to Professional folder
                          </Checkbox>
                        </div>
                        <div className="load-file">
                          <input type="file" />
                        </div>
                      </div>
                    </div> */}
              </div>
            </div>
            <div className="d-flex justify-content-between footer-load">
              <div>
                <Checkbox
                  //   checked={value.length === fieldOptions.length}
                  //   onChange={handleCheckAll}
                  className=""
                >
                  Make these my default export preferences
                </Checkbox>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="email-send-download-cancel"
                  onClick={() => {
                    setLoadModal(!loadModal);
                  }}
                >
                  Cancel
                </button>
                <button className="email-send-download-save">Save</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RwireSaveTemplate;
