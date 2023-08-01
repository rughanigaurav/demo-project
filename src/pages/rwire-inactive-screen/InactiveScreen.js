import React, { useEffect, useState } from "react";
import { inActiveScreenTime } from "../../components/constant";
import AlertModal from "./alert-modal";

const InactiveScreen = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);

  React.useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * 5);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  React.useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  const handleScroll = () => {
    clearTimeout(window.restTimer);
    window.restTimer = setTimeout(() => {
      togglerTimer();
      props.onSetApp({ isInActiveUser: true });
      document.body.setAttribute("style", "overflow: hidden");
      setOpen(true);
    }, inActiveScreenTime);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    props.onSetApp({ isInActiveUser: false });
    clearTimeout(window.logoutTimer);
    handleScroll();
    document.body.setAttribute("style", "overflow: auto");
    setOpen(false);
  };

  if (!props.isInActiveUser) {
    return "";
  }

  return (
    <AlertModal
      closeModel={handleClick}
      isOpen={isOpen}
      seconds={seconds}
      minutes={minutes}
    />
  );
};

export default InactiveScreen;
