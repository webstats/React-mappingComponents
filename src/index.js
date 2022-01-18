import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import App from "./views/App";
import LandingPage from "./views/LandingPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";
import DetailPage from "./views/DetailPage";
import TreePage from "./views/TreePage";
import Contact from "./views/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Routes>
        <Route exact path="/landing" element={<LandingPage />}></Route>
        <Route exact path="/id/:id" element={<DetailPage />}></Route>
        <Route exact path="/tree/:id" element={<TreePage />}></Route>
        <Route path="/contact/:id" element={<Contact />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/" element={<App />}></Route>
    </Routes>
    <Footer />
  </BrowserRouter>, document.getElementById("root"));
