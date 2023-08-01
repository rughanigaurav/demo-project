const statusInProcess = ["Processing", "New"];

const ActionButtons = (props) => {
  const {
    item,
    setEmailDownloadToggle,
    emailDownloadToggle,
    setMailId,
    onDeleteDownloadCenter,
    onFetchDownloadCenterData,
  } = props;

  const handleClickModalEmail = (id) => {
    setEmailDownloadToggle(!emailDownloadToggle);
    setMailId(id);
  };

  const handleRemoveItem = async (id) => {
    await onDeleteDownloadCenter(id);
    await onFetchDownloadCenterData();
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-between download-column ${item.status}`}
    >
      {statusInProcess.includes(item.status) ? (
        <div className="mr-3">Processing</div>
      ) : (
        <div className="mr-3">Available</div>
      )}
      {statusInProcess.includes(item.status) ? (
        <div className={`row-icons download-icon disabled`} />
      ) : (
        <a
          className={"table-right-download-center mx-1"}
          href={item.attachment}
          download
          disabled={statusInProcess.includes(item.status)}
        >
          <div className={`row-icons download-icon`} />
        </a>
      )}
      <button
        className={`table-right-download-center mx-1 ${
          statusInProcess.includes(item.status) ? "disabled" : ""
        }`}
        onClick={() => handleClickModalEmail(item.id)}
        disabled={statusInProcess.includes(item.status)}
      >
        <div className="row-icons mail-icon" />
      </button>
      <button
        className={`table-right-download-center mx-1 ${
          statusInProcess.includes(item.status) ? "disabled" : ""
        }`}
        onClick={() => handleRemoveItem(item.id)}
        disabled={statusInProcess.includes(item.status)}
      >
        <div className="row-icons delete-icon" />
      </button>
    </div>
  );
};

export default ActionButtons;
