import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import About from "../pages/about";
import Config from "../pages/config";
import Splash from '../pages/splash';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
