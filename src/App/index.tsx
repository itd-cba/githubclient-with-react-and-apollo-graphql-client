import Profile from "../Profile";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./style.css";
import * as routes from "../constants/routes";
import Organization from "../Organization";
import Navigation from "./Navigation";
import { useState } from "react";

const App = () => {
  const [searchValue, setSearchValue] = useState("itdesign-gmbh");

  const onOrganizationSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <BrowserRouter>
        <div className={"App"}>
          <Navigation
            organizationName={searchValue}
            onOrganizationSearch={onOrganizationSearch}
          />
          <div className={"App-main"}>
            <Routes>
              <Route
                path={routes.ORGANIZATION}
                element={
                  <div className={"App-content_large-header"}>
                    <Organization organizationName={searchValue} />
                  </div>
                }
              />
              <Route
                path={routes.PROFILE}
                element={
                  <div className={"App-content_small-header"}>
                    <Profile />
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
