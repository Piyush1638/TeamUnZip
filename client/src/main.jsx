import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { EvaultProvider } from "./context/EvaulContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <EvaultProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </EvaultProvider>
);
