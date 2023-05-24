import { React, useState } from "react";
import App from "./App";
import Welcome from "./Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/App" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
