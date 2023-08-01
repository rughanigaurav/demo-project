import React from "react";
import logo from "../../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { useStore } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import RwireToggleButton from "../../darkmode-button/toggle-button";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoutIcon from "../../../images/logout.svg";
import RWIRE_IMAGES from "../../common/common-functions/rwire-images";
import { resetFields } from "../../../resources/data/options";
import { clearFielded } from "../../../common/clear-filded";
import "../../../assets/css/style.scss";
import { MdDeleteSweep } from "react-icons/md";
function RWireHeader(props) {
  const {
    setAllField,
    currentPage,
    onSetApp,
    isDarkMode,
    onSetFullView,
    onDeleteUserAnnotations,
  } = props;
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const store = useStore();

  const isAuthenticate = !!sessionStorage.getItem("token");

  const {
    app: { userName },
  } = store.getState();

  const handleClick = () => {
    sessionStorage.removeItem("token");

    return navigate("/en/login");
  };

  const handleClickDownloadCenter = () => {
    return navigate("/en/download-center");
  };
  const handleResetProps = () => {
    const clearData = clearFielded(resetFields);
    setAllField({
      queryFields: clearData,
      tabWiseSearchQuery: { fielded: "", expert: "", number: "" },
      syntaxqueryError: "",
      syntaxqueryCorrect: "",
    });
    onSetApp({ searchQuery: "", smartSearchWord: "", editQuery: "" });
  };
  const handleClickOnHistory = (e) => {
    if (currentPage !== "history") {
      handleResetProps();
    }
  };
  const handleClickOnHome = (e) => {
    handleResetProps();
  };
  const handleClickOnSearch = (e) => {
    if (currentPage === "history") {
      handleResetProps();
    }
  };

  const handleDeleteAnnotations = () => {
    onDeleteUserAnnotations();
    onSetFullView({
      userAnnotations: [],
      stringsHighlights: [],
      stringsComments: [],
    });
  };
  const handleToggle = () => {
    // debugger;
    onSetApp({ isDarkMode: !isDarkMode });
    // setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="container-fluid sticky-top header-bg shadow-sm">
      <div className="container">
        <nav className="navbar width-adjust-navbar navbar-expand-lg header-bg navbar-light py-3 py-lg-0">
          <div onClick={handleClickOnHome}>
            <Link to="/en" className="navbar-brand">
              <img src={logo} alt="Rwire logo" className="rwire-logo" />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {isAuthenticate ? (
              <div className="navbar-nav ms-auto py-0 ml-auto ">
                <div onClick={handleClickOnSearch}>
                  <Link
                    to="/en"
                    className={`nav-item nav-link ${
                      pathname === "/en" ? "active" : ""
                    }`}
                  >
                    <Trans>{t("header_search")}</Trans>
                  </Link>
                </div>
                <div onClick={handleClickOnHistory}>
                  <Link
                    to="/en/history"
                    className={`nav-item nav-link ${
                      pathname === "/en/history" ? "active" : ""
                    }`}
                  >
                    <Trans>{t("rwire_history")}</Trans>
                  </Link>
                </div>
                <Navbar.Collapse id="navbar-dark-example">
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={
                        <Trans>
                          {t("rwire_username")}, {userName}
                        </Trans>
                      }
                      menuVariant="dark"
                      className="logout-dropdown"
                    >
                      <NavDropdown.Item onClick={handleClickDownloadCenter}>
                        <img
                          src={RWIRE_IMAGES.RwireDownload}
                          alt="logout"
                          className="me-2"
                          style={{ width: "20px", height: "20px" }}
                        />
                        <span>{t("rwire_download_center")}</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleClick}>
                        <img src={logoutIcon} alt="logout" className="me-2 " />
                        <span>{t("rwire_logout")}</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleDeleteAnnotations}>
                        <MdDeleteSweep
                          alt="logout"
                          className="me-2 clear-annotations-button"
                        />
                        <span>Clear Annotations</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            ) : (
              <div className="navbar-nav ms-auto py-0 ml-auto ">
                <Link
                  to="/en"
                  className={`nav-item nav-link ${
                    pathname === "/en" ? "active" : ""
                  }`}
                >
                  <Trans>{t("header_about")}</Trans>
                </Link>
                <Link
                  to="/en/history"
                  className={`nav-item nav-link ${
                    pathname === "/en/history" ? "active" : ""
                  }`}
                >
                  <Trans>{t("header_services")}</Trans>
                </Link>
                <Navbar.Collapse id="navbar-dark-example">
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={<Trans>{t("english_language")}</Trans>}
                      menuVariant="dark"
                      className="logout-dropdown"
                    >
                      <NavDropdown.Item>
                        <span>{t("english_language")}</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            )}
          </div>
          <div className="ml-1">
            <RwireToggleButton handleToggle={handleToggle} />
          </div>
        </nav>
      </div>
    </div>
  );
}
export default RWireHeader;
