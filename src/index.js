import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import * as serviceWorker from "./serviceWorker";
import Main from "./components/Main";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
