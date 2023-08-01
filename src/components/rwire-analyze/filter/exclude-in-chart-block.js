import { useEffect, useRef } from "react";
import closeIcon from "../../../images/close-icon.svg";

const ExcludeInChartBlock = (props) => {

  const { onHandleExclude } = props;

  const wrapperRef = useRef(null);



  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          let tooltipBlock = document.getElementById("tooltip-block");
          if(tooltipBlock) {
            tooltipBlock.classList.add("d-none");
          }
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleClick = (e) => {
    onHandleExclude(e);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} id="tooltip-block" className="d-none p-2 border rounded bg-light chart-tooltip-block">
      <div className="d-flex">
        <div className="data-value pe-2"></div>
        <div className="" >
          <div>
            <img src={closeIcon}
              width="20"
              height="20"
              alt="Exclude Value"
              title="Exclude Value"
              className="cursor-pointer"
              id="exclude-button" data-index="" onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExcludeInChartBlock;
