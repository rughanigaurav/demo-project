import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RwireJumpPages = (props) => {
  const { onSetResultTable, onRwireSearchAPI, dataSize, totalRecordsCount } =
    props;

  const { t } = useTranslation();

  const [jumpPage, setJumpPage] = useState("");
  const [clname, setClassName] = useState("pages_input_box");

  const total = totalRecordsCount > 10000 ? 10000 : totalRecordsCount;
  const totalPages = Math.ceil(total / dataSize);

  const navigate = useNavigate();

  const handleJumpPage = (e) => {
    setJumpPage(e.target.value);
    if (e.target.value.length >= 0) {
      setClassName("pages_input_box");
    }
  };
  const enterPageAlert = () => {
    // eslint-disable-next-line no-console
    console.log("Please enter page number");
  };
  const pageNotFoundAlert = () => {
    // eslint-disable-next-line no-console
    console.log("Page number not found");
  };

  const handleClickGo = () => {
    const jumpPageNumber = parseInt(jumpPage);
    if (jumpPage === "") {
      setClassName("red_border");
      setTimeout(enterPageAlert, 100);
    } else if (
      !isNaN(jumpPageNumber) &&
      jumpPageNumber > 0 &&
      jumpPageNumber <= parseInt(totalPages)
    ) {
      setClassName("pages_input_box");
      onSetResultTable({
        dataFrom: (jumpPageNumber - 1) * dataSize,
        activePages: jumpPageNumber,
      });

      onRwireSearchAPI().then((data) => {
        if (data) {
          navigate("/en/rwire-patents");
        } else {
          // eslint-disable-next-line no-console
          console.log("Error:", props.error);
        }
      });
    } else {
      setClassName("red_border");
      setTimeout(pageNotFoundAlert, 100);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const jumpPageNumber = parseInt(event.target.value);
      if (event.target.value === "") {
        setClassName("red_border");
        setTimeout(enterPageAlert, 100);
      } else if (
        !isNaN(jumpPageNumber) &&
        jumpPageNumber > 0 &&
        jumpPageNumber <= parseInt(totalPages)
      ) {
        setClassName("pages_input_box");
        onSetResultTable({
          dataFrom: (jumpPageNumber - 1) * dataSize,
          activePages: jumpPageNumber,
        });

        onRwireSearchAPI().then((data) => {
          if (data) {
            navigate("/en/rwire-patents");
          } else {
            // eslint-disable-next-line no-console
            console.log("Error:", props.error);
          }
        });
      } else {
        setClassName("red_border");
        setTimeout(pageNotFoundAlert, 100);
      }
    }
  };

  return (
    <>
      <div className="jump-page">
        <div>
          <input
            type="text"
            value={jumpPage}
            className={clname}
            onChange={handleJumpPage}
            onKeyPress={handleKeyPress}
            placeholder="pages"
          />
        </div>
        <div className="pl-1">
          <button type="button" className={`go-btn`} onClick={handleClickGo}>
            {t("pagination-go")}
          </button>
        </div>
      </div>
    </>
  );
};

export default RwireJumpPages;
