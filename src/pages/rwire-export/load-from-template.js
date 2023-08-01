import { Modal } from "rsuite";
import FolderTree from "react-folder-tree";
import "react-folder-tree/dist/style.css";

const RwireLoadFromTemplate = (props) => {
  const {
    loadSaveModal,
    setSaveLoadModal,
  } = props;

  // eslint-disable-next-line no-console
  const onTreeStateChange = (state, event) => console.log(state, event);


  const treeState = {
    name: 'Export template',
    checked: 0.5,
    isOpen: true,
    children: [
        { name: 'Export template', checked: 0 },
        { name: 'Export template', checked: 1 },
        { name: 'Export template', checked: 2 },
        { name: 'Export template', checked: 3 },
        { name: 'Export template', checked: 4 },
        { name: 'Export template', checked: 5 },
        { name: 'Export template', checked: 6 },
        { name: 'Export template', checked: 7 },
        { name: 'Export template', checked: 8 },
        { name: 'Export template', checked: 9 },
        { name: 'Export template', checked: 10 },
        { name: 'Export template', checked: 11 },
        { name: 'Export template', checked: 12 },
        { name: 'Export template', checked: 13 },
      ],
  };

  return (
    <>
      {loadSaveModal && (
        <Modal
          className="loadFromFilterModal load-from-filter-margin"
          backdrop="true"
          keyboard={false}
          open={true}
          onClose={() => {
            setSaveLoadModal(!loadSaveModal);
          }}
        >
          <div>
            <div className="d-flex justify-content-between download-center-header light-blue-background">
              <div className="download-center-text">Select export template</div>
              <div className="download-center-text">Help</div>
            </div>
            <div className="folder-tree-load-template">
              <FolderTree data={treeState} onChange={onTreeStateChange} />
            </div>
            <div className="footer-section-laod">
              <div className="d-flex justify-content-end footer-load">
                <div className="d-flex justify-content-between">
                  <button
                    className="email-send-download-cancel"
                    onClick={() => {
                      setSaveLoadModal(!loadSaveModal);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="email-send-download-save">OK</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RwireLoadFromTemplate;
