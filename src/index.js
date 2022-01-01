import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import App from "./views/App";
import LandingPage from "./views/LandingPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";
import DetailPage from "./views/DetailPage";
import TreePage from "./views/TreePage";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/landing" element={<LandingPage />}></Route>
        <Route exact path="/id/:id" element={<DetailPage />}></Route>
        <Route exact path="/tree/:id" element={<TreePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/" element={<App />}></Route>
    </Routes>
  </BrowserRouter>, document.getElementById("root"));
