import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { CommentContextProvider } from "context/IsCommentingContext";
import { UserContextProvider } from "context/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <UserContextProvider>
        <CommentContextProvider>
          <App />
        </CommentContextProvider>
      </UserContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
