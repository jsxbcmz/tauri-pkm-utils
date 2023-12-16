import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserHistory } from 'history';
import "./styles.css";

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App history={history}/>
  </React.StrictMode>,
);
