import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApp } from "../../action/app.js";
import { ReactComponent as Light } from "../../assets/images/light.svg";
import { ReactComponent as Dark } from "../../assets/images/dark.svg";
import "../darkmode-button/style.scss";

const RWireDarkMode = (props) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.app.darkTheme);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    props.handleToggle();
    dispatch(setApp({ darkTheme: newTheme }));
    localStorage.setItem("isDarkTheme", newTheme.toString());
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (isDarkTheme) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [isDarkTheme]);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={isDarkTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Light />
        <Dark />
      </label>
    </div>
  );
};

export default RWireDarkMode;
