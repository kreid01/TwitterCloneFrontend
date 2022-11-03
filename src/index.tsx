import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { CommentProvider } from "context/CommentContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <CommentProvider>
        <App />
      </CommentProvider>
    </React.StrictMode>
  </BrowserRouter>
);
