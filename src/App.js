//main-app
import React, { Suspense, lazy, useState } from "react";
import Styles from "./App.module.css";
import FallbackComponent from "./components/fallback/FallbackComponent";
import Loding from "./components/loading/loding";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./components/main/main";
import ErrorBoundary from "./components/ErrorBoundary";

const fallback = Promise.resolve({ default: FallbackComponent });

const ShopApp = lazy(() => {
  return import("shop/ShopApp").catch(() => fallback);
});

/*const DashboardApp = lazy(() => {
  return import("dashboard/DashboardApp").catch(() => fallback);
});*/

function App() {
  const [mycount, setMycount] = useState(0);

  return (
    <div className={Styles.main} style={{ padding: 0, margin: 0 }}>
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
                {/* <Route
                  path="/dashboard"
                  element={
                    <DashboardApp
                      userName={"jeevanandham"}
                      mycount={mycount}
                      setMycount={setMycount}
                    />
                  }
                />*/}
                <Route path="/shop" element={<ShopApp count={mycount} />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
