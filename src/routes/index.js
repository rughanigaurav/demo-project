import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "../container/layout-wrapper";
import RwireHome from "../container/rwire-home";
import RWireExpert from "../pages/rwire-expert";
import RwirePatent from "../container/result-page";
import RWirePatentView from "../container/patent-view";
import RWireHistory from "../container/rwire-history";
import RWireCognizance from "../container/rwire-cognizance";
import Login from "../container/login";
import DownloadCenter from "../container/download-center";
import "rsuite/dist/rsuite.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Forgot from "../container/forgot";
import RwireResetPassword from "../container/reset";
import RwireMaintainance from "../pages/rwire-maintainance/rwire-maintainance";
import PageNotFound from "../pages/rwire-page-not-found";
import Header from "../container/header";
import RWirefooter from "../components/rwire-ui/rwire-footer";
import "../assets/css/dark-mode/index.scss";
import RwireQuickView from "../container/rwire-quick-view";

const HeaderFooterLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <RWirefooter />
  </>
);

const RoutesList = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="default" />
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        path="/:locale/login"
        element={
          <HeaderFooterLayout>
            <Login />{" "}
          </HeaderFooterLayout>
        }
      />
      <Route
        path="/:locale/download-center"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="download-center">
              <DownloadCenter />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      />
      <Route
        path="/:locale/forgot-password"
        element={
          <HeaderFooterLayout>
            <Forgot />{" "}
          </HeaderFooterLayout>
        }
      />
      <Route
        path="/:locale/reset/:token"
        element={
          <HeaderFooterLayout>
            <RwireResetPassword />{" "}
          </HeaderFooterLayout>
        }
      />
      <Route
        exact
        path="/:locale"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="home">
              <RwireHome />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        exact
        path="/:locale/rwire-expert"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="home">
              <RWireExpert />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        exact
        path="/:locale/rwire-patents"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="result-page">
              <RwirePatent />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        exact
        path="/:locale/patent-view"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="patent-view">
              <RWirePatentView />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        exact
        path="/:locale/cognizance"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="cognizance">
              <RWireCognizance />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        exact
        path="/:locale/history"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="history">
              <RWireHistory />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        exact
        path="/:locale/maintainance"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="maintainance">
              <RwireMaintainance />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>
      <Route
        exact
        path="/:locale/quick-view"
        element={
          <HeaderFooterLayout>
            <LayoutWrapper titleKey="quick-view">
              <RwireQuickView />
            </LayoutWrapper>
          </HeaderFooterLayout>
        }
      ></Route>

      <Route
        exact
        path="*"
        element={
          <HeaderFooterLayout>
            <PageNotFound />
          </HeaderFooterLayout>
        }
      ></Route>
    </Routes>
  );
};

export default RoutesList;
