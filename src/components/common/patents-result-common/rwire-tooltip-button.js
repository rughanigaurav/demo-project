import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BiInfoCircle } from "react-icons/bi";
import { getUniqueNFValues } from "../../../action/patent-view";
import RwireColumnList from "./rwire-columnlist";

const RwireTooltipButton = (props) => {
  const { id } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const handleButtonClick = () => {
    setShowTooltip(!showTooltip);
  };
  const handleScroll = () => {
    setShowTooltip(false);
  };

  const handleOutsideClick = (event) => {
    const tooltipButton = document.getElementById(`tooltip-button_${id}`);

    if (tooltipButton && !tooltipButton.contains(event.target)) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const resultTable = document.querySelector(".result-page-table");

    if (resultTable) {
      resultTable.addEventListener("scroll", handleScroll);
      return () => {
        resultTable.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const tooltip = (
    <Tooltip id="tooltip" className="national-notification-tooltip">
      <RwireColumnList
        items={getUniqueNFValues([
          {
            CN: "EP",
            NF: "NL 20240718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "1",
            DS: "",
          },
          {
            CN: "EP",
            NF: "NL 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "1",
            DS: "",
          },

          {
            CN: "EP",
            NF: "PT 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "25",
            DS: "",
          },
          {
            CN: "EP",
            NF: "RO 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "26",
            DS: "",
          },
          {
            CN: "EP",
            NF: "RS 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "27",
            DS: "",
          },
          {
            CN: "EP",
            NF: "SE 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "28",
            DS: "",
          },
          {
            CN: "EP",
            NF: "SI 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "29",
            DS: "",
          },
          {
            CN: "EP",
            NF: "SK 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "30",
            DS: "",
          },
          {
            CN: "EP",
            NF: "SM 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "31",
            DS: "",
          },
          {
            CN: "EP",
            NF: "TR 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "32",
            DS: "",
          },
          {
            CN: "EP",
            NF: "MK 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "33",
            DS: "",
          },
          {
            CN: "EP",
            NF: "CY 20180718",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "34",
            DS: "",
          },
          {
            CN: "EP",
            NF: "HU 20131112",
            LG: "eng",
            ST: "N",
            EV: "B475",
            SQ: "35",
            DS: "",
          },
        ])}
      />
    </Tooltip>
  );
  return (
    <div>
      <OverlayTrigger
        placement="auto"
        trigger="click"
        overlay={tooltip}
        show={showTooltip}
        rootClose
        onHide={() => setShowTooltip(false)}
      >
        <div id={`tooltip-button_${id}`}>
          <BiInfoCircle
            alt="edit"
            className="img-fluid national-notification-i-icon"
            style={{
              cursor: "pointer",
              marginLeft: "3px",
              marginTop: "-6px",
            }}
            onClick={handleButtonClick}
          />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default RwireTooltipButton;
