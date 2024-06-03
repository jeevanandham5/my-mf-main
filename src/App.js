//main-app
import React, { Suspense, lazy, useState } from "react";
import Styles from "./App.module.css";
import FallbackComponent from "./components/fallback/FallbackComponent";
import Loding from "./components/loading/loding";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Main from "./components/main/main";
import ErrorBoundary from "./components/ErrorBoundary";
const fallback = Promise.resolve({ default: FallbackComponent });

const ShopApp = lazy(() => {
  return import("shop/ShopApp").catch(() => fallback);
});

const MyDashboard = lazy(() =>
  import("dashboard/myDashboard").catch(() => fallback)
);
const DashboardApp = lazy(() => {
  return import("dashboard/DashboardApp").catch(() => fallback);
});

function App() {
  const [mycount, setMycount] = useState(0);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className={Styles.main}>
      <header className={Styles.header}>
        <h1>Main App</h1>

        <div>
          <div className="btn-group">
            <Link
              to={"/"}
              className={`btn btn-primary ${isActive("/") ? "active " : ""}`}
            >
              Home
            </Link>
            <Link
              to={"/shop"}
              className={`btn btn-primary ${
                isActive("/shop") ? "active bg-info" : ""
              }`}
            >
              Shop
            </Link>
            <Link
              to={"/dashboard"}
              className={`btn btn-primary ${
                isActive("/dashboard") ? "active bg-info" : ""
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <div className={Styles.container}>
        <div className={Styles.box}>
          <h1>Main App</h1>

          <Link to={"/"}>
            <button className="btn btn-info">Main</button>
          </Link>
          <div className="w-100 d-flex gap-5 align-items-center justify-content-around">
            <Link to={"/shop"}>
              <button className="btn btn-danger">Shop</button>
            </Link>
            <Link to={"/dashboard"}>
              <button className="btn btn-warning">Dashboard</button>
            </Link>
          </div>
        </div>
        <div className={Styles.apps}>
          <div className={Styles.app}>
            <Suspense fallback={<Loding />}>
              <ErrorBoundary>
                <Routes>
                  <Route
                    path="/"
                    element={<Main mycount={mycount} setMycount={setMycount} />}
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <DashboardApp
                        userName={"jeevanandham"}
                        mycount={mycount}
                        setMycount={setMycount}
                      />
                    }
                  />

                  <Route path="/shop" element={<ShopApp count={mycount} />} />
                  <Route
                    path="*"
                    element={<Main mycount={mycount} setMycount={setMycount} />}
                  />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
