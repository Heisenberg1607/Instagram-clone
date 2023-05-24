import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"
import Routing from "./Routing.jsx";
import "./index.css";
import App from "./App";
import Post from "./Post";
import AdSense from "react-adsense";
import Welcome from "./Welcome.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Routing></Routing>
  </>
);
